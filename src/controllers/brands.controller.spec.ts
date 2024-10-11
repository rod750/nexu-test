import { BrandsService } from 'src/services/brands.service';
import { BrandsController } from './brands.controller';
import { Repository } from 'typeorm';
import { Brand } from 'src/db/entities/brand';
import { Model } from 'src/db/entities/model';
import { CreateBrandDto, ShowBrandDto } from 'src/db/dto/brands';

describe('BrandsController', () => {
  let brandsController: BrandsController;
  let brandsService: BrandsService;
  let brandRepository: Repository<Brand>;
  let modelRepository: Repository<Model>;

  beforeEach(async () => {
    brandRepository = {
      findOneOrFail: jest.fn(),
      query: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    } as unknown as Repository<Brand>;

    modelRepository = {} as unknown as Repository<Model>;

    brandsService = new BrandsService(brandRepository, modelRepository);

    brandsController = new BrandsController(brandsService);
  });

  describe('findAll', () => {
    it('should return an array of brands', async () => {
      const result: Promise<ShowBrandDto[]> = new Promise((resolve) =>
        resolve([
          new ShowBrandDto({
            id: 1,
            name: 'Acura',
            average_price: 702109.5,
            models: [],
          }),
          new ShowBrandDto({
            id: 2,
            name: 'Audi',
            average_price: 630759.4666666667,
            models: [],
          }),
        ]),
      );

      jest.spyOn(brandRepository, 'query').mockImplementation(
        () =>
          new Promise<any>((resolve) => {
            const mock = [
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
            ];

            resolve(mock);
          }),
      );

      expect(await brandsController.findAll()).toStrictEqual(await result);
    });
  });

  describe('findModelsByBrandId', () => {
    it('should return an array of models', async () => {
      const brand = new Brand();
      brand.id = 1;

      const result = [
        {
          id: 1,
          name: 'MDX',
          average_price: 702109.5,
          brand: brand,
        },
        {
          id: 2,
          name: 'RDX',
          average_price: 702109.5,
          brand: brand,
        },
      ];

      jest.spyOn(brandRepository, 'findOneOrFail').mockImplementation(
        () =>
          new Promise<Brand>((resolve) => {
            const brand = new Brand();
            brand.id = 1;
            brand.models = result;
            resolve(brand);
          }),
      );

      expect(await brandsController.findModelsByBrandId(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should return a brand', async () => {
      const result = new Promise<Brand>((resolve) => {
        const brand = new Brand();
        brand.id = 1;
        brand.name = 'Acura';
        resolve(brand);
      });

      jest
        .spyOn(brandRepository, 'create')
        .mockImplementation((model: CreateBrandDto) => {
          const brand = new Brand();
          brand.name = model.name;

          return brand;
        });

      jest.spyOn(brandRepository, 'save').mockImplementation((brand: Brand) => {
        brand.id = 1;
        return Promise.resolve(brand);
      });

      const brand = {
        name: 'Acura',
      };

      expect(await brandsController.create(brand)).toStrictEqual(await result);
    });
  });
});
