import { CommonProjectCode } from '@core/common/enums/project.enum';
import { Controller, Get } from '@nestjs/common';

@Controller('common')
export class CommonController {
  @Get('')
  getProjectCode() {
    return CommonProjectCode.getAllProjectCode();
  }
}
