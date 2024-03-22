import { Test, TestingModule } from '@nestjs/testing';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';
import { CreateStoryRequestDto } from './dto/request/create-story-request.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

describe('StoryController', () => {
  let controller: StoryController;
  let storyService: StoryService;

  beforeEach(async () => {
    const mockStoryService = {
      createStory: jest.fn(dto => {
        return {
          id: Date.now(),
          ...dto
        };
      }),
      getStories: jest.fn(dto => {
        return {
          data: [],
          page: dto.page,
          limit: dto.limit,
          totalCount: 0,
          totalPages: 0,
        };
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoryController],
      providers: [{ provide: StoryService, useValue: mockStoryService }],
    }).compile();

    controller = module.get<StoryController>(StoryController);
    storyService = module.get<StoryService>(StoryService);
  });

  describe('스토리 생성', () => {
    it('스토리를 생성하고 반환해야 함', async () => {
      const requestDto: CreateStoryRequestDto = {
        validTime: 24,
        title: 'test',
        author: 'Author',
        image: 'http://example.com/image.jpg',
        hashtags: ['#test', '#nestjs'],
      };

      expect(await controller.createStory(requestDto)).toEqual({
        id: expect.any(Number),
        ...requestDto,
      });
      expect(storyService.createStory).toHaveBeenCalledWith(requestDto);
    });
  });

  describe('스토리 목록 조회', () => {
    it('스토리 목록과 페이지네이션 결과를 반환해야 함', async () => {
      const requestDto: PaginationDto = {
        page: 1,
        limit: 10,
      };

      expect(await controller.getStories(requestDto)).toEqual({
        data: [],
        page: requestDto.page,
        limit: requestDto.limit,
        totalCount: 0,
        totalPages: 0,
      });
      expect(storyService.getStories).toHaveBeenCalledWith(requestDto);
    });
  });
});
