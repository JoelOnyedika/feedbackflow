ALTER TABLE "questions" ALTER COLUMN "survey_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "responses" ALTER COLUMN "survey_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "surveys" ALTER COLUMN "project_id" SET DATA TYPE uuid;