import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  Model,
  Column,
  Table,
  PrimaryKey,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

export type HelloCreation = InferCreationAttributes<
  Hello,
  {
    omit: 'id' | 'created_at' | 'updated_at';
  }
>;

@Table({ tableName: 'hello' })
export class Hello extends Model<InferAttributes<Hello>, HelloCreation> {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, autoIncrement: true })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @CreatedAt
  @Column({ type: DataType.DATE, defaultValue: new Date() })
  created_at: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, defaultValue: new Date() })
  updated_at: Date;
}
