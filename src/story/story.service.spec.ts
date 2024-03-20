import { Test, TestingModule } from '@nestjs/testing';
import { StoryService } from './story.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../common/dto/pagination.dto';

describe('StoryService', () => {
  let service: StoryService;
  let mockRepository: Partial<Repository<Story>>;

  beforeEach(async () => {
    mockRepository = {
      save: jest.fn().mockImplementation(dto => Promise.resolve({ id: 1, ...dto })),
      createQueryBuilder: jest.fn().mockReturnValue({
        where: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[new Story(), new Story()], 20]),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoryService,
        {
          provide: getRepositoryToken(Story),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<StoryService>(StoryService);
  });

  describe('스토리 생성', () => {
    it('성공적으로 스토리를 생성하고 생성된 스토리를 반환해야 함', async () => {
      const createStoryDto = {
        title: 'Test Story',
        author: 'Author Name',
        image: 'image_url.jpg',
        hashtags: ['hashtag1', 'hashtag2'],
        validTime: 24,
      };

      const result = await service.createStory(createStoryDto);

      expect(mockRepository.save).toHaveBeenCalledWith(createStoryDto);
      expect(result).toHaveProperty('id', 1);
      expect(result.title).toEqual(createStoryDto.title);
      expect(result.author).toEqual(createStoryDto.author);
    });
  });

  describe('스토리 목록 조회', () => {
    it('페이지네이션 결과와 함께 스토리 목록을 반환해야 함', async () => {
      const paginationDto: PaginationDto = { page: 1, limit: 10 };

      const result = await service.getStories(paginationDto);

      expect(result.data).toHaveLength(2);
      expect(result.page).toEqual(paginationDto.page);
      expect(result.limit).toEqual(paginationDto.limit);
      expect(result.totalCount).toEqual(20);
      expect(result.totalPages).toEqual(2);
      expect(mockRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });
});
