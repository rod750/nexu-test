import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateModelDto, UpdateModelDto } from 'src/db/dto/models';
import { Brand } from 'src/db/entities/brand';
import { Model } from 'src/db/entities/model';
import {
  And,
  DeleteResult,
  LessThan,
  MoreThan,
  Repository,
  UpdateResult,
} from 'typeorm';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  findAll({
    greater,
    lower,
  }: {
    greater?: number;
    lower?: number;
  }): Promise<Model[]> {
    const where = {};

    if (greater) {
      where['average_price'] = MoreThan(greater);
    }

    if (lower) {
      where['average_price'] = LessThan(lower);
    }

    if (greater && lower) {
      where['average_price'] = And(MoreThan(greater), LessThan(lower));
    }

    return this.modelRepository.find({
      where: where,
    });
  }

  findOne(id: number): Promise<Model> {
    return this.modelRepository.findOneBy({ id: id });
  }

  async create(model: CreateModelDto): Promise<Model> {
    const newModel = this.modelRepository.create(model);

    const brand = await this.brandRepository.findOneByOrFail({
      id: model.brand_id,
    });

    newModel.brand = brand;

    return this.modelRepository.save(model);
  }

  async update(id: number, model: UpdateModelDto): Promise<UpdateResult> {
    const updatedModel = await this.modelRepository.findOneByOrFail({ id: id });

    updatedModel.average_price = model.average_price;

    return this.modelRepository.update(id, updatedModel);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.modelRepository.delete(id);
  }
}
