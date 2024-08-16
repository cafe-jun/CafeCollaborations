import { UseCaseValidateAdapter } from '@core/common/adapter/usecase/usecase-validate.adapter';
import { Category } from '@core/common/enums/category.enum';
import { Duration } from '@core/common/enums/duration-type.enum';
import { RecruitMember } from '@core/common/enums/recruite-member.enum';
import { Region } from '@core/common/enums/region.enum';
import { CreatePostPort } from '@core/domain/post/port/usecase/post.port';
import { Exclude, Expose, plainToInstance, Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@Exclude()
export class CreatePostAdapter extends UseCaseValidateAdapter implements CreatePostPort {
  @Expose()
  @IsNumber()
  public executorId: number;

  @Expose()
  @IsOptional()
  @IsString()
  public title: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  public imageId?: string;

  @Expose()
  @IsOptional()
  @IsString()
  public content?: string;

  @Expose()
  @IsEnum(Region)
  @Transform(({ value }) => Region.getByCode(value), { toClassOnly: true })
  public region: Region;

  @Expose()
  @IsEnum(Category)
  @Transform(({ value }) => Category.getByCode(value), { toClassOnly: true })
  public category: Category;

  @Expose()
  @IsEnum(Duration)
  @Transform(({ value }) => Duration.getByCode(value), { toClassOnly: true })
  public duration: Duration;

  @Expose()
  @IsEnum(RecruitMember)
  @Transform(({ value }) => RecruitMember.getByCode(value), { toClassOnly: true })
  public recruitMember: RecruitMember;

  public static async create(payload: CreatePostPort): Promise<CreatePostAdapter> {
    const adapter: CreatePostAdapter = plainToInstance(CreatePostAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
