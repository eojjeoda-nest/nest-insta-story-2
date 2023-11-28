export class PageDto<T> {
  content: T;
  page: number;
  totalPage: number;
  limit: number;
}
