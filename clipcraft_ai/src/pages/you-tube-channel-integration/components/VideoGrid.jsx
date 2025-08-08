import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const VideoGrid = ({ videos, selectedVideos, onVideoSelect, onBulkProcess, isProcessing }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');

  const getProcessingStatusBadge = (status) => {
    const statusConfig = {
      eligible: { color: 'text-success bg-success/10', text: 'قابل للمعالجة', icon: 'CheckCircle' },
      processing: { color: 'text-warning bg-warning/10', text: 'قيد المعالجة', icon: 'Loader2' },
      completed: { color: 'text-accent bg-accent/10', text: 'تم المعالجة', icon: 'Check' },
      error: { color: 'text-error bg-error/10', text: 'خطأ', icon: 'AlertCircle' },
      ineligible: { color: 'text-muted-foreground bg-muted', text: 'غير مؤهل', icon: 'X' }
    };

    const config = statusConfig?.[status] || statusConfig?.ineligible;
    
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} className={status === 'processing' ? 'animate-spin' : ''} />
        {config?.text}
      </div>
    );
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
    }
    return `${minutes}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000)?.toFixed(1)}م`;
    } else if (views >= 1000) {
      return `${(views / 1000)?.toFixed(1)}ك`;
    }
    return views?.toLocaleString('ar-SA');
  };

  const sortedVideos = [...videos]?.sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.uploadDate) - new Date(a.uploadDate);
      case 'views':
        return b?.viewCount - a?.viewCount;
      case 'duration':
        return b?.duration - a?.duration;
      default:
        return 0;
    }
  });

  const VideoCard = ({ video }) => (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <Image
          src={video?.thumbnail}
          alt={video?.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
          {formatDuration(video?.duration)}
        </div>
        <div className="absolute top-2 right-2">
          <Checkbox
            checked={selectedVideos?.includes(video?.id)}
            onChange={(e) => onVideoSelect(video?.id, e?.target?.checked)}
            className="bg-white/90"
          />
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-foreground mb-2 line-clamp-2 text-right">
          {video?.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <span>{formatViews(video?.viewCount)} مشاهدة</span>
          <span>{new Date(video.uploadDate)?.toLocaleDateString('ar-SA')}</span>
        </div>
        
        <div className="flex items-center justify-between">
          {getProcessingStatusBadge(video?.processingStatus)}
          {video?.clipsGenerated > 0 && (
            <span className="text-xs text-accent">
              {video?.clipsGenerated} مقطع تم إنشاؤه
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const VideoListItem = ({ video }) => (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <Checkbox
          checked={selectedVideos?.includes(video?.id)}
          onChange={(e) => onVideoSelect(video?.id, e?.target?.checked)}
        />
        
        <div className="relative">
          <Image
            src={video?.thumbnail}
            alt={video?.title}
            className="w-24 h-16 object-cover rounded"
          />
          <div className="absolute bottom-1 left-1 bg-black/80 text-white px-1 py-0.5 rounded text-xs">
            {formatDuration(video?.duration)}
          </div>
        </div>
        
        <div className="flex-1 text-right">
          <h3 className="font-medium text-foreground mb-1 line-clamp-1">
            {video?.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
            <span>{formatViews(video?.viewCount)} مشاهدة</span>
            <span>{new Date(video.uploadDate)?.toLocaleDateString('ar-SA')}</span>
          </div>
          <div className="flex items-center justify-between">
            {getProcessingStatusBadge(video?.processingStatus)}
            {video?.clipsGenerated > 0 && (
              <span className="text-xs text-accent">
                {video?.clipsGenerated} مقطع
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            iconName="Grid3X3"
            onClick={() => setViewMode('grid')}
          />
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            iconName="List"
            onClick={() => setViewMode('list')}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm"
          >
            <option value="date">ترتيب حسب التاريخ</option>
            <option value="views">ترتيب حسب المشاهدات</option>
            <option value="duration">ترتيب حسب المدة</option>
          </select>
          
          {selectedVideos?.length > 0 && (
            <Button
              variant="default"
              size="sm"
              iconName="Play"
              iconPosition="left"
              onClick={onBulkProcess}
              loading={isProcessing}
            >
              معالجة {selectedVideos?.length} فيديو
            </Button>
          )}
        </div>
      </div>
      {/* Video Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVideos?.map(video => (
            <VideoCard key={video?.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedVideos?.map(video => (
            <VideoListItem key={video?.id} video={video} />
          ))}
        </div>
      )}
      {videos?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Video" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            لا توجد فيديوهات
          </h3>
          <p className="text-muted-foreground">
            لم يتم العثور على فيديوهات في هذه القناة
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoGrid;