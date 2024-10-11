import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBrandDto, ShowBrandDto } from 'src/db/dto/brands';
import { CreateModelDto } from 'src/db/dto/models';
import { Brand } from 'src/db/entities/brand';
import { Model } from 'src/db/entities/model';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Model)
    private readonly modelRepository: Repository<Model>,
  ) {}

  async findAll(): Promise<ShowBrandDto[]> {
    const brands = await this.brandRepository.query(
      `SELECT brands.*, AVG(models.average_price) as average_price
      FROM brands
      LEFT JOIN models ON brands.id = models.brand_id
      GROUP BY brands.id`,
    );

    return brands.map((brand) => new ShowBrandDto(brand));
  }

  async findModelsByBrandId(id: number): Promise<Model[]> {
    const brand = await this.brandRepository.findOneOrFail({
      where: { id: id },
      relations: ['models'],
    });

    return brand.models;
  }

  create(brand: CreateBrandDto): Promise<Brand> {
    const newBrand = this.brandRepository.create(brand);

    return this.brandRepository.save(newBrand);
  }

  async createModelWithBrandId(
    id: number,
    model: CreateModelDto,
  ): Promise<Model> {
    const newModel = this.modelRepository.create(model);
    const brand = await this.brandRepository.findOneByOrFail({ id: id });

    newModel.brand = brand;

    return this.modelRepository.save(newModel);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.brandRepository.delete(id);
  }
}
