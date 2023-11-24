import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoriesService } from '../service/stories.service';
import { CreateStoryRequestDto } from '../dto/request.dto';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  create(@Body() createStoryRequestDto: CreateStoryRequestDto) {
    return this.storiesService.create(createStoryRequestDto);
  }

  // @Post()
  // create(@Body() createStoryDto: CreateStoryDto) {
  //   return this.storiesService.create(createStoryDto);
  // }

  // @Get()
  // findAll() {
  //   return this.storiesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.storiesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
  //   return this.storiesService.update(+id, updateStoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.storiesService.remove(+id);
  // }
}
