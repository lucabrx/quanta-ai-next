import { InferModel } from 'drizzle-orm'
import {
  mysqlTable,
  timestamp,
  varchar,
  mysqlEnum,
} from 'drizzle-orm/mysql-core'

export const User = mysqlTable('User', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
  created_at: timestamp('created_at').notNull().defaultNow(),
  updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
})

export type UserType = InferModel<typeof User, 'select'>

export const Conversation = mysqlTable('Conversation', {
  id: varchar('id', { length: 191 }).primaryKey().notNull(),
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
  text: varchar('text', { length: 191 }).notNull(),
  role: mysqlEnum('message_type', ['user', 'bot']).notNull(),
  user_id: varchar('user_id', { length: 191 }).notNull(),
})
