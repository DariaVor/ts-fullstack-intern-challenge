import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CatLike } from './cats.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatLike)
    private catLikeRepository: Repository<CatLike>,
  ) {}

  async getAllLikes(): Promise<CatLike[]> {
    return this.catLikeRepository.find();
  }

  async addLike(cat_id: string): Promise<CatLike> {
    const like = this.catLikeRepository.create({ cat_id });
    return this.catLikeRepository.save(like);
  }

  async removeLike(cat_id: string): Promise<void> {
    await this.catLikeRepository.delete({ cat_id });
  }
}
