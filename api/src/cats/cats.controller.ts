import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('likes')
  getAllLikes(@Query('page') page = 1, @Query('limit') limit = 15) {
    return this.catsService.getAllLikes(Number(page), Number(limit));
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
