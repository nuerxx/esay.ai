import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import UploadZone from './components/UploadZone';
import YouTubeImport from './components/YouTubeImport';
import VideoForm from './components/VideoForm';
import AdvancedSettings from './components/AdvancedSettings';

const VideoUploadAndAnalysis = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isYouTubeConnected, setIsYouTubeConnected] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    targetPlatforms: ['tiktok'],
    clipDuration: 30,
    keywords: ''
  });
  const [advancedSettings, setAdvancedSettings] = useState({
    contentTypes: ['educational'],
    focusAreas: ['highlights'],
    analysisOptions: ['speech_analysis', 'emotion_detection'],
    processingPriority: 'standard'
  });

  const tabs = [
    { id: 'upload', label: 'رفع ملف', icon: 'Upload' },
    { id: 'youtube', label: 'من يوتيوب', icon: 'Youtube' }
  ];

  useEffect(() => {
    // Simulate checking YouTube connection status
    const checkYouTubeConnection = () => {
      const isConnected = localStorage.getItem('youtube_connected') === 'true';
      setIsYouTubeConnected(isConnected);
    };

    checkYouTubeConnection();
  }, []);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setFormData(prev => ({
      ...prev,
      title: file?.name?.replace(/\.[^/.]+$/, ''),
      description: `فيديو تم رفعه في ${new Date()?.toLocaleDateString('ar-SA')}`
    }));
    simulateUpload();
  };

  const handleYouTubeVideoSelect = (video) => {
    setSelectedFile({
      name: video?.title,
      size: 50 * 1024 * 1024, // 50MB mock size
      type: 'video/mp4',
      youtubeId: video?.id
    });
    setFormData(prev => ({
      ...prev,
      title: video?.title,
      description: video?.description
    }));
  };

  const handleYouTubeConnect = () => {
    // Simulate YouTube connection
    localStorage.setItem('youtube_connected', 'true');
    setIsYouTubeConnected(true);
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleStartAnalysis = () => {
    if (!selectedFile) {
      alert('يرجى اختيار فيديو أولاً');
      return;
    }

    if (!formData?.title?.trim()) {
      alert('يرجى إدخال عنوان للفيديو');
      return;
    }

    if (!formData?.targetPlatforms?.length) {
      alert('يرجى اختيار منصة واحدة على الأقل');
      return;
    }

    // Store analysis data for the processing page
    const analysisData = {
      file: selectedFile,
      formData,
      advancedSettings,
      startTime: new Date()?.toISOString()
    };

    localStorage.setItem('current_analysis', JSON.stringify(analysisData));
    navigate('/ai-processing-status');
  };

  const isFormValid = selectedFile && formData?.title?.trim() && formData?.targetPlatforms?.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6" />

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Upload" size={24} className="text-accent" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">رفع وتحليل الفيديو</h1>
              <p className="text-muted-foreground">
                ارفع فيديوهاتك واتركنا نحولها إلى مقاطع قصيرة جذابة بالذكاء الاصطناعي
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Icon name="FileVideo" size={20} className="text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">الفيديوهات المعالجة</p>
                  <p className="text-xl font-semibold text-foreground">1,247</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Icon name="Scissors" size={20} className="text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">المقاطع المُنشأة</p>
                  <p className="text-xl font-semibold text-foreground">8,934</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Icon name="Clock" size={20} className="text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">متوسط وقت المعالجة</p>
                  <p className="text-xl font-semibold text-foreground">12 دقيقة</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload/Import */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="bg-card border border-border rounded-lg p-1">
              <div className="flex">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all ${
                      activeTab === tab?.id
                        ? 'bg-accent text-accent-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    {tab?.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-card border border-border rounded-lg p-6">
              {activeTab === 'upload' ? (
                <UploadZone
                  onFileSelect={handleFileSelect}
                  uploadProgress={uploadProgress}
                  isUploading={isUploading}
                />
              ) : (
                <YouTubeImport
                  onVideoSelect={handleYouTubeVideoSelect}
                  isConnected={isYouTubeConnected}
                  onConnect={handleYouTubeConnect}
                />
              )}
            </div>

            {/* Advanced Settings */}
            <AdvancedSettings
              settings={advancedSettings}
              onSettingsChange={setAdvancedSettings}
            />
          </div>

          {/* Right Column - Form */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <VideoForm
                formData={formData}
                onFormChange={setFormData}
                selectedFile={selectedFile}
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                variant="default"
                size="lg"
                fullWidth
                onClick={handleStartAnalysis}
                disabled={!isFormValid || isUploading}
                loading={isUploading}
                iconName="Play"
                iconPosition="right"
              >
                {isUploading ? 'جاري الرفع...' : 'بدء التحليل والمعالجة'}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Save"
                  iconPosition="right"
                >
                  حفظ كمسودة
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="RotateCcw"
                  iconPosition="right"
                  onClick={() => {
                    setSelectedFile(null);
                    setFormData({
                      title: '',
                      description: '',
                      targetPlatforms: ['tiktok'],
                      clipDuration: 30,
                      keywords: ''
                    });
                  }}
                >
                  إعادة تعيين
                </Button>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Icon name="HelpCircle" size={16} />
                نصائح للحصول على أفضل النتائج
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• استخدم فيديوهات بجودة عالية (1080p أو أعلى)</li>
                <li>• تأكد من وضوح الصوت وعدم وجود ضوضاء</li>
                <li>• اختر عنوان ووصف دقيق للمحتوى</li>
                <li>• حدد نوع المحتوى بدقة لتحسين التحليل</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUploadAndAnalysis;