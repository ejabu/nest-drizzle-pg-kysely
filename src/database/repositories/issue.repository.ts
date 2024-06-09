import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  InferAttributes,
  InferCreationAttributes,
  Transaction,
} from 'sequelize';
import { Repository } from 'sequelize-typescript';

import { Issue } from '../models';

type NewIssues = InferCreationAttributes<Issue>;

@Injectable()
export class IssueRepository {
  constructor(
    @InjectModel(Issue)
    private issue: Repository<Issue>,
  ) {}

  async create(payload: NewIssues, transaction?: Transaction) {
    return this.issue.create(payload, { transaction });
  }

  async bulkUpsert(data: NewIssues[], transaction?: Transaction) {
    return this.issue.bulkCreate(data, {
      ignoreDuplicates: true,
      returning: true,
      transaction,
    });
  }
}
