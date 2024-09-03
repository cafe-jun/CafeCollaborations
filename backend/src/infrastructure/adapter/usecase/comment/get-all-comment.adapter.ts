import { UseCaseValidateAdapter } from '@core/common/adapter/usecase/usecase-validate.adapter';
import { GetAllCommentPort } from '@core/domain/comment/port/comment.port';
import { Exclude, Expose, plainToInstance, Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class GetAllCommentAdapter extends UseCaseValidateAdapter implements GetAllCommentPort {
  @Expose()
  @IsNumber()
  public postId: number;

  @Expose()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  public pageSize: number;

  @Expose()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  public pageNo: number;

  public static async create(payload: GetAllCommentPort): Promise<GetAllCommentAdapter> {
    const adapter: GetAllCommentAdapter = plainToInstance(GetAllCommentAdapter, payload);
    console.log('adapter ', adapter);
    await adapter.validate();

    return adapter;
  }
}
