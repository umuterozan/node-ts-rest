-- DropForeignKey
ALTER TABLE `content` DROP FOREIGN KEY `content_menuId_fkey`;

-- AddForeignKey
ALTER TABLE `Content` ADD CONSTRAINT `Content_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
