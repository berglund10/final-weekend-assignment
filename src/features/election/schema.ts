import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const electionTable = pgTable("election", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  description: varchar().notNull(),
  done: boolean().notNull().default(false),
});

export const alternativesTable = pgTable("alternatives", {
    alternative_id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    election_id: integer()
      .notNull()
      .references(() => electionTable.id),
  });