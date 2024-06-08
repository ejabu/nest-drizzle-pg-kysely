import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'issue', timestamps: false })
export class Issue extends Model<
  InferAttributes<Issue>,
  InferCreationAttributes<Issue>
> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    unique: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  vulnerability_id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  source_id: number;

  @Column({
    type: DataType.ENUM(
      'qualys',
      'nessus',
      'invicti',
      'ms-defender-cloud',
      'ms-defender-endpoint',
      'cycognito',
      'tenable-io',
      'tenable-sc',
      'cisco-workload',
    ),
    allowNull: false,
  })
  origin_source: string;

  @Column({
    type: DataType.ENUM(
      'qualys',
      'nessus',
      'invicti',
      'ms-defender-cloud',
      'ms-defender-endpoint',
      'cycognito',
      'tenable-io',
      'tenable-sc',
      'cisco-workload',
    ),
    allowNull: false,
  })
  engine_source: string;

  @Column({ type: DataType.TEXT })
  external_id: string;

  @Column({ type: DataType.BOOLEAN })
  ssl_encrypted: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  severity: number;

  @Column({ type: DataType.STRING })
  cve_info: string;

  @Column({ type: DataType.INTEGER })
  confidence: number;

  @Column({ type: DataType.STRING })
  category: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.TEXT })
  risk: string;

  @Column({ type: DataType.TEXT })
  mitigation: string;

  @Column({ type: DataType.STRING })
  exploit: string;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: new Date(),
  })
  updated_at: Date;
}
