import { UseCaseValidateAdapter } from '@core/common/adapter/usecase/usecase-validate.adapter';
import { GetAllPostListPort } from '@core/domain/post/port/usecase/post.port';
import { plainToInstance, Transform } from 'class-transformer';
import { IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class GetAllPostListAdapter extends UseCaseValidateAdapter implements GetAllPostListPort {
  @Transform(({ value }) => Number(value))
  @IsNumber({})
  pageNo: number;
  @Transform(({ value }) => Number(value))
  @IsNumber()
  pageSize: number;

  @IsString()
  @IsOptional()
  keyword: string;

  public static async create(payload: GetAllPostListPort): Promise<GetAllPostListAdapter> {
    const adapter: GetAllPostListAdapter = plainToInstance(GetAllPostListAdapter, payload);
    await adapter.validate();
    return adapter;
  }
}
