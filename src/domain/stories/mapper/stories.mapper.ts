import { RequestStoryDto, ResponseStoryDto } from '../dto/stories.dto';
import { Story } from '../entities/story.entity';

export class StoriesMapper {
  toEntity(req: RequestStoryDto) {
    const story = new Story();
    story.title = req.title;
    story.image = req.image;
    story.author = req.author;
    story.validTime = req.validTime;
    story.hashtags = req.hashtags.toString();
    return story;
  }
  toResponseDto(story: Story) {
    const responseDto = new ResponseStoryDto();
    responseDto.id = story.id;
    responseDto.author = story.author;
    responseDto.title = story.title;
    responseDto.image = story.image;
    responseDto.createdAt = story.createdAt;
    responseDto.hashtags = story.hashtags.split(',');
    return responseDto;
  }
}
