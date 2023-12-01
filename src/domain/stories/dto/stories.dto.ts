export class RequestStoryDto {
  readonly author: string;
  title: string;
  readonly image: string;
  readonly hashtags: string[];
  readonly validTime: number;
}

export class ResponseStoryDto {
  readonly id: number;
  readonly author: string;
  readonly title: string;
  readonly image: string;
  readonly hashtags: string[];
  readonly validTime: number;
  readonly createdAt: Date;
}
