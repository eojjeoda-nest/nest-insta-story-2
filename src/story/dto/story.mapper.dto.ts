import { CreateStoryDto } from './create-story.dto';
import { Story } from '../entity/story.entity';

export class StoryMapper {
  dtoToEntity(createStoryDto: CreateStoryDto): Story {
    const story = new Story();
    story.title = createStoryDto.title;
    story.imageUrl = createStoryDto.imageUrl;
    story.nickname = createStoryDto.nickname;

    const currentTime = new Date();
    story.expirationTime = new Date(
      currentTime.getTime() + createStoryDto.expirationOption * 60 * 60 * 1000,
    ); // expirationOption은 12 또는 24

    return story;
  }
}
