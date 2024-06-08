import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hello } from 'src/database/models/hello.model';
import { HelloRepository } from 'src/database/repositories/hello.repository';
import { HelloService } from './hello.service';
import { HelloController } from './hello.controller';

@Module({
  imports: [SequelizeModule.forFeature([Hello])],
  providers: [HelloService, HelloRepository],
  exports: [HelloService],
  controllers: [HelloController],
})
export class HelloModule {}
