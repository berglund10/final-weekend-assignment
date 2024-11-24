import {
  boolean,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { publicVotersTable } from "../representative/schema";

export const electionTable = pgTable("election", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  description: varchar().notNull(),
  done: boolean().notNull().default(false),
  start_date: timestamp().notNull().defaultNow(),
  end_date: timestamp(),
});

export const alternativesTable = pgTable("alternatives", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  election_id: integer()
    .notNull()
    .references(() => electionTable.id),
});

export const electionVotesTable = pgTable("election_votes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  voter_id: integer().references(() => publicVotersTable.id),
  election_id: integer()
    .notNull()
    .references(() => electionTable.id),
  alternative_id: integer()
    .notNull()
    .references(() => alternativesTable.id),
});

export const publicPreferencesVotesTable = pgTable("public_preferences", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  voter_id: integer().references(() => publicVotersTable.id),
  election_id: integer()
    .notNull()
    .references(() => electionTable.id),
  alternative_id: integer()
    .notNull()
    .references(() => alternativesTable.id),
});
