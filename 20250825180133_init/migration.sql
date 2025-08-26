-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Word` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `letters` VARCHAR(191) NOT NULL,
    `syllables` VARCHAR(191) NOT NULL,
    `stress_silable` ENUM('OXYTONE', 'PAROXYTONE', 'PROPAROXYTONE', 'PREPROPAROXYTONE') NOT NULL,
    `audio_no_stress` VARCHAR(191) NOT NULL,
    `audio_with_stress` VARCHAR(191) NOT NULL,
    `speaker` BOOLEAN NOT NULL,

    UNIQUE INDEX `Word_letters_key`(`letters`),
    UNIQUE INDEX `Word_syllables_key`(`syllables`),
    UNIQUE INDEX `Word_audio_no_stress_key`(`audio_no_stress`),
    UNIQUE INDEX `Word_audio_with_stress_key`(`audio_with_stress`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_num` INTEGER NOT NULL,
    `answer` ENUM('CORRECT_1', 'CORRECT_2', 'INCORRECT') NOT NULL,
    `user_id` INTEGER NOT NULL,
    `word_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_word_id_fkey` FOREIGN KEY (`word_id`) REFERENCES `Word`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
