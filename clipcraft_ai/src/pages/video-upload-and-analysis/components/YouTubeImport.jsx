import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const YouTubeImport = ({ onVideoSelect, isConnected, onConnect }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const recentVideos = [
    {
      id: 'vid_001',
      title: 'كيفية إنشاء محتوى جذاب على وسائل التواصل الاجتماعي',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
      duration: '15:42',
      views: '12.5K',
      uploadDate: '2025-01-05',
      description: 'دليل شامل لإنشاء محتوى يجذب المتابعين ويزيد من التفاعل'
    },
    {
      id: 'vid_002',
      title: 'استراتيجيات التسويق الرقمي للمبتدئين',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop',
      duration: '22:18',
      views: '8.9K',
      uploadDate: '2025-01-03',
      description: 'تعلم أساسيات التسويق الرقمي وكيفية بناء استراتيجية فعالة'
    },
    {
      id: 'vid_003',
      title: 'أفضل الأدوات لإنتاج المحتوى المرئي',
      thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=200&fit=crop',
      duration: '18:35',
      views: '15.2K',
      uploadDate: '2025-01-01',
      description: 'مراجعة شاملة لأهم الأدوات المستخدمة في إنتاج الفيديوهات'
    },
    {
      id: 'vid_004',
      title: 'كيفية تحليل أداء المحتوى وتحسينه',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
      duration: '25:12',
      views: '6.7K',
      uploadDate: '2024-12-28',
      description: 'تعلم كيفية قراءة التحليلات واستخدامها لتحسين المحتوى'
    }
  ];

  const handleVideoSelect = (video) => {
    setSelectedVideo(video?.id === selectedVideo?.id ? null : video);
  };

  const handleImportVideo = () => {
    if (selectedVideo) {
      onVideoSelect(selectedVideo);
    }
  };

  if (!isConnected) {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center">
          <Icon name="Youtube" size={40} className="text-red-600" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            ربط قناة يوتيوب
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            اربط قناتك على يوتيوب لاستيراد الفيديوهات مباشرة وتحويلها إلى مقاطع قصيرة
          </p>
        </div>
        <Button
          variant="default"
          onClick={onConnect}
          iconName="Youtube"
          iconPosition="right"
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          ربط قناة يوتيوب
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Channel Info */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
            <Icon name="Youtube" size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">قناة المحتوى الإبداعي</h3>
            <p className="text-sm text-muted-foreground">125K مشترك • 89 فيديو</p>
          </div>
          <Button variant="ghost" size="sm" iconName="Settings">
            إعدادات
          </Button>
        </div>
      </div>
      {/* Recent Videos */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-foreground">الفيديوهات الحديثة</h4>
        
        <div className="grid gap-4">
          {recentVideos?.map((video) => (
            <div
              key={video?.id}
              className={`bg-card border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedVideo?.id === video?.id
                  ? 'border-accent bg-accent/5 shadow-md'
                  : 'border-border hover:border-accent/50 hover:shadow-sm'
              }`}
              onClick={() => handleVideoSelect(video)}
            >
              <div className="flex gap-4">
                <div className="relative flex-shrink-0">
                  <Image
                    src={video?.thumbnail}
                    alt={video?.title}
                    className="w-32 h-20 object-cover rounded-md"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                    {video?.duration}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-foreground line-clamp-2 mb-1">
                    {video?.title}
                  </h5>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {video?.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Eye" size={12} />
                      {video?.views} مشاهدة
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      {new Date(video.uploadDate)?.toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                </div>

                <div className="flex-shrink-0 flex items-center">
                  {selectedVideo?.id === video?.id ? (
                    <Icon name="CheckCircle" size={20} className="text-accent" />
                  ) : (
                    <Icon name="Circle" size={20} className="text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedVideo && (
          <div className="flex justify-end pt-4 border-t border-border">
            <Button
              variant="default"
              onClick={handleImportVideo}
              iconName="Download"
              iconPosition="right"
            >
              استيراد الفيديو المحدد
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default YouTubeImport;