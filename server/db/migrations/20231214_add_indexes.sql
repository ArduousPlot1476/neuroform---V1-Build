-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_focus_sessions_user_completed ON focus_sessions(user_id, completed);
CREATE INDEX IF NOT EXISTS idx_focus_sessions_start_time ON focus_sessions(start_time);

CREATE INDEX IF NOT EXISTS idx_journals_user_type ON journals(user_id, type);
CREATE INDEX IF NOT EXISTS idx_journals_created_at ON journals(created_at);

CREATE INDEX IF NOT EXISTS idx_mentor_sessions_user_mentor ON mentor_sessions(user_id, mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentor_sessions_start_time ON mentor_sessions(start_time);
CREATE INDEX IF NOT EXISTS idx_mentor_sessions_completed ON mentor_sessions(completed);

CREATE INDEX IF NOT EXISTS idx_tasks_user_category ON tasks(user_id, category);
CREATE INDEX IF NOT EXISTS idx_tasks_user_priority ON tasks(user_id, priority);
CREATE INDEX IF NOT EXISTS idx_tasks_completed ON tasks(completed);