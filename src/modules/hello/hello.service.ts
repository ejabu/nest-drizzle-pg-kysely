import { Injectable } from '@nestjs/common';
import { Hello } from 'src/database/models/hello.model';
import { HelloRepository } from 'src/database/repositories/hello.repository';

@Injectable()
export class HelloService {
  constructor(private helloRepository: HelloRepository) {}

  async findHellos(): Promise<Hello[]> {
    return this.helloRepository.findAll({});
  }
}
