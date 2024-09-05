import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('likes')
  getAllLikes() {
    return this.catsService.getAllLikes();
  }

  @Post('likes')
  addLike(@Body('cat_id') cat_id: string) {
    return this.catsService.addLike(cat_id);
  }

  @Delete('likes/:cat_id')
  removeLike(@Param('cat_id') cat_id: string) {
    return this.catsService.removeLike(cat_id);
  }
}
