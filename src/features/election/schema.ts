import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { publicVotersTable, representativeTable } from "../representative/schema";

export const electionTable = pgTable("election", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  description: varchar().notNull(),
  done: boolean().notNull().default(false),
});

export const alternativesTable = pgTable("alternatives", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  election_id: integer()
    .notNull()
    .references(() => electionTable.id),
});

export const votesTable = pgTable("votes", { //Kanske byta namn till public_chocies eller något
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    voter_id: integer().references(() => publicVotersTable.id),
    representative_id: integer().references(() => representativeTable.id),
    election_id: integer().notNull().references(() => electionTable.id),
    alternative_id: integer().notNull().references(() => alternativesTable.id)
});

