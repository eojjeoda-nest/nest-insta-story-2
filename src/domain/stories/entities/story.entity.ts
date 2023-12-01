import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'Story' })
export class Story {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;
  @Column()
  @ApiProperty({ description: 'title' })
  title: string;
  @Column()
  @ApiProperty({ description: 'image' })
  image: string;
  @Column()
  @ApiProperty({ description: 'hashtags' })
  hashtags: string;
  @Column()
  @ApiProperty({ description: 'author' })
  author: string;
  @Column()
  @ApiProperty({ description: 'validTime' })
  validTime: number;
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;
  @Column()
  expireAt: Date;
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date | null;
}
