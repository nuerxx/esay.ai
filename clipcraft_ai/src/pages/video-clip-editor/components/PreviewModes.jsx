import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PreviewModes = ({ 
  currentAspectRatio, 
  onAspectRatioChange, 
  onPreview,
  className = ''
}) => {
  const [activeMode, setActiveMode] = useState(currentAspectRatio);
  const [showSafeAreas, setShowSafeAreas] = useState(true);

  const aspectRatios = [
    {
      id: '16:9',
      label: 'YouTube',
      icon: 'Youtube',
      description: 'مناسب لـ YouTube و Facebook',
      dimensions: '1920×1080',
      color: 'text-red-500'
    },
    {
      id: '9:16',
      label: 'TikTok/Reels',
      icon: 'Smartphone',
      description: 'مناسب لـ TikTok و Instagram Reels',
      dimensions: '1080×1920',
      color: 'text-purple-500'
    },
    {
      id: '1:1',
      label: 'Instagram',
      icon: 'Square',
      description: 'مناسب لـ Instagram Feed',
      dimensions: '1080×1080',
      color: 'text-pink-500'
    },
    {
      id: '4:5',
      label: 'Instagram Feed',
      icon: 'Rectangle',
      description: 'مناسب لمنشورات Instagram',
      dimensions: '1080×1350',
      color: 'text-blue-500'
    }
  ];

  const handleAspectRatioChange = (ratio) => {
    setActiveMode(ratio?.id);
    onAspectRatioChange(ratio?.id);
  };

  const renderPreviewFrame = () => {
    const getFrameClasses = () => {
      switch (activeMode) {
        case '9:16':
          return 'aspect-[9/16] max-w-xs';
        case '1:1':
          return 'aspect-square max-w-sm';
        case '4:5':
          return 'aspect-[4/5] max-w-sm';
        default:
          return 'aspect-video max-w-md';
      }
    };

    return (
      <div className="relative">
        <div className={`relative bg-black rounded-lg overflow-hidden mx-auto ${getFrameClasses()}`}>
          {/* Preview Content */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
            <div className="text-center text-white">
              <Icon name="Play" size={48} className="mx-auto mb-4 opacity-75" />
              <p className="text-sm opacity-75">معاينة المقطع</p>
            </div>
          </div>

          {/* Safe Areas */}
          {showSafeAreas && (
            <>
              {/* Title Safe Area */}
              <div className="absolute inset-4 border-2 border-yellow-400/50 rounded">
                <div className="absolute -top-6 left-0 text-xs text-yellow-400 bg-black/50 px-2 py-1 rounded">
                  منطقة العنوان الآمنة
                </div>
              </div>

              {/* Action Safe Area */}
              <div className="absolute inset-8 border-2 border-green-400/50 rounded">
                <div className="absolute -top-6 left-0 text-xs text-green-400 bg-black/50 px-2 py-1 rounded">
                  منطقة المحتوى الآمنة
                </div>
              </div>

              {/* Center Guidelines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-px bg-white/30"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-px bg-white/30"></div>
              </div>
            </>
          )}

          {/* Aspect Ratio Label */}
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {activeMode}
          </div>
        </div>

        {/* Preview Controls */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSafeAreas(!showSafeAreas)}
          >
            <Icon name={showSafeAreas ? "EyeOff" : "Eye"} size={16} className="mr-2" />
            {showSafeAreas ? 'إخفاء المناطق الآمنة' : 'إظهار المناطق الآمنة'}
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={() => onPreview(activeMode)}
          >
            <Icon name="Play" size={16} className="mr-2" />
            معاينة كاملة
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">أنماط المعاينة</h3>
        <div className="text-sm text-muted-foreground">
          {aspectRatios?.find(r => r?.id === activeMode)?.dimensions}
        </div>
      </div>
      {/* Aspect Ratio Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {aspectRatios?.map(ratio => (
          <button
            key={ratio?.id}
            onClick={() => handleAspectRatioChange(ratio)}
            className={`p-3 rounded-lg border-2 transition-all text-left ${
              activeMode === ratio?.id
                ? 'border-accent bg-accent/10' :'border-border hover:border-accent/50'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon name={ratio?.icon} size={20} className={ratio?.color} />
              <span className="font-medium text-sm">{ratio?.label}</span>
            </div>
            <p className="text-xs text-muted-foreground">{ratio?.description}</p>
            <p className="text-xs text-muted-foreground mt-1">{ratio?.dimensions}</p>
          </button>
        ))}
      </div>
      {/* Preview Frame */}
      {renderPreviewFrame()}
      {/* Platform Optimization Info */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          <Icon name="Info" size={16} />
          تحسينات المنصة
        </h4>
        
        {activeMode === '9:16' && (
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• مُحسَّن لـ TikTok و Instagram Reels و YouTube Shorts</p>
            <p>• يُنصح بوضع المحتوى المهم في الثلثين العلويين</p>
            <p>• تجنب النص في الأسفل (منطقة واجهة المستخدم)</p>
          </div>
        )}

        {activeMode === '1:1' && (
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• مُحسَّن لمنشورات Instagram و Facebook</p>
            <p>• مناسب للمحتوى المتوازن والتصاميم المربعة</p>
            <p>• يعمل بشكل جيد على جميع الأجهزة</p>
          </div>
        )}

        {activeMode === '16:9' && (
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• مُحسَّن لـ YouTube و Facebook Video</p>
            <p>• الشكل التقليدي للفيديو الأفقي</p>
            <p>• مناسب للمحتوى التعليمي والعروض التقديمية</p>
          </div>
        )}

        {activeMode === '4:5' && (
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• مُحسَّن لمنشورات Instagram Feed</p>
            <p>• يشغل مساحة أكبر في التغذية</p>
            <p>• مناسب للصور والمحتوى العمودي</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewModes;