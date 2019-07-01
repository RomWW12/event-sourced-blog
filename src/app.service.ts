import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandBus } from '@nestjs/cqrs';

import { Repository } from 'typeorm';

import ArticleDTO from './articles/article.dto';
import { Article } from './articles/article.entity';
import { CreateArticleCommand } from './commands/implementations/article-created.command';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,

    private readonly commandBus: CommandBus,
  ) {}

  async storeArticle(articleDto: ArticleDTO): Promise<Article> {
    const createArticleCommand = new CreateArticleCommand(articleDto);

    return this.commandBus.execute(createArticleCommand);
  }

  async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  async getOneArticle(id: string): Promise<Article> {
    return this.articleRepository.findOne(id);
  }
 }
