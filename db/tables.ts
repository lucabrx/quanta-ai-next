import { InferModel } from 'drizzle-orm'
import {
  mysqlTable,
  timestamp,
  varchar,
  mysqlEnum, text,
} from 'drizzle-orm/mysql-core'



export const User = mysqlTable('User', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})

export type UserType = InferModel<typeof User, 'select'>

export const Conversation = mysqlTable('Conversation', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  title: varchar('title', { length: 191 }),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  user_id: varchar('user_id', { length: 191 }).notNull(),
})

export type ConversationType = InferModel<typeof Conversation, 'select'>

export const Message = mysqlTable('Message', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  conversation_id: varchar('conversation_id', { length: 191 }).notNull(),
  text: text('text').notNull(),
  role: mysqlEnum('message_type', ['user', 'system']).notNull(),
  user_id: varchar('user_id', { length: 191 }).notNull(),
})
