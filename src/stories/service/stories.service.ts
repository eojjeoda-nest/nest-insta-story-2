import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
    @InjectRepository(HashtagEntity)
    private hashtagEntityRepository: Repository<HashtagEntity>,
  ) {}

  async create(
    CreateStoryRequestDto: CreateStoryRequestDto,
  ): Promise<CreateStoryResponseDto> {
    const { userId, title, author, hashtags, image, validTime } =
      CreateStoryRequestDto;

    const user = await this.userEntityRepository.findOne({
      where: { userId: userId },
    });

    // TODO: 요청한 유저가 없을 경우 => 클라이언트가 요청한 유저 id 가 없다는 것인데..
    // 클라이언트가 요청한 유저 id 가 없다는 것은 클라이언트가 잘못 보낸다는 것? 그러므로 400 에러를 보내줘야 하나?
    // 답변: 400번 에러는 클라이언트가 잘못 보낸 경우에 사용한다. ( 결국 요청이 잘못된 경우 서버에서도 값을 못 찾기 때문에 )
    if (!user) throw new NotFoundException();

    const hashtagsArray = await Promise.all(
      hashtags?.map(async (hashtagName) => {
        // 기존 DB에 hashtag가 있으면 가져오고, 없으면 새로 생성한다.
        const data = await this.hashtagEntityRepository.findOne({
          where: { hashtagName: hashtagName },
        });

        return data || new HashtagEntity(hashtagName);
      }),
    );

    // 이 방식은 hashtags가 계속 DB에 쌓인다. ( 중복이 발생한다. )
    // const hashtagsArray = hashtags?.map((hashtagName) => {
    //   return new HashtagEntity(hashtagName);
    // });

    const story = new StoryEntity(
      title,
      author,
      image,
      validTime,
      hashtagsArray,
      user,
    );

    const savedStory = await this.storyEntityRepository.save(story);
    // 이 에러는 동작을 안할거다. 위 코드 에러가 발생하면 에러는 위에서 바로 잡히니까
    // 할거면 try catch로 잡자 ( 메세지를 커스텀으로 보내고 싶을 때 등등 )
    if (!savedStory) throw new InternalServerErrorException();

    // TODO: 이때 Mapper를 사용하면 될 것 같은데 맞을까?
    // type이 명확해서 괜찮은 것 같다. 다만 조금 귀찮을 뿐
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

    // 이 방법도 있지만 결과는 다르다! 상속 받는것을 어떻게 제거해줘야 할까 고민
    // plainToInstance(CreateStoryResponseDto, data);

    // TODO: plainToInstance를 사용해서 1차적으로 해결했지만, hashtages반환 커스텀을 어떻게 줘야할까?
    // return plainToInstance(CreateStoryResponseDto, savedStory, {
    //   excludePrefixes: ['deletedAt', 'updatedAt'],
    // });
  }

  async getPage(
    page: number,
    limit: number,
  ): Promise<getStoryPaginationResponseDto> {
    // 유효기간이 지나지 않은 스토리만 가져온다.
    const [stories, totalCount] = await this.storyEntityRepository
      .createQueryBuilder('story')
      // leftJoinAndSelect을 사용해야 hashtages를 가져올 수 있다. 잘 모르겟다 아직
      .leftJoinAndSelect('story.hashtags', 'hashtags')
      .where('story.expireAt > :now', { now: new Date() })
      .orderBy('story.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    // 이 방법도 단순하게 쿼리를 날릴 때 사용하고, 조금 복잡하거나 join이 필요할 때는 위 방법을 사용한다.
    //   const stories = await this.storyEntityRepository.find({
    //   skip: (page - 1) * limit,
    //   take: limit,
    //   order: {
    //     createdAt: 'DESC',
    //   },
    // });
    console.log(stories);

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
      totalPage: Math.ceil(totalCount / limit),
    };

    return data;
  }
}
