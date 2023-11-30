import { CreateStoryDto } from './create-story.dto';
import { Story } from '../entity/story.entity';
import { CreateStoryResponseDto } from './create-story-response.dto';
import { ReadStoryResponseDto } from './read-story-response.dto';

export class StoryMapper {
  static entityToResponse(story: Story): CreateStoryResponseDto {
    return {
      id: story.id,
      createdAt: story.createdAt,
      validTime: story.validTime,
      title: story.title,
      author: story.author,
      image: story.imageUrl,
      hashtags: story.hashtags.map((hashtag) => hashtag.hashtag),
    };
  }

  static responseToPaginationArray(
    stories: Story[],
    total: number,
    page?: number,
    limit?: number,
  ): ReadStoryResponseDto {
    const data = stories.map((story) => ({
      id: story.id,
      createdAt: story.createdAt,
      validTime: story.validTime,
      title: story.title,
      author: story.author,
      image: story.imageUrl,
      hashtags: story.hashtags.map((hashtag) => hashtag.hashtag),
    }));

    return {
      data,
      page,
      totalPage: Math.ceil(total / limit),
      limit,
    };
  }

  dtoToEntity(createStoryDto: CreateStoryDto): Story {
    const story = new Story();
    story.title = createStoryDto.title;
    story.imageUrl = createStoryDto.imageUrl;
    story.author = createStoryDto.author;
    story.validTime = createStoryDto.validTime;

    const currentTime = new Date();
    story.expirationTime = new Date(
      currentTime.getTime() + createStoryDto.validTime * 60 * 60 * 1000,
    ); // validTime은 12 또는 24

    return story;
  }
}
