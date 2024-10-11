import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateModelDto } from 'src/db/dto/models';
import { Model } from 'src/db/entities/model';
import { ModelsService } from 'src/services/models.service';
import { UpdateResult } from 'typeorm';

@Controller('models')
@ApiTags('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all models',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all models',
    type: Model,
    example: [
      {
        id: 1,
        name: 'MDX',
        average_price: 702109.5,
      },
      {
        id: 2,
        name: 'RDX',
        average_price: 702109.5,
      },
    ],
  })
  async findAll(
    @Query('greater') greater?: number,
    @Query('lower') lower?: number,
  ): Promise<Model[]> {
    return this.modelsService.findAll({
      greater,
      lower,
    });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a model' })
  @ApiResponse({
    status: 200,
    description: 'Return the updated model',
    type: Model,
  })
  async update(
    @Param('id') id: number,
    @Body() model: UpdateModelDto,
  ): Promise<UpdateResult> {
    return this.modelsService.update(id, model);
  }
}
