import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from './ui/skeleton';

export default function TeamSkeleton() {
  return (
    <div className="backdrop-blur-[48.25px] backdrop-filter bg-neutral-900 box-border content-stretch flex flex-row items-center justify-start p-0 relative size-full">
      {/* Sidebar Skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#1e293b] box-border content-stretch flex flex-col h-full items-start justify-start overflow-hidden p-0 relative shrink-0 w-[312px]"
      >
        {/* Logo Area */}
        <div className="relative shrink-0 w-full border-b border-[#334155]">
          <div className="flex flex-row items-center justify-between pb-5 pt-4 px-5 relative w-full">
            <Skeleton className="h-[25px] w-[108px] bg-[#334155]" />
            <Skeleton className="h-5 w-5 bg-[#334155]" />
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-5 w-full">
          <Skeleton className="h-10 w-full bg-gradient-to-r from-[#3b82f6]/30 to-[#1d4ed8]/30" />
        </div>

        {/* Recent Chats */}
        <div className="px-5 w-full flex-1">
          <Skeleton className="h-4 w-20 bg-[#334155] mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg"
              >
                <Skeleton className="h-4 w-full bg-[#334155]" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Icons */}
        <div className="px-5 pb-6 w-full space-y-4">
          <Skeleton className="h-12 w-full bg-[#3b82f6]/20 rounded-lg" />
          <Skeleton className="h-12 w-full bg-[#334155] rounded-lg" />
        </div>

        {/* User Profile */}
        <div className="px-4 py-5 w-full">
          <Skeleton className="h-[62px] w-full bg-[#383838] rounded-[30px]" />
        </div>
      </motion.div>

      {/* Main Content Skeleton */}
      <div className="basis-0 bg-neutral-900 grow h-full min-h-px min-w-px relative shrink-0">
        <div className="flex flex-col items-center justify-center overflow-hidden relative size-full">
          <div className="box-border content-stretch flex flex-col items-center justify-center p-[40px] relative size-full">
            
            {/* Header with Add Button */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-between items-center w-full mb-8"
            >
              <Skeleton className="h-10 w-32 bg-[#334155]" />
              <Skeleton className="h-10 w-32 bg-gradient-to-r from-[#3b82f6]/30 to-[#1d4ed8]/30 rounded-lg" />
            </motion.div>

            {/* Team Members Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="bg-[#1e293b] rounded-xl p-6 border border-[#334155]"
                >
                  {/* Avatar and Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <Skeleton className="h-16 w-16 rounded-full bg-[#334155]" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-24 bg-[#334155] mb-2" />
                      <Skeleton className="h-4 w-32 bg-[#334155] mb-1" />
                      <Skeleton className="h-4 w-16 bg-[#3b82f6]/30 rounded" />
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="flex justify-end">
                    <Skeleton className="h-8 w-8 bg-[#334155] rounded" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right Sidebar Skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        className="bg-[#1e293b] h-full w-[72px] border-l border-[#334155] flex flex-col items-center py-6 gap-6"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded-full bg-[#334155]" />
        ))}
      </motion.div>
    </div>
  );
}