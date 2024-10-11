import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from 'src/db/entities/model';
import { Brand } from 'src/db/entities/brand';
import { ModelsService } from 'src/services/models.service';
import { ModelsController } from 'src/controllers/models.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Model, Brand])],
  providers: [ModelsService],
  controllers: [ModelsController],
})
export class ModelsModule {}
