import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateOrUpdateArticleDto {
  @ApiProperty({ example: 'test-title', description: 'title' })
  @IsString({ message: 'must be a string' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: 'https://test-video.com', description: 'link' })
  @IsString({ message: 'must be a string' })
  @IsNotEmpty()
  @IsString()
  link: string;

  @ApiProperty({ example: 'test content', description: 'content' })
  @IsString({ message: 'must be a string' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(400)
  content: string;

  @ApiProperty({ example: 'https://test-video.com', description: 'video link' })
  @IsString({ message: 'must be a string' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  videoLink: string;
}
