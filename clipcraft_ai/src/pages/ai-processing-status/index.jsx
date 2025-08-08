import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ProcessingTimeline from './components/ProcessingTimeline';
import VideoPreview from './components/VideoPreview';
import ProcessingDetails from './components/ProcessingDetails';
import ProcessingControls from './components/ProcessingControls';
import Icon from '../../components/AppIcon';

const AIProcessingStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStage, setCurrentStage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(true);
  const [hasErrors, setHasErrors] = useState(false);
  const [processingStartTime] = useState(new Date());

  // Mock data for processing stages
  const processingStages = [
    {
      id: 'speech-to-text',
      title: 'تحويل الكلام إلى نص',
      description: 'استخراج النص من الصوت باستخدام تقنية Whisper AI',
      progress: 100,
      estimatedTime: '0 دقيقة',
      currentTask: 'مكتمل',
      completedTime: '2 دقيقة'
    },
    {
      id: 'content-understanding',
      title: 'فهم المحتوى',
      description: 'تحليل السياق والمواضيع الرئيسية باستخدام نماذج Transformer',
      progress: 75,
      estimatedTime: '3 دقائق',
      currentTask: 'تحليل المواضيع الرئيسية'
    },
    {
      id: 'expression-analysis',
      title: 'تحليل التعبيرات',
      description: 'كشف تعبيرات الوجه والحركات والإيقاع',
      progress: 0,
      estimatedTime: '5 دقائق',
      currentTask: 'في الانتظار'
    },
    {
      id: 'clip-generation',
      title: 'إنتاج المقاطع',
      description: 'إنشاء المقاطع القصيرة بناءً على التحليل الذكي',
      progress: 0,
      estimatedTime: '4 دقائق',
      currentTask: 'في الانتظار'
    }
  ];

  // Mock video data
  const videoData = {
    title: 'كيفية تطوير تطبيقات الذكاء الاصطناعي - دليل شامل للمبتدئين',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    duration: 1847, // 30:47 minutes
    processedDuration: 1385, // 23:05 minutes processed
    fileSize: '2.3 GB',
    quality: '1080p',
    fps: 30
  };

  // Mock highlights data
  const highlights = [
    {
      id: 1,
      type: 'high-engagement',
      title: 'مقدمة جذابة',
      description: 'بداية قوية تجذب انتباه المشاهدين',
      startTime: 15,
      endTime: 75
    },
    {
      id: 2,
      type: 'key-moment',
      title: 'شرح المفهوم الأساسي',
      description: 'توضيح مفهوم الذكاء الاصطناعي بطريقة مبسطة',
      startTime: 245,
      endTime: 320
    },
    {
      id: 3,
      type: 'emotional-peak',
      title: 'قصة نجاح ملهمة',
      description: 'مشاركة تجربة شخصية مؤثرة',
      startTime: 892,
      endTime: 967
    },
    {
      id: 4,
      type: 'high-engagement',
      title: 'نصائح عملية',
      description: 'خطوات قابلة للتطبيق للمبتدئين',
      startTime: 1456,
      endTime: 1523
    }
  ];

  // Mock analysis data
  const analysisData = {
    engagementScore: 87,
    optimalClipDuration: 45,
    strengths: [
      'محتوى تعليمي عالي الجودة',
      'صوت واضح ومفهوم',
      'أمثلة عملية مفيدة',
      'تسلسل منطقي للمعلومات',
      'تفاعل جيد مع الكاميرا'
    ],
    topics: [
      { name: 'الذكاء_الاصطناعي', weight: 0.9 },
      { name: 'البرمجة', weight: 0.7 },
      { name: 'التعلم_الآلي', weight: 0.6 },
      { name: 'التطوير', weight: 0.5 },
      { name: 'التقنية', weight: 0.4 }
    ],
    keywords: [
      { word: 'الذكاء الاصطناعي', frequency: 85 },
      { word: 'التعلم الآلي', frequency: 72 },
      { word: 'البيانات', frequency: 68 },
      { word: 'النماذج', frequency: 55 },
      { word: 'التطبيقات', frequency: 43 }
    ],
    sentiment: {
      positive: 78,
      neutral: 18,
      negative: 4
    },
    emotionalMoments: [
      { description: 'حماس عند شرح الإمكانيات', timestamp: '05:23' },
      { description: 'فخر بالإنجازات التقنية', timestamp: '12:45' },
      { description: 'تشجيع للمتعلمين', timestamp: '18:32' },
      { description: 'إلهام للمستقبل', timestamp: '25:17' }
    ],
    suggestedTitles: [
      { text: 'سر الذكاء الاصطناعي الذي لا يعرفه أحد!', successRate: 92 },
      { text: 'كيف تبدأ في الذكاء الاصطناعي من الصفر؟', successRate: 88 },
      { text: 'هذا ما تحتاج معرفته عن الذكاء الاصطناعي', successRate: 85 },
      { text: 'الذكاء الاصطناعي للمبتدئين - دليل سريع', successRate: 82 }
    ],
    recommendations: [
      {
        title: 'إضافة عناوين فرعية',
        description: 'لتحسين إمكانية الوصول وزيادة المشاهدة'
      },
      {
        title: 'تحسين الإضاءة',
        description: 'لجودة بصرية أفضل في المقاطع القصيرة'
      },
      {
        title: 'إضافة مؤثرات بصرية',
        description: 'لجعل المحتوى أكثر جاذبية للمنصات الاجتماعية'
      }
    ]
  };

  // Mock processing data
  const processingData = {
    completedStages: 2,
    estimatedClips: 8,
    processingTime: Math.floor((new Date() - processingStartTime) / 60000),
    qualityScore: 94
  };

  // Custom breadcrumbs
  const customBreadcrumbs = [
    { label: 'الرئيسية', path: '/' },
    { label: 'مكتبة الفيديو', path: '/generated-clips-library' },
    { label: videoData?.title?.substring(0, 50) + '...', path: '/ai-processing-status', isLast: true }
  ];

  // Simulate processing progress
  useEffect(() => {
    if (!isProcessing) return;

    const interval = setInterval(() => {
      setCurrentStage(prev => {
        if (prev < processingStages?.length - 1) {
          return prev + 1;
        } else {
          setIsProcessing(false);
          // Show completion notification
          setTimeout(() => {
            navigate('/generated-clips-library', { 
              state: { 
                fromProcessing: true, 
                videoTitle: videoData?.title,
                generatedClips: processingData?.estimatedClips
              } 
            });
          }, 2000);
          return prev;
        }
      });
    }, 8000); // Progress every 8 seconds

    return () => clearInterval(interval);
  }, [isProcessing, navigate, videoData?.title, processingData?.estimatedClips]);

  const handleCancelProcessing = () => {
    setIsProcessing(false);
    navigate('/video-upload-and-analysis');
  };

  const handleRetryProcessing = () => {
    setCurrentStage(0);
    setIsProcessing(true);
    setHasErrors(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb customBreadcrumbs={customBreadcrumbs} />
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              حالة معالجة الذكاء الاصطناعي
            </h1>
            <p className="text-muted-foreground">
              تتبع تقدم تحليل الفيديو وإنتاج المقاطع القصيرة
            </p>
          </div>
          
          {/* Status Badge */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            isProcessing 
              ? 'bg-accent/10 text-accent' 
              : hasErrors 
                ? 'bg-error/10 text-error' :'bg-success/10 text-success'
          }`}>
            <Icon 
              name={
                isProcessing ? 'Loader2' : hasErrors ?'AlertCircle' : 'CheckCircle'
              } 
              size={16} 
              className={isProcessing ? 'animate-spin' : ''}
            />
            <span className="font-medium">
              {isProcessing ? 'جاري المعالجة' : hasErrors ?'خطأ في المعالجة' : 'مكتمل'}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Timeline */}
          <div className="lg:col-span-1">
            <ProcessingTimeline 
              stages={processingStages}
              currentStage={currentStage}
            />
          </div>

          {/* Right Column - Preview and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Preview */}
            <VideoPreview 
              videoData={videoData}
              highlights={highlights}
              isProcessing={isProcessing}
            />

            {/* Processing Details */}
            <ProcessingDetails 
              analysisData={analysisData}
              isProcessing={isProcessing}
            />
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="mt-8">
          <ProcessingControls
            isProcessing={isProcessing}
            canCancel={true}
            onCancel={handleCancelProcessing}
            onRetry={handleRetryProcessing}
            processingData={processingData}
            hasErrors={hasErrors}
          />
        </div>

        {/* Completion Success Message */}
        {!isProcessing && !hasErrors && (
          <div className="fixed bottom-6 right-6 bg-success text-success-foreground px-6 py-4 rounded-lg shadow-lg animate-slide-in-right">
            <div className="flex items-center gap-3">
              <Icon name="CheckCircle" size={20} />
              <div>
                <p className="font-medium">تم إنتاج المقاطع بنجاح!</p>
                <p className="text-sm opacity-90">
                  تم إنشاء {processingData?.estimatedClips} مقاطع جاهزة للمشاركة
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AIProcessingStatus;