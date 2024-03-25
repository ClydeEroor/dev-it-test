import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CookieDto {
  @ApiProperty({
    example: 'fa5e7f58-b098-4b1a-96d3-77fe4f7be165',
    description: 'refreshToken in cookie',
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
