import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  Reference,
  integer,
  pgEnum,
  varchar,
  jsonb,
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
  bgColor: text('bg_color').notNull(),
  description: text('description').notNull(),
  organizationId: uuid('organization_id').references(() => organization.id, { onDelete: 'cascade' }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull()
})

// export const projectDashboard = pgTable("project_dashboard", {
//   id: uuid("id").primaryKey().notNull(),
//   userId: uuid("user_id").references(() => profile.id, {onDelete: 'cascade'}),
//   project: uuid("project_id").references(() => projects.id, {onDelete: 'cascade'}),
//   createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull()
// })

export const organization = pgTable('organization', {
  id:  uuid("id").primaryKey().notNull(),
  userId: uuid("user_id").references(() => profile.id, {onDelete: 'cascade'}),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull()
})

///////////////////////////// DASHBOARD USER REVIEW /////////////////////////////////////////
export const reviews = pgTable("reviews", {
  id: uuid("id").primaryKey().notNull(),
  //userId: uuid("user_id").references(() => profile.id, {onDelete: 'cascade'}),
  project: uuid("project_id").references(() => projects.id, {onDelete: 'cascade'}),
  rating: integer("rating").notNull(),
  date: timestamp("date", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull()
})

///////////////////////////// DASHBOARD SURVEY /////////////////////////////////////////

export const surveys = pgTable('surveys', {
  id: uuid('id').primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id),
  type: varchar('type', { length: 50 }).notNull(), // '5_star' or 'less_than_5_star'
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow()
});


export const questions = pgTable('questions', {
  id: uuid('id').primaryKey(),
  surveyId: uuid('survey_id').notNull().references(() => surveys.id),
  text: text('text').notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'multiple_choice', 'rating', etc.
  options: jsonb('options'), // For storing multiple choice options
  //order: integer('order').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const answers = pgTable('answers', {
  id: uuid('id').primaryKey(),
  questionId: uuid('question_id').notNull().references(() => questions.id),
  value: text('value').notNull(),
  options: jsonb('options'),
  createdAt: timestamp('created_at').defaultNow()
});

export const responses = pgTable('responses', {
  id: uuid('id').primaryKey(),
  surveyId: uuid('survey_id').notNull().references(() => surveys.id),
  questionId: uuid('question_id').notNull().references(() => questions.id),
  answer: text('answer').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});


export const widgets = pgTable('widgets', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id').references(() => profile.id).notNull(),
  project: uuid("project_id").references(() => projects.id, {onDelete: 'cascade'}),
  widgetType: varchar('widget_type', { length: 50 }).notNull(), // 'cyber' or 'exit'
  text: text('text').notNull(),
  font: varchar('font', { length: 50 }).notNull(),
  textColor: varchar('text_color', { length: 7 }).notNull(), // Assuming HEX color code
  textStyle: varchar('text_style', { length: 10 }).notNull(), // 'normal', 'bold', 'italic'
  textSize: varchar('text_size', { length: 10 }).notNull(), // 'small', 'medium', 'large'
  backgroundColor: varchar('background_color', { length: 7 }).notNull(), // Assuming HEX color code
  backgroundSize: varchar('background_size', { length: 50 }).notNull(),
  position: varchar('position', { length: 10 }).notNull(), // 'right', 'left', 'top', 'bottom'
  hideDuration: integer('hide_duration'), // Number of days to hide the widget
  additionalOptions: jsonb('additional_options'), // For any other future options
});
