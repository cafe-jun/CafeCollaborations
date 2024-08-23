import { UseCaseValidateAdapter } from '@core/common/adapter/usecase/usecase-validate.adapter';
import { Category } from '@core/common/enums/category.enum';
import { Region } from '@core/common/enums/region.enum';
import { GetAllPostListPort } from '@core/domain/post/port/usecase/post.port';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class GetAllPostListAdapter extends UseCaseValidateAdapter implements GetAllPostListPort {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  pageNo: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  pageSize: number;

  @IsString()
  @IsOptional()
  keyword: string;

  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  regionItems: string[];

  @Transform(({ value }) => JSON.parse(value))
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => String)
  categoryItems: string[];

  public static async create(payload: GetAllPostListPort): Promise<GetAllPostListAdapter> {
    console.log('payload :: ', payload);
    const adapter: GetAllPostListAdapter = plainToInstance(GetAllPostListAdapter, payload);
    await adapter.validate();
    console.log('adapter :; ', adapter);
    return adapter;
  }
}
