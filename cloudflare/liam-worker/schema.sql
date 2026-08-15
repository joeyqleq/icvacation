-- Central/queryable data for Liam. Durable per-user conversational state lives
-- in LiamAgent SQLite; D1 is for cross-user reporting, leads, and aggregates.

CREATE TABLE IF NOT EXISTS liam_profiles (
  user_id TEXT PRIMARY KEY,
  name TEXT,
  travel_style_json TEXT NOT NULL DEFAULT '[]',
  destinations_json TEXT NOT NULL DEFAULT '[]',
  interests_json TEXT NOT NULL DEFAULT '[]',
  budget TEXT,
  group_type TEXT,
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

CREATE INDEX IF NOT EXISTS idx_liam_leads_created_at
  ON liam_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_liam_leads_user_id
  ON liam_leads(user_id);

CREATE TABLE IF NOT EXISTS liam_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  event_type TEXT NOT NULL,
  payload_json TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_liam_events_type_created
  ON liam_events(event_type, created_at DESC);

CREATE TABLE IF NOT EXISTS liam_aggregate_counts (
  dimension TEXT NOT NULL,
  value TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (dimension, value)
);
