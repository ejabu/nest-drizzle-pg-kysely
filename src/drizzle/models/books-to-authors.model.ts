import {
  integer,
  pgTable,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { User } from './user.model';
import { Book } from './book.model';

export const BooksToAuthors = pgTable("books_to_authors", {
  authorId: integer("author_id").references(() => User.id),
  bookId: integer("book_id").references(() => Book.id),
}, (table) => {
  return { 
    pk: primaryKey({ columns: [table.bookId, table.authorId] }),
    pkWithCustomName: primaryKey({ name: 'custom_name', columns: [table.bookId, table.authorId] }),
  };
});
