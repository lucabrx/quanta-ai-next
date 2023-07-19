import { InferModel } from 'drizzle-orm';
import {  mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core'

export const User = mysqlTable(
    "User",
    {
        id: varchar("id", { length: 191 }).primaryKey().notNull(),
        created_at: timestamp("created_at").notNull().defaultNow(),
        updated_at: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
    }
);

export type UserType = InferModel<typeof User, "select">;