import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import ArticleDTO from './articles/article.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/articles')
  getArticles(): ArticleDTO {
    return {
      name: 'toto',
      content: 'My first ever article',
    };
  }

  @Post('/articles')
  createArticle(@Body() articleDto: ArticleDTO): Promise<ArticleDTO> {
    return this.appService.storeArticle(articleDto);
  }
}
