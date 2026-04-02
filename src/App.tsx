import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import InteractiveSignUp from './components/InteractiveSignUp';
import InteractiveLogin from './components/InteractiveLogin';
import EnhancedChatScreen from './components/EnhancedChatScreen';
import MyTeam from './components/MyTeam';
import Integration from './components/Integration';
import ChatSkeleton from './components/ChatSkeleton';
import TeamSkeleton from './components/TeamSkeleton';
import IntegrationSkeleton from './components/IntegrationSkeleton';

interface User {
  name: string;
  email: string;
}

type AuthMode = 'login' | 'register';
type View = 'auth' | 'chat' | 'team' | 'integration';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('auth');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingView, setLoadingView] = useState<View | null>(null);

  // Simulate loading when navigating
  const handleNavigation = (targetView: View) => {
    setIsLoading(true);
    setLoadingView(targetView);
    
    // Simulate loading time
    setTimeout(() => {
      setCurrentView(targetView);
      setIsLoading(false);
      setLoadingView(null);
    }, 800); // 800ms loading time for realistic effect
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    handleNavigation('chat');
  };

  const handleSignUp = (userData: User) => {
    setUser(userData);
    handleNavigation('chat');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('auth');
    setAuthMode('login');
  };

  const handleNavigateToTeam = () => {
    handleNavigation('team');
  };

  const handleNavigateToChat = () => {
    handleNavigation('chat');
  };

  const handleNavigateToIntegration = () => {
    handleNavigation('integration');
  };

  const handleSwitchToLogin = () => {
    setAuthMode('login');
  };

  const handleSwitchToRegister = () => {
    setAuthMode('register');
  };

  const renderSkeleton = (view: View) => {
    switch (view) {
      case 'chat':
        return <ChatSkeleton />;
      case 'team':
        return <TeamSkeleton />;
      case 'integration':
        return <IntegrationSkeleton />;
      default:
        return <ChatSkeleton />;
    }
  };

  return (
    <div className="size-full bg-neutral-900 overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Show loading skeleton when navigating */}
        {isLoading && loadingView && (
          <motion.div
            key={`loading-${loadingView}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.2,
              ease: "easeInOut"
            }}
            className="size-full bg-neutral-900"
          >
            {renderSkeleton(loadingView)}
          </motion.div>
        )}

        {/* Auth Pages */}
        {!isLoading && currentView === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ 
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="size-full bg-neutral-900"
          >
            {authMode === 'login' ? (
              <InteractiveLogin 
                onLogin={handleLogin} 
                onSwitchToRegister={handleSwitchToRegister}
              />
            ) : (
              <InteractiveSignUp 
                onSignUp={handleSignUp} 
                onSwitchToLogin={handleSwitchToLogin}
              />
            )}
          </motion.div>
        )}
        
        {/* Chat Page */}
        {!isLoading && currentView === 'chat' && user && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ 
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="size-full bg-neutral-900"
          >
            <EnhancedChatScreen
              user={user}
              onLogout={handleLogout}
              onNavigateToTeam={handleNavigateToTeam}
              onNavigateToChat={handleNavigateToChat}
              onNavigateToIntegration={handleNavigateToIntegration}
              currentView="chat"
            />
          </motion.div>
        )}
        
        {/* Team Page */}
        {!isLoading && currentView === 'team' && user && (
          <motion.div
            key="team"
            initial={{ opacity: 0, scale: 0.98, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.02, x: 10 }}
            transition={{ 
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="size-full bg-neutral-900"
          >
            <MyTeam
              user={user}
              onLogout={handleLogout}
              onNavigateToChat={handleNavigateToChat}
              onNavigateToTeam={handleNavigateToTeam}
              onNavigateToIntegration={handleNavigateToIntegration}
              currentView="team"
            />
          </motion.div>
        )}
        
        {/* Integration Page */}
        {!isLoading && currentView === 'integration' && user && (
          <motion.div
            key="integration"
            initial={{ opacity: 0, scale: 0.98, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 1.02, x: -10 }}
            transition={{ 
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="size-full bg-neutral-900"
          >
            <Integration
              user={user}
              onLogout={handleLogout}
              onNavigateToChat={handleNavigateToChat}
              onNavigateToTeam={handleNavigateToTeam}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}