import { QueryInterface, Sequelize } from 'sequelize';
import { Migration } from 'sequelize-cli';
import { DataType } from 'sequelize-typescript';

export default {
  up: async (queryInterface: QueryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'hello',
        {
          id: {
            type: DataType.UUID,
            primaryKey: true,
            allowNull: false,
            unique: true,
            defaultValue: Sequelize.literal('gen_random_uuid()'),
          },
          content: {
            type: DataType.TEXT,
            allowNull: false,
          },
          type: {
            type: DataType.ENUM('type1', 'type2', 'ip'),
            allowNull: false,
          },
          created_at: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
          updated_at: {
            type: DataType.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        },
        { transaction },
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('hello');
  },
} satisfies Migration;
