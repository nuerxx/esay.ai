import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ClipCard = ({ 
  clip, 
  isSelected, 
  onSelect, 
  onPreview, 
  onEdit, 
  onShare, 
  onDownload,
  selectionMode = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('ar-SA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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

  const getPerformanceColor = (score) => {
    if (score >= 80) return 'text-success bg-success/10';
    if (score >= 60) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  return (
    <div 
      className={`relative group bg-card border border-border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md ${
        isSelected ? 'ring-2 ring-accent' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selection Checkbox */}
      {selectionMode && (
        <div className="absolute top-2 left-2 z-10">
          <button
            onClick={() => onSelect(clip?.id)}
            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
              isSelected 
                ? 'bg-accent border-accent text-accent-foreground' 
                : 'bg-card border-border hover:border-accent'
            }`}
          >
            {isSelected && <Icon name="Check" size={14} />}
          </button>
        </div>
      )}
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted">
        <Image
          src={clip?.thumbnail}
          alt={clip?.title}
          className="w-full h-full object-cover"
        />
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-background/90 text-foreground px-2 py-1 rounded text-xs font-medium">
          {formatDuration(clip?.duration)}
        </div>

        {/* Platform Icons */}
        <div className="absolute top-2 right-2 flex gap-1">
          {clip?.platforms?.map((platform) => (
            <div
              key={platform}
              className="w-6 h-6 bg-background/90 rounded-full flex items-center justify-center"
            >
              <Icon name={getPlatformIcon(platform)} size={12} className="text-foreground" />
            </div>
          ))}
        </div>

        {/* Hover Overlay */}
        {(isHovered || selectionMode) && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              iconName="Play"
              onClick={() => onPreview(clip)}
            >
              معاينة
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              onClick={() => onEdit(clip)}
            >
              تحرير
            </Button>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-3">
        <h3 className="font-medium text-foreground text-sm mb-2 line-clamp-2">
          {clip?.title}
        </h3>

        {/* Metadata */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>{formatDate(clip?.createdAt)}</span>
          <div className="flex items-center gap-1">
            <Icon name="Eye" size={12} />
            <span>{clip?.views?.toLocaleString()}</span>
          </div>
        </div>

        {/* Performance Score */}
        <div className="flex items-center justify-between">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(clip?.performanceScore)}`}>
            الأداء: {clip?.performanceScore}%
          </div>
          
          {/* Action Menu */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="xs"
              iconName="Share"
              onClick={() => onShare(clip)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <Button
              variant="ghost"
              size="xs"
              iconName="Download"
              onClick={() => onDownload(clip)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClipCard;