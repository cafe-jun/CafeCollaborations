import { IsString } from 'class-validator';

export class FindUserRequestDto {
  @IsString()
  email: string;
}
