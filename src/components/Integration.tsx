import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight, ChevronRight, X, Trash2 } from 'lucide-react';
import MyAccount from './MyAccount';
import RightSidebar from './RightSidebar';
import image_3ef263db317d5c6e68957531ee8a3bcfd7c756f0 from 'figma:asset/3ef263db317d5c6e68957531ee8a3bcfd7c756f0.png';
import newChatButton from "figma:asset/8cecfaee86d1066290f841467b55f916e25eca37.png";
import chatSvgPaths from "../imports/svg-rqybbzeg0p";
import svgPaths from "../imports/svg-8366bqy2fm";
import imgAvatarStyle6 from "figma:asset/d7437995b6aeee65e7688cd80dd4ddfdd456da5a.png";
import imgRectangle361 from "figma:asset/e80f72af031e0117652b171d72e158b0db6a8a5a.png";
import imgRectangle362 from "figma:asset/478eee41cc5e663173e0bba9422f2e4245b2b8a4.png";
import imgRectangle363 from "figma:asset/25b2edec8639728f4c564db26abc8f9c5e42acf7.png";
import imgRectangle364 from "figma:asset/d92e39fe5c2d8dd831ca697b46a4f0f8144685bb.png";
import imgRectangle365 from "figma:asset/7d066b66f18821e191b622c61d170cf0ff553261.png";
import imgRectangle366 from "figma:asset/9ae3b67fa4db653473261ebdc3b6961a149009fd.png";
import imgRectangle367 from "figma:asset/e1c2de86a6ced7ee9dc44467bad64b202b602e5d.png";
import imgRectangle368 from "figma:asset/fd9f029c6e5493ba9e6fc3b928e38047e9f66920.png";
import imgRectangle369 from "figma:asset/dbe63475572551ff5807e6631b4300777b610fd6.png";
import imgRectangle370 from "figma:asset/f08a3b9dd0a74422fa531427b217f2ba6f3068b9.png";
import imgRectangle371 from "figma:asset/91a858287b7402128090d7ccb06fdaee5e631146.png";
import imgRectangle372 from "figma:asset/711891199587b1940e56ae7b6be5f5780352bc21.png";
import imgRectangle373 from "figma:asset/ec7b8df14f756d83857042cbb6cb687a9bee55fb.png";
import imgRectangle374 from "figma:asset/4cb445adb24ab18d4cc92fd46411920c0ed1b879.png";
import imgRectangle375 from "figma:asset/59938a13d90e2cd15181b6644314a5625a557e96.png";
import logoImage from "figma:asset/216d05b2dad1126a3e864df88d0bdb14f3f35226.png";
import collapsedLogo from "figma:asset/40dc5bac9301a9a5763ff19bf5c3931ef01b3806.png";
import closeIcon from "figma:asset/c7ad4869719e16a20ed4f5c83f130d58fd3e2d26.png";
import logoutIcon from "figma:asset/0be9508ee8b1516020108e64d4c3e3d281c84dc4.png";
import svgPopupPaths from "../imports/svg-15ca0lyozk";

interface User {
  name: string;
  email: string;
}

interface ChatSession {
  id: string;
  title: string;
  messages: any[];
  lastMessage?: string;
}

interface IntegrationProps {
  onNavigateToChat: () => void;
  onNavigateToTeam: () => void;
  user?: User;
  onLogout?: () => void;
}

