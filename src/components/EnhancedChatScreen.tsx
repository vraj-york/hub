import image_0be9508ee8b1516020108e64d4c3e3d281c84dc4 from 'figma:asset/0be9508ee8b1516020108e64d4c3e3d281c84dc4.png';
import image_3ef263db317d5c6e68957531ee8a3bcfd7c756f0 from 'figma:asset/3ef263db317d5c6e68957531ee8a3bcfd7c756f0.png';
import backgroundOverlay from 'figma:asset/f4474ec1ee188a66a7bf4157ea1b4c27cb46d152.png';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Edit3, Check, X, Send, Mic, Paperclip, Plus, ChevronRight, Star } from 'lucide-react';
import { toast, Toaster } from 'sonner@2.0.3';
import MyAccount from './MyAccount';
import RightSidebar from './RightSidebar';
import svgPaths from "../imports/svg-rqybbzeg0p";
import imgAvatarStyle6 from "figma:asset/d7437995b6aeee65e7688cd80dd4ddfdd456da5a.png";
import imgEllipse5 from "figma:asset/519c2130046d70c81fce5313e6f232e005ee7b5f.png";
import imgImage21 from "figma:asset/4dfa47455707fc8280f082b5bb0afccef2b14a4c.png";
import logoImage from "figma:asset/216d05b2dad1126a3e864df88d0bdb14f3f35226.png";
import collapsedLogo from "figma:asset/40dc5bac9301a9a5763ff19bf5c3931ef01b3806.png";
import arrowIcon from "figma:asset/1d8c8b4f7e9d2a3c5f6e8a9b0c1d2e3f4a5b6c7d.png";
import newChatButton from "figma:asset/8cecfaee86d1066290f841467b55f916e25eca37.png";
import closeIcon from "figma:asset/c7ad4869719e16a20ed4f5c83f130d58fd3e2d26.png";
import logoutIcon from "figma:asset/0be9508ee8b1516020108e64c3e3d281c84dc4.png";

interface User {
  name: string;
  email: string;
}

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  lastMessage?: string;
}

interface EnhancedChatProps {
  user: User;
  onLogout: () => void;
  onNavigateToTeam?: () => void;
  onNavigateToChat?: () => void;
  onNavigateToIntegration?: () => void;
  currentView?: 'chat' | 'team';
}

