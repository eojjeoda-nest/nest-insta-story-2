import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CreateStoriesPipe implements PipeTransform {
  async transform(value: any) {
    const { hashtags, validTime } = value;
    const set = new Set<string>();
    this.toValidateHashtags(hashtags, set);
    this.toValidateValidTime(validTime);
    this.transformHashtagsWithOutDuplicate(value, set);
    return value;
  }
  // # 확인
  private toValidateHashtags(hashtags: string[], set: Set<string>) {
    hashtags.map((hashtag) => {
      const isNumberSign = hashtag.charAt(0) === '#';
      if (!isNumberSign)
        throw new BadRequestException('해쉬태그가 #으로 시작하지 않음');
      set.add(hashtag); // 검증된 해쉬태그를 set에 추가
    });
  }

  // 12 | 24인지 확인
  private toValidateValidTime(validTime: number) {
    if (validTime !== 12 && validTime !== 24)
      throw new BadRequestException('validTime에는 12와 24만 올 수 있습니다.');
  }

  // 중복된 해쉬태그 제거
  private transformHashtagsWithOutDuplicate(value: any, set: Set<string>) {
    value.hashtags = Array.from(set);
    return value;
  }
}
