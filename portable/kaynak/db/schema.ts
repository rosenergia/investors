import {sqliteTable, text, integer} from "drizzle-orm/sqlite-core";
export const invitations=sqliteTable("desk_invites",{owner:text("owner").primaryKey(),token:text("token").notNull().unique()});
export const cases=sqliteTable("trade_cases",{
 id:text("id").primaryKey(), author:text("author").notNull(), desk:text("desk").notNull(), payload:text("payload").notNull(), stage:text("stage").notNull(), task:text("task").notNull().default(""), assignee:text("assignee").notNull().default(""), due:text("due").notNull().default(""), created:integer("created").notNull(), revision:integer("revision").notNull().default(1)
});
