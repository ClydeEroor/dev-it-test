import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Public } from '@common/decorators';
import { Article } from '@prisma/client';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrUpdateArticleDto, GetArticleDto } from './dto';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @ApiOperation({
    summary: 'Article by id',
    description: 'Get articles by id',
  })
  @ApiResponse({ status: 200, description: 'article successfully found' })
  @ApiSecurity('JWT-auth')
  @Get(':id')
  async getArticle(@Param('id', ParseUUIDPipe) id: string) {
    return this.articleService.findOne(id);
  }

  @ApiOperation({
    summary: 'get',
    description: 'Get articles by params',
  })
  @ApiResponse({ status: 200, description: 'user login successful' })
  @Public()
  @Get()
  async getArticles(@Query() query: GetArticleDto) {
    return this.articleService.getArticleByQuery(
      query.page,
      query.limit,
      query.datePub,
      query.contentOrTitle,
    );
  }

  @ApiOperation({
    summary: 'create',
    description: 'Create article (only for auth user!)',
  })
  @ApiResponse({ status: 201, description: 'article create successful' })
  @ApiSecurity('JWT-auth')
  @Post()
  async createArticle(@Body() dto: CreateOrUpdateArticleDto): Promise<Article> {
    return this.articleService.createArticle(dto);
  }

  @ApiOperation({
    summary: 'update',
    description: 'Update article by id (only for auth user!)',
  })
  @ApiResponse({ status: 200, description: 'article update successful' })
  @ApiSecurity('JWT-auth')
  @Put(':id')
  async updateArticle(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateOrUpdateArticleDto,
  ): Promise<Article> {
    return this.articleService.updateArticle(id, dto);
  }

  @ApiOperation({
    summary: 'delete',
    description: 'Delete article by id (only for auth user!)',
  })
  @ApiResponse({ status: 204, description: 'article deleted successful' })
  @ApiSecurity('JWT-auth')
  @Delete(':id')
  async deleteArticleById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Article> {
    return this.articleService.deleteArticle(id);
  }
}
