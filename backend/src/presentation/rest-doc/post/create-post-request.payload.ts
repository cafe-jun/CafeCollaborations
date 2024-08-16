import { Category } from '@core/common/enums/category.enum';
import { Duration } from '@core/common/enums/duration-type.enum';
import { PostStatus } from '@core/common/enums/post-status.enum';
import { RecruitMember } from '@core/common/enums/recruite-member.enum';
import { Region } from '@core/common/enums/region.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RestCreatePostRequestPayload {
  @ApiProperty({ type: 'string' })
  public title: string;

  @ApiProperty({ type: 'number', default: 1, required: false })
  public imageId: string;

  @ApiProperty({ type: 'string', required: false })
  public content: string;

  @ApiProperty({ type: 'string', enum: Category.getValues(), default: Category.ACCOMMODATION_CODE.code, required: false })
  public category: Category;

  @ApiProperty({ type: 'enum', enum: Region.getValues(), default: Region.Seoul.code, required: false })
  public region: Region;

  @ApiProperty({ type: 'enum', enum: Duration.getValues(), default: Duration.LessThanOneMonth.code, required: false })
  public duration: Duration;

  @ApiProperty({ type: 'enum', enum: RecruitMember.getValues(), default: RecruitMember.OneToFive.code, required: false })
  public recruitMember: RecruitMember;

  @ApiProperty({ type: 'enum', enum: PostStatus, required: false })
  public status: PostStatus;
}
