DROP TABLE "project_dashboard";--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "bg_color" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "description" text NOT NULL;