const initialChatSessions: ChatSession[] = [
  {
    id: '1',
    title: 'Help me rewrite this email profession...',
    messages: [
      {
        id: '1-1',
        content: 'Help me rewrite this email professionally',
        isUser: true,
        timestamp: new Date('2024-01-15T10:30:00')
      },
      {
        id: '1-2',
        content: 'I\'d be happy to help you rewrite that email professionally! Please share the email content you\'d like me to improve.',
        isUser: false,
        timestamp: new Date('2024-01-15T10:31:00')
      }
    ]
  },
  {
    id: '2',
    title: 'How do I explain this product to non...',
    messages: [
      {
        id: '2-1',
        content: 'How do I explain this product to non-technical stakeholders?',
        isUser: true,
        timestamp: new Date('2024-01-14T14:15:00')
      },
      {
        id: '2-2',
        content: 'To explain technical products to non-technical stakeholders, focus on benefits rather than features. Use analogies, avoid jargon, and emphasize the business value and impact.',
        isUser: false,
        timestamp: new Date('2024-01-14T14:16:30')
      }
    ]
  },
  {
    id: '3',
    title: 'Give me smart questions to ask in a ...',
    messages: [
      {
        id: '3-1',
        content: 'Give me smart questions to ask in a job interview',
        isUser: true,
        timestamp: new Date('2024-01-13T09:20:00')
      },
      {
        id: '3-2',
        content: 'Here are some thoughtful interview questions:\n\n1. "What does success look like in this role after 6 months?"\n2. "What are the biggest challenges facing the team right now?"\n3. "How does this position contribute to the company\'s goals?"\n4. "What opportunities are there for professional development?"',
        isUser: false,
        timestamp: new Date('2024-01-13T09:21:00')
      }
    ]
  },
  {
    id: '4',
    title: 'Draft a project timeline for MVP launch',
    messages: [
      {
        id: '4-1',
        content: 'Draft a project timeline for MVP launch',
        isUser: true,
        timestamp: new Date('2024-01-12T16:45:00')
      },
      {
        id: '4-2',
        content: 'Here\'s a typical MVP timeline:\n\n**Phase 1: Planning & Research (2 weeks)**\n- Market research\n- Define core features\n- Technical planning\n\n**Phase 2: Design & Development (6-8 weeks)**\n- UI/UX design\n- Core feature development\n- Testing\n\n**Phase 3: Launch Preparation (2 weeks)**\n- Final testing\n- Launch strategy\n- Marketing preparation',
        isUser: false,
        timestamp: new Date('2024-01-12T16:47:00')
      }
    ]
  },
  {
    id: '5',
    title: 'What\'s a better way to phrase this UX...',
    messages: [
      {
        id: '5-1',
        content: 'What\'s a better way to phrase this UX copy?',
        isUser: true,
        timestamp: new Date('2024-01-11T11:30:00')
      },
      {
        id: '5-2',
        content: 'I\'d love to help improve your UX copy! Please share the current text and context, and I\'ll suggest better alternatives that are more user-friendly and engaging.',
        isUser: false,
        timestamp: new Date('2024-01-11T11:31:00')
      }
    ]
  },
  {
    id: '6',
    title: 'How to turn a spreadsheet into a dash...',
    messages: [
      {
        id: '6-1',
        content: 'How to turn a spreadsheet into a dashboard?',
        isUser: true,
        timestamp: new Date('2024-01-10T08:15:00')
      },
      {
        id: '6-2',
        content: 'You can transform spreadsheets into dashboards using:\n\n1. **Excel/Google Sheets**: Built-in chart tools\n2. **Tableau**: Connect directly to spreadsheets\n3. **Power BI**: Import and visualize data\n4. **Looker Studio**: Free Google tool\n5. **Custom solutions**: React/D3.js for web dashboards',
        isUser: false,
        timestamp: new Date('2024-01-10T08:17:00')
      }
    ]
  },
  {
    id: '7',
    title: 'The advantages of Artificial Intelligence',
    messages: [
      {
        id: '7-1',
        content: 'The advantages of Artificial Intelligence',
        isUser: true,
        timestamp: new Date('2024-01-09T13:20:00')
      },
      {
        id: '7-2',
        content: 'Artificial Intelligence (AI) offers numerous advantages and has the potential to revolutionize various aspects of our lives. Here are some key advantages of AI:\n\n1. Automation: AI can automate repetitive and mundane tasks, saving time and effort for humans. It can handle large volumes of data, perform complex calculations, and execute tasks with precision and consistency. This automation leads to increased productivity and efficiency in various industries.\n\n2. Decision-making: AI systems can analyze vast amounts of data, identify patterns, and make informed decisions based on that analysis. This ability is particularly useful in complex scenarios where humans may struggle to process large datasets or where quick and accurate decisions are crucial.\n\n3. Improved accuracy: AI algorithms can achieve high levels of accuracy and precision in tasks such as image recognition, natural language processing, and data analysis. They can eliminate human errors caused by fatigue, distractions, or bias, leading to more reliable and consistent results.\n\n4. Continuous operation: AI systems can work tirelessly without the need for breaks, resulting in uninterrupted 24/7 operations. This capability is especially beneficial in applications like customer support chatbots, manufacturing processes, and surveillance systems.',
        isUser: false,
        timestamp: new Date('2024-01-09T13:22:00')
      }
    ]
  }
];

