CREATE TABLE `ttodo_task` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text(255) NOT NULL,
	`task` text(255) NOT NULL,
	`dueDate` integer NOT NULL,
	`priority` text(255),
	`completedAt` integer,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`userId`) REFERENCES `ttodo_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `user_id_idx` ON `ttodo_task` (`userId`);--> statement-breakpoint
CREATE INDEX `task_idx` ON `ttodo_task` (`task`);