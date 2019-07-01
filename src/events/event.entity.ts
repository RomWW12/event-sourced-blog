import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    className: string;

    @Column('json')
    payload: object;

    @Column()
    aggregateId: string;

    @CreateDateColumn()
    createdAt: Date;
}
