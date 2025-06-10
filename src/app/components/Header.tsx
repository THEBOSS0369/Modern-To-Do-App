'use client'

import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import { TaskStatus } from "../types/task"

interface HeaderProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  filter: TaskStatus | 'all'
  onFilterChange: (filter: TaskStatus | 'all') => void
}

export default function Header({ searchTerm, onSearchChange, filter, onFilterChange }: HeaderProps) {
  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4 [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
          TaskFlow
        </h1>
        <p className="text-gray-400 text-lg">Manage your tasks with style and efficiency</p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative flex-1 max-w-md"
        >
          <Search className="absolute z-20 left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2"
        >
          <Filter className="text-gray-400 w-5 h-5" />
          <select
            value={filter}
            onChange={(e) => onFilterChange(e.target.value as TaskStatus | 'all')}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </motion.div>
      </div>
    </div>
  )
}
