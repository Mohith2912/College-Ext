-- CreateTable
CREATE TABLE `User` (
    `id` CHAR(36) NOT NULL,
    `email` VARCHAR(320) NOT NULL,
    `name` VARCHAR(120) NULL,
    `sessionVersion` INTEGER NOT NULL DEFAULT 0,
    `passwordHash` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` TEXT NULL,
    `activeTermId` CHAR(36) NULL,
    `preferences` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_deletedAt_createdAt_id_idx`(`deletedAt`, `createdAt`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Account` (
    `id` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Account_userId_idx`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` CHAR(36) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_expires_idx`(`userId`, `expires`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `id` CHAR(36) NOT NULL,
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    INDEX `VerificationToken_expires_idx`(`expires`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RateLimitBucket` (
    `id` CHAR(36) NOT NULL,
    `key` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 0,
    `resetAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `RateLimitBucket_key_key`(`key`),
    INDEX `RateLimitBucket_resetAt_idx`(`resetAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organization` (
    `id` CHAR(36) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `name` VARCHAR(180) NOT NULL,
    `description` TEXT NULL,
    `allowedEmailDomains` JSON NOT NULL,
    `verificationPolicyVersion` VARCHAR(191) NOT NULL DEFAULT '1',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Organization_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrganizationMembership` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `role` ENUM('STUDENT', 'VERIFIED_STUDENT', 'CONTENT_EDITOR', 'REVIEWER', 'ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'STUDENT',
    `revokedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `OrganizationMembership_organizationId_role_createdAt_id_idx`(`organizationId`, `role`, `createdAt`, `id`),
    UNIQUE INDEX `OrganizationMembership_userId_organizationId_key`(`userId`, `organizationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AcademicTerm` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `slug` VARCHAR(120) NOT NULL,
    `name` VARCHAR(160) NOT NULL,
    `number` INTEGER NOT NULL,
    `description` TEXT NULL,
    `startsAt` DATETIME(3) NULL,
    `endsAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `AcademicTerm_organizationId_number_id_idx`(`organizationId`, `number`, `id`),
    UNIQUE INDEX `AcademicTerm_organizationId_slug_key`(`organizationId`, `slug`),
    UNIQUE INDEX `AcademicTerm_organizationId_number_key`(`organizationId`, `number`),
    UNIQUE INDEX `AcademicTerm_id_organizationId_key`(`id`, `organizationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `slug` VARCHAR(160) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NOT NULL,
    `subject` VARCHAR(100) NOT NULL,
    `code` VARCHAR(40) NULL,
    `status` ENUM('DRAFT', 'IN_REVIEW', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `Course_organizationId_status_deletedAt_title_id_idx`(`organizationId`, `status`, `deletedAt`, `title`, `id`),
    UNIQUE INDEX `Course_organizationId_slug_key`(`organizationId`, `slug`),
    UNIQUE INDEX `Course_id_organizationId_key`(`id`, `organizationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseOffering` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `termId` CHAR(36) NOT NULL,
    `courseId` CHAR(36) NOT NULL,
    `position` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `CourseOffering_organizationId_termId_position_id_idx`(`organizationId`, `termId`, `position`, `id`),
    UNIQUE INDEX `CourseOffering_termId_courseId_key`(`termId`, `courseId`),
    UNIQUE INDEX `CourseOffering_id_organizationId_key`(`id`, `organizationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enrollment` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `offeringId` CHAR(36) NOT NULL,
    `enrolledAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `revokedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `Enrollment_organizationId_offeringId_createdAt_id_idx`(`organizationId`, `offeringId`, `createdAt`, `id`),
    UNIQUE INDEX `Enrollment_userId_offeringId_key`(`userId`, `offeringId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseSelection` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `offeringId` CHAR(36) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `CourseSelection_organizationId_userId_idx`(`organizationId`, `userId`),
    UNIQUE INDEX `CourseSelection_userId_offeringId_key`(`userId`, `offeringId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Module` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `courseId` CHAR(36) NOT NULL,
    `slug` VARCHAR(160) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `description` TEXT NOT NULL,
    `position` INTEGER NOT NULL,
    `estimatedMinutes` INTEGER NOT NULL DEFAULT 15,
    `status` ENUM('DRAFT', 'IN_REVIEW', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `Module_organizationId_status_createdAt_id_idx`(`organizationId`, `status`, `createdAt`, `id`),
    UNIQUE INDEX `Module_courseId_slug_key`(`courseId`, `slug`),
    UNIQUE INDEX `Module_courseId_position_key`(`courseId`, `position`),
    UNIQUE INDEX `Module_id_organizationId_key`(`id`, `organizationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModuleSection` (
    `id` CHAR(36) NOT NULL,
    `moduleId` CHAR(36) NOT NULL,
    `slug` VARCHAR(160) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `position` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `ModuleSection_moduleId_slug_key`(`moduleId`, `slug`),
    UNIQUE INDEX `ModuleSection_moduleId_position_key`(`moduleId`, `position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Topic` (
    `id` CHAR(36) NOT NULL,
    `sectionId` CHAR(36) NOT NULL,
    `slug` VARCHAR(160) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `position` INTEGER NOT NULL,
    `summary` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Topic_sectionId_slug_key`(`sectionId`, `slug`),
    UNIQUE INDEX `Topic_sectionId_position_key`(`sectionId`, `position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NoteDocument` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `moduleId` CHAR(36) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `markdown` TEXT NOT NULL,
    `status` ENUM('DRAFT', 'IN_REVIEW', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `currentVersion` INTEGER NOT NULL DEFAULT 1,
    `license` VARCHAR(191) NOT NULL DEFAULT 'All rights reserved',
    `provenance` TEXT NOT NULL,
    `publishedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `NoteDocument_moduleId_key`(`moduleId`),
    INDEX `NoteDocument_organizationId_status_updatedAt_id_idx`(`organizationId`, `status`, `updatedAt`, `id`),
    UNIQUE INDEX `NoteDocument_id_organizationId_key`(`id`, `organizationId`),
    UNIQUE INDEX `NoteDocument_moduleId_organizationId_key`(`moduleId`, `organizationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NoteVersion` (
    `id` CHAR(36) NOT NULL,
    `noteDocumentId` CHAR(36) NOT NULL,
    `version` INTEGER NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `markdown` TEXT NOT NULL,
    `changeSummary` TEXT NULL,
    `authorId` CHAR(36) NULL,
    `checksum` VARCHAR(64) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `NoteVersion_noteDocumentId_createdAt_id_idx`(`noteDocumentId`, `createdAt`, `id`),
    UNIQUE INDEX `NoteVersion_noteDocumentId_version_key`(`noteDocumentId`, `version`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContentChunk` (
    `id` CHAR(36) NOT NULL,
    `noteVersionId` CHAR(36) NOT NULL,
    `position` INTEGER NOT NULL,
    `heading` VARCHAR(191) NULL,
    `anchor` VARCHAR(191) NULL,
    `text` TEXT NOT NULL,
    `tokenCount` INTEGER NOT NULL,
    `checksum` VARCHAR(64) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ContentChunk_noteVersionId_position_key`(`noteVersionId`, `position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GlossaryEntry` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `courseId` CHAR(36) NULL,
    `slug` VARCHAR(160) NOT NULL,
    `term` VARCHAR(180) NOT NULL,
    `definition` TEXT NOT NULL,
    `status` ENUM('DRAFT', 'IN_REVIEW', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `GlossaryEntry_organizationId_status_term_id_idx`(`organizationId`, `status`, `term`, `id`),
    UNIQUE INDEX `GlossaryEntry_organizationId_slug_key`(`organizationId`, `slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LearningResource` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `courseId` CHAR(36) NULL,
    `title` VARCHAR(200) NOT NULL,
    `url` TEXT NOT NULL,
    `description` TEXT NULL,
    `license` VARCHAR(191) NOT NULL,
    `status` ENUM('DRAFT', 'IN_REVIEW', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `LearningResource_organizationId_status_createdAt_id_idx`(`organizationId`, `status`, `createdAt`, `id`),
    UNIQUE INDEX `LearningResource_organizationId_url_key`(`organizationId`, `url`(500)),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConceptNode` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `courseId` CHAR(36) NOT NULL,
    `moduleId` CHAR(36) NULL,
    `topicId` CHAR(36) NULL,
    `slug` VARCHAR(160) NOT NULL,
    `label` VARCHAR(200) NOT NULL,
    `definition` TEXT NOT NULL,
    `status` ENUM('DRAFT', 'IN_REVIEW', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `ConceptNode_organizationId_courseId_status_id_idx`(`organizationId`, `courseId`, `status`, `id`),
    UNIQUE INDEX `ConceptNode_organizationId_slug_key`(`organizationId`, `slug`),
    UNIQUE INDEX `ConceptNode_id_organizationId_key`(`id`, `organizationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConceptEdge` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `sourceId` CHAR(36) NOT NULL,
    `targetId` CHAR(36) NOT NULL,
    `type` ENUM('PREREQUISITE', 'BUILDS_ON', 'RELATED_TO', 'CONTRASTS_WITH', 'APPLIES_TO', 'EXAMPLE_OF') NOT NULL,
    `explanation` TEXT NULL,
    `status` ENUM('DRAFT', 'IN_REVIEW', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `ConceptEdge_organizationId_status_targetId_idx`(`organizationId`, `status`, `targetId`),
    UNIQUE INDEX `ConceptEdge_sourceId_targetId_type_key`(`sourceId`, `targetId`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transcript` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `moduleId` CHAR(36) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `sourceLabel` VARCHAR(191) NOT NULL,
    `license` VARCHAR(191) NOT NULL,
    `provenance` TEXT NOT NULL,
    `visibility` ENUM('PRIVATE', 'VERIFIED_STUDENTS', 'ENROLLED_STUDENTS', 'PUBLIC') NOT NULL DEFAULT 'PRIVATE',
    `status` ENUM('DRAFT', 'IN_REVIEW', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `durationSeconds` INTEGER NULL,
    `storageKey` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `Transcript_organizationId_moduleId_status_createdAt_id_idx`(`organizationId`, `moduleId`, `status`, `createdAt`, `id`),
    UNIQUE INDEX `Transcript_id_organizationId_key`(`id`, `organizationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TranscriptChunk` (
    `id` CHAR(36) NOT NULL,
    `transcriptId` CHAR(36) NOT NULL,
    `position` INTEGER NOT NULL,
    `startSeconds` INTEGER NOT NULL,
    `endSeconds` INTEGER NOT NULL,
    `speaker` VARCHAR(191) NULL,
    `text` TEXT NOT NULL,
    `generatedMetadata` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `TranscriptChunk_transcriptId_startSeconds_idx`(`transcriptId`, `startSeconds`),
    UNIQUE INDEX `TranscriptChunk_transcriptId_position_key`(`transcriptId`, `position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InstitutionalVerification` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `email` VARCHAR(320) NOT NULL,
    `domain` VARCHAR(253) NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'REVOKED', 'EXPIRED') NOT NULL DEFAULT 'PENDING',
    `policyVersion` VARCHAR(191) NOT NULL,
    `verifiedAt` DATETIME(3) NULL,
    `expiresAt` DATETIME(3) NULL,
    `revokedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `InstitutionalVerification_organizationId_status_expiresAt_id_idx`(`organizationId`, `status`, `expiresAt`, `id`),
    UNIQUE INDEX `InstitutionalVerification_userId_organizationId_key`(`userId`, `organizationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bookmark` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `moduleId` CHAR(36) NOT NULL,
    `anchor` VARCHAR(200) NOT NULL DEFAULT '',
    `note` TEXT NULL,
    `tags` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `Bookmark_organizationId_userId_createdAt_id_idx`(`organizationId`, `userId`, `createdAt`, `id`),
    UNIQUE INDEX `Bookmark_userId_moduleId_anchor_key`(`userId`, `moduleId`, `anchor`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReadingProgress` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `moduleId` CHAR(36) NOT NULL,
    `percent` INTEGER NOT NULL DEFAULT 0,
    `lastAnchor` VARCHAR(191) NULL,
    `completedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ReadingProgress_organizationId_userId_updatedAt_id_idx`(`organizationId`, `userId`, `updatedAt`, `id`),
    UNIQUE INDEX `ReadingProgress_userId_moduleId_key`(`userId`, `moduleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudyActivity` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `moduleId` CHAR(36) NULL,
    `kind` VARCHAR(50) NOT NULL,
    `seconds` INTEGER NOT NULL DEFAULT 0,
    `metadata` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `StudyActivity_organizationId_userId_createdAt_id_idx`(`organizationId`, `userId`, `createdAt`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SearchDocument` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `type` ENUM('NOTE', 'TRANSCRIPT', 'GLOSSARY', 'RESOURCE') NOT NULL,
    `contentChunkId` CHAR(36) NULL,
    `transcriptChunkId` CHAR(36) NULL,
    `glossaryEntryId` CHAR(36) NULL,
    `resourceId` CHAR(36) NULL,
    `title` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `url` TEXT NOT NULL,
    `visibility` ENUM('PRIVATE', 'VERIFIED_STUDENTS', 'ENROLLED_STUDENTS', 'PUBLIC') NOT NULL DEFAULT 'PRIVATE',
    `sourceVersion` INTEGER NOT NULL DEFAULT 1,
    `indexedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `SearchDocument_organizationId_visibility_type_updatedAt_id_idx`(`organizationId`, `visibility`, `type`, `updatedAt`, `id`),
    UNIQUE INDEX `SearchDocument_contentChunkId_key`(`contentChunkId`),
    UNIQUE INDEX `SearchDocument_transcriptChunkId_key`(`transcriptChunkId`),
    UNIQUE INDEX `SearchDocument_glossaryEntryId_key`(`glossaryEntryId`),
    UNIQUE INDEX `SearchDocument_resourceId_key`(`resourceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Embedding` (
    `id` CHAR(36) NOT NULL,
    `searchDocumentId` CHAR(36) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `dimensions` INTEGER NOT NULL,
    `vector` JSON NULL,
    `checksum` VARCHAR(64) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Embedding_searchDocumentId_provider_model_key`(`searchDocumentId`, `provider`, `model`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AiConversation` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `scope` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `AiConversation_organizationId_userId_deletedAt_updatedAt_id_idx`(`organizationId`, `userId`, `deletedAt`, `updatedAt`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AiMessage` (
    `id` CHAR(36) NOT NULL,
    `conversationId` CHAR(36) NOT NULL,
    `role` ENUM('USER', 'ASSISTANT') NOT NULL,
    `text` TEXT NOT NULL,
    `provider` VARCHAR(191) NULL,
    `model` VARCHAR(191) NULL,
    `promptVersion` VARCHAR(191) NULL,
    `inputTokens` INTEGER NOT NULL DEFAULT 0,
    `outputTokens` INTEGER NOT NULL DEFAULT 0,
    `latencyMs` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `AiMessage_conversationId_createdAt_id_idx`(`conversationId`, `createdAt`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AiCitation` (
    `id` CHAR(36) NOT NULL,
    `messageId` CHAR(36) NOT NULL,
    `contentChunkId` CHAR(36) NULL,
    `transcriptChunkId` CHAR(36) NULL,
    `position` INTEGER NOT NULL,
    `quote` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AiCitation_messageId_position_key`(`messageId`, `position`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quiz` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `userId` CHAR(36) NULL,
    `courseId` CHAR(36) NOT NULL,
    `moduleId` CHAR(36) NULL,
    `title` VARCHAR(200) NOT NULL,
    `status` ENUM('DRAFT', 'IN_REVIEW', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `generated` BOOLEAN NOT NULL DEFAULT false,
    `provider` VARCHAR(191) NULL,
    `model` VARCHAR(191) NULL,
    `promptVersion` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `Quiz_organizationId_userId_status_createdAt_id_idx`(`organizationId`, `userId`, `status`, `createdAt`, `id`),
    UNIQUE INDEX `Quiz_id_organizationId_key`(`id`, `organizationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuizQuestion` (
    `id` CHAR(36) NOT NULL,
    `quizId` CHAR(36) NOT NULL,
    `position` INTEGER NOT NULL,
    `type` ENUM('SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'SHORT_ANSWER') NOT NULL DEFAULT 'SINGLE_CHOICE',
    `prompt` TEXT NOT NULL,
    `options` JSON NOT NULL,
    `answer` JSON NOT NULL,
    `explanation` TEXT NOT NULL,
    `points` INTEGER NOT NULL DEFAULT 1,
    `sourceNoteVersionId` CHAR(36) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `QuizQuestion_quizId_position_key`(`quizId`, `position`),
    UNIQUE INDEX `QuizQuestion_id_quizId_key`(`id`, `quizId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuizAttempt` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `quizId` CHAR(36) NOT NULL,
    `completedAt` DATETIME(3) NULL,
    `score` INTEGER NULL,
    `maximumScore` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `QuizAttempt_organizationId_userId_createdAt_id_idx`(`organizationId`, `userId`, `createdAt`, `id`),
    UNIQUE INDEX `QuizAttempt_id_quizId_key`(`id`, `quizId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuizResponse` (
    `id` CHAR(36) NOT NULL,
    `attemptId` CHAR(36) NOT NULL,
    `questionId` CHAR(36) NOT NULL,
    `quizId` CHAR(36) NOT NULL,
    `answer` JSON NOT NULL,
    `correct` BOOLEAN NULL,
    `awardedPoints` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `QuizResponse_attemptId_questionId_key`(`attemptId`, `questionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContentReview` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `reviewerId` CHAR(36) NULL,
    `noteDocumentId` CHAR(36) NULL,
    `transcriptId` CHAR(36) NULL,
    `quizId` CHAR(36) NULL,
    `aiMessageId` CHAR(36) NULL,
    `decision` ENUM('PENDING', 'APPROVED', 'CHANGES_REQUESTED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `comment` TEXT NULL,
    `reviewedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `ContentReview_organizationId_decision_createdAt_id_idx`(`organizationId`, `decision`, `createdAt`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContentIssue` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `userId` CHAR(36) NULL,
    `moduleId` CHAR(36) NOT NULL,
    `anchor` VARCHAR(191) NULL,
    `description` TEXT NOT NULL,
    `resolvedAt` DATETIME(3) NULL,
    `resolution` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `ContentIssue_organizationId_resolvedAt_createdAt_id_idx`(`organizationId`, `resolvedAt`, `createdAt`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ConsentRecord` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `userId` CHAR(36) NOT NULL,
    `purpose` VARCHAR(100) NOT NULL,
    `policyVersion` VARCHAR(191) NOT NULL,
    `granted` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ConsentRecord_organizationId_userId_purpose_createdAt_id_idx`(`organizationId`, `userId`, `purpose`, `createdAt`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FeatureSetting` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `key` VARCHAR(100) NOT NULL,
    `value` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `FeatureSetting_organizationId_key_key`(`organizationId`, `key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditLog` (
    `id` CHAR(36) NOT NULL,
    `organizationId` CHAR(36) NOT NULL,
    `actorId` CHAR(36) NULL,
    `action` VARCHAR(120) NOT NULL,
    `entityType` VARCHAR(80) NOT NULL,
    `entityId` VARCHAR(191) NULL,
    `metadata` JSON NOT NULL,
    `requestId` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `AuditLog_organizationId_createdAt_id_idx`(`organizationId`, `createdAt`, `id`),
    INDEX `AuditLog_organizationId_entityType_entityId_idx`(`organizationId`, `entityType`, `entityId`),
    INDEX `AuditLog_actorId_createdAt_idx`(`actorId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_activeTermId_fkey` FOREIGN KEY (`activeTermId`) REFERENCES `AcademicTerm`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrganizationMembership` ADD CONSTRAINT `OrganizationMembership_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrganizationMembership` ADD CONSTRAINT `OrganizationMembership_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcademicTerm` ADD CONSTRAINT `AcademicTerm_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseOffering` ADD CONSTRAINT `CourseOffering_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseOffering` ADD CONSTRAINT `CourseOffering_termId_organizationId_fkey` FOREIGN KEY (`termId`, `organizationId`) REFERENCES `AcademicTerm`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseOffering` ADD CONSTRAINT `CourseOffering_courseId_organizationId_fkey` FOREIGN KEY (`courseId`, `organizationId`) REFERENCES `Course`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_offeringId_organizationId_fkey` FOREIGN KEY (`offeringId`, `organizationId`) REFERENCES `CourseOffering`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseSelection` ADD CONSTRAINT `CourseSelection_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseSelection` ADD CONSTRAINT `CourseSelection_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseSelection` ADD CONSTRAINT `CourseSelection_offeringId_organizationId_fkey` FOREIGN KEY (`offeringId`, `organizationId`) REFERENCES `CourseOffering`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Module` ADD CONSTRAINT `Module_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Module` ADD CONSTRAINT `Module_courseId_organizationId_fkey` FOREIGN KEY (`courseId`, `organizationId`) REFERENCES `Course`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ModuleSection` ADD CONSTRAINT `ModuleSection_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Topic` ADD CONSTRAINT `Topic_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `ModuleSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NoteDocument` ADD CONSTRAINT `NoteDocument_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NoteDocument` ADD CONSTRAINT `NoteDocument_moduleId_organizationId_fkey` FOREIGN KEY (`moduleId`, `organizationId`) REFERENCES `Module`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NoteVersion` ADD CONSTRAINT `NoteVersion_noteDocumentId_fkey` FOREIGN KEY (`noteDocumentId`) REFERENCES `NoteDocument`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NoteVersion` ADD CONSTRAINT `NoteVersion_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentChunk` ADD CONSTRAINT `ContentChunk_noteVersionId_fkey` FOREIGN KEY (`noteVersionId`) REFERENCES `NoteVersion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GlossaryEntry` ADD CONSTRAINT `GlossaryEntry_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GlossaryEntry` ADD CONSTRAINT `GlossaryEntry_courseId_organizationId_fkey` FOREIGN KEY (`courseId`, `organizationId`) REFERENCES `Course`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningResource` ADD CONSTRAINT `LearningResource_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningResource` ADD CONSTRAINT `LearningResource_courseId_organizationId_fkey` FOREIGN KEY (`courseId`, `organizationId`) REFERENCES `Course`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConceptNode` ADD CONSTRAINT `ConceptNode_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConceptNode` ADD CONSTRAINT `ConceptNode_courseId_organizationId_fkey` FOREIGN KEY (`courseId`, `organizationId`) REFERENCES `Course`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConceptNode` ADD CONSTRAINT `ConceptNode_moduleId_organizationId_fkey` FOREIGN KEY (`moduleId`, `organizationId`) REFERENCES `Module`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConceptNode` ADD CONSTRAINT `ConceptNode_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `Topic`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConceptEdge` ADD CONSTRAINT `ConceptEdge_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConceptEdge` ADD CONSTRAINT `ConceptEdge_sourceId_organizationId_fkey` FOREIGN KEY (`sourceId`, `organizationId`) REFERENCES `ConceptNode`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConceptEdge` ADD CONSTRAINT `ConceptEdge_targetId_organizationId_fkey` FOREIGN KEY (`targetId`, `organizationId`) REFERENCES `ConceptNode`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transcript` ADD CONSTRAINT `Transcript_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transcript` ADD CONSTRAINT `Transcript_moduleId_organizationId_fkey` FOREIGN KEY (`moduleId`, `organizationId`) REFERENCES `Module`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TranscriptChunk` ADD CONSTRAINT `TranscriptChunk_transcriptId_fkey` FOREIGN KEY (`transcriptId`) REFERENCES `Transcript`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InstitutionalVerification` ADD CONSTRAINT `InstitutionalVerification_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InstitutionalVerification` ADD CONSTRAINT `InstitutionalVerification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bookmark` ADD CONSTRAINT `Bookmark_moduleId_organizationId_fkey` FOREIGN KEY (`moduleId`, `organizationId`) REFERENCES `Module`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReadingProgress` ADD CONSTRAINT `ReadingProgress_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReadingProgress` ADD CONSTRAINT `ReadingProgress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReadingProgress` ADD CONSTRAINT `ReadingProgress_moduleId_organizationId_fkey` FOREIGN KEY (`moduleId`, `organizationId`) REFERENCES `Module`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudyActivity` ADD CONSTRAINT `StudyActivity_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudyActivity` ADD CONSTRAINT `StudyActivity_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudyActivity` ADD CONSTRAINT `StudyActivity_moduleId_organizationId_fkey` FOREIGN KEY (`moduleId`, `organizationId`) REFERENCES `Module`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SearchDocument` ADD CONSTRAINT `SearchDocument_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SearchDocument` ADD CONSTRAINT `SearchDocument_contentChunkId_fkey` FOREIGN KEY (`contentChunkId`) REFERENCES `ContentChunk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SearchDocument` ADD CONSTRAINT `SearchDocument_transcriptChunkId_fkey` FOREIGN KEY (`transcriptChunkId`) REFERENCES `TranscriptChunk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SearchDocument` ADD CONSTRAINT `SearchDocument_glossaryEntryId_fkey` FOREIGN KEY (`glossaryEntryId`) REFERENCES `GlossaryEntry`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SearchDocument` ADD CONSTRAINT `SearchDocument_resourceId_fkey` FOREIGN KEY (`resourceId`) REFERENCES `LearningResource`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Embedding` ADD CONSTRAINT `Embedding_searchDocumentId_fkey` FOREIGN KEY (`searchDocumentId`) REFERENCES `SearchDocument`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AiConversation` ADD CONSTRAINT `AiConversation_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AiConversation` ADD CONSTRAINT `AiConversation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AiMessage` ADD CONSTRAINT `AiMessage_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `AiConversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AiCitation` ADD CONSTRAINT `AiCitation_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `AiMessage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AiCitation` ADD CONSTRAINT `AiCitation_contentChunkId_fkey` FOREIGN KEY (`contentChunkId`) REFERENCES `ContentChunk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AiCitation` ADD CONSTRAINT `AiCitation_transcriptChunkId_fkey` FOREIGN KEY (`transcriptChunkId`) REFERENCES `TranscriptChunk`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_courseId_organizationId_fkey` FOREIGN KEY (`courseId`, `organizationId`) REFERENCES `Course`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quiz` ADD CONSTRAINT `Quiz_moduleId_organizationId_fkey` FOREIGN KEY (`moduleId`, `organizationId`) REFERENCES `Module`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizQuestion` ADD CONSTRAINT `QuizQuestion_quizId_fkey` FOREIGN KEY (`quizId`) REFERENCES `Quiz`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizAttempt` ADD CONSTRAINT `QuizAttempt_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizAttempt` ADD CONSTRAINT `QuizAttempt_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizAttempt` ADD CONSTRAINT `QuizAttempt_quizId_organizationId_fkey` FOREIGN KEY (`quizId`, `organizationId`) REFERENCES `Quiz`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizResponse` ADD CONSTRAINT `QuizResponse_attemptId_quizId_fkey` FOREIGN KEY (`attemptId`, `quizId`) REFERENCES `QuizAttempt`(`id`, `quizId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuizResponse` ADD CONSTRAINT `QuizResponse_questionId_quizId_fkey` FOREIGN KEY (`questionId`, `quizId`) REFERENCES `QuizQuestion`(`id`, `quizId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentReview` ADD CONSTRAINT `ContentReview_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentReview` ADD CONSTRAINT `ContentReview_reviewerId_fkey` FOREIGN KEY (`reviewerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentReview` ADD CONSTRAINT `ContentReview_noteDocumentId_organizationId_fkey` FOREIGN KEY (`noteDocumentId`, `organizationId`) REFERENCES `NoteDocument`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentReview` ADD CONSTRAINT `ContentReview_transcriptId_organizationId_fkey` FOREIGN KEY (`transcriptId`, `organizationId`) REFERENCES `Transcript`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentReview` ADD CONSTRAINT `ContentReview_quizId_organizationId_fkey` FOREIGN KEY (`quizId`, `organizationId`) REFERENCES `Quiz`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentReview` ADD CONSTRAINT `ContentReview_aiMessageId_fkey` FOREIGN KEY (`aiMessageId`) REFERENCES `AiMessage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentIssue` ADD CONSTRAINT `ContentIssue_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentIssue` ADD CONSTRAINT `ContentIssue_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentIssue` ADD CONSTRAINT `ContentIssue_moduleId_organizationId_fkey` FOREIGN KEY (`moduleId`, `organizationId`) REFERENCES `Module`(`id`, `organizationId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsentRecord` ADD CONSTRAINT `ConsentRecord_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ConsentRecord` ADD CONSTRAINT `ConsentRecord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FeatureSetting` ADD CONSTRAINT `FeatureSetting_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_organizationId_fkey` FOREIGN KEY (`organizationId`) REFERENCES `Organization`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_actorId_fkey` FOREIGN KEY (`actorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- Domain invariants enforced by MySQL 8.4, independently of the application.
ALTER TABLE `AcademicTerm` ADD CONSTRAINT `AcademicTerm_number_check` CHECK (`number` > 0);
ALTER TABLE `Module` ADD CONSTRAINT `Module_position_check` CHECK (`position` > 0), ADD CONSTRAINT `Module_minutes_check` CHECK (`estimatedMinutes` BETWEEN 1 AND 240);
ALTER TABLE `NoteDocument` ADD CONSTRAINT `NoteDocument_version_check` CHECK (`currentVersion` > 0);
ALTER TABLE `ReadingProgress` ADD CONSTRAINT `ReadingProgress_percent_check` CHECK (`percent` BETWEEN 0 AND 100);
ALTER TABLE `QuizAttempt` ADD CONSTRAINT `QuizAttempt_score_check` CHECK (`maximumScore` > 0 AND (`score` IS NULL OR (`score` >= 0 AND `score` <= `maximumScore`)));
ALTER TABLE `StudyActivity` ADD CONSTRAINT `StudyActivity_seconds_check` CHECK (`seconds` >= 0);
ALTER TABLE `RateLimitBucket` ADD CONSTRAINT `RateLimitBucket_count_check` CHECK (`count` >= 0);
