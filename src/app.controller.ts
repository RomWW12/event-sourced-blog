import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import ArticleDTO from './articles/article.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/articles')
  getArticles(): Promise<ArticleDTO[]> {
    return this.appService.getAllArticles();
  }

  @Post('/articles')
  createArticle(@Body() articleDto: ArticleDTO): Promise<ArticleDTO> {
    return this.appService.storeArticle(articleDto);
  }
}
