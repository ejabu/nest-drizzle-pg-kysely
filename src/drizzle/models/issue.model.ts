import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const issue = pgTable('issue', {
  id: text('id').primaryKey(),
  workoutId: uuid('workoutId'),
  source: varchar('source', { length: 30 }).notNull(),
  sourceId: varchar('sourceId', { length: 255 }).notNull(),
  title: text('title').notNull(),
  severity: integer('severity').notNull(),
  confidence: integer('confidence').notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  issueCategory: varchar('issueCategory', { length: 255 }).notNull(),
  issueSubcategory: varchar('issueSubcategory', { length: 255 }).notNull(),
  cve_info: text('cveInfo'),
  description: text('description'),
  risk: text('risk'),
  mitigation: text('mitigation'),
  exploit: text('exploit'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt'),
  mappingUpdatedAt: timestamp('mappingUpdatedAt'),
});

export type Issues = typeof issue.$inferSelect;
export type NewIssues = typeof issue.$inferInsert;