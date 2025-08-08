import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const YouTubeAuthFlow = ({ onAuthComplete, isLoading }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPermissions, setShowPermissions] = useState(false);

  const authSteps = [
    {
      id: 1,
      title: 'ربط حساب يوتيوب',
      description: 'اربط قناتك على يوتيوب لبدء معالجة الفيديوهات تلقائياً',
      icon: 'Youtube'
    },
    {
      id: 2,
      title: 'منح الصلاحيات',
      description: 'سنحتاج إلى صلاحيات للوصول إلى فيديوهاتك وبياناتها',
      icon: 'Shield'
    },
    {
      id: 3,
      title: 'تأكيد الاتصال',
      description: 'تأكيد ربط القناة وبدء المزامنة التلقائية',
      icon: 'CheckCircle'
    }
  ];

  const permissions = [
    {
      title: 'عرض قائمة الفيديوهات',
      description: 'للوصول إلى فيديوهاتك ومعلوماتها الأساسية',
      icon: 'Video',
      required: true
    },
    {
      title: 'قراءة بيانات القناة',
      description: 'لعرض اسم القناة وعدد المشتركين والإحصائيات',
      icon: 'BarChart3',
      required: true
    },
    {
      title: 'تحميل الفيديوهات',
      description: 'لتحميل الفيديوهات ومعالجتها بالذكاء الاصطناعي',
      icon: 'Download',
      required: true
    },
    {
      title: 'إشعارات الفيديوهات الجديدة',
      description: 'للحصول على إشعارات عند رفع فيديوهات جديدة',
      icon: 'Bell',
      required: false
    }
  ];

  const handleStartAuth = () => {
    setShowPermissions(true);
    setCurrentStep(2);
  };

  const handleConfirmAuth = () => {
    setCurrentStep(3);
    // Simulate auth process
    setTimeout(() => {
      onAuthComplete({
        channelId: 'UC123456789',
        channelName: 'قناة المحتوى الإبداعي',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
        subscriberCount: 125000,
        status: 'active'
      });
    }, 2000);
  };

  if (!showPermissions) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Youtube" size={32} className="text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          ربط قناة يوتيوب
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          اربط قناتك على يوتيوب لبدء تحويل فيديوهاتك الطويلة إلى مقاطع قصيرة جذابة باستخدام الذكاء الاصطناعي
        </p>
        <div className="space-y-4 mb-8">
          {authSteps?.map((step, index) => (
            <div key={step?.id} className="flex items-center gap-4 text-right">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step?.id ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {currentStep > step?.id ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <span className="text-sm font-medium">{step?.id}</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{step?.title}</h3>
                <p className="text-sm text-muted-foreground">{step?.description}</p>
              </div>
              <Icon name={step?.icon} size={20} className="text-muted-foreground" />
            </div>
          ))}
        </div>
        <Button
          variant="default"
          size="lg"
          iconName="Youtube"
          iconPosition="left"
          onClick={handleStartAuth}
          disabled={isLoading}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          ربط حساب يوتيوب
        </Button>
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="Shield" size={20} className="text-accent mt-0.5" />
            <div className="text-right">
              <h4 className="font-medium text-foreground mb-1">أمان وخصوصية</h4>
              <p className="text-sm text-muted-foreground">
                نحن نستخدم OAuth 2.0 الآمن ولا نحفظ كلمات المرور. يمكنك إلغاء الربط في أي وقت.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Shield" size={32} className="text-accent" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          صلاحيات الوصول المطلوبة
        </h2>
        <p className="text-muted-foreground">
          نحتاج إلى الصلاحيات التالية لتوفير أفضل تجربة لك
        </p>
      </div>
      <div className="space-y-4 mb-8">
        {permissions?.map((permission, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name={permission?.icon} size={20} className="text-accent" />
            </div>
            <div className="flex-1 text-right">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-foreground">{permission?.title}</h3>
                {permission?.required && (
                  <span className="text-xs bg-error/10 text-error px-2 py-0.5 rounded">
                    مطلوب
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{permission?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={() => setShowPermissions(false)}
          className="flex-1"
        >
          إلغاء
        </Button>
        <Button
          variant="default"
          size="lg"
          iconName="Check"
          iconPosition="left"
          onClick={handleConfirmAuth}
          loading={currentStep === 3}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white"
        >
          {currentStep === 3 ? 'جاري الربط...' : 'موافق وربط'}
        </Button>
      </div>
    </div>
  );
};

export default YouTubeAuthFlow;