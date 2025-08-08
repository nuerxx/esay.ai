import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ hasFilters, onClearFilters }) => {
  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-2">
          لا توجد نتائج مطابقة
        </h3>
        
        <p className="text-muted-foreground text-center mb-6 max-w-md">
          لم نتمكن من العثور على أي مقاطع تطابق المرشحات المحددة. جرب تعديل معايير البحث.
        </p>
        
        <Button
          variant="outline"
          iconName="RotateCcw"
          onClick={onClearFilters}
        >
          مسح المرشحات
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-32 h-32 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center mb-8">
        <Icon name="Video" size={48} className="text-accent" />
      </div>
      
      <h3 className="text-2xl font-semibold text-foreground mb-3">
        ابدأ في إنشاء المقاطع
      </h3>
      
      <p className="text-muted-foreground text-center mb-8 max-w-lg">
        لا توجد مقاطع في مكتبتك بعد. قم برفع فيديو طويل وسيقوم الذكاء الاصطناعي بإنشاء مقاطع قصيرة مذهلة لك تلقائياً.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/video-upload-and-analysis">
          <Button
            variant="default"
            iconName="Upload"
            className="w-full sm:w-auto"
          >
            رفع فيديو جديد
          </Button>
        </Link>
        
        <Link to="/ai-processing-status">
          <Button
            variant="outline"
            iconName="Cpu"
            className="w-full sm:w-auto"
          >
            عرض حالة المعالجة
          </Button>
        </Link>
      </div>
      
      {/* Tips */}
      <div className="mt-12 max-w-2xl">
        <h4 className="text-lg font-medium text-foreground mb-4 text-center">
          نصائح للحصول على أفضل النتائج:
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <Icon name="Clock" size={24} className="text-accent mx-auto mb-2" />
            <h5 className="font-medium text-foreground mb-1">المدة المثلى</h5>
            <p className="text-sm text-muted-foreground">
              الفيديوهات من 5-30 دقيقة تعطي أفضل النتائج
            </p>
          </div>
          
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <Icon name="Mic" size={24} className="text-accent mx-auto mb-2" />
            <h5 className="font-medium text-foreground mb-1">جودة الصوت</h5>
            <p className="text-sm text-muted-foreground">
              تأكد من وضوح الصوت للحصول على نصوص دقيقة
            </p>
          </div>
          
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <Icon name="Target" size={24} className="text-accent mx-auto mb-2" />
            <h5 className="font-medium text-foreground mb-1">المحتوى المناسب</h5>
            <p className="text-sm text-muted-foreground">
              المحتوى التعليمي والترفيهي يحقق أفضل أداء
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;