import { IsNotEmpty } from 'class-validator';
import { Brand } from '../entities/brand';

export class CreateBrandDto {
  @IsNotEmpty()
  name: string;
}

export class ShowBrandDto {
  id: number;
  nombre: string;
  average_price: number;

  constructor({ id, name, average_price }: Brand & { average_price: number }) {
    this.id = id;
    this.nombre = name;
    this.average_price = average_price;
  }
}
