/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Clock, AlertCircle, Target } from 'lucide-react'
// import { TaskStatus } from "../types/task"
// import { TaskStatus } from '@/components/Stats';
import { Task, TaskStatus } from '@/app/types/task';

interface StatsProps {
  tasks: Task[]
}

export default function Stats({ tasks }: StatsProps) {
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    todo: tasks.filter(t => t.status === 'todo').length,
  }

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/20',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/20',
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/20',
    },
    {
      title: 'To Do',
      value: stats.todo,
      icon: AlertCircle,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/20',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="glass-effect rounded-xl p-6 card-hover"
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`p-3 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className="w-5 h-5 text-white flex-shrink-0" />
            </div>
            <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]`}>
              {stat.value}
            </div>
          </div>
          <p className="text-gray-400 text-sm">{stat.title}</p>
          {stat.title === 'Total Tasks' && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>Completion Rate</span>
                <span>{completionRate}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                />
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
}
