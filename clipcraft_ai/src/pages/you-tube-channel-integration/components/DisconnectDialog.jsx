import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const DisconnectDialog = ({ isOpen, onClose, onConfirm, channelName, dataStats }) => {
  const [keepData, setKeepData] = useState(true);
  const [keepClips, setKeepClips] = useState(true);
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsConfirming(true);
    await onConfirm({
      keepData,
      keepClips
    });
    setIsConfirming(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Dialog */}
      <div className="relative bg-card border border-border rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
            <Icon name="Unlink" size={24} className="text-error" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              قطع الاتصال مع القناة
            </h2>
            <p className="text-sm text-muted-foreground">
              {channelName}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start gap-2">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning">
                  تحذير مهم
                </p>
                <p className="text-sm text-warning/80">
                  قطع الاتصال سيوقف المراقبة التلقائية والمعالجة الآلية للفيديوهات الجديدة
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-foreground">
              ماذا تريد أن تفعل بالبيانات الموجودة؟
            </h3>
            
            <div className="space-y-3">
              <Checkbox
                label="الاحتفاظ ببيانات القناة والفيديوهات"
                description={`${dataStats?.totalVideos} فيديو و ${dataStats?.totalViews?.toLocaleString('ar-SA')} مشاهدة`}
                checked={keepData}
                onChange={(e) => setKeepData(e?.target?.checked)}
              />
              
              <Checkbox
                label="الاحتفاظ بالمقاطع المنشأة"
                description={`${dataStats?.totalClips} مقطع تم إنشاؤه بحجم ${dataStats?.totalSize}`}
                checked={keepClips}
                onChange={(e) => setKeepClips(e?.target?.checked)}
              />
            </div>
          </div>

          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-medium text-foreground mb-2">
              ما سيحدث بعد قطع الاتصال:
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <Icon name="X" size={12} />
                توقف المراقبة التلقائية للفيديوهات الجديدة
              </li>
              <li className="flex items-center gap-2">
                <Icon name="X" size={12} />
                إلغاء المعالجة الآلية للمحتوى
              </li>
              <li className="flex items-center gap-2">
                <Icon name="X" size={12} />
                عدم تلقي إشعارات الفيديوهات الجديدة
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" size={12} className="text-success" />
                يمكنك إعادة الربط في أي وقت
              </li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isConfirming}
            className="flex-1"
          >
            إلغاء
          </Button>
          <Button
            variant="destructive"
            iconName="Unlink"
            iconPosition="left"
            onClick={handleConfirm}
            loading={isConfirming}
            className="flex-1"
          >
            {isConfirming ? 'جاري قطع الاتصال...' : 'قطع الاتصال'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DisconnectDialog;