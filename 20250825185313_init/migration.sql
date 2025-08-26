/*
  Warnings:

  - You are about to drop the column `question_num` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `syllables` on the `Word` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Word_syllables_key` ON `Word`;

-- AlterTable
ALTER TABLE `Question` DROP COLUMN `question_num`;

-- AlterTable
ALTER TABLE `Word` DROP COLUMN `syllables`;
