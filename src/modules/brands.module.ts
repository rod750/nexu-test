import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from '../db/entities/brand';
import { BrandsService } from '../services/brands.service';
import { BrandsController } from '../controllers/brands.controller';
import { Model } from 'src/db/entities/model';
import { ModelsService } from 'src/services/models.service';

@Module({
  imports: [TypeOrmModule.forFeature([Brand, Model])],
  providers: [BrandsService, ModelsService],
  controllers: [BrandsController],
})
export class BrandsModule {}
