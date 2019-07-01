import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import ArticleDTO from './articles/article.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/articles')
  getArticles(): ArticleDTO {
    return {
      name: 'toto',
      content: 'My first ever article',
    };
  }
}
