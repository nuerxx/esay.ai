import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ConnectedAccountCard from './components/ConnectedAccountCard';
import YouTubeAuthFlow from './components/YouTubeAuthFlow';
import VideoGrid from './components/VideoGrid';
import AutomationSettings from './components/AutomationSettings';
import ImportHistory from './components/ImportHistory';
import DisconnectDialog from './components/DisconnectDialog';

const YouTubeChannelIntegration = () => {
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [videos, setVideos] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('accounts');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [disconnectDialog, setDisconnectDialog] = useState({ isOpen: false, accountId: null });
  const [automationSettings, setAutomationSettings] = useState({
    autoDetection: true,
    processUpdated: false,
    ignoreShorts: true,
    processingMode: 'auto',
    preferredQuality: '1080p',
    multipleClips: true,
    platformOptimization: true,
    dailyLimit: 10,
    processingDelay: 15,
    processingPriority: 'normal',
    notificationLevel: 'important',
    notifyNewVideo: true,
    notifyProcessingComplete: true,
    notifyErrors: true
  });

  // Mock data
  const mockAccounts = [
    {
      id: 'UC123456789',
      channelName: 'قناة المحتوى الإبداعي',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
      subscriberCount: 125000,
      totalVideos: 245,
      processedVideos: 89,
      status: 'active',
      lastSync: new Date(Date.now() - 3600000)
    },
    {
      id: 'UC987654321',
      channelName: 'تقنيات المستقبل',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      subscriberCount: 89000,
      totalVideos: 156,
      processedVideos: 34,
      status: 'limited',
      lastSync: new Date(Date.now() - 7200000)
    }
  ];

  const mockVideos = [
    {
      id: 'video1',
      title: 'كيفية إنشاء محتوى جذاب على وسائل التواصل الاجتماعي - دليل شامل للمبتدئين',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop',
      duration: 1245,
      viewCount: 45000,
      uploadDate: '2025-01-05',
      processingStatus: 'eligible',
      clipsGenerated: 0
    },
    {
      id: 'video2',
      title: 'أسرار النجاح في التسويق الرقمي - استراتيجيات مجربة',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
      duration: 892,
      viewCount: 32000,
      uploadDate: '2025-01-03',
      processingStatus: 'completed',
      clipsGenerated: 4
    },
    {
      id: 'video3',
      title: 'تطوير المهارات الشخصية في العصر الرقمي',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
      duration: 1567,
      viewCount: 67000,
      uploadDate: '2025-01-01',
      processingStatus: 'processing',
      clipsGenerated: 2
    },
    {
      id: 'video4',
      title: 'أدوات الذكاء الاصطناعي للمحتوى الإبداعي',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop',
      duration: 734,
      viewCount: 28000,
      uploadDate: '2024-12-28',
      processingStatus: 'error',
      clipsGenerated: 0
    }
  ];

  const mockHistory = [
    {
      id: 'hist1',
      title: 'أسرار النجاح في التسويق الرقمي - استراتيجيات مجربة',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
      duration: 892,
      status: 'completed',
      clipsGenerated: 4,
      processingTime: 420,
      processedAt: '2025-01-04T10:30:00Z',
      viewsGenerated: 15000,
      aiInsights: true
    },
    {
      id: 'hist2',
      title: 'تطوير المهارات الشخصية في العصر الرقمي',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
      duration: 1567,
      status: 'processing',
      clipsGenerated: 2,
      processingTime: 680,
      processedAt: '2025-01-02T14:15:00Z',
      viewsGenerated: 8500
    },
    {
      id: 'hist3',
      title: 'أدوات الذكاء الاصطناعي للمحتوى الإبداعي',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop',
      duration: 734,
      status: 'failed',
      clipsGenerated: 0,
      processingTime: 0,
      processedAt: '2024-12-29T09:20:00Z',
      viewsGenerated: 0,
      errorMessage: 'فشل في تحليل الصوت - جودة الصوت منخفضة'
    }
  ];

  useEffect(() => {
    // Simulate loading connected accounts
    setTimeout(() => {
      setConnectedAccounts(mockAccounts);
      if (mockAccounts?.length > 0) {
        setSelectedAccount(mockAccounts?.[0]);
        setVideos(mockVideos);
      }
    }, 1000);
  }, []);

  const handleAuthComplete = (newAccount) => {
    setConnectedAccounts(prev => [...prev, newAccount]);
    setSelectedAccount(newAccount);
    setIsAuthenticating(false);
    setActiveTab('videos');
  };

  const handleDisconnect = (accountId) => {
    const account = connectedAccounts?.find(acc => acc?.id === accountId);
    setDisconnectDialog({
      isOpen: true,
      accountId,
      channelName: account?.channelName,
      dataStats: {
        totalVideos: account?.totalVideos || 0,
        totalViews: 150000,
        totalClips: account?.processedVideos * 3 || 0,
        totalSize: '2.5 جيجابايت'
      }
    });
  };

  const handleDisconnectConfirm = async (options) => {
    const accountId = disconnectDialog?.accountId;
    
    // Simulate disconnect process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setConnectedAccounts(prev => prev?.filter(acc => acc?.id !== accountId));
    
    if (selectedAccount?.id === accountId) {
      const remainingAccounts = connectedAccounts?.filter(acc => acc?.id !== accountId);
      setSelectedAccount(remainingAccounts?.[0] || null);
      setVideos(remainingAccounts?.length > 0 ? mockVideos : []);
    }
    
    setDisconnectDialog({ isOpen: false, accountId: null });
  };

  const handleViewVideos = (accountId) => {
    const account = connectedAccounts?.find(acc => acc?.id === accountId);
    setSelectedAccount(account);
    setVideos(mockVideos);
    setActiveTab('videos');
  };

  const handleVideoSelect = (videoId, isSelected) => {
    setSelectedVideos(prev => {
      if (isSelected) {
        return [...prev, videoId];
      } else {
        return prev?.filter(id => id !== videoId);
      }
    });
  };

  const handleBulkProcess = async () => {
    setIsProcessing(true);
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update video statuses
    setVideos(prev => prev?.map(video => {
      if (selectedVideos?.includes(video?.id)) {
        return { ...video, processingStatus: 'processing' };
      }
      return video;
    }));
    
    setSelectedVideos([]);
    setIsProcessing(false);
  };

  const handleReprocess = async (historyId) => {
    // Simulate reprocessing
    console.log('Reprocessing video:', historyId);
  };

  const handleViewClips = (historyId) => {
    // Navigate to clips library with filter
    console.log('Viewing clips for:', historyId);
  };

  const tabs = [
    { id: 'accounts', label: 'الحسابات المتصلة', icon: 'Users' },
    { id: 'videos', label: 'الفيديوهات', icon: 'Video', disabled: !selectedAccount },
    { id: 'automation', label: 'الأتمتة', icon: 'Settings', disabled: !selectedAccount },
    { id: 'history', label: 'السجل', icon: 'History', disabled: !selectedAccount }
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Breadcrumb />
          <div className="flex items-center justify-between mt-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                ربط قنوات يوتيوب
              </h1>
              <p className="text-muted-foreground">
                اربط قنواتك على يوتيوب لمعالجة الفيديوهات تلقائياً وإنشاء مقاطع قصيرة
              </p>
            </div>
            
            {connectedAccounts?.length > 0 && (
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={() => setIsAuthenticating(true)}
              >
                ربط قناة جديدة
              </Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border mb-8">
          <nav className="flex space-x-8 space-x-reverse">
            {tabs?.map(tab => (
              <button
                key={tab?.id}
                onClick={() => !tab?.disabled && setActiveTab(tab?.id)}
                disabled={tab?.disabled}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab?.id
                    ? 'border-accent text-accent'
                    : tab?.disabled
                    ? 'border-transparent text-muted-foreground/50 cursor-not-allowed'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                {tab?.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'accounts' && (
            <div>
              {connectedAccounts?.length === 0 && !isAuthenticating ? (
                <div className="text-center py-12">
                  <Icon name="Youtube" size={64} className="text-muted-foreground mx-auto mb-6" />
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    لا توجد قنوات متصلة
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    ابدأ بربط قناتك الأولى على يوتيوب لتحويل فيديوهاتك إلى مقاطع قصيرة جذابة
                  </p>
                  <Button
                    variant="default"
                    size="lg"
                    iconName="Youtube"
                    iconPosition="left"
                    onClick={() => setIsAuthenticating(true)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    ربط قناة يوتيوب
                  </Button>
                </div>
              ) : isAuthenticating ? (
                <YouTubeAuthFlow
                  onAuthComplete={handleAuthComplete}
                  isLoading={isAuthenticating}
                />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {connectedAccounts?.map(account => (
                    <ConnectedAccountCard
                      key={account?.id}
                      account={account}
                      onDisconnect={handleDisconnect}
                      onViewVideos={handleViewVideos}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'videos' && selectedAccount && (
            <div>
              <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={selectedAccount?.avatar}
                    alt={selectedAccount?.channelName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">
                      {selectedAccount?.channelName}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedAccount?.subscriberCount?.toLocaleString('ar-SA')} مشترك
                    </p>
                  </div>
                </div>
              </div>
              
              <VideoGrid
                videos={videos}
                selectedVideos={selectedVideos}
                onVideoSelect={handleVideoSelect}
                onBulkProcess={handleBulkProcess}
                isProcessing={isProcessing}
              />
            </div>
          )}

          {activeTab === 'automation' && selectedAccount && (
            <AutomationSettings
              settings={automationSettings}
              onSettingsChange={setAutomationSettings}
            />
          )}

          {activeTab === 'history' && selectedAccount && (
            <ImportHistory
              history={mockHistory}
              onReprocess={handleReprocess}
              onViewClips={handleViewClips}
            />
          )}
        </div>
      </main>
      <DisconnectDialog
        isOpen={disconnectDialog?.isOpen}
        onClose={() => setDisconnectDialog({ isOpen: false, accountId: null })}
        onConfirm={handleDisconnectConfirm}
        channelName={disconnectDialog?.channelName}
        dataStats={disconnectDialog?.dataStats}
      />
    </div>
  );
};

export default YouTubeChannelIntegration;