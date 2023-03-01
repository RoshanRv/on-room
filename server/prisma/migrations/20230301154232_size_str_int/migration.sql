/*
  Warnings:

  - You are about to alter the column `size` on the `Submission` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Submission` MODIFY `size` INTEGER NOT NULL;
