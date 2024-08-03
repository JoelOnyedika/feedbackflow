CREATE TABLE IF NOT EXISTS "organization" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"id" uuid PRIMARY KEY NOT NULL,
	"project_id" uuid,
	"rating" integer NOT NULL,
	"date" timestamp with time zone DEFAULT now() NOT NULL,
	"comment" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "surveys" (
	"id" uuid PRIMARY KEY NOT NULL,
	"project_id" integer NOT NULL,
	"type" varchar(50) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DROP TABLE "options";--> statement-breakpoint
DROP TABLE "review";--> statement-breakpoint
ALTER TABLE "answers" DROP CONSTRAINT "answers_response_id_responses_id_fk";
--> statement-breakpoint
ALTER TABLE "questions" DROP CONSTRAINT "questions_project_id_projects_id_fk";
--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "question_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "answers" ALTER COLUMN "question_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "questions" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "responses" ALTER COLUMN "question_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "responses" ALTER COLUMN "question_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "answers" ADD COLUMN "value" text NOT NULL;--> statement-breakpoint
ALTER TABLE "answers" ADD COLUMN "options" jsonb;--> statement-breakpoint
ALTER TABLE "answers" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "organization_id" uuid;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "survey_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "text" text NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "type" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "options" jsonb;--> statement-breakpoint
ALTER TABLE "questions" ADD COLUMN "updated_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "responses" ADD COLUMN "survey_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "responses" ADD COLUMN "answer" text NOT NULL;--> statement-breakpoint
ALTER TABLE "responses" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "widgets" ADD COLUMN "project_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_organization_id_organization_id_fk" FOREIGN KEY ("organization_id") REFERENCES "organization"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "questions" ADD CONSTRAINT "questions_survey_id_surveys_id_fk" FOREIGN KEY ("survey_id") REFERENCES "surveys"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "responses" ADD CONSTRAINT "responses_survey_id_surveys_id_fk" FOREIGN KEY ("survey_id") REFERENCES "surveys"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "widgets" ADD CONSTRAINT "widgets_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "answers" DROP COLUMN IF EXISTS "response_id";--> statement-breakpoint
ALTER TABLE "answers" DROP COLUMN IF EXISTS "answer_text";--> statement-breakpoint
ALTER TABLE "answers" DROP COLUMN IF EXISTS "boolean_answer";--> statement-breakpoint
ALTER TABLE "answers" DROP COLUMN IF EXISTS "integer_answer";--> statement-breakpoint
ALTER TABLE "questions" DROP COLUMN IF EXISTS "project_id";--> statement-breakpoint
ALTER TABLE "questions" DROP COLUMN IF EXISTS "question_text";--> statement-breakpoint
ALTER TABLE "questions" DROP COLUMN IF EXISTS "question_type";--> statement-breakpoint
ALTER TABLE "responses" DROP COLUMN IF EXISTS "response_date";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organization" ADD CONSTRAINT "organization_user_id_profile_id_fk" FOREIGN KEY ("user_id") REFERENCES "profile"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "surveys" ADD CONSTRAINT "surveys_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
