import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entity/story.entity';
import { Repository } from 'typeorm';
import { Hashtag } from '../hashtag/entity/hashtag.entity';
import { StoryMapper } from './dto/story.mapper.dto';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Story)
    private readonly storyRepository: Repository<Story>,
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
    private readonly storyMapper: StoryMapper,
  ) {}

  /**
   * 스토리 생성 API:
   * 프론트엔드 관점에서 스토리에는 제목, 이미지, 해시태그, 작성자 이름이 포함되어 구성된어야한다.
   * 스토리를 생성할 때, 스토리의 유효기간 12시간 | 24시간 을 설정할 수 있다.
   * 작성자 이름의 경우, 현재 로그인한 유저의 이름을 가져온다고 가정한다.
   * 해시태그의 경우, #을 포함한 문자열로 구성되어야하고, 중복시 하나의 해시태그로 인식한다.
   */
  async createStory(createStoryDto: CreateStoryDto) {
    const story: Story = this.storyMapper.dtoToEntity(createStoryDto);

    const hashtags = createStoryDto.hashtags
      .split(' ')
      .filter((tag) => tag.startsWith('#')) // '#'으로 시작하는 태그만 필터링
      .map((tag) => tag.trim()); // 공백 제거
    const uniqueHashtags = Array.from(new Set(hashtags));

    story.hashtags = await Promise.all(
      uniqueHashtags.map(async (tag) => {
        let hashtag = await this.hashtagRepository.findOne({
          where: { hashtag: tag },
        });
        if (!hashtag) {
          hashtag = new Hashtag();
          hashtag.hashtag = tag;
          await this.hashtagRepository.save(hashtag);
        }
        return hashtag;
      }),
    );

    return this.storyRepository.save(story);
  }
}
