import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import * as Parser from 'rss-parser';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class RssService implements OnModuleInit {
  private readonly logger = new Logger(RssService.name);
  private readonly parser: Parser;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.parser = new Parser();
  }

  async parseFeed(url: string) {
    try {
      return this.parser.parseURL(url);
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(
        'Failed to fetch feed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async parseRssArticles(): Promise<string> {
    const articles = await this.parseFeed(
      this.configService.get('RSS_FEED_URL'),
    );
    for (const elem of articles.items) {
      const existingArticle = await this.prismaService.article.findUnique({
        where: {
          title: elem.title,
        },
      });
      if (!existingArticle) {
        await this.prismaService.article.create({
          data: {
            title: elem.title,
            link: elem.link,
            pubDate: elem.isoDate,
            content: elem.content,
            videoLink: elem.guid,
          },
        });
      }
    }
    if (!articles.ttl) {
      throw new InternalServerErrorException("Can't get parse interval time");
    }
    return articles.ttl;
  }

  async parseRss() {
    let interval =
      Number(this.configService.get('START_PARSE_RSS_AFTER_SECONDS', 5)) * 1000;

    setTimeout(async () => {
      //get interval witch named as ttl in obj rssIntervalParse
      const rssIntervalParse = await this.parseRssArticles();
      // change interval
      if (rssIntervalParse) {
        interval = Number(rssIntervalParse) * 60 * 1000;
      } else {
        interval = 15 * 1000;
      }
      // start parse rss
      setInterval(async () => {
        await this.parseRssArticles();
      }, interval);
    }, interval);
  }

  async onModuleInit() {
    try {
      await this.parseRss();
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException('Error parse RSS');
    }
  }
}
