/*
  Warnings:

  - Added the required column `brief` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `content` ADD COLUMN `brief` VARCHAR(50) NOT NULL,
    ADD COLUMN `content` TEXT NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `icon` VARCHAR(255) NOT NULL,
    ADD COLUMN `title` VARCHAR(255) NOT NULL;
