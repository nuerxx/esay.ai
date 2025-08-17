import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [processingStatus, setProcessingStatus] = useState(null);
  
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);

  const navigationItems = [
    {
      label: 'رفع',
      path: '/video-upload-and-analysis',
      icon: 'Upload',
      tooltip: 'رفع وتحليل مقاطع الفيديو'
    },
    {
      label: 'معالجة',
      path: '/ai-processing-status',
      icon: 'Cpu',
      tooltip: 'عرض حالة المعالجة بالذكاء الاصطناعي'
    },
    {
      label: 'المكتبة',
      path: '/generated-clips-library',
      icon: 'Library',
      tooltip: 'إدارة المقاطع المنشأة'
    },
    {
      label: 'تحليلات',
      path: '/analytics-dashboard',
      icon: 'BarChart3',
      tooltip: 'عرض تحليلات الأداء'
    }
  ];

  const secondaryItems = [
    {
      label: 'ربط يوتيوب',
      path: '/you-tube-channel-integration',
      icon: 'Youtube',
      tooltip: 'ربط قناة يوتيوب'
    },
    {
      label: 'محرر المقاطع',
      path: '/video-clip-editor',
      icon: 'Scissors',
      tooltip: 'تحرير مقاطع الفيديو'
    }
  ];

  // Effect for handling clicks outside the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Effect for handling Escape key to close dropdown
  useEffect(() => {
    function handleKeyDown(event) {
        if (event.key === 'Escape') {
            setIsDropdownOpen(false);
            dropdownButtonRef.current?.focus();
        }
    }
    if (isDropdownOpen) {
        document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);


  useEffect(() => {
    // Simulate processing status updates
    const interval = setInterval(() => {
      const statuses = [null, 'processing', 'completed', 'error'];
      const randomStatus = statuses?.[Math.floor(Math.random() * statuses.length)];
      setProcessingStatus(randomStatus);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

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
        text: 'جاري المعالجة...','
        animate: 'animate-spin'
      },
      error: {
        color: 'text-error',
        bgColor: 'bg-error/10',
        icon: 'AlertCircle',
        text: 'خطأ',
        animate: ''
      }
    };

    const config = statusConfig?.[processingStatus];
    if (!config) return null;

    return (
      <div role="status" aria-live="polite" className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${config?.bgColor} ${config?.color}`}> 
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
        <p className="text-xs text-muted-foreground -mt-1">صناعة محتوى الفيديو</p>
      </div>
    </Link>
  );

  const renderNavigationItem = ({ label, path, icon, tooltip }, isMobile = false) => {
    const navLinkClasses = ({ isActive }) =>
      `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }`;

    const mobileNavLinkClasses = ({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }`;

    return (
      <NavLink
        key={path}
        to={path}
        onClick={isMobile ? closeMobileMenu : undefined}
        className={isMobile ? mobileNavLinkClasses : navLinkClasses}
        title={tooltip}
      >
        <Icon name={icon} size={isMobile ? 20 : 18} />
        <span className={`font-medium ${isMobile ? 'text-base' : 'text-sm'}`}> 
          {label}
        </span>
      </NavLink>
    );
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 bg-card border-b border-border ${className}`}> 
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
            <div className="hidden lg:block relative" ref={dropdownRef}> 
              <Button
                ref={dropdownButtonRef}
                variant="ghost"
                size="sm"
                iconName="MoreHorizontal"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                المزيد
              </Button>
              
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-floating z-40"
                  role="menu"
                >
                  <div className="p-2"> 
                    {secondaryItems?.map(item => renderNavigationItem(item))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              iconName={isMobileMenuOpen ? "X" : "Menu"}
              onClick={handleMobileMenuToggle}
              className="lg:hidden text-muted-foreground hover:text-foreground"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            />
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" aria-modal="true"> 
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          
          {/* Menu Panel */}
          <div id="mobile-menu" className="absolute top-16 left-0 right-0 bg-card border-b border-border shadow-floating animate-slide-in-right"> 
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