-- Central/queryable data for Liam. Per-user conversational state belongs in the
-- LiamAgent Durable Object; D1 stores cross-session reporting and approved learning.

CREATE TABLE IF NOT EXISTS liam_profiles (
  user_id TEXT PRIMARY KEY,
  name TEXT,
  travel_style_json TEXT NOT NULL DEFAULT '[]',
  destinations_json TEXT NOT NULL DEFAULT '[]',
  interests_json TEXT NOT NULL DEFAULT '[]',
  budget TEXT,
  group_type TEXT,
  consultation_json TEXT,
  conversation_count INTEGER NOT NULL DEFAULT 0,
  last_seen TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS liam_leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  email TEXT NOT NULL,
  name TEXT,
  destination TEXT,
  context_json TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_liam_leads_created_at ON liam_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_liam_leads_user_id ON liam_leads(user_id);

CREATE TABLE IF NOT EXISTS liam_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  event_type TEXT NOT NULL,
  payload_json TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_liam_events_type_created ON liam_events(event_type, created_at DESC);

CREATE TABLE IF NOT EXISTS liam_session_outcomes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  session_id TEXT,
  outcome TEXT NOT NULL,
  destination TEXT,
  package_created INTEGER NOT NULL DEFAULT 0,
  package_emailed INTEGER NOT NULL DEFAULT 0,
  call_handoff INTEGER NOT NULL DEFAULT 0,
  consultation_completeness REAL,
  turn_count INTEGER,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_liam_outcomes_created ON liam_session_outcomes(created_at DESC);

-- Evaluator output. This is evidence for improvement, NOT an instruction for Liam
-- to mutate itself. A rule only becomes active when promoted into liam_playbook_rules.
CREATE TABLE IF NOT EXISTS liam_learning_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  session_id TEXT,
  sentiment TEXT,
  category TEXT NOT NULL,
  trigger_summary TEXT,
  user_feedback_summary TEXT,
  proposed_improvement TEXT,
  evidence_json TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_liam_learning_category ON liam_learning_events(category, created_at DESC);

CREATE TABLE IF NOT EXISTS liam_playbook_rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  rule_key TEXT NOT NULL UNIQUE,
  rule_text TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'human_review',
  evidence_count INTEGER NOT NULL DEFAULT 0,
  enabled INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS liam_aggregate_counts (
  dimension TEXT NOT NULL,
  value TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (dimension, value)
);

-- Post-conversation queue consumer output table for structured event analytics
CREATE TABLE IF NOT EXISTS liam_conversation_events (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  event_type TEXT NOT NULL DEFAULT 'conversation',
  user_id TEXT,
  destination TEXT,
  travel_style TEXT,
  party_size INTEGER,
  nights INTEGER,
  budget_usd REAL,
  outcome TEXT NOT NULL DEFAULT 'completed',
  inference_path TEXT NOT NULL DEFAULT 'unknown',
  model_mode TEXT NOT NULL DEFAULT 'primary'
);
CREATE INDEX IF NOT EXISTS idx_liam_conv_events_created ON liam_conversation_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_liam_conv_events_outcome ON liam_conversation_events(outcome, created_at DESC);
