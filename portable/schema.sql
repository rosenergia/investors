CREATE TABLE `trade_cases` (
	`id` text PRIMARY KEY NOT NULL,
	`author` text NOT NULL,
	`desk` text NOT NULL,
	`payload` text NOT NULL,
	`stage` text NOT NULL,
	`task` text DEFAULT '' NOT NULL,
	`assignee` text DEFAULT '' NOT NULL,
	`due` text DEFAULT '' NOT NULL,
	`created` integer NOT NULL,
	`revision` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `desk_invites` (
	`owner` text PRIMARY KEY NOT NULL,
	`token` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `desk_invites_token_unique` ON `desk_invites` (`token`);