import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPlayer = ({ 
  videoSrc, 
  currentTime, 
  duration, 
  isPlaying, 
  onTimeUpdate, 
  onPlay, 
  onPause,
  onSeek,
  aspectRatio = '16:9'
}) => {
  const videoRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);
  const playPromiseRef = useRef(null);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleVideoPlayback = async () => {
      try {
        if (isPlaying) {
          // Wait for any existing play promise to resolve before starting new one
          if (playPromiseRef?.current) {
            await playPromiseRef?.current;
          }
          
          playPromiseRef.current = video?.play();
          await playPromiseRef?.current;
          playPromiseRef.current = null;
        } else {
          // Wait for play promise to resolve before pausing
          if (playPromiseRef?.current) {
            try {
              await playPromiseRef?.current;
            } catch (error) {
              // Play was interrupted, which is expected
            }
            playPromiseRef.current = null;
          }
          video?.pause();
        }
      } catch (error) {
        // Handle play/pause errors gracefully
        if (error?.name !== 'AbortError') {
          console.warn('Video playback error:', error);
        }
        playPromiseRef.current = null;
      }
    };

    handleVideoPlayback();
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      onTimeUpdate(video?.currentTime);
    };

    const handleLoadedMetadata = () => {
      onTimeUpdate(video?.currentTime);
    };

    video?.addEventListener('timeupdate', handleTimeUpdate);
    video?.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video?.removeEventListener('timeupdate', handleTimeUpdate);
      video?.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [onTimeUpdate]);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    if (isPlaying) {
      video?.play();
    } else {
      video?.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = async () => {
    const video = videoRef?.current;
    if (!video) return;

    try {
      if (isPlaying) {
        onPause();
      } else {
        onPlay();
      }
    } catch (error) {
      console.warn('Play/pause button error:', error);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (videoRef?.current) {
      videoRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleMuteToggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (videoRef?.current) {
      videoRef.current.muted = newMuted;
    }
  };

  const handleSeek = (e) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    const percent = (e?.clientX - rect?.left) / rect?.width;
    const newTime = percent * duration;
    onSeek(newTime);
    if (videoRef?.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef?.current) {
      clearTimeout(controlsTimeoutRef?.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const getAspectRatioClasses = () => {
    switch (aspectRatio) {
      case '9:16':
        return 'aspect-[9/16] max-w-sm mx-auto';
      case '1:1':
        return 'aspect-square max-w-md mx-auto';
      default:
        return 'aspect-video';
    }
  };

  return (
    <div className="relative bg-black rounded-lg overflow-hidden group">
      <div 
        className={`relative ${getAspectRatioClasses()}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-contain"
          onClick={handlePlayPause}
          onLoadedData={() => {
            // Reset play promise when video loads
            playPromiseRef.current = null;
          }}
        />

        {/* Loading Overlay */}
        {!videoSrc && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center text-white">
              <Icon name="Play" size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-sm opacity-75">تحميل الفيديو...</p>
            </div>
          </div>
        )}

        {/* Play/Pause Overlay */}
        {!isPlaying && videoSrc && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
              className="w-16 h-16 bg-white/20 hover:bg-white/30 text-white rounded-full"
            >
              <Icon name="Play" size={32} />
            </Button>
          </div>
        )}

        {/* Controls */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* Progress Bar */}
          <div 
            className="w-full h-2 bg-white/20 rounded-full cursor-pointer mb-4"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-accent rounded-full transition-all duration-150"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePlayPause}
                className="text-white hover:bg-white/20"
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMuteToggle}
                  className="text-white hover:bg-white/20"
                >
                  <Icon name={isMuted ? "VolumeX" : "Volume2"} size={18} />
                </Button>
                
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e?.target?.value))}
                  className="w-16 h-1 bg-white/20 rounded-lg appearance-none slider"
                />
              </div>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Icon name="Settings" size={18} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="text-white hover:bg-white/20"
              >
                <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;