import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Article, Prisma } from '@prisma/client';
import { CreateOrUpdateArticleDto } from './dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(id: string) {
    const article = await this.prismaService.article.findFirst({
      where: { id: id },
    });
    if (!article) {
      throw new BadRequestException('No such article exists');
    }
    return article;
  }

  async deleteArticle(id: string): Promise<Article> {
    await this.findOne(id);
    return this.prismaService.article.delete({
      where: { id: id },
    });
  }

  async updateArticle(id: string, article: CreateOrUpdateArticleDto) {
    await this.findOne(id);

    return this.prismaService.article.update({
      where: {
        id: id,
      },
      data: {
        title: article.title,
        link: article.link,
        pubDate: new Date(),
        content: article.content,
        videoLink: article.videoLink,
      },
    });
  }

  async createArticle(article: CreateOrUpdateArticleDto): Promise<Article> {
    const checkTitle = await this.prismaService.article.findUnique({
      where: { title: article.title },
    });
    if (checkTitle) {
      throw new BadRequestException(
        'An article with the same title already exists',
      );
    }

    return this.prismaService.article.create({
      data: {
        title: article.title,
        link: article.link,
        pubDate: new Date(),
        content: article.content,
        videoLink: article.videoLink,
      },
    });
  }

  async getArticleByQuery(
    page?: string,
    limit?: string,
    datePub?: 'asc' | 'desc',
    contentOrTitle?: string,
  ) {
    const pageInt = page ? parseInt(page, 10) : 1;
    const limitInt = limit ? parseInt(limit, 10) : 5;

    const where: Prisma.ArticleWhereInput = {};

    if (contentOrTitle) {
      where.OR = [
        { title: { contains: contentOrTitle, mode: 'insensitive' } },
        { content: { contains: contentOrTitle, mode: 'insensitive' } },
      ];
    }

    const countOfArticles = await this.prismaService.article.count({ where });

    const articlesByParams = await this.prismaService.article.findMany({
      where,
      skip: (pageInt - 1) * limitInt,
      take: limitInt,
      orderBy: { pubDate: datePub },
    });

    if (!articlesByParams) {
      throw new BadRequestException('Use correct params');
    }

    return { countOfArticles, items: articlesByParams };
  }
}
