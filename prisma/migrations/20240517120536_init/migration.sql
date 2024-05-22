-- CreateTable
CREATE TABLE `User` (
    `idx` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'USER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserBook` (
    `user_idx` INTEGER NOT NULL,
    `isbn` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `publisher` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `category_name` VARCHAR(191) NULL,
    `total_page` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(50) NULL,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`user_idx`, `isbn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `user_idx` INTEGER NULL,
    `isbn` VARCHAR(191) NULL,
    `idx` INTEGER NOT NULL AUTO_INCREMENT,
    `page` INTEGER NOT NULL,
    `title` VARCHAR(255) NULL,
    `content` TEXT NOT NULL,
    `type` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `open_type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `post_idx` INTEGER NULL,
    `user_idx` INTEGER NOT NULL,
    `idx` INTEGER NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Follow` (
    `follower_idx` INTEGER NOT NULL,
    `followee_idx` INTEGER NOT NULL,

    PRIMARY KEY (`follower_idx`, `followee_idx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Likes` (
    `postIdx` INTEGER NOT NULL,
    `userIdx` INTEGER NOT NULL,

    PRIMARY KEY (`postIdx`, `userIdx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bookmarks` (
    `postIdx` INTEGER NOT NULL,
    `userIdx` INTEGER NOT NULL,

    PRIMARY KEY (`postIdx`, `userIdx`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
