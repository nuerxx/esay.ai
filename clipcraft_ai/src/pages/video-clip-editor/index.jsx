import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import VideoPlayer from './components/VideoPlayer';
import Timeline from './components/Timeline';
import EditingTools from './components/EditingTools';
import PreviewModes from './components/PreviewModes';
import ExportPanel from './components/ExportPanel';

const VideoClipEditor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get video data from navigation state or use mock data
  const videoData = location?.state?.video || {
    id: 'clip_001',
    title: 'مقطع تعليمي عن البرمجة',
    originalTitle: 'دورة React الشاملة - الدرس الأول',
    duration: 180,
    src: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
    segments: [
      { id: 1, start: 0, end: 30, label: 'المقدمة' },
      { id: 2, start: 30, end: 90, label: 'الشرح الأساسي' },
      { id: 3, start: 90, end: 150, label: 'الأمثلة العملية' },
      { id: 4, start: 150, end: 180, label: 'الخلاصة' }
    ]
  };

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSegment, setActiveSegment] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [segments, setSegments] = useState(videoData?.segments);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [exportProgress, setExportProgress] = useState(null);
  const [isMobileToolsOpen, setIsMobileToolsOpen] = useState(false);

  // Mock waveform data
  const waveformData = Array.from({ length: 100 }, () => Math.random());

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges) {
      const autoSaveTimer = setTimeout(() => {
        handleAutoSave();
      }, 30000); // Auto-save every 30 seconds

      return () => clearTimeout(autoSaveTimer);
    }
  }, [hasUnsavedChanges]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.target?.tagName === 'INPUT' || e?.target?.tagName === 'TEXTAREA') return;

      switch (e?.key) {
        case ' ':
          e?.preventDefault();
          handlePlayPause();
          break;
        case 'ArrowLeft':
          e?.preventDefault();
          setCurrentTime(Math.max(0, currentTime - 5));
          break;
        case 'ArrowRight':
          e?.preventDefault();
          setCurrentTime(Math.min(videoData?.duration, currentTime + 5));
          break;
        case 's':
          if (e?.ctrlKey || e?.metaKey) {
            e?.preventDefault();
            handleSave();
          }
          break;
        case 'z':
          if (e?.ctrlKey || e?.metaKey) {
            e?.preventDefault();
            handleUndo();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentTime, videoData?.duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = (time) => {
    setCurrentTime(time);
    
    // Update active segment based on current time
    const currentSegment = segments?.findIndex(segment => 
      time >= segment?.start && time <= segment?.end
    );
    setActiveSegment(currentSegment !== -1 ? currentSegment : null);
  };

  const handleSeek = (time) => {
    setCurrentTime(time);
  };

  const handleSegmentUpdate = (index, updatedSegment) => {
    const newSegments = [...segments];
    newSegments[index] = updatedSegment;
    setSegments(newSegments);
    setHasUnsavedChanges(true);
  };

  const handleSplit = (segmentIndex, splitTime) => {
    if (segmentIndex === null) {
      // Split at current time - find which segment contains current time
      const targetSegment = segments?.find(segment => 
        splitTime >= segment?.start && splitTime <= segment?.end
      );
      if (!targetSegment) return;
      segmentIndex = segments?.indexOf(targetSegment);
    }

    const segment = segments?.[segmentIndex];
    const newSegments = [...segments];
    
    // Create two new segments from the split
    const firstSegment = { ...segment, end: splitTime, label: `${segment?.label} - جزء 1` };
    const secondSegment = { 
      ...segment, 
      id: Date.now(), 
      start: splitTime, 
      label: `${segment?.label} - جزء 2` 
    };

    newSegments?.splice(segmentIndex, 1, firstSegment, secondSegment);
    setSegments(newSegments);
    setHasUnsavedChanges(true);
  };

  const handleDelete = (segmentIndex) => {
    const newSegments = segments?.filter((_, index) => index !== segmentIndex);
    setSegments(newSegments);
    setHasUnsavedChanges(true);
  };

  const handleTextOverlayUpdate = (textOverlay) => {
    console.log('Text overlay updated:', textOverlay);
    setHasUnsavedChanges(true);
  };

  const handleColorCorrectionUpdate = (colorCorrection) => {
    console.log('Color correction updated:', colorCorrection);
    setHasUnsavedChanges(true);
  };

  const handleAudioLevelUpdate = (audioSettings) => {
    console.log('Audio settings updated:', audioSettings);
    setHasUnsavedChanges(true);
  };

  const handleTransitionUpdate = (transition) => {
    console.log('Transition updated:', transition);
    setHasUnsavedChanges(true);
  };

  const handleExportSettingsUpdate = (exportSettings) => {
    console.log('Export settings updated:', exportSettings);
  };

  const handlePreview = (mode) => {
    console.log('Preview mode:', mode);
    setIsPlaying(true);
  };

  const handleSave = () => {
    console.log('Saving project...');
    setHasUnsavedChanges(false);
    // Simulate save
    setTimeout(() => {
      alert('تم حفظ المشروع بنجاح!');
    }, 500);
  };

  const handleAutoSave = () => {
    console.log('Auto-saving project...');
    setHasUnsavedChanges(false);
  };

  const handleExport = async (settings) => {
    console.log('Exporting with settings:', settings);
    
    // Simulate export progress
    setExportProgress(0);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setExportProgress(i);
    }
    
    setTimeout(() => {
      setExportProgress(null);
      alert('تم تصدير الفيديو بنجاح!');
    }, 500);
  };

  const handleUndo = () => {
    console.log('Undo action');
    // Implement undo functionality
  };

  const handleRedo = () => {
    console.log('Redo action');
    // Implement redo functionality
  };

  const breadcrumbs = [
    { label: 'الرئيسية', path: '/' },
    { label: 'مكتبة المقاطع', path: '/generated-clips-library' },
    { label: 'محرر المقاطع', path: '/video-clip-editor', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb customBreadcrumbs={breadcrumbs} className="mb-6" />

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              محرر المقاطع
            </h1>
            <p className="text-muted-foreground">
              {videoData?.title} • {Math.floor(videoData?.duration / 60)}:{(videoData?.duration % 60)?.toString()?.padStart(2, '0')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <div className="flex items-center gap-2 text-warning text-sm">
                <Icon name="AlertCircle" size={16} />
                <span>تغييرات غير محفوظة</span>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleUndo}
            >
              <Icon name="Undo2" size={16} className="mr-2" />
              تراجع
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleRedo}
            >
              <Icon name="Redo2" size={16} className="mr-2" />
              إعادة
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
            >
              <Icon name="Save" size={16} className="mr-2" />
              حفظ
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/generated-clips-library')}
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              العودة
            </Button>
          </div>
        </div>

        {/* Main Editor Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Video Player and Timeline - Main Content */}
          <div className="xl:col-span-3 space-y-6">
            {/* Video Player */}
            <VideoPlayer
              videoSrc={videoData?.src}
              currentTime={currentTime}
              duration={videoData?.duration}
              isPlaying={isPlaying}
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onSeek={handleSeek}
              aspectRatio={aspectRatio}
            />

            {/* Timeline */}
            <Timeline
              duration={videoData?.duration}
              currentTime={currentTime}
              segments={segments}
              onTimeChange={handleSeek}
              onSegmentUpdate={handleSegmentUpdate}
              onSplit={handleSplit}
              onDelete={handleDelete}
              waveformData={waveformData}
            />

            {/* Mobile Tools Toggle */}
            <div className="xl:hidden">
              <Button
                variant="outline"
                onClick={() => setIsMobileToolsOpen(!isMobileToolsOpen)}
                className="w-full"
              >
                <Icon name="Settings" size={16} className="mr-2" />
                {isMobileToolsOpen ? 'إخفاء أدوات التحرير' : 'إظهار أدوات التحرير'}
              </Button>
            </div>

            {/* Mobile Tools Panel */}
            {isMobileToolsOpen && (
              <div className="xl:hidden space-y-6">
                <EditingTools
                  activeSegment={activeSegment}
                  onTextOverlayUpdate={handleTextOverlayUpdate}
                  onColorCorrectionUpdate={handleColorCorrectionUpdate}
                  onAudioLevelUpdate={handleAudioLevelUpdate}
                  onTransitionUpdate={handleTransitionUpdate}
                  onExportSettingsUpdate={handleExportSettingsUpdate}
                />

                <PreviewModes
                  currentAspectRatio={aspectRatio}
                  onAspectRatioChange={setAspectRatio}
                  onPreview={handlePreview}
                />

                <ExportPanel
                  onExport={handleExport}
                  onSave={handleSave}
                  onPreview={handlePreview}
                  exportProgress={exportProgress}
                />
              </div>
            )}
          </div>

          {/* Sidebar - Tools and Export */}
          <div className="hidden xl:block space-y-6">
            {/* Editing Tools */}
            <EditingTools
              activeSegment={activeSegment}
              onTextOverlayUpdate={handleTextOverlayUpdate}
              onColorCorrectionUpdate={handleColorCorrectionUpdate}
              onAudioLevelUpdate={handleAudioLevelUpdate}
              onTransitionUpdate={handleTransitionUpdate}
              onExportSettingsUpdate={handleExportSettingsUpdate}
            />

            {/* Preview Modes */}
            <PreviewModes
              currentAspectRatio={aspectRatio}
              onAspectRatioChange={setAspectRatio}
              onPreview={handlePreview}
            />

            {/* Export Panel */}
            <ExportPanel
              onExport={handleExport}
              onSave={handleSave}
              onPreview={handlePreview}
              exportProgress={exportProgress}
            />
          </div>
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Icon name="Keyboard" size={16} />
            اختصارات لوحة المفاتيح
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex justify-between">
              <span>تشغيل/إيقاف:</span>
              <kbd className="px-2 py-1 bg-background rounded border">Space</kbd>
            </div>
            <div className="flex justify-between">
              <span>تقديم 5 ثوانٍ:</span>
              <kbd className="px-2 py-1 bg-background rounded border">→</kbd>
            </div>
            <div className="flex justify-between">
              <span>تأخير 5 ثوانٍ:</span>
              <kbd className="px-2 py-1 bg-background rounded border">←</kbd>
            </div>
            <div className="flex justify-between">
              <span>حفظ:</span>
              <kbd className="px-2 py-1 bg-background rounded border">Ctrl+S</kbd>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoClipEditor;