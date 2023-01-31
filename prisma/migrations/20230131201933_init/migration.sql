/*
  Warnings:

  - Added the required column `slug` to the `content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `content` ADD COLUMN `slug` VARCHAR(50) NOT NULL;
