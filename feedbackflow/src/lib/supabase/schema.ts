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
  organizationId: uuid('organization_id').references(() => organization.id, { onDelete: 'cascade' }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull()
})

export const projectDashboard = pgTable("project_dashboard", {
  id: uuid("id").primaryKey().notNull(),
  userId: uuid("user_id").references(() => profile.id, {onDelete: 'cascade'}),
  project: uuid("project_id").references(() => projects.id, {onDelete: 'cascade'}),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull()
})

export const organization = pgTable('organization', {
  id:  uuid("id").primaryKey().notNull(),
  userId: uuid("user_id").references(() => profile.id, {onDelete: 'cascade'}),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull()
})

///////////////////////////// DASHBOARD USER REVIEW /////////////////////////////////////////
export const reviews = pgTable("review", {
  id: uuid("id").primaryKey().notNull(),
  userId: uuid("user_id").references(() => profile.id, {onDelete: 'cascade'}),
  project: uuid("project_id").references(() => projects.id, {onDelete: 'cascade'}),
  rating: integer("rating").notNull(),
  date: timestamp("date", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull()
})

///////////////////////////// DASHBOARD SURVEY /////////////////////////////////////////
// export const surveys = pgTable('surveys', {
//   id: serial('id').primaryKey(),
//   title: text('title').notNull(),
//   description: text('description'),
//   user: uuid('user').references(() => profile.id)
// })

export const questions = pgTable('questions', {
  id: uuid('id').notNull().primaryKey(),
  projectId: uuid('project_id').references(() => projects.id),
  questionText: text('question_text').notNull(),
  questionType: varchar('question_type', { length: 50 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull()
})

// options table for multiple choice questions
export const options = pgTable('options', {
  id: uuid('id').primaryKey().notNull(),
  questionId: uuid('question_id').references(() => questions.id),
  optionText: text('option_text').notNull()
})

export const responses = pgTable('responses', {
  id: uuid('id').primaryKey().notNull(),
  questionId: uuid('question_id').references(() => questions.id),
  responseDate: timestamp('response_date').defaultNow()
})

export const answers = pgTable('answers', {
  id: uuid('id').primaryKey().notNull(),
  responseId: uuid('response_id').references(() => responses.id),
  questionId: uuid('question_id').references(() => questions.id),
  answerText: text('answer_text'),
  booleanAnswer: boolean('boolean_answer'),
  integerAnswer: integer('integer_answer')
})


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
