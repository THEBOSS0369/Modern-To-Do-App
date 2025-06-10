'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Task } from '@/app/types/task'
import TaskCard from './TaskCard'

interface TaskListProps {
  tasks: Task[]
  onUpdateTask: (id: string, updates: Partial<Task>) => void
  onDeleteTask: (id: string) => void
}

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-effect rounded-2xl p-12 text-center"
      >
        <div className="w-24 h-24 mx-auto mb-6 opacity-50">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-gray-400">
            <path
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-300 mb-2">No tasks found</h3>
        <p className="text-gray-500">Create your first task to get started!</p>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Your Tasks</h2>
        <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">
          {tasks.length} task{tasks.length !== 1 ? 's' : ''}
        </span>
      </div>

      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: { delay: index * 0.05 }
            }}
            exit={{ 
              opacity: 0, 
              y: -20, 
              scale: 0.95,
              transition: { duration: 0.2 }
            }}
            layout
          >
            <TaskCard
              task={task}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
