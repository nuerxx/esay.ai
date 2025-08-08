import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [processingStatus, setProcessingStatus] = useState(null);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Upload',
      path: '/video-upload-and-analysis',
      icon: 'Upload',
      tooltip: 'Upload and analyze videos'
    },
    {
      label: 'Processing',
      path: '/ai-processing-status',
      icon: 'Cpu',
      tooltip: 'View AI processing status'
    },
    {
      label: 'Library',
      path: '/generated-clips-library',
      icon: 'Library',
      tooltip: 'Manage generated clips'
    },
    {
      label: 'Analytics',
      path: '/analytics-dashboard',
      icon: 'BarChart3',
      tooltip: 'View performance analytics'
    }
  ];

  const secondaryItems = [
    {
      label: 'YouTube Integration',
      path: '/you-tube-channel-integration',
      icon: 'Youtube',
      tooltip: 'Connect YouTube channel'
    },
    {
      label: 'Clip Editor',
      path: '/video-clip-editor',
      icon: 'Scissors',
      tooltip: 'Edit video clips'
    }
  ];

  useEffect(() => {
    // Simulate processing status updates
    const interval = setInterval(() => {
      const statuses = [null, 'processing', 'completed', 'error'];
      const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
      setProcessingStatus(randomStatus);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const renderProcessingIndicator = () => {
    if (!processingStatus || processingStatus === 'completed') return null;

    const statusConfig = {
      processing: {
        color: 'text-accent',
        bgColor: 'bg-accent/10',
        icon: 'Loader2',
        text: 'Processing...',
        animate: 'animate-spin'
      },
      error: {
        color: 'text-error',
        bgColor: 'bg-error/10',
        icon: 'AlertCircle',
        text: 'Error',
        animate: ''
      }
    };

    const config = statusConfig?.[processingStatus];
    if (!config) return null;

    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${config?.bgColor} ${config?.color}`}>
        <Icon 
          name={config?.icon} 
          size={16} 
          className={config?.animate}
        />
        <span className="text-sm font-medium hidden sm:inline">
          {config?.text}
        </span>
      </div>
    );
  };

  const renderLogo = () => (
    <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
      <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center">
        <Icon name="Scissors" size={20} color="white" />
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-semibold text-foreground">ClipCraft AI</h1>
        <p className="text-xs text-muted-foreground -mt-1">Video Content Creation</p>
      </div>
    </Link>
  );

  const renderNavigationItem = ({ label, path, icon, tooltip }, isMobile = false) => {
    const isActive = isActiveRoute(path);
    const baseClasses = isMobile
      ? "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left" :"flex items-center gap-2 px-4 py-2 rounded-lg transition-colors";
    
    const activeClasses = isActive
      ? "bg-accent text-accent-foreground"
      : "text-muted-foreground hover:text-foreground hover:bg-muted";

    return (
      <Link
        key={path}
        to={path}
        onClick={isMobile ? closeMobileMenu : undefined}
        className={`${baseClasses} ${activeClasses}`}
        title={tooltip}
      >
        <Icon name={icon} size={isMobile ? 20 : 18} />
        <span className={`font-medium ${isMobile ? 'text-base' : 'text-sm'}`}>
          {label}
        </span>
      </Link>
    );
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-100 bg-card border-b border-border ${className}`}>
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          {renderLogo()}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems?.map(item => renderNavigationItem(item))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Processing Status Indicator */}
            {renderProcessingIndicator()}

            {/* More Menu - Desktop */}
            <div className="hidden lg:block relative group">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreHorizontal"
                className="text-muted-foreground hover:text-foreground"
              >
                More
              </Button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-floating opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-150">
                <div className="p-2">
                  {secondaryItems?.map(item => renderNavigationItem(item))}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              onClick={handleMobileMenuToggle}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-200 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-16 left-0 right-0 bg-card border-b border-border shadow-floating animate-slide-in-right">
            <nav className="p-4 space-y-2">
              {/* Primary Navigation */}
              <div className="space-y-1">
                {navigationItems?.map(item => renderNavigationItem(item, true))}
              </div>
              
              {/* Divider */}
              <div className="border-t border-border my-4" />
              
              {/* Secondary Navigation */}
              <div className="space-y-1">
                {secondaryItems?.map(item => renderNavigationItem(item, true))}
              </div>
            </nav>
          </div>
        </div>
      )}
      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
};

export default Header;