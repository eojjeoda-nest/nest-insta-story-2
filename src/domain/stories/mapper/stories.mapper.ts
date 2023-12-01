import { RequestStoryDto } from '../dto/stories.dto';
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
}
