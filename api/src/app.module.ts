import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './ormconfig';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), CatsModule],
})
export class AppModule {}
