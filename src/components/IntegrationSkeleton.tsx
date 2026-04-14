import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from './ui/skeleton';

export default function IntegrationSkeleton() {
  return (
    <div className="backdrop-blur-[48.25px] backdrop-filter bg-neutral-900 box-border content-stretch flex flex-row items-center justify-start p-0 relative size-full">
      {/* Sidebar Skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#242424] box-border content-stretch flex flex-col h-full items-start justify-start overflow-hidden p-0 relative shrink-0 w-[312px]"
      >
        {/* Logo Area */}
        <div className="relative shrink-0 w-full border-b border-[#3d3d3d]">
          <div className="flex flex-row items-center justify-between pb-5 pt-4 px-5 relative w-full">
            <Skeleton className="h-[25px] w-[108px] bg-[#3d3d3d]" />
            <Skeleton className="h-5 w-5 bg-[#3d3d3d]" />
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-5 w-full">
          <Skeleton className="h-10 w-full bg-gradient-to-r from-[#5e97ff]/30 to-[#1738de]/30" />
        </div>

        {/* Recent Chats */}
        <div className="px-5 w-full flex-1">
          <Skeleton className="h-4 w-20 bg-[#3d3d3d] mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg"
              >
                <Skeleton className="h-4 w-full bg-[#3d3d3d]" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Icons */}
        <div className="px-5 pb-6 w-full space-y-4">
          <Skeleton className="h-12 w-full bg-[#3d3d3d] rounded-lg" />
          <Skeleton className="h-12 w-full bg-[#5e97ff]/20 rounded-lg" />
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
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full mb-8"
            >
              <Skeleton className="h-10 w-40 bg-[#3d3d3d]" />
            </motion.div>

            {/* Integration Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className={`bg-[#242424] rounded-xl p-6 border border-[#3d3d3d] ${
                    i >= 10 ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  {/* Integration Icon and Info */}
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-20 rounded-full bg-[#3d3d3d]" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-20 bg-[#3d3d3d] mb-3" />
                      <Skeleton 
                        className={`h-6 w-16 rounded ${
                          i >= 10 ? 'bg-red-600/30' : 'bg-green-600/30'
                        }`} 
                      />
                    </div>
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
        className="bg-[#242424] h-full w-[72px] border-l border-[#3d3d3d] flex flex-col items-center py-6 gap-6"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton 
            key={i} 
            className={`h-8 w-8 rounded-full bg-[#3d3d3d] ${
              i >= 5 ? 'opacity-40' : 'opacity-100'
            }`} 
          />
        ))}
      </motion.div>
    </div>
  );
}