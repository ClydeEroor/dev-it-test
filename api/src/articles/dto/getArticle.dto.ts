import { IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetArticleDto {
  @ApiProperty({ required: false, default: '1' })
  @IsOptional()
  @IsString()
  page: string;

  @ApiProperty({ required: false, default: '4' })
  @IsOptional()
  @IsString()
  limit: string;

  @ApiProperty({ required: false, enum: ['asc', 'desc'] })
  @IsOptional()
  @IsIn(['asc', 'desc'], { message: 'datepub must be "asc" or "desc"' })
  datePub: 'asc' | 'desc';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contentOrTitle: string;
}
