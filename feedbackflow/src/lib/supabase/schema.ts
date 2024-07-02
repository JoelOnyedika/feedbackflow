import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  Reference,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";


export const profile = pgTable("profile", {
  id: uuid("id").primaryKey().notNull(),
  email: text("email"),
  username: text("username"),
  profileImg: text("profile_img"),
  subcriptionPlan: text('plan_name').default('Free'),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
})

export const subscriptionPlan = pgTable('subscription_plan', {
  id: uuid("id").primaryKey().notNull(),
  planName: text('plan_name').default('Free'),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
})

export const userSubcription = pgTable("user_subscription", {
  id: uuid("id").primaryKey().notNull(),
  userId: uuid("user_id").references(() => profile.id, {onDelete: 'cascade'}),
  planId: uuid("user_id").references(() => subscriptionPlan.id, {onDelete: 'cascade'}),  
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
})

///////////////////////////// DASHBOARD PROJECTS SCHEMA /////////////////////////////////////////
export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().notNull(),
  userId: uuid("user_id").references(() => profile.id, {onDelete: 'cascade'}),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull()
})

export const projectDashboard = pgTable("project_dashboard", {
  id: uuid("id").primaryKey().notNull(),
  userId: uuid("user_id").references(() => profile.id, {onDelete: 'cascade'}),
  project: uuid("project_id").references(() => projects.id, {onDelete: 'cascade'}),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull()
})

///////////////////////////// DASHBOARD USER REVIEW /////////////////////////////////////////
export const reviews = pgTable("review", {
  id: uuid("id").primaryKey().notNull(),
  userId: uuid("user_id").references(() => profile.id, {onDelete: 'cascade'}),
  rating: integer("rating").notNull(),
  date: timestamp("date", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull()
})