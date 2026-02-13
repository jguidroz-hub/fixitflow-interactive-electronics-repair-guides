import { pgTable, text, timestamp, boolean, integer, jsonb, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './schema';

// Per-user preferences and settings
export const userSettings = pgTable('user_settings', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  timezone: text('timezone').default('UTC'),
  emailNotifications: boolean('email_notifications').default('true'),
  weeklyDigest: boolean('weekly_digest').default('true'),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
  updatedAt: timestamp('updated_at').notNull().default(sql`now()`),
});

// Tracks important state changes for debugging and compliance
export const auditLog = pgTable('audit_log', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id'),
  metadata: jsonb('metadata'),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').notNull().default(sql`now()`),
});

// Main table for electronics repair guides
export const repairGuides = pgTable('repair_guides', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  deviceType: text('device_type').notNull(),
  difficultyLevel: text('difficulty_level').notNull(),
  steps: jsonb('steps').notNull(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});

// Tracking user interactions with repair guides
export const guideInteractions = pgTable('guide_interactions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  repairGuideId: text('repair_guide_id').notNull().references(() => repairGuides.id, { onDelete: 'cascade' }),
  progress: text('progress').notNull().default(0),
  completed: boolean('completed').notNull().default('false'),
  notes: text('notes'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});
