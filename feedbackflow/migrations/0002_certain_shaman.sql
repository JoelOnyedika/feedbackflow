ALTER TABLE "answers" ALTER COLUMN "question_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "responses" ALTER COLUMN "question_id" SET DATA TYPE uuid;