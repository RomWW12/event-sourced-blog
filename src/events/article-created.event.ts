import { IEvent } from '@nestjs/cqrs';

export class ArticleCreatedEvent implements IEvent {
  private aggregateId: string;
  private name: string;
  private content: string;

  constructor(payload: { aggregateId: string; name: string; content: string }) {
    this.aggregateId = payload.aggregateId;
    this.name = payload.name;
    this.content = payload.content;
  }
}
