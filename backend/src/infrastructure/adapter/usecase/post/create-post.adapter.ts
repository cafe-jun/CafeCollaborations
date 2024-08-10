import { UseCaseValidateAdapter } from '@core/common/adapter/usecase/usecase-validate.adapter';
import { DurationType } from '@core/common/enums/duration-type.enum';
import { RecruitMember } from '@core/common/enums/recruite-member.enum';
import { Region } from '@core/common/enums/region.enum';
import { CreatePostPort } from '@core/domain/post/port/usecase/post.port';
import { Exclude, Expose, plainToInstance } from 'class-transformer';
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

  @IsEnum(Region.getValues())
  public region: Region;

  @Expose()
  @IsOptional()
  @IsNumber()
  public imageId?: string;

  @Expose()
  @IsOptional()
  @IsString()
  public content?: string;

  @Expose()
  @IsString()
  category: string;

  @Expose()
  @IsEnum(DurationType.getValues())
  durationType: DurationType;

  @Expose()
  @IsEnum(RecruitMember.getValues())
  recruitMember: RecruitMember;

  public static async create(payload: CreatePostPort): Promise<CreatePostAdapter> {
    const adapter: CreatePostAdapter = plainToInstance(CreatePostAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