// Integration data
const integrationData = [
  { name: 'OpenAI', image: imgRectangle361, status: 'success' },
  { name: 'Anthropic', image: imgRectangle362, status: 'success' },
  { name: 'Gemini', image: imgRectangle363, status: 'success' },
  { name: 'Deepseek', image: imgRectangle364, status: 'success' },
  { name: 'Datadog', image: imgRectangle365, status: 'success' },
  { name: 'Sentry', image: imgRectangle366, status: 'success' },
  { name: 'New Relic', image: imgRectangle367, status: 'success' },
  { name: 'Appdynamics', image: imgRectangle368, status: 'success' },
  { name: 'Honeycomb.io', image: imgRectangle369, status: 'success' },
  { name: 'Opsgenie', image: imgRectangle370, status: 'failure' },
  { name: 'Slack', image: imgRectangle371, status: 'failure' },
  { name: 'Asana', image: imgRectangle372, status: 'failure' },
  { name: 'Atlassian', image: imgRectangle373, status: 'failure' },
  { name: 'OpenTelemetry', image: imgRectangle374, status: 'failure' },
  { name: 'Pagerduty', image: imgRectangle375, status: 'failure' },
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

export default function Integration({ onNavigateToChat, onNavigateToTeam, user, onLogout }: IntegrationProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [authMethod, setAuthMethod] = useState<'api-key' | 'credentials'>('api-key');
  const [apiKeys, setApiKeys] = useState<string[]>(['sk_9a8b7c6d5e4f3g2h1i0j', 'sk_9a8b7c6d5e4f3g2h1i0j']);
  const [newApiKey, setNewApiKey] = useState('');
  const [showMyAccount, setShowMyAccount] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(true);
  const [chatSessions] = useState<ChatSession[]>(sampleChatSessions);
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string>('');

  const handleIntegrationClick = (integration: any) => {
    setSelectedIntegration(integration);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedIntegration(null);
    setApiKeys(['sk_9a8b7c6d5e4f3g2h1i0j', 'sk_9a8b7c6d5e4f3g2h1i0j']); // Reset to default
    setNewApiKey('');
  };

  const handleSaveKeys = () => {
    // Here you would save the API keys to your backend/storage
    console.log('Saving API keys:', apiKeys);
    handleClosePopup();
  };

  const handleAddApiKey = () => {
    if (newApiKey.trim()) {
      setApiKeys([...apiKeys, newApiKey.trim()]);
      setNewApiKey('');
    }
  };

  const handleDeleteApiKey = (index: number) => {
    setApiKeys(apiKeys.filter((_, i) => i !== index));
  };

  const handleChatSelect = (chatId: string) => {
    setActiveChatId(chatId);
    onNavigateToChat();
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
                          delay: 0
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
        {/* My Team Icon */}
        <div className="relative shrink-0 w-full">
          <motion.button
            onClick={onNavigateToTeam}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', scale: sidebarCollapsed ? 1.05 : 1 }}
            className={`box-border content-stretch flex flex-row gap-2.5 items-center ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'justify-center px-3 py-4'} relative shrink-0 w-full ${sidebarCollapsed ? 'rounded-lg' : 'mx-2 rounded-lg'}`}
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
                  className="basis-0 flex flex-col grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left font-medium"
                >
                  <p className="block leading-[normal]">My Team</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Integration Icon - Active State */}
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
                        <p className="block leading-none whitespace-pre">{user?.name || 'Adela Parkson'}</p>
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

  const IntegrationCard = ({ integration, index }: { integration: any; index: number }) => (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => handleIntegrationClick(integration)}
      className="bg-[#242424] relative rounded-xl shrink-0 cursor-pointer flex-1 min-w-0"
      style={{ flexBasis: 'calc(33.33% - 13.33px)' }}
    >
      <div className="flex flex-col justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-center px-6 py-5 relative size-full">
          <div className="box-border content-stretch flex flex-row gap-4 items-center justify-center p-0 relative shrink-0">
            <div
              className="bg-center bg-cover bg-no-repeat relative rounded-[80px] shrink-0 size-20"
              style={{ backgroundImage: `url('${integration.image}')` }}
            >
              <div className="absolute border-2 border-[#ffffff] border-solid inset-0 pointer-events-none rounded-[80px]" />
            </div>
            <div className="box-border content-stretch flex flex-col gap-1.5 items-start justify-center p-0 relative shrink-0">
              <div className="leading-[0] not-italic relative shrink-0 text-[20px] text-center text-neutral-50 text-nowrap font-semibold">
                <p className="block leading-[32px] truncate">{integration.name}</p>
              </div>
              <div className={`${integration.status === 'success' ? 'bg-[#44a12c]' : 'bg-[#9b2026]'} box-border content-stretch flex flex-row gap-4 h-6 items-center justify-center p-[8px] relative rounded shrink-0`}>
                <div className="leading-[0] not-italic relative shrink-0 text-[12px] text-left text-neutral-50 text-nowrap font-medium">
                  <p className="block leading-[normal] whitespace-pre">{integration.status === 'success' ? 'Success' : 'Failure'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
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
                    <p className="block leading-[normal]">Integration</p>
                  </div>
                </motion.div>

                {/* Integration Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full"
                >
                  <div className="relative size-full">
                    <div className="box-border content-stretch flex flex-col gap-5 items-start justify-start p-0 relative size-full">
                      <div className="box-border content-stretch flex flex-row gap-5 items-start justify-start p-0 relative shrink-0 w-full flex-wrap">
                        {useMemo(() => 
                          integrationData.map((integration, index) => (
                            <IntegrationCard key={integration.name} integration={integration} index={index} />
                          )), []
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </div>
        </div>

        <RightSidebar 
          isCollapsed={rightSidebarCollapsed}
          onToggle={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
        />
      </div>

      {/* Integration Popup - Updated to match MyTeam style */}
      <AnimatePresence>
        {showPopup && selectedIntegration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleClosePopup}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#242424] border border-[#3d3d3d] rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-2xl"
            >
              {/* Close Button */}
              <motion.button
                onClick={handleClosePopup}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <X size={18} />
              </motion.button>

              {/* Integration Info */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-white"
                  style={{ backgroundImage: `url('${selectedIntegration.image}')` }}
                />
                <div>
                  <h2 className="text-xl font-semibold text-white">{selectedIntegration.name}</h2>
                  <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    selectedIntegration.status === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                  }`}>
                    {selectedIntegration.status === 'success' ? 'Connected' : 'Disconnected'}
                  </div>
                </div>
              </div>

              {/* Auth Method Tabs */}
              <div className="flex mb-6 bg-[#1a1a1a] rounded-lg p-1">
                <motion.button
                  onClick={() => setAuthMethod('api-key')}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    authMethod === 'api-key'
                      ? 'bg-[#5e97ff] text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  API Key
                </motion.button>
                <motion.button
                  onClick={() => setAuthMethod('credentials')}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    authMethod === 'credentials'
                      ? 'bg-[#5e97ff] text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Credentials
                </motion.button>
              </div>

              {/* API Keys Section */}
              {authMethod === 'api-key' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="space-y-3">
                    {apiKeys.map((key, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-[#3d3d3d]"
                      >
                        <code className="flex-1 text-sm text-white/80 font-mono truncate">
                          {key}
                        </code>
                        <motion.button
                          onClick={() => handleDeleteApiKey(index)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Add New API Key */}
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={newApiKey}
                      onChange={(e) => setNewApiKey(e.target.value)}
                      placeholder="Enter new API key..."
                      className="w-full p-3 bg-[#1a1a1a] border border-[#3d3d3d] rounded-lg text-white placeholder-white/50 focus:border-[#5e97ff] focus:outline-none transition-colors"
                    />
                    <motion.button
                      onClick={handleAddApiKey}
                      disabled={!newApiKey.trim()}
                      whileHover={newApiKey.trim() ? { scale: 1.02 } : {}}
                      whileTap={newApiKey.trim() ? { scale: 0.98 } : {}}
                      className="w-full flex items-center justify-center gap-2 py-3 disabled:bg-[#3d3d3d] disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                      style={newApiKey.trim() ? {
                        backgroundImage: "linear-gradient(92.946deg, rgb(94, 151, 255) 13.302%, rgb(23, 56, 222) 93.324%)",
                      } : {}}
                    >
                      <Plus size={16} />
                      Add API Key
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Credentials Section */}
              {authMethod === 'credentials' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Username</label>
                    <input
                      type="text"
                      placeholder="Enter username"
                      className="w-full p-3 bg-[#1a1a1a] border border-[#3d3d3d] rounded-lg text-white placeholder-white/50 focus:border-[#5e97ff] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Password</label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="w-full p-3 bg-[#1a1a1a] border border-[#3d3d3d] rounded-lg text-white placeholder-white/50 focus:border-[#5e97ff] focus:outline-none transition-colors"
                    />
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <motion.button
                  onClick={handleClosePopup}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 border border-[#3d3d3d] text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleSaveKeys}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 text-white rounded-lg transition-colors font-medium"
                  style={{
                    backgroundImage: "linear-gradient(92.946deg, rgb(94, 151, 255) 13.302%, rgb(23, 56, 222) 93.324%)",
                  }}
                >
                  Save Configuration
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
            user={user || { name: 'Adela Parkson', email: 'adela.parkson@company.com' }}
            isOpen={showMyAccount}
            onClose={() => setShowMyAccount(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}