import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Edit3, Check, X, Send, Mic, Paperclip, Plus } from 'lucide-react';
import { toast, Toaster } from 'sonner@2.0.3';
import svgPaths from "../imports/svg-1kg576inv5";
import imgAvatarStyle6 from "figma:asset/d7437995b6aeee65e7688cd80dd4ddfdd456da5a.png";
import imgImage21 from "figma:asset/4dfa47455707fc8280f082b5bb0afccef2b14a4c.png";
import logoImage from "figma:asset/216d05b2dad1126a3e864df88d0bdb14f3f35226.png";
import logoutIcon from "figma:asset/0be9508ee8b1516020108e64d4c3e3d281c84dc4.png";

interface User {
  name: string;
  email: string;
}

interface ChatScreenProps {
  user: User;
  onLogout: () => void;
  onNavigateToTeam?: () => void;
  onNavigateToChat?: () => void;
  currentView?: 'chat' | 'team';
  sidebarOnly?: boolean;
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const mockChats = [
  {
    title: "Help me rewrite this email profession...",
    messages: [
      {
        id: 'chat1-1',
        content: "Help me rewrite this email professionally: 'Hey John, can you send me those files? I need them ASAP. Thanks.'",
        isUser: true,
        timestamp: new Date('2024-01-15T10:30:00')
      },
      {
        id: 'chat1-2',
        content: "Here's a more professional version of your email:\n\nSubject: Request for Files - Urgent\n\nDear John,\n\nI hope this email finds you well. I would appreciate it if you could send me the files we discussed at your earliest convenience. Due to project deadlines, I would be grateful to receive them by end of day if possible.\n\nThank you for your assistance.\n\nBest regards,\n[Your name]",
        isUser: false,
        timestamp: new Date('2024-01-15T10:31:00')
      }
    ]
  },
  {
    title: "How do I explain this product to non...",
    messages: [
      {
        id: 'chat2-1',
        content: "How do I explain this product to non-technical stakeholders? It's a machine learning algorithm that optimizes supply chain logistics.",
        isUser: true,
        timestamp: new Date('2024-01-14T14:15:00')
      },
      {
        id: 'chat2-2',
        content: "Great question! Here's how to explain it in simple terms:\n\n**What it does:** Think of it as a smart assistant that helps your company move products more efficiently.\n\n**The problem it solves:** Instead of guessing the best routes, timing, and inventory levels, this tool analyzes patterns and predicts the most cost-effective ways to get products from Point A to Point B.",
        isUser: false,
        timestamp: new Date('2024-01-14T14:16:30')
      }
    ]
  }
];

export default function InteractiveChatScreen({ 
  user, 
  onLogout, 
  onNavigateToTeam, 
  onNavigateToChat,
  currentView = 'chat',
  sidebarOnly = false 
}: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're asking about "${inputValue.slice(0, 50)}...". Let me help you with that! This is a simulated AI response that would provide helpful information based on your query.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleNewChat = () => {
    setMessages([]);
    setSelectedChat(null);
    setEditingMessageId(null);
    setEditingText('');
    setHoveredMessageId(null);
    if (onNavigateToChat) {
      onNavigateToChat();
    }
  };

  const toggleSidebar = () => {
    if (sidebarOpen && !isCollapsed) {
      setIsCollapsed(true);
    } else if (sidebarOpen && isCollapsed) {
      setSidebarOpen(false);
      setIsCollapsed(false);
    } else {
      setSidebarOpen(true);
      setIsCollapsed(false);
    }
  };

  const handleChatSelect = (chatItem: any) => {
    setSelectedChat(chatItem.title);
    setMessages(chatItem.messages);
  };

