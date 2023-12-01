import { RequestStoryDto } from '../dto/stories.dto';
import { Story } from '../entities/story.entity';
import { BadRequestException } from '@nestjs/common';

export class StoriesMapper {
  toEntity(req: RequestStoryDto) {
    const story = new Story();
    story.title = req.title;
    story.image = req.image;
    story.author = req.author;
    story.validTime = req.validTime;

    this.validateHashtags(req.hashtags);
    const hashtagsToString = req.hashtags.toString(); // 문자열로 변환
    story.hashtags = hashtagsToString;
    return story;
  }

  validateHashtags(hashtags: string[]) {
    hashtags.map((hashtag) => {
      const isNumberSign = hashtag.charAt(0) === '#';
      if (!isNumberSign) throw new BadRequestException('문자열 아님');
    });
  }
}
