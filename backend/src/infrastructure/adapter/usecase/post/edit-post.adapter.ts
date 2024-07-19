import { UseCaseValidateAdapter } from '@core/common/adapter/usecase/usecase-validate.adapter';
import { EditPostPort } from '@core/domain/post/port/usecase/post.port';
import { Exclude, Expose, plainToClass, plainToInstance } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@Exclude()
export class EditPostAdapter extends UseCaseValidateAdapter implements EditPostPort {
  @Expose()
  @IsNumber()
  public executorId: number;

  @Expose()
  @IsNumber()
  public postId: number;

  @Expose()
  @IsOptional()
  @IsString()
  public title?: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  public imageId?: number;

  @Expose()
  @IsOptional()
  @IsString()
  public content?: string;

  public static async create(payload: EditPostPort): Promise<EditPostAdapter> {
    const adapter: EditPostAdapter = plainToInstance(EditPostAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
