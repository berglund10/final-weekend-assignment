import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { publicVotersTable } from "../representative/schema";

export const electionTable = pgTable("election", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  description: varchar().notNull(),
  done: boolean().notNull().default(false),
});

export const alternativesTable = pgTable("alternatives", {
  alternative_id: integer().primaryKey().generatedAlwaysAsIdentity(), // ÄNDRA TILL VANLIGT ID SEN
  name: varchar().notNull(),
  election_id: integer()
    .notNull()
    .references(() => electionTable.id),
});

export const votesTable = pgTable("votes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    voter_id: integer().notNull().references(() => publicVotersTable.id),
    election_id: integer().notNull().references(() => electionTable.id),
    alternative_id: integer().notNull().references(() => alternativesTable.alternative_id)  });

