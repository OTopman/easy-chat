import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';


@Entity({name: 'messages'})
export class Message{
    @PrimaryGeneratedColumn()
    id?: number;

    @PrimaryColumn()
    uuid: string;

    @Column()
    sender: string;

    @Column()
    message: string;

    @Column()
    createdAt: string;
}