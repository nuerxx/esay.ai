import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Timeline = ({ 
  duration, 
  currentTime, 
  segments, 
  onTimeChange, 
  onSegmentUpdate,
  onSplit,
  onDelete,
  waveformData = []
}) => {
  const timelineRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState(null); // 'playhead', 'start', 'end'
  const [activeSegment, setActiveSegment] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [scrollPosition, setScrollPosition] = useState(0);

  const timelineWidth = 800 * zoom;
  const pixelsPerSecond = timelineWidth / duration;

  const handleMouseDown = (e, type, segmentId = null) => {
    e?.preventDefault();
    setIsDragging(true);
    setDragType(type);
    setActiveSegment(segmentId);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !timelineRef?.current) return;

    const rect = timelineRef?.current?.getBoundingClientRect();
    const x = e?.clientX - rect?.left + scrollPosition;
    const time = Math.max(0, Math.min(duration, x / pixelsPerSecond));

    if (dragType === 'playhead') {
      onTimeChange(time);
    } else if (dragType === 'start' && activeSegment !== null) {
      const segment = segments?.[activeSegment];
      if (time < segment?.end - 0.5) {
        onSegmentUpdate(activeSegment, { ...segment, start: time });
      }
    } else if (dragType === 'end' && activeSegment !== null) {
      const segment = segments?.[activeSegment];
      if (time > segment?.start + 0.5) {
        onSegmentUpdate(activeSegment, { ...segment, end: time });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragType(null);
    setActiveSegment(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragType, activeSegment, scrollPosition]);

  const handleTimelineClick = (e) => {
    if (isDragging) return;
    
    const rect = timelineRef?.current?.getBoundingClientRect();
    const x = e?.clientX - rect?.left + scrollPosition;
    const time = Math.max(0, Math.min(duration, x / pixelsPerSecond));
    onTimeChange(time);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const renderWaveform = () => {
    if (!waveformData?.length) return null;

    return (
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        {waveformData?.map((amplitude, index) => (
          <div
            key={index}
            className="bg-accent mx-px"
            style={{
              height: `${Math.max(2, amplitude * 40)}px`,
              width: `${timelineWidth / waveformData?.length}px`
            }}
          />
        ))}
      </div>
    );
  };

  const renderTimeMarkers = () => {
    const markers = [];
    const interval = zoom < 0.5 ? 10 : zoom < 1 ? 5 : 1;
    
    for (let i = 0; i <= duration; i += interval) {
      const x = i * pixelsPerSecond;
      markers?.push(
        <div
          key={i}
          className="absolute top-0 bottom-0 border-l border-border/50"
          style={{ left: `${x}px` }}
        >
          <span className="absolute -top-6 -translate-x-1/2 text-xs text-muted-foreground">
            {formatTime(i)}
          </span>
        </div>
      );
    }
    
    return markers;
  };

  const renderSegments = () => {
    return segments?.map((segment, index) => (
      <div
        key={segment?.id}
        className={`absolute top-8 bottom-8 bg-accent/20 border-2 border-accent rounded ${
          activeSegment === index ? 'ring-2 ring-accent/50' : ''
        }`}
        style={{
          left: `${segment?.start * pixelsPerSecond}px`,
          width: `${(segment?.end - segment?.start) * pixelsPerSecond}px`
        }}
      >
        {/* Segment Label */}
        <div className="absolute -top-6 left-2 text-xs font-medium text-foreground bg-background px-1 rounded">
          {segment?.label || `مقطع ${index + 1}`}
        </div>

        {/* Start Handle */}
        <div
          className="absolute left-0 top-0 bottom-0 w-2 bg-accent cursor-ew-resize hover:bg-accent/80"
          onMouseDown={(e) => handleMouseDown(e, 'start', index)}
        />

        {/* End Handle */}
        <div
          className="absolute right-0 top-0 bottom-0 w-2 bg-accent cursor-ew-resize hover:bg-accent/80"
          onMouseDown={(e) => handleMouseDown(e, 'end', index)}
        />

        {/* Segment Controls */}
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onSplit(index, (segment?.start + segment?.end) / 2)}
            className="w-6 h-6 bg-background/80 hover:bg-background"
          >
            <Icon name="Scissors" size={12} />
          </Button>
          
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onDelete(index)}
            className="w-6 h-6 bg-background/80 hover:bg-background text-error"
          >
            <Icon name="Trash2" size={12} />
          </Button>
        </div>
      </div>
    ));
  };

  const renderPlayhead = () => (
    <div
      className="absolute top-0 bottom-0 w-0.5 bg-accent cursor-ew-resize z-10"
      style={{ left: `${currentTime * pixelsPerSecond}px` }}
      onMouseDown={(e) => handleMouseDown(e, 'playhead')}
    >
      <div className="absolute -top-2 -left-2 w-4 h-4 bg-accent rounded-full border-2 border-background" />
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      {/* Timeline Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">الخط الزمني</h3>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.max(0.25, zoom - 0.25))}
            disabled={zoom <= 0.25}
          >
            <Icon name="ZoomOut" size={16} />
          </Button>
          
          <span className="text-sm text-muted-foreground min-w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.min(4, zoom + 0.25))}
            disabled={zoom >= 4}
          >
            <Icon name="ZoomIn" size={16} />
          </Button>
        </div>
      </div>
      {/* Timeline Container */}
      <div className="relative">
        <div 
          className="overflow-x-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-background"
          onScroll={(e) => setScrollPosition(e?.target?.scrollLeft)}
        >
          <div
            ref={timelineRef}
            className="relative h-24 bg-muted/30 rounded cursor-pointer select-none"
            style={{ width: `${timelineWidth}px`, minWidth: '100%' }}
            onClick={handleTimelineClick}
          >
            {/* Waveform */}
            {renderWaveform()}
            
            {/* Time Markers */}
            {renderTimeMarkers()}
            
            {/* Segments */}
            {renderSegments()}
            
            {/* Playhead */}
            {renderPlayhead()}
          </div>
        </div>

        {/* Timeline Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSplit(null, currentTime)}
            >
              <Icon name="Scissors" size={16} className="mr-2" />
              تقسيم عند الموضع الحالي
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            المدة الإجمالية: {formatTime(duration)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;