import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Catalog } from '../../catalog/catalog.entity';
import { AddIdToCatalogCommand } from '../implementations/add-it-to-catalog.command';

@CommandHandler(AddIdToCatalogCommand)
export class AddIdToCatalogHandler implements ICommandHandler<AddIdToCatalogCommand> {
  constructor(
    @InjectRepository(Catalog)
    private readonly catalogRepository: Repository<Catalog>,
  ) {}

  async execute(command: AddIdToCatalogCommand): Promise<Catalog> {
    const catalog = await this.catalogRepository.findOne(command.entityName) || { entityName: command.entityName, idList: [] }

    catalog.idList.push(command.id)
    return this.catalogRepository.save(catalog);
  }
}
