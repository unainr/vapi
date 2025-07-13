import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// Learning Partner Table
export const learning_partner = pgTable("learning_partner", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 256 }),
  subject: varchar("subject", { length: 356 }),
  teaching_subject: varchar("teaching_subject", { length: 356 }),
  voice_type: varchar("voice_type"),
  speaking_style: varchar("speaking_style", { length: 356 }),
  duration: integer("duration"),
  author:varchar("author"),
  created_at: timestamp("created_at").defaultNow(),
});

// Session History Table
export const session_history = pgTable("session_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  learning_partner_id: uuid("learning_partner_id")
    .notNull()
    .references(() => learning_partner.id, { onDelete: "cascade" }),
  user_id: varchar("user_id"),
  created_at: timestamp("created_at").defaultNow(),
});
