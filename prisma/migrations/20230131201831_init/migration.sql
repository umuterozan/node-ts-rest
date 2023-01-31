-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `Content_menuId_fkey`;

-- AddForeignKey
ALTER TABLE `content` ADD CONSTRAINT `content_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
