-- CreateTable
CREATE TABLE `Chat` (
    `id` VARCHAR(191) NOT NULL,
    `user` VARCHAR(191) NOT NULL,
    `msg` VARCHAR(191) NOT NULL,
    `time` INTEGER NOT NULL,
    `roomId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
