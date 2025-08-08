import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const VideoPreview = ({ videoData, highlights, isProcessing }) => {
  const [selectedHighlight, setSelectedHighlight] = useState(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getHighlightColor = (type) => {
    const colors = {
      'high-engagement': 'bg-success/20 border-success',
      'emotional-peak': 'bg-warning/20 border-warning',
      'key-moment': 'bg-accent/20 border-accent',
      'transition': 'bg-secondary/20 border-secondary'
    };
    return colors?.[type] || 'bg-muted/20 border-border';
  };

  const getHighlightIcon = (type) => {
    const icons = {
      'high-engagement': 'TrendingUp',
      'emotional-peak': 'Heart',
      'key-moment': 'Star',
      'transition': 'ArrowRight'
    };
    return icons?.[type] || 'Circle';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">معاينة الفيديو</h2>
        {isProcessing && (
          <div className="flex items-center gap-2 text-accent">
            <div className="flex gap-1">
              <div className="processing-dot"></div>
              <div className="processing-dot"></div>
              <div className="processing-dot"></div>
            </div>
            <span className="text-sm font-medium">تحليل المحتوى...</span>
          </div>
        )}
      </div>
      {/* Video Thumbnail with Timeline */}
      <div className="relative bg-card border border-border rounded-lg overflow-hidden">
        <div className="aspect-video relative">
          <Image
            src={videoData?.thumbnail}
            alt={videoData?.title}
            className="w-full h-full object-cover"
          />
          
          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
              <Icon name="Play" size={24} className="text-gray-900 mr-1" />
            </button>
          </div>

          {/* Processing Overlay */}
          {isProcessing && (
            <div className="absolute top-4 left-4 bg-accent/90 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
              جاري التحليل...
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">الخط الزمني</span>
            <span className="text-sm text-muted-foreground">
              المدة: {formatTime(videoData?.duration)}
            </span>
          </div>

          {/* Timeline Bar */}
          <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
            {/* Progress Bar */}
            <div 
              className="absolute top-0 left-0 h-full bg-accent/30 transition-all duration-300"
              style={{ width: `${(videoData?.processedDuration / videoData?.duration) * 100}%` }}
            />

            {/* Highlights */}
            {highlights?.map((highlight, index) => {
              const leftPosition = (highlight?.startTime / videoData?.duration) * 100;
              const width = ((highlight?.endTime - highlight?.startTime) / videoData?.duration) * 100;

              return (
                <div
                  key={index}
                  className={`absolute top-1 h-6 rounded border-2 cursor-pointer transition-all hover:scale-105 ${getHighlightColor(highlight?.type)}`}
                  style={{ 
                    left: `${leftPosition}%`, 
                    width: `${width}%`,
                    minWidth: '8px'
                  }}
                  onClick={() => setSelectedHighlight(highlight)}
                  title={`${highlight?.title} (${formatTime(highlight?.startTime)} - ${formatTime(highlight?.endTime)})`}
                />
              );
            })}
          </div>

          {/* Timeline Labels */}
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>0:00</span>
            <span>{formatTime(videoData?.duration)}</span>
          </div>
        </div>
      </div>
      {/* Video Info */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-2">{videoData?.title}</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">المدة:</span>
            <span className="text-foreground mr-2">{formatTime(videoData?.duration)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">الحجم:</span>
            <span className="text-foreground mr-2">{videoData?.fileSize}</span>
          </div>
          <div>
            <span className="text-muted-foreground">الجودة:</span>
            <span className="text-foreground mr-2">{videoData?.quality}</span>
          </div>
          <div>
            <span className="text-muted-foreground">معدل الإطارات:</span>
            <span className="text-foreground mr-2">{videoData?.fps} fps</span>
          </div>
        </div>
      </div>
      {/* Detected Highlights */}
      {highlights?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-4">اللحظات المميزة المكتشفة</h3>
          <div className="space-y-3">
            {highlights?.map((highlight, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                  selectedHighlight?.id === highlight?.id 
                    ? getHighlightColor(highlight?.type) 
                    : 'bg-muted/30 border-border hover:bg-muted/50'
                }`}
                onClick={() => setSelectedHighlight(highlight)}
              >
                <div className="flex items-center gap-3">
                  <Icon name={getHighlightIcon(highlight?.type)} size={16} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{highlight?.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatTime(highlight?.startTime)} - {formatTime(highlight?.endTime)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {highlight?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPreview;