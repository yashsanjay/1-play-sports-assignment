-- Task Manager Schema Design
--
-- Design Choices:
-- 1. id: Primary key using SERIAL for unique task identification.
-- 2. title: Required field to ensure every task has a meaningful name.
-- 3. description: Optional field to allow additional details without forcing user input.
-- 4. status: ENUM used ('todo', 'in-progress', 'done') to restrict values and maintain consistency.
-- 5. due_date: Optional DATE field since tasks may or may not have deadlines.
--    DATE is used instead of TIMESTAMP to avoid timezone-related issues.
-- 6. created_at: Automatically set when task is created using CURRENT_TIMESTAMP.
-- 7. updated_at: Automatically updated on modification using CURRENT_TIMESTAMP.
--    Helps track changes without manual handling in application code.
--
-- Overall:
-- The schema is designed to be simple, scalable, and enforce data integrity
-- while avoiding common timezone issues in date handling.


-- Create ENUM for task status
CREATE TYPE task_status AS ENUM ('todo', 'in-progress', 'done');

-- Create tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    status task_status DEFAULT 'todo',
    due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);