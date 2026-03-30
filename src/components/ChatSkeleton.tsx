import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from './ui/skeleton';

export default function ChatSkeleton() {
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
          <Skeleton className="h-12 w-full bg-[#334155] rounded-lg" />
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
          <div className="box-border content-stretch flex flex-col items-center justify-center p-[40px] relative size-full max-w-4xl w-full">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full mb-8"
            >
              <Skeleton className="h-10 w-64 bg-[#334155] mb-4" />
              <Skeleton className="h-6 w-96 bg-[#334155]" />
            </motion.div>

            {/* Chat Messages Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex-1 w-full space-y-6"
            >
              {/* User Message */}
              <div className="flex justify-end">
                <div className="max-w-[70%]">
                  <Skeleton className="h-4 w-32 bg-[#334155] mb-2" />
                  <div className="bg-[#3b82f6]/20 rounded-2xl p-4">
                    <Skeleton className="h-4 w-full bg-[#334155] mb-2" />
                    <Skeleton className="h-4 w-3/4 bg-[#334155]" />
                  </div>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex justify-start">
                <div className="max-w-[80%]">
                  <div className="flex items-center gap-3 mb-2">
                    <Skeleton className="h-8 w-8 rounded-full bg-[#334155]" />
                    <Skeleton className="h-4 w-20 bg-[#334155]" />
                  </div>
                  <div className="bg-[#1e293b] rounded-2xl p-4 space-y-3">
                    <Skeleton className="h-4 w-full bg-[#334155]" />
                    <Skeleton className="h-4 w-full bg-[#334155]" />
                    <Skeleton className="h-4 w-2/3 bg-[#334155]" />
                  </div>
                </div>
              </div>

              {/* Another User Message */}
              <div className="flex justify-end">
                <div className="max-w-[60%]">
                  <div className="bg-[#3b82f6]/20 rounded-2xl p-4">
                    <Skeleton className="h-4 w-full bg-[#334155]" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Input Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="w-full mt-6"
            >
              <div className="flex items-center gap-4 p-4 bg-[#1e293b] rounded-2xl border border-[#334155]">
                <Skeleton className="h-6 flex-1 bg-[#334155]" />
                <Skeleton className="h-8 w-8 bg-[#3b82f6]/30 rounded-lg" />
              </div>
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