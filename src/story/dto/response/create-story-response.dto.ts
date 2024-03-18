import { CreateStoryRequestDto } from '../request/create-story-request.dto';
import { Story } from '../../entities/story.entity';

export class CreateStoryResponseDto {
  id: number;
  createdAt: Date;
  validTime: number;
  title: string;
  author: string;
  image: string;
  hashtags: string[];

  public static fromEntity(entity: Story): CreateStoryResponseDto {
    const dto = new CreateStoryResponseDto();
    dto.id = entity.id;
    dto.createdAt = entity.createdAt;
    dto.validTime = entity.validTime;
    dto.title = entity.title;
    dto.author = entity.author;
    dto.image = entity.image;
    dto.hashtags = entity.hashtags;
    return dto;
  }
}