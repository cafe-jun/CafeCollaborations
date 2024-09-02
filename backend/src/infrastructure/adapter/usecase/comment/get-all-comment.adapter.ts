import { UseCaseValidateAdapter } from '@core/common/adapter/usecase/usecase-validate.adapter';
import { GetAllCommentPort } from '@core/domain/comment/port/comment.port';
import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class GetAllCommentAdapter extends UseCaseValidateAdapter implements GetAllCommentPort {
  @Expose()
  @IsNumber()
  public executorId: number;

  @Expose()
  @IsOptional()
  @IsString()
  public content: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  public postId: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  public pageSize: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  public pageNo: number;

  public static async create(payload: GetAllCommentPort): Promise<GetAllCommentAdapter> {
    const adapter: GetAllCommentAdapter = plainToInstance(GetAllCommentAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
