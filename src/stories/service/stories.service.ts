import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStoryRequestDto } from '../dto/request.dto';
import { StoryEntity } from '../entities/story.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { HashtagEntity } from '../entities/hashtag.entity';
import {
  CreateStoryResponseDto,
  getStoryPaginationResponseDto,
} from '../dto/response.dto';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(StoryEntity)
    private storyEntityRepository: Repository<StoryEntity>,
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  async create(CreateStoryRequestDto: CreateStoryRequestDto) {
    const { userId, title, author, hashtags, image, validTime } =
      CreateStoryRequestDto;

    const user = await this.userEntityRepository.findOne({
      where: { userId: userId },
    });

    // TODO: 요청한 유저가 없을 경우 => 클라이언트가 요청한 유저 id 가 없다는 것인데..
    // 클라이언트가 요청한 유저 id 가 없다는 것은 클라이언트가 잘못 보낸다는 것? 그러므로 400 에러를 보내줘야 하나?
    if (!user) throw new InternalServerErrorException();

    const hashtagsArray = hashtags?.map((hashtag) => {
      const hashtagEntity = new HashtagEntity();
      hashtagEntity.createHashtag(hashtag);
      return hashtagEntity;
    });

    const story = new StoryEntity();
    story.createStory(title, author, image, validTime, hashtagsArray, user);

    const savedStory = await this.storyEntityRepository.save(story);
    if (!savedStory) throw new InternalServerErrorException();

    // TODO: 이때 Mapper를 사용하면 될 것 같은데 맞을까?
    const data: CreateStoryResponseDto = {
      storyId: savedStory.storyId,
      createdAt: savedStory.createdAt,
      validTime: savedStory.validTime,
      title: savedStory.title,
      author: savedStory.author,
      image: savedStory.image,
      hashtags: savedStory.hashtags?.map((hashtag) => hashtag.hashtagName),
    };

    return data;
  }

  async getPage(page: number, limit: number) {
    // 유효기간이 지나지 않은 스토리만 가져온다.
    const stories = await this.storyEntityRepository
      .createQueryBuilder('story')
      .where('story.expireAt > :now', { now: new Date() })
      .orderBy('story.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
    // const stories = await this.storyEntityRepository.find({
    //   skip: (page - 1) * limit,
    //   take: limit,
    //   order: {
    //     createdAt: 'DESC',
    //   },
    // });

    // stories 총 개수를 가져온다.
    const storiesCount = await this.storyEntityRepository
      .createQueryBuilder('story')
      .where('story.expireAt > :now', { now: new Date() })
      .getCount();

    // TODO: 이때 Mapper를 사용하면 될 것 같은데 맞을까?
    const content: CreateStoryResponseDto[] = stories.map((story) => ({
      storyId: story.storyId,
      createdAt: story.createdAt,
      validTime: story.validTime,
      title: story.title,
      author: story.author,
      image: story.image,
      hashtags: story.hashtags?.map((hashtag) => hashtag.hashtagName),
    }));

    // TODO: 이때 Mapper를 사용하면 될 것 같은데 맞을까?
    const data: getStoryPaginationResponseDto = {
      content: content,
      page: page,
      limit: limit,
      totalPage: Math.ceil(storiesCount / limit),
    };

    return data;
  }
}
