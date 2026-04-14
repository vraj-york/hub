import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, X, ChevronRight, ArrowRight } from 'lucide-react';
import { toast, Toaster } from 'sonner@2.0.3';
import MyAccount from './MyAccount';
import RightSidebar from './RightSidebar';
import svgPaths from "../imports/svg-80o7pepquz";
import imgATechSavyPerson from "figma:asset/fd4e0bfdd8dc15a537e6c26544ebc427436124af.png";
import imgAvatarStyle6 from "figma:asset/d7437995b6aeee65e7688cd80dd4ddfdd456da5a.png";
import imgSoftwareEngineerPerson from "figma:asset/153364a65ebb1b5d1bb232910bb4df80caa3b006.png";
import imgSoftwareEngineerPerson1 from "figma:asset/ecbbd689a56e3d7136dc7738d196db1315cd6c7d.png";
import imgSoftwareEngineerPerson2 from "figma:asset/31f62cd5690bb38f4ac00a2879b8699814e43509.png";
import imgATechSavyPerson1 from "figma:asset/ca274748ca5b9834d74a38e7a6599c21e2b08a84.png";
import imgATechSavyPerson2 from "figma:asset/26c957a24715ab591e9364fcb86cb83cc102a2ae.png";
import imgATechSavyPerson3 from "figma:asset/4cc6445df51624707c96e60185ab5ef499b6a9b0.png";
import imgATechSavyPerson4 from "figma:asset/50a98b65629c4740f23a48556dc434eec2c2615d.png";
import imgATechSavyPerson5 from "figma:asset/7604f13425bea3b2660b357e1aa04d550210d086.png";
import imgATechSavyPerson6 from "figma:asset/3c04b967f87d30b9eacda1b203c95cb577c5fe43.png";
import imgATechSavyPerson7 from "figma:asset/9a05f11b2c11ab6f7eab79040a237d111605aa54.png";
import imgATechSavyPerson8 from "figma:asset/daab52000f3f4518dda32284ba176db12877d330.png";

// Import sidebar assets from EnhancedChatScreen
import image_3ef263db317d5c6e68957531ee8a3bcfd7c756f0 from 'figma:asset/3ef263db317d5c6e68957531ee8a3bcfd7c756f0.png';
import logoImage from "figma:asset/216d05b2dad1126a3e864df88d0bdb14f3f35226.png";
import collapsedLogo from "figma:asset/40dc5bac9301a9a5763ff19bf5c3931ef01b3806.png";
import closeIcon from "figma:asset/c7ad4869719e16a20ed4f5c83f130d58fd3e2d26.png";
import logoutIcon from "figma:asset/0be9508ee8b1516020108e64d4c3e3d281c84dc4.png";
import chatSvgPaths from "../imports/svg-rqybbzeg0p";

interface User {
  name: string;
  email: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: any[];
  lastMessage?: string;
}

interface MyTeamProps {
  user: User;
  onLogout: () => void;
  onNavigateToChat?: () => void;
  onNavigateToTeam?: () => void;
  onNavigateToIntegration?: () => void;
  currentView?: string;
}

const initialTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@company.com',
    role: 'Admin',
    avatar: imgSoftwareEngineerPerson
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus.j@company.com',
    role: 'User',
    avatar: imgSoftwareEngineerPerson1
  },
  {
    id: '3',
    name: 'Lisa Wang',
    email: 'lisa.wang@company.com',
    role: 'User',
    avatar: imgSoftwareEngineerPerson2
  },
  {
    id: '4',
    name: 'David Miller',
    email: 'david.m@company.com',
    role: 'User',
    avatar: imgATechSavyPerson1
  },
  {
    id: '5',
    name: 'Jessica Brown',
    email: 'jessica.b@company.com',
    role: 'Admin',
    avatar: imgATechSavyPerson2
  },
  {
    id: '6',
    name: 'Alex Rodriguez',
    email: 'alex.r@company.com',
    role: 'User',
    avatar: imgATechSavyPerson3
  },
  {
    id: '7',
    name: 'Emily Davis',
    email: 'emily.d@company.com',
    role: 'User',
    avatar: imgATechSavyPerson4
  },
  {
    id: '8',
    name: 'James Wilson',
    email: 'james.w@company.com',
    role: 'User',
    avatar: imgATechSavyPerson5
  }
];

