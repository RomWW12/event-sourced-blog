import { Injectable } from '@nestjs/common';
import ArticleDTO from './articles/article.dto';
import { Article } from './articles/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor( @InjectRepository(Article) private readonly articleRepository: Repository<Article>) {}

  async storeArticle(articleDto: ArticleDTO): Promise<Article> {
    const article = this.articleRepository.create(articleDto);

    return this.articleRepository.save(article);
  }

  async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }
}
