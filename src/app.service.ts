import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandBus } from '@nestjs/cqrs';

import { Repository } from 'typeorm';

import ArticleDTO from './articles/article.dto';
import { Article } from './articles/article.entity';
import { ArticleRepository as CustomArticleRepository } from './articles/article.repository';
import { CreateArticleCommand } from './commands/implementations/article-created.command';

@Injectable()
export class AppService {
  constructor(
    private readonly customArticleRepository: CustomArticleRepository,

    private readonly commandBus: CommandBus,
  ) {}

  async storeArticle(articleDto: ArticleDTO): Promise<Article> {
    const createArticleCommand = new CreateArticleCommand(articleDto);

    return this.commandBus.execute(createArticleCommand);
  }

  async getAllArticles(): Promise<Article[]> {
    return this.customArticleRepository.findAll();
  }

  async getOneArticle(id: string): Promise<Article> {
    return this.customArticleRepository.findById(id);
  }
 }