// Sample chat sessions for consistency
const sampleChatSessions: ChatSession[] = [
  {
    id: '1',
    title: 'Help me rewrite this email profession...',
    messages: []
  },
  {
    id: '2',
    title: 'How do I explain this product to non...',
    messages: []
  },
  {
    id: '3',
    title: 'Give me smart questions to ask in a ...',
    messages: []
  },
  {
    id: '4',
    title: 'Draft a project timeline for MVP launch',
    messages: []
  },
  {
    id: '5',
    title: 'What\'s a better way to phrase this UX...',
    messages: []
  },
  {
    id: '6',
    title: 'How to turn a spreadsheet into a dash...',
    messages: []
  },
  {
    id: '7',
    title: 'The advantages of Artificial Intelligence',
    messages: []
  }
];

export default function MyTeam({
  user,
  onLogout,
  onNavigateToChat,
  onNavigateToTeam,
  onNavigateToIntegration
}: MyTeamProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    role: 'User'
  });
  const [showMyAccount, setShowMyAccount] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(true);
  const [chatSessions] = useState<ChatSession[]>(sampleChatSessions);
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string>('');

  const handleAddMember = () => {
    if (!newMember.name.trim() || !newMember.email.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newMember.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    const member: TeamMember = {
      id: Date.now().toString(),
      name: newMember.name.trim(),
      email: newMember.email.trim(),
      role: newMember.role,
      avatar: imgATechSavyPerson // Default avatar
    };

    setTeamMembers(prev => [...prev, member]);
    setNewMember({ name: '', email: '', role: 'User' });
    setShowAddForm(false);
    toast.success('Team member added successfully!');
  };

  const handleDeleteMember = (memberId: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== memberId));
    toast.success('Team member removed');
  };

  const handleChatSelect = (chatId: string) => {
    setActiveChatId(chatId);
    onNavigateToChat?.();
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

      {/* Back to Chat Button */}
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
              <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative w-full hidden">
                <motion.button
                  onClick={onNavigateToChat}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-10 relative rounded-lg shrink-0 w-[272px] border border-[#5e97ff]/30 hover:border-[#5e97ff] hover:bg-[#5e97ff]/10 transition-all duration-200"
                >
                  <div className="flex flex-row items-center justify-center relative size-full">
                    <div className="box-border content-stretch flex flex-row gap-1.5 h-10 items-center justify-center p-[12px] relative w-full">
                      <motion.div
                        whileHover={{ x: -2 }}
                        className="relative size-[18px]"
                      >
                        <ArrowRight size={18} className="text-white rotate-180" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap font-semibold"
                      >
                        <p className="block leading-[normal] whitespace-pre">Back to Chat</p>
                      </motion.div>
                    </div>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  onClick={onNavigateToChat}
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
                        className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap font-semibold"
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
            className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full overflow-hidden"
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

      {/* Bottom Icons Section */}
      <div className={`box-border content-stretch flex flex-col items-center justify-start ${sidebarCollapsed ? 'px-2 gap-6' : 'px-5 gap-4'} relative w-full pb-6`}>
        {/* My Team Icon - Active State */}
        <div className="relative shrink-0 w-full">
          <motion.button
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', scale: sidebarCollapsed ? 1.05 : 1 }}
            className={`box-border content-stretch flex flex-row gap-2.5 items-center ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'justify-center px-3 py-4'} relative shrink-0 w-full bg-[#5e97ff]/10 ${sidebarCollapsed ? 'rounded-lg' : 'mx-2 rounded-lg'}`}
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
                    <path d={chatSvgPaths.p3df34f00} fill="white" />
                    <path d={chatSvgPaths.p10e2d200} fill="white" />
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
                  className="basis-0 flex flex-col grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left"
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
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', scale: sidebarCollapsed ? 1.05 : 1 }}
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
                  className="basis-0 flex flex-col grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left"
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
                          src={logoutIcon}
                          alt="Logout"
                          className="w-5 h-5 object-contain"
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
              <div className="box-border content-stretch flex flex-col gap-5 items-start justify-start p-0 relative size-full">
              
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative shrink-0 w-full"
                >

                  <div className="basis-0 flex flex-col grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ffffff] text-[36px] text-left font-semibold">
                    <p className="block leading-[normal]">My Team</p>
                  </div>
                  
                  <motion.button
                    onClick={() => setShowAddForm(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="box-border content-stretch flex flex-row gap-1.5 h-10 items-center justify-center p-[12px] relative rounded-lg shrink-0 border border-[#5e97ff] transition-colors hover:bg-[#5e97ff]/10"
                  >
                    <Plus size={18} className="text-white" />
                    <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap font-semibold">
                      <p className="block leading-[normal] whitespace-pre">Add Member</p>
                    </div>
                  </motion.button>
                </motion.div>

                {/* Team Members Grid */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="box-border gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-0 relative shrink-0 w-full"
                >
                  <AnimatePresence>
                    {teamMembers.map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: -20 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.05,
                          type: "spring",
                          stiffness: 300,
                          damping: 30
                        }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        onMouseEnter={() => setHoveredMember(member.id)}
                        onMouseLeave={() => setHoveredMember(null)}
                        className="bg-[#242424] relative rounded-xl shrink-0 cursor-pointer"
                      >
                        <div className="flex flex-col items-center justify-center relative size-full">
                          <div className="box-border content-stretch flex flex-col gap-4 items-center justify-center px-4 py-6 relative size-full">
                            
                            {/* Avatar and Info */}
                            <div className="box-border content-stretch flex flex-col gap-4 items-center justify-start p-0 relative shrink-0">
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="relative shrink-0 size-20"
                              >
                                <img
                                  className="block max-w-none size-full rounded-full border-2 border-[#5e97ff]/30"
                                  height="80"
                                  src={member.avatar}
                                  width="80"
                                  alt={member.name}
                                />
                              </motion.div>
                              
                              <div className="box-border content-stretch flex flex-col gap-0.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-center text-neutral-50 text-nowrap">
                                <div className="relative shrink-0 text-[20px] font-semibold">
                                  <p className="block leading-[32px] text-nowrap whitespace-pre">
                                    {member.name}
                                  </p>
                                </div>
                                <div className="opacity-50 relative shrink-0 text-[12px]">
                                  <p className="block leading-[normal] text-nowrap whitespace-pre">
                                    {member.email}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Role Badge */}
                            <div className="leading-[0] max-w-[164px] not-italic relative shrink-0 text-[#5e97ff] text-[14px] text-center w-[164px]">
                              <motion.span
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  member.role === 'Admin' 
                                    ? 'bg-[#5e97ff]/20 text-[#5e97ff]' 
                                    : 'bg-gray-600/20 text-gray-300'
                                }`}
                              >
                                {member.role}
                              </motion.span>
                            </div>
                            
                            {/* Delete Button */}
                            <AnimatePresence>
                              {hoveredMember === member.id && (
                                <motion.button
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                  whileHover={{ scale: 1.1, backgroundColor: '#ef4444' }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDeleteMember(member.id)}
                                  className="absolute bg-[#363636] box-border content-stretch flex flex-row gap-2.5 items-center justify-center right-2 p-[6px] rounded-md size-8 top-2 transition-colors hover:bg-red-500"
                                  title="Remove team member"
                                >
                                  <Trash2 size={16} className="text-white opacity-100" />
                                </motion.button>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <RightSidebar 
          isCollapsed={rightSidebarCollapsed}
          onToggle={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
        />

        {/* Add Member Modal */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setShowAddForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#242424] rounded-xl p-6 w-full max-w-md border border-[#3d3d3d]"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl text-white font-semibold">Add Team Member</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowAddForm(false)}
                    className="text-white/50 hover:text-white"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Name</label>
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-[#1a1a1a] border border-[#3d3d3d] rounded-lg px-3 py-2 text-white placeholder-white/50 focus:border-[#5e97ff] focus:outline-none"
                      placeholder="Enter team member name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Email</label>
                    <input
                      type="email"
                      value={newMember.email}
                      onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-[#1a1a1a] border border-[#3d3d3d] rounded-lg px-3 py-2 text-white placeholder-white/50 focus:border-[#5e97ff] focus:outline-none"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Role</label>
                    <select
                      value={newMember.role}
                      onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full bg-[#1a1a1a] border border-[#3d3d3d] rounded-lg px-3 py-2 text-white focus:border-[#5e97ff] focus:outline-none"
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddMember}
                    className="flex-1 bg-[#5e97ff] text-white py-2 px-4 rounded-lg hover:bg-[#4d7fee] transition-colors"
                  >
                    Add Member
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-[#3d3d3d] text-white py-2 px-4 rounded-lg hover:bg-[#4d4d4d] transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
      </div>
    </>
  );
}