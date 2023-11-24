import { Injectable } from '@nestjs/common';
import { CreateStoryRequestDto } from '../dto/request.dto';
import { StoryEntity } from '../entities/story.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { HashtagEntity } from '../entities/hashtag.entity';
import { CreateStoryResponseDto } from '../dto/response.dto';

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

    const hashtagsArray = hashtags.map((hashtag) => {
      const hashtagEntity = new HashtagEntity();
      hashtagEntity.hashtagName = hashtag;
      return hashtagEntity;
    });

    const story = new StoryEntity();
    story.title = title;
    story.author = author;
    story.image = image;
    story.validTime = validTime;
    story.creator = user;
    story.hashtags = hashtagsArray;
    story.expireAt = new Date(Date.now() + validTime * 60 * 60 * 1000);

    try {
      const savedStory = await this.storyEntityRepository.save(story);

      const data: CreateStoryResponseDto = {
        storyId: savedStory.storyId,
        createdAt: savedStory.createdAt,
        validTime: savedStory.validTime,
        title: savedStory.title,
        author: savedStory.author,
        image: savedStory.image,
        hashtags: savedStory.hashtags.map((hashtag) => hashtag.hashtagName),
      };

      return data;
    } catch (err) {
      console.log(err);
    }
  }

  // findAll() {
  //   return `This action returns all stories`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} story`;
  // }

  // update(id: number, updateStoryDto: UpdateStoryDto) {
  //   return `This action updates a #${id} story`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} story`;
  // }
}
