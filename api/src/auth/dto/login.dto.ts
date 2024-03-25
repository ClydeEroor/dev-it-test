import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@test.aa', description: 'email' })
  @IsEmail()
  @MinLength(5)
  email: string;

  @ApiProperty({ example: '123456', description: 'password' })
  @IsString()
  @MinLength(6)
  password: string;
}
