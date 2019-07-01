import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import ArticleDTO from './articles/article.dto';
import { Article } from './articles/article.entity';

@Controller('/articles')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getArticles(): Promise<ArticleDTO[]> {
    return this.appService.getAllArticles();
  }

  @Post()
  createArticle(@Body() articleDto: ArticleDTO): Promise<any> {
    const toto = this.appService.storeArticle(articleDto);
    return toto;
  }

  @Get(':id')
  getArticle(@Param('id') id: string): Promise<ArticleDTO> {
    return this.appService.getOneArticle(id);
  }
}
