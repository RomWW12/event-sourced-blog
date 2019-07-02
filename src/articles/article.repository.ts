import { Injectable } from '@nestjs/common';
import { Article } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../events/event.entity';
import { ArticleEvents } from '../events/namespace';
import { Catalog } from '../catalog/catalog.entity';

const recreateEvent = (event: Event) => {
  return new (ArticleEvents as any)[event.className](event.payload);
}

@Injectable()
export class ArticleRepository {
  constructor(
    @InjectRepository(Event) private readonly eventRepository: Repository<Event>,
    @InjectRepository(Catalog) private readonly catalogRepository: Repository<Catalog>
    ) {}

  async findById(aggregateId: Article['id']): Promise<Article> {
    const articleHistory: Event[] = await this.eventRepository.find({ where: { aggregateId } });
    const articleHistoryEvents = articleHistory.map(recreateEvent);

    const article = new Article(); 
    article.loadFromHistory(articleHistoryEvents);

    return article;
  }

  async findAll(): Promise<Article[]> {
    const catalog: Catalog = await this.catalogRepository.findOne({ where: {entityName: 'article'}});

    return Promise.all(catalog.idList.map((id) => this.findById(id)));
  }
}
