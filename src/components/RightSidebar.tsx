import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import svgPaths from "../imports/svg-e7gysb37vq";
import imgRectangle362 from "figma:asset/e80f72af031e0117652b171d72e158b0db6a8a5a.png";
import imgRectangle363 from "figma:asset/478eee41cc5e663173e0bba9422f2e4245b2b8a4.png";
import imgRectangle364 from "figma:asset/25b2edec8639728f4c564db26abc8f9c5e42acf7.png";
import imgRectangle365 from "figma:asset/d92e39fe5c2d8dd831ca697b46a4f0f8144685bb.png";
import imgRectangle366 from "figma:asset/7d066b66f18821e191b622c61d170cf0ff553261.png";
import imgRectangle367 from "figma:asset/9ae3b67fa4db653473261ebdc3b6961a149009fd.png";
import imgRectangle368 from "figma:asset/e1c2de86a6ced7ee9dc44467bad64b202b602e5d.png";
import imgRectangle369 from "figma:asset/fd9f029c6e5493ba9e6fc3b928e38047e9f66920.png";
import imgRectangle370 from "figma:asset/dbe63475572551ff5807e6631b4300777b610fd6.png";
import imgRectangle371 from "figma:asset/f08a3b9dd0a74422fa531427b217f2ba6f3068b9.png";
import imgRectangle372 from "figma:asset/91a858287b7402128090d7ccb06fdaee5e631146.png";
import imgRectangle373 from "figma:asset/711891199587b1940e56ae7b6be5f5780352bc21.png";
import imgRectangle374 from "figma:asset/ec7b8df14f756d83857042cbb6cb687a9bee55fb.png";
import imgRectangle375 from "figma:asset/4cb445adb24ab18d4cc92fd46411920c0ed1b879.png";
import imgRectangle361 from "figma:asset/59938a13d90e2cd15181b6644314a5625a557e96.png";

interface RightSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const integrationApps = [
  { id: 1, image: imgRectangle362, name: "Slack" },
  { id: 2, image: imgRectangle363, name: "Microsoft Teams" },
  { id: 3, image: imgRectangle364, name: "Discord" },
  { id: 4, image: imgRectangle365, name: "Zoom" },
  { id: 5, image: imgRectangle366, name: "Google Meet" },
  { id: 6, image: imgRectangle367, name: "Figma" },
  { id: 7, image: imgRectangle368, name: "Notion" },
  { id: 8, image: imgRectangle369, name: "Asana" },
  { id: 9, image: imgRectangle370, name: "Trello" },
  { id: 10, image: imgRectangle371, name: "Jira" },
  { id: 11, image: imgRectangle372, name: "GitHub" },
  { id: 12, image: imgRectangle373, name: "GitLab" },
  { id: 13, image: imgRectangle374, name: "Dropbox" },
  { id: 14, image: imgRectangle375, name: "Google Drive" },
  { id: 15, image: imgRectangle361, name: "OneDrive" }
];

export default function RightSidebar({ isCollapsed = false, onToggle }: RightSidebarProps) {
  const [hoveredApp, setHoveredApp] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (app: any, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const sidebarRect = sidebarRef.current?.getBoundingClientRect();
    
    if (sidebarRect) {
      setTooltipPosition({
        x: sidebarRect.left - 10, // Position to the left of sidebar
        y: rect.top + rect.height / 2 // Center vertically with the app icon
      });
    }
    setHoveredApp(app.id);
  };

  const handleMouseLeave = () => {
    setHoveredApp(null);
  };

  const StartContent = () => (
    <div className="relative shrink-0 size-6">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="startContent" opacity="0.5">
          <g id="Vector">
            <path d={svgPaths.p24575a80} fill="white" />
            <path d={svgPaths.p2f26d200} fill="white" />
            <path d={svgPaths.p56c6580} fill="white" />
          </g>
        </g>
      </svg>
    </div>
  );

  const hoveredAppData = integrationApps.find(app => app.id === hoveredApp);

  return (
    <>
      <motion.div
        ref={sidebarRef}
        initial={{ width: isCollapsed ? 72 : 280 }}
        animate={{ width: isCollapsed ? 72 : 280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-[#242424] box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 h-full border-l border-[#3d3d3d]"
      >
        {/* Header */}
        <div className="h-[61.354px] relative shrink-0 w-full border-b border-[#3d3d3d]">
          <div className="flex flex-row items-center justify-center relative size-full">
            <div className={`box-border content-stretch flex flex-row h-[61.354px] items-center p-[20px] relative w-full ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
              <AnimatePresence mode="wait">
                {isCollapsed ? (
                  <motion.button
                    key="collapsed-icon"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={onToggle}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </motion.button>
                ) : (
                  <motion.div
                    key="expanded-content"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center gap-3"
                  >
                    <StartContent />
                    <span className="text-white font-semibold text-[16px]">Integrations</span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {!isCollapsed && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onToggle}
                  className="text-white/50 hover:text-white transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <ChevronRight size={20} />
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Apps List */}
        <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col items-center relative size-full">
            <div className={`box-border content-stretch flex flex-col items-start justify-start relative size-full ${isCollapsed ? 'gap-6 p-3' : 'gap-3 p-5'}`}>
              <AnimatePresence>
                {isCollapsed ? (
                  // Collapsed state - show all logos with conditional opacity
                  integrationApps.map((app, index) => {
                    const isDisconnected = index >= integrationApps.length - 5; // Last 5 are disconnected
                    return (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        onMouseEnter={(e) => handleMouseEnter(app, e)}
                        onMouseLeave={handleMouseLeave}
                        className="relative w-full flex justify-center"
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`bg-center bg-cover bg-no-repeat relative rounded-full shrink-0 size-8 overflow-hidden ${isDisconnected ? 'opacity-40' : 'opacity-100'}`}
                          style={{ backgroundImage: `url('${app.image}')` }}
                        >
                          <div className="absolute border-2 border-white border-solid inset-0 pointer-events-none rounded-full" />
                        </motion.button>
                      </motion.div>
                    );
                  })
                ) : (
                  // Expanded state - show all apps with side-by-side layout and conditional opacity
                  integrationApps.map((app, index) => {
                    const isDisconnected = index >= integrationApps.length - 5; // Last 5 are disconnected
                    return (
                      <motion.div
                        key={app.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                        onMouseEnter={(e) => handleMouseEnter(app, e)}
                        onMouseLeave={handleMouseLeave}
                        className="relative w-full"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${isDisconnected ? 'opacity-40' : 'opacity-100'}`}
                        >
                          {/* App Icon */}
                          <div
                            className="bg-center bg-cover bg-no-repeat relative rounded-full shrink-0 size-8 overflow-hidden"
                            style={{ backgroundImage: `url('${app.image}')` }}
                          >
                            <div className="absolute border-2 border-white border-solid inset-0 pointer-events-none rounded-full" />
                          </div>

                          {/* App Name */}
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex-1 text-left"
                          >
                            <span className={`text-sm font-medium hover:text-white transition-colors ${isDisconnected ? 'text-white/40' : 'text-white/80'}`}>
                              {app.name}
                            </span>
                          </motion.div>

                          {/* Hover indicator */}
                          <AnimatePresence>
                            {hoveredApp === app.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className={`w-2 h-2 rounded-full ${isDisconnected ? 'bg-red-500' : 'bg-green-500'}`}
                              />
                            )}
                          </AnimatePresence>
                        </motion.button>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}