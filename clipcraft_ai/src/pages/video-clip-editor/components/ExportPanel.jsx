import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportPanel = ({ 
  onExport, 
  onSave, 
  onPreview,
  exportProgress = null,
  className = ''
}) => {
  const [exportSettings, setExportSettings] = useState({
    quality: 'high',
    format: 'mp4',
    aspectRatio: '9:16',
    includeSubtitles: true,
    includeBranding: false,
    platform: 'tiktok',
    filename: 'مقطع_محرر'
  });

  const [isExporting, setIsExporting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const qualityOptions = [
    { 
      value: 'low', 
      label: 'منخفضة (720p)', 
      size: '~5-10 MB',
      description: 'مناسبة للمعاينة السريعة'
    },
    { 
      value: 'medium', 
      label: 'متوسطة (1080p)', 
      size: '~15-25 MB',
      description: 'توازن جيد بين الجودة والحجم'
    },
    { 
      value: 'high', 
      label: 'عالية (1080p+)', 
      size: '~30-50 MB',
      description: 'جودة عالية للنشر'
    },
    { 
      value: 'ultra', 
      label: 'فائقة (4K)', 
      size: '~80-150 MB',
      description: 'أعلى جودة ممكنة'
    }
  ];

  const formatOptions = [
    { value: 'mp4', label: 'MP4', description: 'الأكثر توافقاً' },
    { value: 'mov', label: 'MOV', description: 'جودة عالية' },
    { value: 'webm', label: 'WebM', description: 'محسن للويب' }
  ];

  const platformPresets = [
    {
      value: 'tiktok',
      label: 'TikTok',
      icon: 'Smartphone',
      aspectRatio: '9:16',
      maxDuration: 180,
      recommended: 'high'
    },
    {
      value: 'instagram',
      label: 'Instagram Reels',
      icon: 'Instagram',
      aspectRatio: '9:16',
      maxDuration: 90,
      recommended: 'high'
    },
    {
      value: 'youtube',
      label: 'YouTube Shorts',
      icon: 'Youtube',
      aspectRatio: '9:16',
      maxDuration: 60,
      recommended: 'ultra'
    },
    {
      value: 'twitter',
      label: 'Twitter',
      icon: 'Twitter',
      aspectRatio: '16:9',
      maxDuration: 140,
      recommended: 'medium'
    },
    {
      value: 'custom',
      label: 'مخصص',
      icon: 'Settings',
      aspectRatio: '16:9',
      maxDuration: null,
      recommended: 'high'
    }
  ];

  const handleSettingChange = (key, value) => {
    setExportSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePlatformChange = (platform) => {
    const preset = platformPresets?.find(p => p?.value === platform);
    if (preset && platform !== 'custom') {
      setExportSettings(prev => ({
        ...prev,
        platform,
        aspectRatio: preset?.aspectRatio,
        quality: preset?.recommended
      }));
    } else {
      setExportSettings(prev => ({ ...prev, platform }));
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport(exportSettings);
    } finally {
      setIsExporting(false);
    }
  };

  const getEstimatedSize = () => {
    const quality = qualityOptions?.find(q => q?.value === exportSettings?.quality);
    return quality?.size || '~20-30 MB';
  };

  const getCurrentPlatform = () => {
    return platformPresets?.find(p => p?.value === exportSettings?.platform);
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Icon name="Download" size={20} />
          إعدادات التصدير
        </h3>
      </div>
      <div className="p-4 space-y-6">
        {/* Platform Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">المنصة المستهدفة</label>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {platformPresets?.map(platform => (
              <button
                key={platform?.value}
                onClick={() => handlePlatformChange(platform?.value)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  exportSettings?.platform === platform?.value
                    ? 'border-accent bg-accent/10' :'border-border hover:border-accent/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon name={platform?.icon} size={16} />
                  <span className="font-medium text-sm">{platform?.label}</span>
                </div>
                {platform?.maxDuration && (
                  <p className="text-xs text-muted-foreground">
                    حد أقصى: {platform?.maxDuration}ث
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quality Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">جودة التصدير</label>
          <div className="space-y-2">
            {qualityOptions?.map(quality => (
              <label
                key={quality?.value}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                  exportSettings?.quality === quality?.value
                    ? 'border-accent bg-accent/10' :'border-border hover:bg-muted/50'
                }`}
              >
                <input
                  type="radio"
                  name="quality"
                  value={quality?.value}
                  checked={exportSettings?.quality === quality?.value}
                  onChange={(e) => handleSettingChange('quality', e?.target?.value)}
                  className="sr-only"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{quality?.label}</span>
                    <span className="text-sm text-muted-foreground">{quality?.size}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{quality?.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Advanced Settings */}
        <div>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80"
          >
            <Icon name={showAdvanced ? "ChevronUp" : "ChevronDown"} size={16} />
            إعدادات متقدمة
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-4 p-4 bg-muted/30 rounded-lg">
              <div>
                <label className="block text-sm font-medium mb-2">تنسيق الملف</label>
                <select
                  value={exportSettings?.format}
                  onChange={(e) => handleSettingChange('format', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  {formatOptions?.map(format => (
                    <option key={format?.value} value={format?.value}>
                      {format?.label} - {format?.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">اسم الملف</label>
                <input
                  type="text"
                  value={exportSettings?.filename}
                  onChange={(e) => handleSettingChange('filename', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  placeholder="اسم الملف"
                />
              </div>

              <div className="space-y-3">
                <Checkbox
                  label="تضمين الترجمة"
                  description="إضافة ترجمة مدمجة في الفيديو"
                  checked={exportSettings?.includeSubtitles}
                  onChange={(e) => handleSettingChange('includeSubtitles', e?.target?.checked)}
                />

                <Checkbox
                  label="تضمين العلامة التجارية"
                  description="إضافة شعار أو علامة مائية"
                  checked={exportSettings?.includeBranding}
                  onChange={(e) => handleSettingChange('includeBranding', e?.target?.checked)}
                />
              </div>
            </div>
          )}
        </div>

        {/* Export Summary */}
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-3">ملخص التصدير</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">المنصة:</span>
              <span>{getCurrentPlatform()?.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">الجودة:</span>
              <span>{qualityOptions?.find(q => q?.value === exportSettings?.quality)?.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">التنسيق:</span>
              <span>{exportSettings?.format?.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">الحجم المتوقع:</span>
              <span>{getEstimatedSize()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">نسبة العرض:</span>
              <span>{exportSettings?.aspectRatio}</span>
            </div>
          </div>
        </div>

        {/* Export Progress */}
        {exportProgress && (
          <div className="p-4 bg-accent/10 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Loader2" size={16} className="animate-spin text-accent" />
              <span className="font-medium">جاري التصدير...</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">{exportProgress}% مكتمل</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => onSave(exportSettings)}
            className="flex-1"
          >
            <Icon name="Save" size={16} className="mr-2" />
            حفظ المشروع
          </Button>

          <Button
            variant="outline"
            onClick={() => onPreview(exportSettings)}
            className="flex-1"
          >
            <Icon name="Eye" size={16} className="mr-2" />
            معاينة
          </Button>

          <Button
            variant="default"
            onClick={handleExport}
            disabled={isExporting}
            loading={isExporting}
            className="flex-1"
          >
            <Icon name="Download" size={16} className="mr-2" />
            {isExporting ? 'جاري التصدير...' : 'تصدير الفيديو'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;