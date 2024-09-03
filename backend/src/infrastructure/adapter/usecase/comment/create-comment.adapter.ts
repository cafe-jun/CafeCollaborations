import { UseCaseValidateAdapter } from '@core/common/adapter/usecase/usecase-validate.adapter';
import { CreateCommentPort } from '@core/domain/comment/port/comment.port';
import { CreatePostPort } from '@core/domain/post/port/usecase/post.port';
import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateCommentAdapter extends UseCaseValidateAdapter implements CreateCommentPort {
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

  public static async create(payload: CreateCommentPort): Promise<CreateCommentAdapter> {
    console.log('payload ', payload);
    const adapter: CreateCommentAdapter = plainToInstance(CreateCommentAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
