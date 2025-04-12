CREATE TABLE `ttodo_post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(256),
	`createdById` text(255) NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`createdById`) REFERENCES `ttodo_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `created_by_idx` ON `ttodo_post` (`createdById`);--> statement-breakpoint
CREATE INDEX `name_idx` ON `ttodo_post` (`name`);--> statement-breakpoint
CREATE TABLE `ttodo_user` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255),
	`email` text(255) NOT NULL,
	`emailVerified` integer DEFAULT (unixepoch()),
	`password` text(255),
	`image` text(255)
);
