-- CreateTable
CREATE TABLE `recipes` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `ingredients` MEDIUMTEXT NOT NULL,
    `steps` MEDIUMTEXT NOT NULL,
    `loves` INTEGER NOT NULL DEFAULT 0,
    `url` VARCHAR(255) NOT NULL,
    `category` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
