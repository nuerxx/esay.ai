import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const AutomationSettings = ({ settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    setHasChanges(true);
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    setHasChanges(false);
  };

  const handleReset = () => {
    setLocalSettings(settings);
    setHasChanges(false);
  };

  const qualityOptions = [
    { value: '1080p', label: '1080p - جودة عالية' },
    { value: '720p', label: '720p - جودة متوسطة' },
    { value: '480p', label: '480p - جودة منخفضة' }
  ];

  const processingModeOptions = [
    { value: 'auto', label: 'تلقائي - معالجة فورية' },
    { value: 'manual', label: 'يدوي - تأكيد مطلوب' },
    { value: 'scheduled', label: 'مجدول - في أوقات محددة' }
  ];

  const notificationOptions = [
    { value: 'all', label: 'جميع الإشعارات' },
    { value: 'important', label: 'المهمة فقط' },
    { value: 'none', label: 'بدون إشعارات' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            إعدادات الأتمتة
          </h2>
          <p className="text-sm text-muted-foreground">
            تخصيص كيفية معالجة الفيديوهات الجديدة تلقائياً
          </p>
        </div>
        <Icon name="Settings" size={24} className="text-muted-foreground" />
      </div>
      <div className="space-y-8">
        {/* Video Detection */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <Icon name="Eye" size={20} />
            اكتشاف الفيديوهات الجديدة
          </h3>
          
          <div className="space-y-3 pr-6">
            <Checkbox
              label="مراقبة الفيديوهات الجديدة تلقائياً"
              description="سيتم فحص القناة كل ساعة للبحث عن فيديوهات جديدة"
              checked={localSettings?.autoDetection}
              onChange={(e) => handleSettingChange('autoDetection', e?.target?.checked)}
            />
            
            <Checkbox
              label="معالجة الفيديوهات المحدثة"
              description="إعادة معالجة الفيديوهات التي تم تحديثها أو تعديلها"
              checked={localSettings?.processUpdated}
              onChange={(e) => handleSettingChange('processUpdated', e?.target?.checked)}
            />
            
            <Checkbox
              label="تجاهل الفيديوهات القصيرة"
              description="عدم معالجة الفيديوهات أقل من 5 دقائق"
              checked={localSettings?.ignoreShorts}
              onChange={(e) => handleSettingChange('ignoreShorts', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Processing Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <Icon name="Cpu" size={20} />
            إعدادات المعالجة
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-6">
            <Select
              label="وضع المعالجة"
              options={processingModeOptions}
              value={localSettings?.processingMode}
              onChange={(value) => handleSettingChange('processingMode', value)}
            />
            
            <Select
              label="جودة الفيديو المفضلة"
              options={qualityOptions}
              value={localSettings?.preferredQuality}
              onChange={(value) => handleSettingChange('preferredQuality', value)}
            />
          </div>
          
          <div className="space-y-3 pr-6">
            <Checkbox
              label="إنشاء مقاطع متعددة لكل فيديو"
              description="إنشاء 3-5 مقاطع مختلفة من كل فيديو"
              checked={localSettings?.multipleClips}
              onChange={(e) => handleSettingChange('multipleClips', e?.target?.checked)}
            />
            
            <Checkbox
              label="تحسين تلقائي للمنصات المختلفة"
              description="إنشاء نسخ محسنة لـ TikTok و Instagram و YouTube Shorts"
              checked={localSettings?.platformOptimization}
              onChange={(e) => handleSettingChange('platformOptimization', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Rate Limits */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <Icon name="Gauge" size={20} />
            حدود المعالجة
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                الحد الأقصى يومياً
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={localSettings?.dailyLimit}
                onChange={(e) => handleSettingChange('dailyLimit', parseInt(e?.target?.value))}
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground"
              />
              <p className="text-xs text-muted-foreground mt-1">
                عدد الفيديوهات المعالجة يومياً
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                فترة الانتظار (دقائق)
              </label>
              <input
                type="number"
                min="5"
                max="120"
                value={localSettings?.processingDelay}
                onChange={(e) => handleSettingChange('processingDelay', parseInt(e?.target?.value))}
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground"
              />
              <p className="text-xs text-muted-foreground mt-1">
                الانتظار بين معالجة الفيديوهات
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                أولوية المعالجة
              </label>
              <select
                value={localSettings?.processingPriority}
                onChange={(e) => handleSettingChange('processingPriority', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-card text-foreground"
              >
                <option value="high">عالية</option>
                <option value="normal">عادية</option>
                <option value="low">منخفضة</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
            <Icon name="Bell" size={20} />
            الإشعارات
          </h3>
          
          <div className="space-y-4 pr-6">
            <Select
              label="مستوى الإشعارات"
              options={notificationOptions}
              value={localSettings?.notificationLevel}
              onChange={(value) => handleSettingChange('notificationLevel', value)}
            />
            
            <div className="space-y-3">
              <Checkbox
                label="إشعار عند اكتشاف فيديو جديد"
                checked={localSettings?.notifyNewVideo}
                onChange={(e) => handleSettingChange('notifyNewVideo', e?.target?.checked)}
              />
              
              <Checkbox
                label="إشعار عند اكتمال المعالجة"
                checked={localSettings?.notifyProcessingComplete}
                onChange={(e) => handleSettingChange('notifyProcessingComplete', e?.target?.checked)}
              />
              
              <Checkbox
                label="إشعار عند حدوث خطأ"
                checked={localSettings?.notifyErrors}
                onChange={(e) => handleSettingChange('notifyErrors', e?.target?.checked)}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Save/Reset Buttons */}
      {hasChanges && (
        <div className="mt-8 pt-6 border-t border-border flex gap-4">
          <Button
            variant="default"
            iconName="Save"
            iconPosition="left"
            onClick={handleSave}
          >
            حفظ الإعدادات
          </Button>
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={handleReset}
          >
            إعادة تعيين
          </Button>
        </div>
      )}
    </div>
  );
};

export default AutomationSettings;