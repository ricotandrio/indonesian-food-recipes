/*
  Warnings:

  - The primary key for the `recipe_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `recipe_categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `recipes` DROP FOREIGN KEY `recipes_categoryId_fkey`;

-- AlterTable
ALTER TABLE `recipe_categories` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`name`);

-- AddForeignKey
ALTER TABLE `recipes` ADD CONSTRAINT `recipes_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `recipe_categories`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
