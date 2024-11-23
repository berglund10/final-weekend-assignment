import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
export const representativeTable = pgTable("representative", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});

export const publicVotersTable = pgTable("public_voters", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    representativeId: integer().notNull().references(() => representativeTable.id)
});