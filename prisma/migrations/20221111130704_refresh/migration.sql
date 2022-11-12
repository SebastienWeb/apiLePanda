/*
  Warnings:

  - You are about to drop the column `published` on the `post` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email,name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `post` DROP COLUMN `published`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `title` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `bio` LONGTEXT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `profile`;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_name_key` ON `User`(`email`, `name`);
