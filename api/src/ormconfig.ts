import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'cat-pinterest-api-pg',
  port: 5432,
  username: 'postgres',
  password: '1',
  database: 'support_lk_db',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true,
};
