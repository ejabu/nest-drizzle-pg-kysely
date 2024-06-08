import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  InferAttributes,
  Transaction,
  UpdateOptions,
  WhereOptions,
} from 'sequelize';
import { Repository } from 'sequelize-typescript';
import { HelloCreation, Hello } from '../models/hello.model';

@Injectable()
export class HelloRepository {
  constructor(
    @InjectModel(Hello)
    private hello: Repository<Hello>,
  ) {}

  async create(
    payload: HelloCreation,
    transaction?: Transaction,
  ): Promise<Hello> {
    return this.hello.create(payload, { transaction });
  }

  async findOne(where: WhereOptions<InferAttributes<Hello>>): Promise<Hello | null> {
    return this.hello.findOne({ where });
  }

  async findAll(where: WhereOptions<InferAttributes<Hello>>): Promise<Hello[]> {
    return this.hello.findAll({ where });
  }

  async update(
    values: Partial<InferAttributes<Hello>>,
    options: UpdateOptions<InferAttributes<Hello>>,
  ) {
    return this.hello.update(values, options);
  }

  async delete(where: WhereOptions<InferAttributes<Hello>>): Promise<number> {
    return this.hello.destroy({
      where,
    });
  }

  async bulkUpsert(data: HelloCreation[], transaction: Transaction) {
    return this.hello.bulkCreate(data, {
      ignoreDuplicates: true,
      returning: true,
      transaction,
    });
  }
}