  const handleCopyMessage = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Message copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy message');
    }
  };

  const handleEditMessage = (messageId: string, content: string) => {
    setEditingMessageId(messageId);
    setEditingText(content);
  };

  const handleSaveEdit = (messageId: string) => {
    if (!editingText.trim()) return;
    
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, content: editingText.trim() }
        : msg
    ));
    
    setEditingMessageId(null);
    setEditingText('');
    toast.success('Message updated!');
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditingText('');
  };

  const formatMessageContent = (content: string) => {
    const lines = content.split('\n');
    
    return lines.map((line, index) => {
      if (line.trim() === '') {
        return <br key={index} />;
      }

      if (line.includes('**')) {
        const parts = line.split(/(\\*\\*.*?\\*\\*)/);
        return (
          <div key={index} className="mb-1">
            {parts.map((part, partIndex) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong key={partIndex} className="font-semibold">
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return part;
            })}
          </div>
        );
      }

      if (line.trim().startsWith('•')) {
        return (
          <div key={index} className="ml-4 mb-1 flex items-start">
            <span className="mr-2 text-[#5E97FF]">•</span>
            <span>{line.trim().substring(1).trim()}</span>
          </div>
        );
      }

      return (
        <div key={index} className="mb-1">
          {line}
        </div>
      );
    });
  };

  const renderSidebar = () => (
    <motion.div 
      initial={{ x: -312 }}
      animate={{ 
        x: sidebarOpen ? 0 : -312,
        width: sidebarOpen ? (isCollapsed ? 80 : 312) : 312
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        width: { duration: 0.3, ease: "easeInOut" }
      }}
      className="bg-[#242424] box-border content-stretch flex flex-col h-full items-start justify-start overflow-hidden p-0 relative shrink-0"
      style={{ width: sidebarOpen ? (isCollapsed ? 80 : 312) : 312 }}
    >
      {/* Logo */}
      <div className="relative shrink-0 w-full border-b border-[#3d3d3d]">
        <div className="flex flex-row items-end relative size-full">
          <div className="box-border content-stretch flex flex-row items-end justify-between pb-5 pt-4 px-5 relative w-full">
            {isCollapsed ? (
              <motion.button
                onClick={() => setIsCollapsed(false)}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="h-[25px] w-[25px] flex items-center justify-center cursor-pointer"
                title="Expand sidebar"
              >
                <img
                  src={logoImage}
                  alt="Logo"
                  className="block size-full object-contain"
                />
              </motion.button>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="h-[25.354px] relative shrink-0 w-[108.576px]"
              >
                <img
                  src={logoImage}
                  alt="Logo"
                  className="block size-full object-contain"
                />
              </motion.div>
            )}
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleSidebar}
              className="relative shrink-0 size-5"
            >
              <AnimatePresence mode="wait">
                <motion.svg
                  key={`toggle-${sidebarOpen}-${isCollapsed}`}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                  className="block size-full" 
                  fill="none" 
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15.833 10H4.167m7.5-5L15.833 10l-4.166 5"
                    className="text-white opacity-50"
                  />
                </motion.svg>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="relative shrink-0 w-full">
        <div className="relative size-full">
          <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative w-full">
            <motion.button
              onClick={handleNewChat}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className={`h-10 relative rounded-lg shrink-0 w-full transition-all duration-300`}
              style={{
                backgroundImage: "linear-gradient(92.946deg, #5E97FF 13.302%, #1738DE 93.324%)",
              }}
              title={isCollapsed ? "New Chat" : ""}
            >
              <div className="box-border content-stretch flex flex-row gap-1.5 h-10 items-center justify-center p-[12px] relative w-full">
                <div className="relative shrink-0 w-4 h-4">
                  <div className="flex-none rotate-[45deg] w-4 h-4">
                    <svg
                      className="block w-4 h-4"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 17 17"
                    >
                      <g id="close-circle">
                        <g id="Vector">
                          <path d={svgPaths.p26ce4080} fill="white" />
                          <path d={svgPaths.p19bf7100} fill="white" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col font-['Lufga:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap"
                    >
                      <p className="block leading-[normal] whitespace-pre">New Chat</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Recent Chats */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full chat-messages-container"
          >
            <div className="relative size-full">
              <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-5 py-0 relative size-full">
                <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start pb-0 pt-4 px-0 relative shrink-0 w-full">
                  <div className="basis-0 flex flex-col font-['Lufga:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic opacity-50 relative shrink-0 text-[#ffffff] text-[14px] text-left">
                    <p className="block leading-[normal]">Recent Chats</p>
                  </div>
                </div>
                
                <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full chat-messages-container">
                  {mockChats.map((chat, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleChatSelect(chat)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', x: 2 }}
                      className={`box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-0 py-3 relative shrink-0 w-full ${
                        selectedChat === chat.title ? 'bg-[#5e97ff]/20' : ''
                      }`}
                    >
                      <div className="basis-0 flex flex-col font-['Lufga:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
                        <p className="[text-overflow:inherit] [text-wrap-mode:inherit] [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
                          {chat.title}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="relative shrink-0 w-full">
        <div className="relative size-full">
          <div className="box-border content-stretch flex flex-col items-start justify-start px-5 py-0 relative w-full">
            <motion.button
              onClick={onNavigateToTeam}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', scale: isCollapsed ? 1.05 : 1 }}
              className={`box-border content-stretch flex flex-row gap-2.5 items-center ${isCollapsed ? 'justify-center' : 'justify-start'} px-0 py-4 relative shrink-0 w-full border-b border-[#3d3d3d] ${currentView === 'team' ? 'bg-[#5e97ff]/10' : ''}`}
              title={isCollapsed ? "My Team" : ""}
            >
              <motion.div 
                animate={{ scale: isCollapsed ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
                className="relative shrink-0 size-5"
              >
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 20 20"
                >
                  <g id="startContent">
                    <ellipse
                      cx="7.50081"
                      cy="5"
                      fill="white"
                      id="Vector"
                      rx="3.33333"
                      ry="3.33333"
                    />
                    <ellipse
                      cx="7.50081"
                      cy="14.1675"
                      fill="white"
                      id="Vector_2"
                      rx="5.83333"
                      ry="3.33333"
                    />
                    <g id="Vector_3">
                      <path d={svgPaths.p3df34f00} fill="white" />
                      <path d={svgPaths.p10e2d200} fill="white" />
                    </g>
                  </g>
                </svg>
              </motion.div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="basis-0 flex flex-col font-['Lufga:Medium',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left"
                  >
                    <p className="block leading-[normal]">My Team</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', scale: isCollapsed ? 1.05 : 1 }}
              className={`box-border content-stretch flex flex-row gap-2.5 items-center ${isCollapsed ? 'justify-center' : 'justify-start'} px-0 py-4 relative shrink-0 w-full`}
              title={isCollapsed ? "Integration" : ""}
            >
              <motion.div 
                animate={{ scale: isCollapsed ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
                className="relative shrink-0 size-5"
              >
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 20 20"
                >
                  <g id="startContent">
                    <g id="Vector">
                      <path d={svgPaths.p2f762900} fill="white" />
                      <path d={svgPaths.p1330f700} fill="white" />
                      <path d={svgPaths.p3e8e2080} fill="white" />
                    </g>
                  </g>
                </svg>
              </motion.div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="basis-0 flex flex-col font-['Lufga:Medium',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left"
                  >
                    <p className="block leading-[normal]">Integration</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="relative shrink-0 w-full">
        <div className="relative size-full">
          <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-4 py-5 relative w-full">
            <div className="bg-[#383838] h-[62px] relative rounded-[30px] shrink-0 w-full">
              <div className="flex flex-row items-center relative size-full">
                <div className="box-border content-stretch flex flex-row gap-8 h-[62px] items-center justify-start p-[14px] relative w-full">
                  <div className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
                    <div className="relative shrink-0 size-[34px]">
                      <img
                        className="block max-w-none size-full rounded-full"
                        height="34"
                        src={imgAvatarStyle6}
                        width="34"
                        alt="User Avatar"
                      />
                    </div>
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="font-['Plus_Jakarta_Sans:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-center text-nowrap"
                        >
                          <p className="block leading-none whitespace-pre">{user.name}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="box-border content-stretch flex flex-row gap-4 items-start justify-start overflow-clip px-1.5 py-2.5 relative rounded-[31px] shrink-0"
                      >
                        <div className="relative shrink-0 size-5">
                          <svg
                            className="block size-full"
                            fill="none"
                            preserveAspectRatio="none"
                            viewBox="0 0 20 20"
                          >
                            <g id="startContent">
                              <path
                                clipRule="evenodd"
                                d={svgPaths.p10299600}
                                fill="white"
                                fillRule="evenodd"
                                id="Vector"
                              />
                            </g>
                          </svg>
                        </div>
                        <motion.button
                          onClick={onLogout}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center justify-center relative shrink-0"
                        >
                          <img
                            src={logoutIcon}
                            alt="Logout"
                            className="w-5 h-5 object-contain"
                          />
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderWelcomeScreen = () => (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px pb-[11px] pt-0 px-0 relative shrink-0 w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-center bg-cover bg-no-repeat h-[149.095px] mb-[-11px] shrink-0 w-[156.06px]"
        style={{ backgroundImage: `url('${imgImage21}')` }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="h-[36.895px] mb-[-11px] relative shrink-0 w-[627.051px]"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 628 37"
        >
          <g id="How can I help you today, Adela?">
            <path d={svgPaths.p1722bf00} fill="black" />
            <path d={svgPaths.p1722bf00} fill="url(#paint0_linear_1_3981)" />
            <path d={svgPaths.p24784c00} fill="black" />
            <path d={svgPaths.p24784c00} fill="url(#paint1_linear_1_3981)" />
            <path d={svgPaths.p1391f000} fill="black" />
            <path d={svgPaths.p1391f000} fill="url(#paint2_linear_1_3981)" />
            <path d={svgPaths.p2ef5b6f0} fill="black" />
            <path d={svgPaths.p2ef5b6f0} fill="url(#paint3_linear_1_3981)" />
            <path d={svgPaths.p2651cdc0} fill="black" />
            <path d={svgPaths.p2651cdc0} fill="url(#paint4_linear_1_3981)" />
            <path d={svgPaths.pf6afd00} fill="black" />
            <path d={svgPaths.pf6afd00} fill="url(#paint5_linear_1_3981)" />
            <path d={svgPaths.p120d2c80} fill="black" />
            <path d={svgPaths.p120d2c80} fill="url(#paint6_linear_1_3981)" />
            <path d={svgPaths.p1210eb00} fill="black" />
            <path d={svgPaths.p1210eb00} fill="url(#paint7_linear_1_3981)" />
            <path d={svgPaths.p208a8380} fill="black" />
            <path d={svgPaths.p208a8380} fill="url(#paint8_linear_1_3981)" />
            <path d={svgPaths.p1277d800} fill="black" />
            <path d={svgPaths.p1277d800} fill="url(#paint9_linear_1_3981)" />
            <path d={svgPaths.p368c5d00} fill="black" />
            <path d={svgPaths.p368c5d00} fill="url(#paint10_linear_1_3981)" />
            <path d={svgPaths.p1eadaf00} fill="black" />
            <path d={svgPaths.p1eadaf00} fill="url(#paint11_linear_1_3981)" />
            <path d={svgPaths.p3c990380} fill="black" />
            <path d={svgPaths.p3c990380} fill="url(#paint12_linear_1_3981)" />
            <path d={svgPaths.p13e267f0} fill="black" />
            <path d={svgPaths.p13e267f0} fill="url(#paint13_linear_1_3981)" />
            <path d={svgPaths.p37de80f0} fill="black" />
            <path d={svgPaths.p37de80f0} fill="url(#paint14_linear_1_3981)" />
            <path d={svgPaths.p19229000} fill="black" />
            <path d={svgPaths.p19229000} fill="url(#paint15_linear_1_3981)" />
            <path d={svgPaths.p2cc76040} fill="black" />
            <path d={svgPaths.p2cc76040} fill="url(#paint16_linear_1_3981)" />
            <path d={svgPaths.p283e8870} fill="black" />
            <path d={svgPaths.p283e8870} fill="url(#paint17_linear_1_3981)" />
            <path d={svgPaths.p15654f80} fill="black" />
            <path d={svgPaths.p15654f80} fill="url(#paint18_linear_1_3981)" />
            <path d={svgPaths.p3646a100} fill="black" />
            <path d={svgPaths.p3646a100} fill="url(#paint19_linear_1_3981)" />
            <path d={svgPaths.p1724a700} fill="black" />
            <path d={svgPaths.p1724a700} fill="url(#paint20_linear_1_3981)" />
            <path d={svgPaths.p9b24d00} fill="black" />
            <path d={svgPaths.p9b24d00} fill="url(#paint21_linear_1_3981)" />
            <path d={svgPaths.pdb0ff00} fill="black" />
            <path d={svgPaths.pdb0ff00} fill="url(#paint22_linear_1_3981)" />
            <path d={svgPaths.p18648370} fill="black" />
            <path d={svgPaths.p18648370} fill="url(#paint23_linear_1_3981)" />
            <path d={svgPaths.p39f77480} fill="black" />
            <path d={svgPaths.p39f77480} fill="url(#paint24_linear_1_3981)" />
            <path d={svgPaths.p28ca7900} fill="black" />
            <path d={svgPaths.p28ca7900} fill="url(#paint25_linear_1_3981)" />
          </g>
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint0_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint1_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint2_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint3_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint4_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint5_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint6_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint7_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint8_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint9_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint10_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint11_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint12_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint13_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint14_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint15_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint16_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint17_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint18_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint19_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint20_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint21_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint22_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint23_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint24_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint25_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </div>
  );

  const renderChatMessages = () => (
    <div className="flex-1 w-full max-w-4xl overflow-y-auto p-4 space-y-4">
      <AnimatePresence>
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`box-border content-stretch flex flex-col gap-2 items-start p-0 relative shrink-0 w-full ${
              message.isUser ? 'items-end' : 'items-start'
            }`}
            onMouseEnter={() => setHoveredMessageId(message.id)}
            onMouseLeave={() => setHoveredMessageId(null)}
          >
            {/* Message Row */}
            <div className={`box-border content-stretch flex flex-row gap-2.5 items-end p-0 relative shrink-0 ${
              message.isUser ? 'justify-end' : 'justify-start'
            }`}>
              {!message.isUser && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative shrink-0 size-8"
                >
                  <img
                    className="block size-full rounded-full border border-[#5e97ff]"
                    src={imgImage21}
                    alt="AI Assistant"
                  />
                </motion.div>
              )}
              
              {editingMessageId === message.id ? (
                <div className="bg-[#242424] p-4 rounded-lg max-w-[70%]">
                  <textarea
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="w-full bg-transparent border border-gray-500 rounded p-2 text-[16px] leading-relaxed resize-none outline-none focus:border-[#5E97FF] text-white"
                    rows={5}
                    autoFocus
                  />
                  <div className="flex gap-2 justify-end mt-3">
                    <motion.button
                      onClick={() => handleSaveEdit(message.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                    >
                      <Check size={16} />
                    </motion.button>
                    <motion.button
                      onClick={handleCancelEdit}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                    >
                      <X size={16} />
                    </motion.button>
                  </div>
                </div>
              ) : (
                <motion.div
                  whileHover={{ y: -2 }}
                  className={`max-w-[70%] p-4 rounded-lg relative ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-[#1738DE] to-[#5E97FF] text-white' 
                      : 'bg-[#242424] text-white'
                  }`}
                >
                  <div className="text-[14px] leading-relaxed">
                    {formatMessageContent(message.content)}
                  </div>
                  <p className="text-[10px] opacity-50 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </motion.div>
              )}

              {message.isUser && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative shrink-0 size-8"
                >
                  <img
                    className="block size-full rounded-full border border-[#5e97ff]"
                    src={imgAvatarStyle6}
                    alt="User Avatar"
                  />
                </motion.div>
              )}
            </div>

            {/* Action Icons Below */}
            <AnimatePresence>
              {hoveredMessageId === message.id && editingMessageId !== message.id && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`box-border content-stretch flex flex-row gap-3 items-center p-0 relative shrink-0 ${
                    message.isUser ? 'ml-auto mr-10' : 'ml-10'
                  }`}
                >
                  <motion.button
                    onClick={() => handleCopyMessage(message.content)}
                    whileHover={{ scale: 1.2, color: '#5E97FF' }}
                    whileTap={{ scale: 0.9 }}
                    className="relative shrink-0 size-5 text-white/50 hover:text-[#5E97FF] transition-colors"
                    title="Copy message"
                  >
                    <Copy size={20} fill="currentColor" />
                  </motion.button>
                  
                  {message.isUser && (
                    <motion.button
                      onClick={() => handleEditMessage(message.id, message.content)}
                      whileHover={{ scale: 1.2, color: '#5E97FF' }}
                      whileTap={{ scale: 0.9 }}
                      className="relative shrink-0 size-5 text-white/50 hover:text-[#5E97FF] transition-colors"
                      title="Edit message"
                    >
                      <Edit3 size={20} fill="currentColor" />
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>

      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start"
        >
          <div className="bg-[#242424] p-4 rounded-lg">
            <div className="flex space-x-1">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                className="w-2 h-2 bg-[#5E97FF] rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                className="w-2 h-2 bg-[#5E97FF] rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-2 bg-[#5E97FF] rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );

  const renderInputArea = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0 w-full"
    >
      <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-[900px] max-w-[90%]">
        <div className="basis-0 bg-[#242424] grow min-h-px min-w-px relative rounded-bl-[12px] rounded-tl-[12px] shrink-0">
          <div className="flex flex-row items-center relative size-full">
            <div className="box-border content-stretch flex flex-row items-center justify-between p-[20px] relative w-full">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Enter a prompt here..."
                className="bg-transparent border-none outline-none text-white placeholder-[#bababa] w-full text-[16px] leading-relaxed font-['Lufga:Regular',_sans-serif]"
              />
              <div className="box-border content-stretch flex flex-row gap-4 items-center justify-end p-0 relative shrink-0">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative shrink-0 size-6"
                >
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 24 24"
                  >
                    <g id="startContent" opacity="0.5">
                      <g id="Vector">
                        <path d={svgPaths.p5de6900} fill="white" />
                        <path
                          clipRule="evenodd"
                          d={svgPaths.p9621c00}
                          fill="white"
                          fillRule="evenodd"
                        />
                      </g>
                    </g>
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative shrink-0 size-6"
                >
                  <svg
                    className="block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 24 24"
                  >
                    <g id="startContent" opacity="0.5">
                      <g id="Vector">
                        <path
                          clipRule="evenodd"
                          d={svgPaths.p2e050000}
                          fill="white"
                          fillRule="evenodd"
                        />
                        <path
                          clipRule="evenodd"
                          d={svgPaths.p106bf600}
                          fill="white"
                          fillRule="evenodd"
                        />
                      </g>
                    </g>
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        <motion.button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isTyping}
          whileHover={{ scale: inputValue.trim() ? 1.05 : 1 }}
          whileTap={{ scale: inputValue.trim() ? 0.95 : 1 }}
          className={`box-border content-stretch flex flex-row gap-2.5 items-center justify-center overflow-clip p-[18px] relative rounded-br-[12px] rounded-tr-[12px] self-stretch shrink-0 transition-all duration-200 ${
            inputValue.trim() 
              ? 'cursor-pointer' 
              : 'cursor-not-allowed opacity-50'
          }`}
          style={{
            backgroundImage:
              "linear-gradient(90.4065deg, rgb(94, 151, 255) 13.302%, rgb(23, 56, 222) 93.324%)",
          }}
        >
          <motion.div 
            animate={{ rotate: inputValue.trim() ? 0 : -45 }}
            transition={{ duration: 0.2 }}
            className="relative shrink-0 size-6"
          >
            <svg
              className="block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 24 24"
            >
              <g id="startContent">
                <path d={svgPaths.p4cb0f00} fill="white" id="Vector" />
              </g>
            </svg>
          </motion.div>
        </motion.button>
      </div>
    </motion.div>
  );

  if (sidebarOnly) {
    return (
      <>
        <Toaster 
          position="top-right" 
          theme="dark"
          toastOptions={{
            style: {
              background: '#242424',
              border: '1px solid #3d3d3d',
              color: '#fff',
            },
          }}
        />
        {renderSidebar()}
      </>
    );
  }

  return (
    <>
      <Toaster 
        position="top-right" 
        theme="dark"
        toastOptions={{
          style: {
            background: '#242424',
            border: '1px solid #3d3d3d',
            color: '#fff',
          },
        }}
      />
      <div className="backdrop-blur-[48.25px] backdrop-filter bg-neutral-900 box-border content-stretch flex flex-row items-center justify-start p-0 relative size-full">
        {renderSidebar()}

        {/* Main Chat Area */}
        <div className="basis-0 bg-neutral-900 grow h-full min-h-px min-w-px relative shrink-0">
          <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
            <div className="box-border content-stretch flex flex-col items-center justify-center p-[40px] relative size-full">
              {messages.length === 0 ? (
                <>
                  {renderWelcomeScreen()}
                  {renderInputArea()}
                </>
              ) : (
                <>
                  {renderChatMessages()}
                  <div className="box-border content-stretch flex flex-col gap-0 items-center justify-start p-5 relative shrink-0 w-full border-t border-[#3d3d3d]">
                    <div className="box-border content-stretch flex flex-row gap-4 items-end justify-start p-0 relative shrink-0 w-full max-w-4xl">
                      <div className="basis-0 bg-[#242424] border border-[#3d3d3d] box-border content-stretch flex flex-row gap-0 grow items-center justify-start min-h-px min-w-px p-4 relative rounded-lg shrink-0">
                        <textarea
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                          placeholder="Message..."
                          className="bg-transparent border-none outline-none text-white placeholder-white/50 resize-none w-full min-h-[24px] max-h-[120px] text-[14px] leading-relaxed"
                          rows={1}
                        />
                      </div>
                      <motion.button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        whileHover={{ scale: inputValue.trim() ? 1.05 : 1 }}
                        whileTap={{ scale: inputValue.trim() ? 0.95 : 1 }}
                        className={`h-12 relative rounded-lg shrink-0 w-12 transition-all duration-200 ${
                          inputValue.trim() 
                            ? 'bg-gradient-to-r from-[#1738DE] to-[#5E97FF] cursor-pointer' 
                            : 'bg-[#3d3d3d] cursor-not-allowed'
                        }`}
                      >
                        <motion.div 
                          animate={{ rotate: inputValue.trim() ? 0 : -45 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center justify-center size-full"
                        >
                          <Send size={20} className={inputValue.trim() ? 'text-white' : 'text-white/30'} />
                        </motion.div>
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}