import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBrandDto, ShowBrandDto } from 'src/db/dto/brands';
import { CreateModelDto } from 'src/db/dto/models';
import { Brand } from 'src/db/entities/brand';
import { Model } from 'src/db/entities/model';
import { BrandsService } from 'src/services/brands.service';

@Controller('brands')
@ApiTags('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all brands' })
  @ApiResponse({
    status: 200,
    description: 'Return all brands',
    example: [
      {
        id: 1,
        name: 'Acura',
        average_price: 702109.5,
      },
      {
        id: 2,
        name: 'Audi',
        average_price: 630759.4666666667,
      },
    ],
  })
  async findAll(): Promise<ShowBrandDto[]> {
    return this.brandsService.findAll();
  }

  @Get(':id/models')
  @ApiOperation({
    summary: 'Get all models by brand id',
  })
  @ApiParam({
    name: 'id',
    description: 'Brand id',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Return all models by brand id',
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
  async findModelsByBrandId(@Param('id') id: number): Promise<Model[]> {
    return this.brandsService.findModelsByBrandId(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a brand',
  })
  @ApiResponse({
    status: 201,
    description: 'Return the created brand',
    type: Brand,
    example: {
      id: 1,
      name: 'Acura',
      average_price: 702109.5,
    },
  })
  async create(@Body() brand: CreateBrandDto): Promise<Brand> {
    return this.brandsService.create(brand);
  }

  @Post(':id/models')
  @ApiOperation({ summary: 'Create a model' })
  @ApiResponse({
    status: 201,
    description: 'Return the created model',
    type: Model,
    example: {
      id: 1,
      name: 'MDX',
      average_price: 702109.5,
    },
  })
  async createModel(
    @Param('id') id: number,
    @Body() model: CreateModelDto,
  ): Promise<Model> {
    return this.brandsService.createModelWithBrandId(id, model);
  }
}
