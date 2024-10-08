import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CatLike } from './cats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatLike])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
