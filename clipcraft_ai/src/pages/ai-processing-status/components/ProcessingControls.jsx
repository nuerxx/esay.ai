import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingControls = ({ 
  isProcessing, 
  canCancel, 
  onCancel, 
  onRetry, 
  processingData,
  hasErrors 
}) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const navigate = useNavigate();

  const handleCancelClick = () => {
    if (canCancel) {
      setShowCancelDialog(true);
    }
  };

  const handleConfirmCancel = () => {
    onCancel();
    setShowCancelDialog(false);
  };

  const handleViewResults = () => {
    navigate('/generated-clips-library');
  };

  const handleRetryProcessing = () => {
    onRetry();
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">التحكم في المعالجة</h3>
          <div className="flex items-center gap-2">
            {isProcessing && (
              <div className="flex items-center gap-2 text-accent">
                <Icon name="Loader2" size={16} className="animate-spin" />
                <span className="text-sm font-medium">جاري المعالجة...</span>
              </div>
            )}
          </div>
        </div>

        {/* Processing Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">
              {processingData?.completedStages}
            </div>
            <div className="text-sm text-muted-foreground">مراحل مكتملة</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {processingData?.estimatedClips}
            </div>
            <div className="text-sm text-muted-foreground">مقاطع متوقعة</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {processingData?.processingTime}
            </div>
            <div className="text-sm text-muted-foreground">دقائق معالجة</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {processingData?.qualityScore}%
            </div>
            <div className="text-sm text-muted-foreground">جودة التحليل</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {isProcessing && canCancel && (
            <Button
              variant="destructive"
              onClick={handleCancelClick}
              iconName="X"
              iconPosition="left"
              className="flex-1"
            >
              إلغاء المعالجة
            </Button>
          )}

          {hasErrors && (
            <Button
              variant="outline"
              onClick={handleRetryProcessing}
              iconName="RotateCcw"
              iconPosition="left"
              className="flex-1"
            >
              إعادة المحاولة
            </Button>
          )}

          {!isProcessing && !hasErrors && (
            <Button
              variant="default"
              onClick={handleViewResults}
              iconName="Eye"
              iconPosition="left"
              className="flex-1"
            >
              عرض النتائج
            </Button>
          )}

          <Button
            variant="ghost"
            onClick={() => navigate('/video-upload-and-analysis')}
            iconName="Upload"
            iconPosition="left"
            className="flex-1"
          >
            رفع فيديو جديد
          </Button>
        </div>

        {/* Processing Tips */}
        {isProcessing && (
          <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={16} className="text-accent mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-2">نصائح أثناء المعالجة</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• يمكنك إغلاق هذه الصفحة والعودة لاحقاً</li>
                  <li>• ستتلقى إشعاراً عند اكتمال المعالجة</li>
                  <li>• المعالجة تستغرق عادة 5-15 دقيقة حسب طول الفيديو</li>
                  <li>• تأكد من استقرار الاتصال بالإنترنت</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Cancel Confirmation Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowCancelDialog(false)}
          />
          
          {/* Dialog */}
          <div className="relative bg-card border border-border rounded-lg shadow-lg max-w-md w-full mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">تأكيد الإلغاء</h3>
                <p className="text-sm text-muted-foreground">
                  هل أنت متأكد من إلغاء المعالجة؟
                </p>
              </div>
            </div>

            <div className="bg-error/5 border border-error/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-foreground">
                سيتم فقدان جميع التقدم المحرز في التحليل وستحتاج لإعادة البدء من جديد.
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="destructive"
                onClick={handleConfirmCancel}
                iconName="X"
                iconPosition="left"
                className="flex-1"
              >
                نعم، إلغاء المعالجة
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCancelDialog(false)}
                className="flex-1"
              >
                العودة للمعالجة
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProcessingControls;