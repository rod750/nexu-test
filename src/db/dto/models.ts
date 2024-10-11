import { IsNotEmpty, Min } from 'class-validator';

export class CreateModelDto {
  @IsNotEmpty()
  name: string;

  @Min(100000)
  average_price?: number;

  brand_id: number;
}

export class UpdateModelDto {
  @Min(100000)
  average_price?: number;
}
