export class StoryDto {
  storyId: number;

  title: string;

  author: string;

  image: string;

  validTime: number;

  expireAt: Date;

  hashtags: string[];

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date | null;
}
