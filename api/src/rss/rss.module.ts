import { Module } from '@nestjs/common';
import { RssService } from './rss.service';

@Module({
  providers: [RssService],
  exports: [RssService],
  controllers: [],
})
export class RssModule {}
