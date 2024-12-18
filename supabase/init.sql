-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for clean initialization)
DROP TABLE IF EXISTS mentor_sessions;
DROP TABLE IF EXISTS focus_sessions;
DROP TABLE IF EXISTS journals;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

-- Drop existing types if they exist
DROP TYPE IF EXISTS "TaskCategory";
DROP TYPE IF EXISTS "TaskPriority";
DROP TYPE IF EXISTS "JournalType";

-- Create enum types
CREATE TYPE "TaskCategory" AS ENUM ('inbox', 'next', 'projects', 'waiting', 'someday');
CREATE TYPE "TaskPriority" AS ENUM ('high', 'medium', 'low');
CREATE TYPE "JournalType" AS ENUM ('morning', 'evening', 'ftd');

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category "TaskCategory" NOT NULL DEFAULT 'inbox',
    priority "TaskPriority" NOT NULL DEFAULT 'medium',
    completed BOOLEAN NOT NULL DEFAULT false,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create journals table
CREATE TABLE journals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type "JournalType" NOT NULL,
    content TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create focus_sessions table
CREATE TABLE focus_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    duration INTEGER NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Create mentor_sessions table
CREATE TABLE mentor_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mentor_id UUID NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    duration INTEGER NOT NULL,
    notes TEXT,
    completed BOOLEAN NOT NULL DEFAULT false
);

-- Create indexes for better query performance
CREATE INDEX idx_tasks_user_category ON tasks(user_id, category);
CREATE INDEX idx_tasks_user_priority ON tasks(user_id, priority);
CREATE INDEX idx_tasks_completed ON tasks(completed);

CREATE INDEX idx_journals_user_type ON journals(user_id, type);
CREATE INDEX idx_journals_created_at ON journals(created_at);

CREATE INDEX idx_focus_sessions_user_completed ON focus_sessions(user_id, completed);
CREATE INDEX idx_focus_sessions_start_time ON focus_sessions(start_time);

CREATE INDEX idx_mentor_sessions_user_mentor ON mentor_sessions(user_id, mentor_id);
CREATE INDEX idx_mentor_sessions_start_time ON mentor_sessions(start_time);
CREATE INDEX idx_mentor_sessions_completed ON mentor_sessions(completed);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;
CREATE TRIGGER update_tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE focus_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can only access their own data" ON users
    FOR ALL
    USING (auth.uid() = id);

CREATE POLICY "Users can only access their own tasks" ON tasks
    FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own journals" ON journals
    FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own focus sessions" ON focus_sessions
    FOR ALL
    USING (auth.uid() = user_id);

CREATE POLICY "Users can only access their own mentor sessions" ON mentor_sessions
    FOR ALL
    USING (auth.uid() = user_id);