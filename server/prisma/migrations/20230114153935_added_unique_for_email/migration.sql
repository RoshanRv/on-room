/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `img` VARCHAR(191) NOT NULL DEFAULT 'https://img.freepik.com/free-icon/user_318-790139.jpg?w=2000';

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
