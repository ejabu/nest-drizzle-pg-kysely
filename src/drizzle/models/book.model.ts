import {
  pgTable,
  serial,
  text,
  varchar,
} from 'drizzle-orm/pg-core';

export const Book = pgTable("book", {
  id: serial("id").primaryKey(),
  name: text("name"),
  issueCategory: varchar('issue_category', { length: 255 }).notNull(),
});
