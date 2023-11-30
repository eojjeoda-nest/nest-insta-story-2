import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Story } from './entity/story.entity';
import { MoreThan, Repository } from 'typeorm';
import { Hashtag } from '../hashtag/entity/hashtag.entity';
import { StoryMapper } from './dto/story.mapper.dto';
import { StoryPaginationDto } from './dto/story-pagination.dto';
import { ReadStoryResponseDto } from './dto/read-story-response.dto';

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

    const uniqueHashtags = Array.from(new Set(createStoryDto.hashtags));

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

    const savedStory: Story = await this.storyRepository.save(story);

    // 매퍼를 사용하여 응답 객체 생성
    return StoryMapper.entityToResponse(savedStory);
  }

  /**
   * 스토리 조회 API:
   * 스토리를 조회하는 시점으로부터`12시간 | 24시간 이전`에 생성된 스토리만 조회할 수 있다.
   * 스토리 조회 시, `해시태그`의 정보를 함께 조회할 수 있다.
   */
  async findStories({
    page,
    limit,
  }: StoryPaginationDto): Promise<ReadStoryResponseDto> {
    // 페이지와 리미트 값이 유효한지 검사
    if (page < 1) {
      throw new BadRequestException('페이지 번호는 1 이상이어야 합니다.');
    }
    if (limit < 1) {
      throw new BadRequestException('리미트는 1 이상이어야 합니다.');
    }

    const currentTime = new Date();
    const [stories, total] = await this.storyRepository.findAndCount({
      where: {
        expirationTime: MoreThan(currentTime),
      },
      relations: ['hashtags'],
      order: {
        id: 'DESC',
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // 요청된 페이지가 실제 페이지 수를 초과한 경우 에러 처리
    const totalPages = Math.ceil(total / limit);
    if (page > totalPages) {
      throw new BadRequestException(
        '요청된 페이지가 총 페이지 수를 초과했습니다.',
      );
    }

    // 매퍼를 사용하여 응답 객체 생성
    return StoryMapper.responseToPaginationArray(stories, total, page, limit);
  }
}
