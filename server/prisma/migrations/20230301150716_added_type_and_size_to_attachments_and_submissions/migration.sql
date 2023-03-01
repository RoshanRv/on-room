/*
  Warnings:

  - Added the required column `size` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Attachment` ADD COLUMN `size` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Submission` ADD COLUMN `size` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
