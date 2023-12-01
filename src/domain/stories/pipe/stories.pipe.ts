import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CreateStoriesPipe implements PipeTransform {
  async transform(value: any) {
    const { hashtags, validTime } = value;
    this.toValidateHashtags(hashtags);
    this.toValidateValidTime(validTime);
    return value;
  }
  // # 확인
  private toValidateHashtags(hashtags: string[]) {
    hashtags.map((hashtag) => {
      const isNumberSign = hashtag.charAt(0) === '#';
      if (!isNumberSign)
        throw new BadRequestException('해쉬태그가 #으로 시작하지 않음');
    });
  }

  // 12 | 24인지 확인
  private toValidateValidTime(validTime: number) {
    if (validTime !== 12 && validTime !== 24)
      throw new BadRequestException('validTime에는 12와 24만 올 수 있습니다.');
  }
}
