import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PreviewModal = ({ clip, isOpen, onClose, onEdit, onShare, onDownload }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen && videoRef?.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
    }
  }, [isOpen]);

  const handlePlayPause = () => {
    if (videoRef?.current) {
      if (isPlaying) {
        videoRef?.current?.pause();
      } else {
        videoRef?.current?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef?.current) {
      setCurrentTime(videoRef?.current?.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef?.current) {
      setDuration(videoRef?.current?.duration);
    }
  };

  const handleSeek = (e) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    const clickX = e?.clientX - rect?.left;
    const newTime = (clickX / rect?.width) * duration;
    
    if (videoRef?.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'youtube': 'Youtube',
      'tiktok': 'Music',
      'instagram': 'Instagram',
      'twitter': 'Twitter'
    };
    return icons?.[platform] || 'Video';
  };

  if (!isOpen || !clip) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-card border border-border rounded-lg shadow-floating overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-foreground">{clip?.title}</h2>
            <div className="flex gap-1">
              {clip?.platforms?.map((platform) => (
                <div
                  key={platform}
                  className="w-6 h-6 bg-muted rounded-full flex items-center justify-center"
                >
                  <Icon name={getPlatformIcon(platform)} size={12} />
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Video Player */}
        <div className="relative bg-background">
          <video
            ref={videoRef}
            className="w-full aspect-video object-contain"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            poster={clip?.thumbnail}
          >
            <source src={clip?.videoUrl} type="video/mp4" />
            المتصفح الخاص بك لا يدعم تشغيل الفيديو.
          </video>

          {/* Play/Pause Overlay */}
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={handlePlayPause}
          >
            {!isPlaying && (
              <div className="w-16 h-16 bg-background/80 rounded-full flex items-center justify-center">
                <Icon name="Play" size={24} className="text-foreground ml-1" />
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-4">
            {/* Progress Bar */}
            <div 
              className="w-full h-2 bg-muted rounded-full cursor-pointer mb-3"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-accent rounded-full transition-all duration-100"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={isPlaying ? "Pause" : "Play"}
                  onClick={handlePlayPause}
                />
                <span className="text-sm text-muted-foreground">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Volume2"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Maximize"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Info & Actions */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                تم الإنشاء في: {new Date(clip.createdAt)?.toLocaleDateString('ar-SA')}
              </p>
              <p className="text-sm text-muted-foreground">
                المشاهدات: {clip?.views?.toLocaleString()} • الأداء: {clip?.performanceScore}%
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Edit"
                onClick={() => onEdit(clip)}
              >
                تحرير
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Share"
                onClick={() => onShare(clip)}
              >
                مشاركة
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="Download"
                onClick={() => onDownload(clip)}
              >
                تحميل
              </Button>
            </div>
          </div>

          {/* Description */}
          {clip?.description && (
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">الوصف:</p>
              <p>{clip?.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;