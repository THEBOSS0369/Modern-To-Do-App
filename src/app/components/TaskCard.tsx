/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  Flag, 
  Calendar, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  MoreVertical,
  Play,
  Pause
} from 'lucide-react'
import { Task, TaskStatus, TaskPriority } from '@/app/types/task'

interface TaskCardProps {
  task: Task
  onUpdate: (id: string, updates: Partial<Task>) => void
  onDelete: (id: string) => void
}

export default function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [showActions, setShowActions] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description)
  const actionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
        setShowActions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const statusColors = {
    todo: 'from-gray-500 to-gray-600',
    'in-progress': 'from-yellow-500 to-orange-500',
    completed: 'from-green-500 to-emerald-500',
  }

  const priorityColors = {
    low: 'text-green-400 bg-green-400/20',
    medium: 'text-yellow-400 bg-yellow-400/20',
    high: 'text-red-400 bg-red-400/20',
  }

  const handleStatusChange = (newStatus: TaskStatus) => {
    onUpdate(task.id, { status: newStatus })
  }

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      })
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setEditTitle(task.title)
    setEditDescription(task.description)
    setIsEditing(false)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }

  const isOverdue = task.dueDate && new Date() > task.dueDate && task.status !== 'completed'

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      className={`glass-effect rounded-xl p-6 card-hover relative ${
        task.status === 'completed' ? 'opacity-75' : ''
      }`}
    >
      {/* Priority Indicator */}
      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${
        task.priority === 'high' 
          ? 'from-red-500 to-pink-500' 
          : task.priority === 'medium'
          ? 'from-yellow-500 to-orange-500'
          : 'from-green-500 to-emerald-500'
      }`} />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          {/* Status Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (task.status === 'todo') handleStatusChange('in-progress')
              else if (task.status === 'in-progress') handleStatusChange('completed')
              else handleStatusChange('todo')
            }}
            className={`p-2 rounded-lg bg-gradient-to-r ${statusColors[task.status]} text-white transition-all duration-300`}
          >
            {task.status === 'completed' && <Check className="w-5 h-5" />}
            {task.status === 'in-progress' && <Pause className="w-5 h-5" />}
            {task.status === 'todo' && <Play className="w-5 h-5" />}
          </motion.button>

          {/* Task Content */}
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoFocus
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows={2}
                />
              </div>
            ) : (
              <div>
                <h3 className={`text-lg font-semibold ${
                  task.status === 'completed' ? 'line-through text-gray-400' : 'text-white'
                }`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm mt-1 ${
                    task.status === 'completed' ? 'text-gray-500' : 'text-gray-300'
                  }`}>
                    {task.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="relative" ref={actionsRef}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowActions(!showActions)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </motion.button>

          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 top-full mt-2 bg-gray-800 border border-white/10 rounded-lg shadow-xl z-[1000] min-w-[150px] overflow-visible backdrop-blur-lg"
              >
                {isEditing ? (
                  <div className="p-2 space-y-1">
                    <button
                      onClick={handleSaveEdit}
                      className="w-full flex items-center gap-2 px-3 py-2 text-green-400 hover:bg-green-400/10 rounded-lg transition-colors duration-200"
                    >
                      <Check className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="w-full flex items-center gap-2 px-3 py-2 text-gray-400 hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="p-2 space-y-1">
                    <button
                      onClick={() => {
                        setIsEditing(true)
                        setShowActions(false)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors duration-200"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        onDelete(task.id)
                        setShowActions(false)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          {/* Priority */}
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
            <Flag className="w-3 h-3" />
            <span className="capitalize">{task.priority}</span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1 text-gray-400">
            <Clock className="w-3 h-3" />
            <span className="capitalize">{task.status.replace('-', ' ')}</span>
          </div>
        </div>

        {/* Due Date */}
        {task.dueDate && (
          <div className={`flex items-center gap-1 ${
            isOverdue ? 'text-red-400' : 'text-gray-400'
          }`}>
            <Calendar className="w-3 h-3" />
            <span>{formatDate(task.dueDate)}</span>
            {isOverdue && (
              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full ml-2">
                Overdue
              </span>
            )}
          </div>
        )}
      </div>

      {/* Completion Animation */}
      <AnimatePresence>
        {task.status === 'completed' && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 bg-green-500/10 rounded-xl flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
            >
              <Check className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
