import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'issue', timestamps: false })
export class Issue extends Model<
  InferAttributes<Issue>,
  InferCreationAttributes<Issue>
> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    unique: true,
    field: 'id',
  })
  id: string;

  @Column({
    type: DataType.UUID,
    field: 'workout_id',
  })
  workoutId?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  source: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'source_id',
  })
  sourceId: string;

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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  confidence: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'issue_category',
  })
  issueCategory: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'issue_subcategory',
  })
  issueSubcategory: string;

  @Column({ type: DataType.STRING, field: 'cve_info' })
  cveInfo?: string;

  @Column({ type: DataType.TEXT })
  description?: string;

  @Column({ type: DataType.TEXT })
  risk?: string;

  @Column({ type: DataType.TEXT })
  mitigation?: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt?: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt?: Date;
}