export default function EnhancedChatScreen({ user, onLogout, onNavigateToTeam, onNavigateToIntegration, currentView = 'chat' }: EnhancedChatProps) {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(initialChatSessions);
  const [activeChatId, setActiveChatId] = useState<string>(''); // Start with no active chat (welcome screen)
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Start expanded
  const [hoveredLogo, setHoveredLogo] = useState(false);
  const [showMyAccount, setShowMyAccount] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeChat = chatSessions.find(chat => chat.id === activeChatId);
  const messages = activeChat?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // If no active chat, create new one
    if (!activeChatId) {
      const newChatId = `new-${Date.now()}`;
      const newChat: ChatSession = {
        id: newChatId,
        title: inputValue.trim().slice(0, 40) + (inputValue.trim().length > 40 ? '...' : ''),
        messages: []
      };
      setChatSessions(prev => [newChat, ...prev]);
      setActiveChatId(newChatId);
    }

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    // Add user message
    setChatSessions(prev => prev.map(chat => 
      chat.id === (activeChatId || `new-${Date.now()}`)
        ? { ...chat, messages: [...chat.messages, userMessage] }
        : chat
    ));

    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: `${Date.now()}-ai`,
        content: `Thank you for your message: "${userMessage.content}". I'm here to help you with any questions or tasks you have. How can I assist you further?`,
        isUser: false,
        timestamp: new Date()
      };

      setChatSessions(prev => prev.map(chat => 
        chat.id === (activeChatId || `new-${Date.now()}`)
          ? { ...chat, messages: [...chat.messages, aiMessage] }
          : chat
      ));

      setIsTyping(false);
    }, 2000);
  };

  const handleNewChat = () => {
    const newChatId = `new-${Date.now()}`;
    const newChat: ChatSession = {
      id: newChatId,
      title: 'New Chat',
      messages: []
    };

    setChatSessions(prev => [newChat, ...prev]);
    setActiveChatId(newChatId);
    setEditingMessageId(null);
    setEditingText('');
  };

  const handleChatSelect = (chatId: string) => {
    setActiveChatId(chatId);
    setEditingMessageId(null);
    setEditingText('');
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

    setChatSessions(prev => prev.map(chat => 
      chat.id === activeChatId 
        ? {
            ...chat,
            messages: chat.messages.map(msg => 
              msg.id === messageId 
                ? { ...msg, content: editingText.trim() }
                : msg
            )
          }
        : chat
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
    const parts = content.split(/(\n\n|\n)/);
    
    return parts.map((part, index) => {
      if (part === '\n\n') {
        return <br key={index} />;
      }
      
      if (part === '\n') {
        return <br key={index} />;
      }

      if (part.trim() === '') {
        return null;
      }

      // Handle numbered lists
      if (/^\d+\./.test(part.trim())) {
        return (
          <div key={index} className="mb-4">
            <div className="leading-[1.5]">
              {part.trim()}
            </div>
          </div>
        );
      }

      // Handle bold text
      if (part.includes('**')) {
        const boldParts = part.split(/(\*\*.*?\*\*)/);
        return (
          <div key={index} className="mb-2">
            {boldParts.map((boldPart, boldIndex) => {
              if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
                return (
                  <strong key={boldIndex} className="font-semibold">
                    {boldPart.slice(2, -2)}
                  </strong>
                );
              }
              return boldPart;
            })}
          </div>
        );
      }

      return (
        <div key={index} className="mb-2 leading-[1.5]">
          {part}
        </div>
      );
    });
  };

  const renderSidebar = () => (
    <motion.div
      initial={{ x: 0 }}
      animate={{ width: sidebarCollapsed ? 72 : 312 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-[#242424] box-border content-stretch flex flex-col h-full items-start justify-start overflow-hidden p-0 relative shrink-0"
    >
      {/* Logo */}
      <div className="relative shrink-0 w-full border-b border-[#3d3d3d]">
        <div className="flex flex-row items-center relative size-full">
          <div className={`box-border content-stretch flex flex-row items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} pb-5 pt-4 px-5 relative w-full`}>
            <AnimatePresence mode="wait">
              {sidebarCollapsed ? (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onMouseEnter={() => setHoveredLogo(true)}
                  onMouseLeave={() => setHoveredLogo(false)}
                  onClick={() => setSidebarCollapsed(false)}
                  className="relative cursor-pointer group"
                >
                  {/* Logo Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-6 h-6 flex items-center justify-center"
                  >
                    <img
                      src={collapsedLogo}
                      alt="Logo"
                      className="block w-full h-full object-contain"
                    />
                  </motion.div>
                  
                  {/* Expand Icon on Hover */}
                  <AnimatePresence>
                    {hoveredLogo && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-[#363636] rounded p-1"
                      >
                        <ChevronRight size={16} className="text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
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
            </AnimatePresence>
            
            {!sidebarCollapsed && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="relative shrink-0 size-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-5 flex items-center justify-center"
                >
                  <img
                    src={image_3ef263db317d5c6e68957531ee8a3bcfd7c756f0}
                    alt="Collapse Arrow"
                    className="block w-full h-full object-contain opacity-50"
                  />
                </motion.div>
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <AnimatePresence>
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative shrink-0 w-full"
          >
            <div className="relative size-full">
              <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative w-full">
                <motion.button
                  onClick={handleNewChat}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-10 relative rounded-lg shrink-0 w-[272px]"
                  style={{
                    backgroundImage: "linear-gradient(92.946deg, rgb(94, 151, 255) 13.302%, rgb(23, 56, 222) 93.324%)",
                  }}
                >
                  <div className="flex flex-row items-center justify-center relative size-full">
                    <div className="box-border content-stretch flex flex-row gap-1.5 h-10 items-center justify-center p-[12px] relative w-full">
                      <motion.div
                        whileHover={{ rotate: 45 }}
                        className="relative size-[18px]"
                      >
                        <Plus size={18} className="text-white" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap"
                      >
                        <p className="block leading-[normal] whitespace-pre">New Chat</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Chats */}
      <AnimatePresence>
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full overflow-hidden chat-messages-container"
          >
            <div className="relative size-full">
              <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-5 py-0 relative size-full">
                <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start pb-0 pt-4 px-0 relative shrink-0 w-full">
                  <div className="basis-0 flex flex-col grow justify-center leading-[0] min-h-px min-w-px not-italic opacity-50 relative shrink-0 text-[#ffffff] text-[14px] text-left">
                    <p className="block leading-[normal]">Recent Chats</p>
                  </div>
                </div>
                
                <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full space-y-1">
                  <AnimatePresence>
                    {chatSessions.map((chat, index) => (
                      <motion.button
                        key={chat.id}
                        onClick={() => handleChatSelect(chat.id)}
                        onMouseEnter={() => setHoveredChatId(chat.id)}
                        onMouseLeave={() => setHoveredChatId(null)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.05
                        }}
                        whileHover={{ 
                          backgroundColor: '#363636',
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ 
                          scale: 0.98,
                          transition: { duration: 0.1 }
                        }}
                        className={`box-border content-stretch flex flex-row gap-3 items-center justify-start px-3 py-3.5 mx-1 relative shrink-0 w-[calc(100%-8px)] rounded-lg transition-all duration-200 ease-in-out ${
                          activeChatId === chat.id ? 'bg-[#363636]' : ''
                        }`}
                      >
                        <div className="basis-0 flex flex-col grow justify-center leading-[1.4] min-h-px min-w-px not-italic overflow-hidden relative shrink-0 text-[14px] text-left">
                          <p 
                            className={`block leading-[1.4] overflow-hidden text-ellipsis whitespace-nowrap transition-colors duration-200 ${
                              activeChatId === chat.id 
                                ? 'text-white opacity-100' 
                                : 'text-white opacity-50'
                            }`}
                          >
                            {chat.title}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation - Only show when collapsed */}
      <AnimatePresence>
        {sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative shrink-0 w-full"
          >
            <div className="relative size-full">
              <div className={`box-border content-stretch flex flex-col items-start justify-start ${sidebarCollapsed ? 'px-2' : 'px-5'} py-6 relative w-full`}>
                {/* New Chat Button */}
                <motion.button
                  onClick={handleNewChat}
                  whileHover={{ scale: sidebarCollapsed ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`box-border content-stretch flex flex-row gap-2.5 items-center ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'justify-start px-0 py-4'} relative shrink-0 w-full ${sidebarCollapsed ? 'rounded-lg' : ''} group`}
                >
                  <motion.div
                    animate={{ scale: sidebarCollapsed ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                    className={`relative shrink-0 ${sidebarCollapsed ? 'size-8' : 'size-6'}`}
                  >
                    <img
                      src={newChatButton}
                      alt="New Chat"
                      className="block w-full h-full object-contain group-hover:brightness-110 transition-all duration-200"
                    />
                  </motion.div>
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="basis-0 flex flex-col grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left font-medium"
                      >
                        <p className="block leading-[normal]">New Chat</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Icons Section */}
      <div className={`box-border content-stretch flex flex-col items-center justify-start ${sidebarCollapsed ? 'px-2 gap-6' : 'px-5 gap-4'} relative w-full pb-6`}>
        {/* My Team Icon */}
        <div className="relative shrink-0 w-full">
          <motion.button
            onClick={onNavigateToTeam}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', scale: sidebarCollapsed ? 1.05 : 1 }}
            className={`box-border content-stretch flex flex-row gap-2.5 items-center ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'justify-center px-3 py-4'} relative shrink-0 w-full ${currentView === 'team' ? 'bg-[#5e97ff]/10' : ''} ${sidebarCollapsed ? 'rounded-lg' : 'mx-2 rounded-lg'}`}
          >
            <motion.div
              animate={{ scale: sidebarCollapsed ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
              className="relative shrink-0 size-5"
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <g id="startContent">
                  <ellipse cx="7.50081" cy="5" fill="white" id="Vector" rx="3.33333" ry="3.33333" />
                  <ellipse cx="7.50081" cy="14.1675" fill="white" id="Vector_2" rx="5.83333" ry="3.33333" />
                  <g id="Vector_3">
                    <path d={svgPaths.p3df34f00} fill="white" />
                    <path d={svgPaths.p10e2d200} fill="white" />
                  </g>
                </g>
              </svg>
            </motion.div>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="basis-0 flex flex-col grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left font-medium"
                >
                  <p className="block leading-[normal]">My Team</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Integration Icon */}
        <div className="relative shrink-0 w-full">
          <motion.button
            onClick={onNavigateToIntegration}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', scale: sidebarCollapsed ? 1 : 1 }}
            className={`box-border content-stretch flex flex-row gap-2.5 items-center ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'justify-center px-3 py-4'} relative shrink-0 w-full ${sidebarCollapsed ? 'rounded-lg' : 'mx-2 rounded-lg'}`}
          >
            <motion.div
              animate={{ scale: sidebarCollapsed ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
              className="relative shrink-0 size-5"
            >
              <img
                src={closeIcon}
                alt="Integration"
                className="block w-full h-full object-contain"
              />
            </motion.div>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="basis-0 flex flex-col grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left font-medium"
                >
                  <p className="block leading-[normal]">Integration</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* User Profile */}
      <div className="relative shrink-0 w-full mt-auto">
        <div className="relative size-full">
          <div className={`box-border content-stretch flex flex-col gap-2.5 items-start justify-start ${sidebarCollapsed ? 'px-2' : 'px-4'} py-5 relative w-full`}>
            {sidebarCollapsed ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setShowMyAccount(true)}
                className="relative shrink-0 size-[34px] mx-auto cursor-pointer"
              >
                <img
                  className="block max-w-none size-full rounded-full"
                  height="34"
                  src={imgAvatarStyle6}
                  width="34"
                  alt="User Avatar"
                />
              </motion.button>
            ) : (
              <div className="bg-[#383838] h-[62px] relative rounded-[30px] shrink-0 w-full">
                <div className="flex flex-row items-center relative size-full">
                  <div className="box-border content-stretch flex flex-row gap-8 h-[62px] items-center justify-start p-[12px] relative w-full">
                    <div className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setShowMyAccount(true)}
                        className="relative shrink-0 size-[34px] cursor-pointer"
                      >
                        <img
                          className="block max-w-none size-full rounded-full"
                          height="34"
                          src={imgAvatarStyle6}
                          width="34"
                          alt="User Avatar"
                        />
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setShowMyAccount(true)}
                        className="font-bold leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-center text-nowrap cursor-pointer hover:text-[#5e97ff] transition-colors"
                      >
                        <p className="block leading-none whitespace-pre">{user.name}</p>
                      </motion.button>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="box-border content-stretch flex flex-row gap-4 items-start justify-start overflow-clip px-1.5 py-2.5 relative rounded-[31px] shrink-0"
                    >
                      <motion.button
                        onClick={onLogout}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center justify-center relative shrink-0"
                      >
                        <img
                          src={image_0be9508ee8b1516020108e64d4c3e3d281c84dc4}
                          alt="Logout"
                          className="w-7 h-7 object-contain"
                        />
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderMessages = () => {
    if (messages.length === 0) {
      return (
        <div className="basis-0 box-border content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px pb-[11px] pt-0 px-0 relative shrink-0 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-center bg-cover bg-no-repeat h-[149.095px] mb-4 shrink-0 w-[156.06px]"
            style={{ backgroundImage: `url('${imgImage21}')` }}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">
              How can I help you today?
            </h2>
            <p className="text-white/70">
              Start a new conversation or select from recent chats
            </p>
          </motion.div>
        </div>
      );
    }

    return (
      <div className="basis-0 box-border content-stretch flex flex-col gap-8 grow items-end justify-start min-h-px min-w-px p-0 relative shrink-0 w-full overflow-y-auto chat-messages-container">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredMessageId(message.id)}
              onMouseLeave={() => setHoveredMessageId(null)}
              className={`box-border content-stretch flex flex-row gap-2.5 items-end p-0 relative shrink-0 w-full ${
                message.isUser ? 'justify-end' : 'justify-start'
              } ${hoveredMessageId === message.id ? 'mb-6' : ''}`}
            >
              {!message.isUser && (
                <div className="box-border content-stretch flex flex-row gap-8 items-end justify-start p-0 relative rounded-[30px] shrink-0">
                  <div
                    className="bg-center bg-cover bg-no-repeat h-8 shrink-0 w-[33px]"
                    style={{ backgroundImage: `url('${imgImage21}')` }}
                  />
                </div>
              )}
              
              <div className={`${message.isUser ? 'max-w-[600px]' : 'basis-0 grow min-h-px min-w-px'} relative shrink-0`}>
                {message.isUser ? (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[16px] relative rounded-lg shrink-0"
                    style={{
                      backgroundImage: "linear-gradient(93.0505deg, rgb(23, 56, 222) 13.302%, rgb(94, 151, 255) 93.324%)",
                    }}
                  >
                    {editingMessageId === message.id ? (
                      <div className="space-y-3 w-full">
                        <textarea
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="w-full bg-[#1a1a1a] border border-[#3d3d3d] rounded-lg px-3 py-2 text-white placeholder-white/50 focus:border-[#5e97ff] focus:outline-none resize-none"
                          rows={4}
                        />
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSaveEdit(message.id)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-[#5e97ff] text-white rounded-lg text-sm hover:bg-[#4d7fee] transition-colors"
                          >
                            <Check size={14} />
                            Save
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCancelEdit}
                            className="flex items-center gap-2 px-3 py-1.5 bg-[#3d3d3d] text-white rounded-lg text-sm hover:bg-[#4d4d4d] transition-colors"
                          >
                            <X size={14} />
                            Cancel
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      <div className="leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left">
                        <p className="block leading-none whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                    )}
                    
                    {/* User message action buttons on hover */}
                    <AnimatePresence>
                      {message.isUser && hoveredMessageId === message.id && editingMessageId !== message.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: -5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: -5 }}
                          className="absolute -bottom-12 right-0 flex gap-2 bg-[#1a1a1a] border border-[#3d3d3d] rounded-lg p-2 shadow-lg z-10"
                        >
                          <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: '#2a2a2a' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleCopyMessage(message.content)}
                            className="flex items-center gap-1.5 px-3 py-2 text-[#bababa] hover:text-white text-sm transition-all duration-200 rounded-md"
                          >
                            <Copy size={14} />
                            Copy
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: '#2a2a2a' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEditMessage(message.id, message.content)}
                            className="flex items-center gap-1.5 px-3 py-2 text-[#bababa] hover:text-white text-sm transition-all duration-200 rounded-md"
                          >
                            <Edit3 size={14} />
                            Edit
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ backgroundColor: '#2a2a2a' }}
                    className="bg-[#242424] relative rounded-lg shrink-0 transition-colors duration-200"
                  >
                    <div className="flex flex-row items-center justify-center relative size-full">
                      <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[16px] relative w-full">
                        <div className="basis-0 grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left">
                          <div className="leading-[1.5]">
                            {formatMessageContent(message.content)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* AI message action buttons on hover - only Copy */}
                    <AnimatePresence>
                      {!message.isUser && hoveredMessageId === message.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: -5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: -5 }}
                          className="absolute -bottom-12 left-0 flex gap-2 bg-[#1a1a1a] border border-[#3d3d3d] rounded-lg p-2 shadow-lg z-10"
                        >
                          <motion.button
                            whileHover={{ scale: 1.1, backgroundColor: '#2a2a2a' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleCopyMessage(message.content)}
                            className="flex items-center gap-1.5 px-3 py-2 text-[#bababa] hover:text-white text-sm transition-all duration-200 rounded-md"
                          >
                            <Copy size={14} />
                            Copy
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>

              {message.isUser && (
                <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0">
                  <div className="relative shrink-0 size-8">
                    <img
                      className="block max-w-none size-full rounded-full"
                      height="32"
                      src={imgEllipse5}
                      width="32"
                      alt="User Avatar"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="box-border content-stretch flex flex-row gap-2.5 items-end justify-start p-0 relative shrink-0 w-full"
            >
              <div className="bg-center bg-cover bg-no-repeat h-8 shrink-0 w-[33px]" style={{ backgroundImage: `url('${imgImage21}')` }} />
              <div className="bg-[#242424] relative rounded-lg shrink-0 p-4">
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    className="w-2 h-2 bg-white/50 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-2 h-2 bg-white/50 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    className="w-2 h-2 bg-white/50 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>
    );
  };

  const renderInput = () => (
    <div className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-[900px] max-w-full"
      >
        <div className="basis-0 bg-[#242424] grow min-h-px min-w-px relative rounded-bl-[12px] rounded-tl-[12px] shrink-0">
          <div className="flex flex-row items-center relative size-full">
            <div className="box-border content-stretch flex flex-row items-center justify-between p-[20px] relative w-full">
              <input
                ref={inputRef}
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
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-[#bababa] font-['Lufga:Regular',_sans-serif] text-[16px]"
              />
              <div className="box-border content-stretch flex flex-row gap-4 items-center justify-end p-0 relative shrink-0">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative shrink-0 size-6"
                >
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
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
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
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
          whileHover={{ scale: inputValue.trim() && !isTyping ? 1.05 : 1 }}
          whileTap={{ scale: inputValue.trim() && !isTyping ? 0.95 : 1 }}
          className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center overflow-clip p-[18px] relative rounded-br-[12px] rounded-tr-[12px] self-stretch shrink-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{
            backgroundImage: "linear-gradient(90.4065deg, rgb(94, 151, 255) 13.302%, rgb(23, 56, 222) 93.324%)",
          }}
        >
          <motion.div
            animate={{ rotate: isTyping ? 360 : 0 }}
            transition={{ duration: 1, repeat: isTyping ? Infinity : 0, ease: "linear" }}
            className="relative shrink-0 size-6"
          >
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g id="startContent">
                <path d={svgPaths.p4cb0f00} fill="white" id="Vector" />
              </g>
            </svg>
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );

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
        
        <div className="basis-0 bg-neutral-900 grow h-full min-h-px min-w-px relative shrink-0">
          <div className="flex flex-col items-center justify-center overflow-hidden relative size-full">
            <div className="box-border content-stretch flex flex-col items-center justify-center p-[40px] relative size-full">
              {/* Frost glass background effect */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Heavily blurred background image */}
                <div 
                  className="absolute inset-0 opacity-10 blur-2xl"
                  style={{
                    backgroundImage: `url(${backgroundOverlay})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                ></div>
                
                {/* #171717 color overlay */}
                <div 
                  className="absolute inset-0 mix-blend-overlay"
                  style={{ backgroundColor: '#171717', opacity: 0.15 }}
                ></div>
              </div>
              
              {/* Content with frost glass effect */}
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center backdrop-blur-[1px]">
                {renderMessages()}
                {renderInput()}
              </div>
            </div>
          </div>
        </div>

        <RightSidebar 
          isCollapsed={rightSidebarCollapsed}
          onToggle={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
        />
      </div>

      {/* My Account Modal */}
      <AnimatePresence>
        {showMyAccount && (
          <MyAccount
            user={user}
            isOpen={showMyAccount}
            onClose={() => setShowMyAccount(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}