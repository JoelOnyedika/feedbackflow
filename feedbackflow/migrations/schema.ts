import { pgTable, foreignKey, pgEnum, uuid, text, timestamp, varchar, jsonb, integer } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const keyStatus = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const keyType = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn', 'phone'])
export const oneTimeTokenType = pgEnum("one_time_token_type", ['confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])
export const equalityOp = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])


export const organization = pgTable("organization", {
	id: uuid("id").primaryKey().notNull(),
	userId: uuid("user_id").references(() => profile.id, { onDelete: "cascade" } ),
	name: text("name").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const profile = pgTable("profile", {
	id: uuid("id").primaryKey().notNull(),
	email: text("email"),
	username: text("username"),
	profileImg: text("profile_img"),
	planName: text("plan_name").default('Free'),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const projectDashboard = pgTable("project_dashboard", {
	id: uuid("id").primaryKey().notNull(),
	userId: uuid("user_id").references(() => profile.id, { onDelete: "cascade" } ),
	projectId: uuid("project_id").references(() => projects.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const projects = pgTable("projects", {
	id: uuid("id").primaryKey().notNull(),
	userId: uuid("user_id").references(() => profile.id, { onDelete: "cascade" } ),
	name: text("name").notNull(),
	organizationId: uuid("organization_id").references(() => organization.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const questions = pgTable("questions", {
	id: uuid("id").primaryKey().notNull(),
	surveyId: uuid("survey_id").notNull().references(() => surveys.id),
	text: text("text").notNull(),
	type: varchar("type", { length: 50 }).notNull(),
	options: jsonb("options"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const responses = pgTable("responses", {
	id: uuid("id").primaryKey().notNull(),
	surveyId: uuid("survey_id").notNull().references(() => surveys.id),
	questionId: uuid("question_id").notNull().references(() => questions.id),
	answer: text("answer").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});

export const reviews = pgTable("reviews", {
	id: uuid("id").primaryKey().notNull(),
	projectId: uuid("project_id").references(() => projects.id, { onDelete: "cascade" } ),
	rating: integer("rating").notNull(),
	date: timestamp("date", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	comment: text("comment").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const subscriptionPlan = pgTable("subscription_plan", {
	id: uuid("id").primaryKey().notNull(),
	planName: text("plan_name").default('Free'),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const surveys = pgTable("surveys", {
	id: uuid("id").primaryKey().notNull(),
	projectId: uuid("project_id").notNull().references(() => projects.id),
	type: varchar("type", { length: 50 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
});

export const userSubscription = pgTable("user_subscription", {
	id: uuid("id").primaryKey().notNull(),
	userId: uuid("user_id").references(() => profile.id, { onDelete: "cascade" } ).references(() => subscriptionPlan.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const widgets = pgTable("widgets", {
	id: uuid("id").primaryKey().notNull(),
	userId: uuid("user_id").notNull().references(() => profile.id),
	projectId: uuid("project_id").references(() => projects.id, { onDelete: "cascade" } ),
	widgetType: varchar("widget_type", { length: 50 }).notNull(),
	text: text("text").notNull(),
	font: varchar("font", { length: 50 }).notNull(),
	textColor: varchar("text_color", { length: 7 }).notNull(),
	textStyle: varchar("text_style", { length: 10 }).notNull(),
	textSize: varchar("text_size", { length: 10 }).notNull(),
	backgroundColor: varchar("background_color", { length: 7 }).notNull(),
	backgroundSize: varchar("background_size", { length: 50 }).notNull(),
	position: varchar("position", { length: 10 }).notNull(),
	hideDuration: integer("hide_duration"),
	additionalOptions: jsonb("additional_options"),
});

export const answers = pgTable("answers", {
	id: uuid("id").primaryKey().notNull(),
	questionId: uuid("question_id").notNull().references(() => questions.id),
	value: text("value").notNull(),
	options: jsonb("options"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
});