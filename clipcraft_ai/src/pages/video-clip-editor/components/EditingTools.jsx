import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const EditingTools = ({ 
  activeSegment, 
  onTextOverlayUpdate, 
  onColorCorrectionUpdate,
  onAudioLevelUpdate,
  onTransitionUpdate,
  onExportSettingsUpdate,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState('text');
  const [textOverlay, setTextOverlay] = useState({
    text: '',
    position: 'bottom',
    style: 'modern',
    fontSize: 24,
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    duration: 3
  });

  const [colorCorrection, setColorCorrection] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
    temperature: 0,
    tint: 0
  });

  const [audioSettings, setAudioSettings] = useState({
    volume: 100,
    fadeIn: 0,
    fadeOut: 0,
    backgroundMusic: false,
    musicVolume: 30
  });

  const [transition, setTransition] = useState({
    type: 'none',
    duration: 0.5
  });

  const [exportSettings, setExportSettings] = useState({
    quality: 'high',
    format: 'mp4',
    aspectRatio: '9:16',
    includeSubtitles: true,
    includeBranding: false,
    platform: 'tiktok'
  });

  const tabs = [
    { id: 'text', label: 'النص', icon: 'Type' },
    { id: 'color', label: 'الألوان', icon: 'Palette' },
    { id: 'audio', label: 'الصوت', icon: 'Volume2' },
    { id: 'transition', label: 'الانتقالات', icon: 'Zap' },
    { id: 'export', label: 'التصدير', icon: 'Download' }
  ];

  const textPositions = [
    { value: 'top', label: 'أعلى' },
    { value: 'center', label: 'وسط' },
    { value: 'bottom', label: 'أسفل' }
  ];

  const textStyles = [
    { value: 'modern', label: 'عصري' },
    { value: 'bold', label: 'عريض' },
    { value: 'elegant', label: 'أنيق' },
    { value: 'playful', label: 'مرح' }
  ];

  const transitionTypes = [
    { value: 'none', label: 'بدون' },
    { value: 'fade', label: 'تلاشي' },
    { value: 'slide', label: 'انزلاق' },
    { value: 'zoom', label: 'تكبير' },
    { value: 'wipe', label: 'مسح' }
  ];

  const qualityOptions = [
    { value: 'low', label: 'منخفضة (720p)' },
    { value: 'medium', label: 'متوسطة (1080p)' },
    { value: 'high', label: 'عالية (1080p+)' },
    { value: 'ultra', label: 'فائقة (4K)' }
  ];

  const aspectRatios = [
    { value: '16:9', label: '16:9 (YouTube)' },
    { value: '9:16', label: '9:16 (TikTok/Reels)' },
    { value: '1:1', label: '1:1 (Instagram)' },
    { value: '4:5', label: '4:5 (Instagram Feed)' }
  ];

  const platforms = [
    { value: 'tiktok', label: 'TikTok' },
    { value: 'instagram', label: 'Instagram Reels' },
    { value: 'youtube', label: 'YouTube Shorts' },
    { value: 'twitter', label: 'Twitter' }
  ];

  const handleTextOverlayChange = (field, value) => {
    const updated = { ...textOverlay, [field]: value };
    setTextOverlay(updated);
    onTextOverlayUpdate(updated);
  };

  const handleColorCorrectionChange = (field, value) => {
    const updated = { ...colorCorrection, [field]: value };
    setColorCorrection(updated);
    onColorCorrectionUpdate(updated);
  };

  const handleAudioSettingsChange = (field, value) => {
    const updated = { ...audioSettings, [field]: value };
    setAudioSettings(updated);
    onAudioLevelUpdate(updated);
  };

  const handleTransitionChange = (field, value) => {
    const updated = { ...transition, [field]: value };
    setTransition(updated);
    onTransitionUpdate(updated);
  };

  const handleExportSettingsChange = (field, value) => {
    const updated = { ...exportSettings, [field]: value };
    setExportSettings(updated);
    onExportSettingsUpdate(updated);
  };

  const renderTextOverlayTab = () => (
    <div className="space-y-4">
      <Input
        label="نص التراكب"
        type="text"
        value={textOverlay?.text}
        onChange={(e) => handleTextOverlayChange('text', e?.target?.value)}
        placeholder="أدخل النص المراد عرضه"
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">الموضع</label>
          <select
            value={textOverlay?.position}
            onChange={(e) => handleTextOverlayChange('position', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background"
          >
            {textPositions?.map(pos => (
              <option key={pos?.value} value={pos?.value}>{pos?.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">النمط</label>
          <select
            value={textOverlay?.style}
            onChange={(e) => handleTextOverlayChange('style', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-background"
          >
            {textStyles?.map(style => (
              <option key={style?.value} value={style?.value}>{style?.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">حجم الخط</label>
          <input
            type="range"
            min="12"
            max="48"
            value={textOverlay?.fontSize}
            onChange={(e) => handleTextOverlayChange('fontSize', parseInt(e?.target?.value))}
            className="w-full"
          />
          <span className="text-sm text-muted-foreground">{textOverlay?.fontSize}px</span>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">مدة العرض (ثانية)</label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={textOverlay?.duration}
            onChange={(e) => handleTextOverlayChange('duration', parseFloat(e?.target?.value))}
            className="w-full"
          />
          <span className="text-sm text-muted-foreground">{textOverlay?.duration}s</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">لون النص</label>
          <input
            type="color"
            value={textOverlay?.color}
            onChange={(e) => handleTextOverlayChange('color', e?.target?.value)}
            className="w-full h-10 rounded border border-border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">لون الخلفية</label>
          <input
            type="color"
            value={textOverlay?.backgroundColor?.replace('rgba(0,0,0,0.5)', '#000000')}
            onChange={(e) => handleTextOverlayChange('backgroundColor', `${e?.target?.value}80`)}
            className="w-full h-10 rounded border border-border"
          />
        </div>
      </div>
    </div>
  );

  const renderColorCorrectionTab = () => (
    <div className="space-y-6">
      {Object.entries(colorCorrection)?.map(([key, value]) => (
        <div key={key}>
          <label className="block text-sm font-medium mb-2 capitalize">
            {key === 'brightness' ? 'السطوع' :
             key === 'contrast' ? 'التباين' :
             key === 'saturation' ? 'التشبع' :
             key === 'temperature'? 'درجة الحرارة' : 'الصبغة'}
          </label>
          <input
            type="range"
            min="-100"
            max="100"
            value={value}
            onChange={(e) => handleColorCorrectionChange(key, parseInt(e?.target?.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-1">
            <span>-100</span>
            <span>{value}</span>
            <span>+100</span>
          </div>
        </div>
      ))}

      <Button
        variant="outline"
        onClick={() => {
          const reset = { brightness: 0, contrast: 0, saturation: 0, temperature: 0, tint: 0 };
          setColorCorrection(reset);
          onColorCorrectionUpdate(reset);
        }}
        className="w-full"
      >
        إعادة تعيين
      </Button>
    </div>
  );

  const renderAudioTab = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">مستوى الصوت</label>
        <input
          type="range"
          min="0"
          max="200"
          value={audioSettings?.volume}
          onChange={(e) => handleAudioSettingsChange('volume', parseInt(e?.target?.value))}
          className="w-full"
        />
        <span className="text-sm text-muted-foreground">{audioSettings?.volume}%</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">تلاشي الدخول (ثانية)</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={audioSettings?.fadeIn}
            onChange={(e) => handleAudioSettingsChange('fadeIn', parseFloat(e?.target?.value))}
            className="w-full"
          />
          <span className="text-sm text-muted-foreground">{audioSettings?.fadeIn}s</span>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">تلاشي الخروج (ثانية)</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={audioSettings?.fadeOut}
            onChange={(e) => handleAudioSettingsChange('fadeOut', parseFloat(e?.target?.value))}
            className="w-full"
          />
          <span className="text-sm text-muted-foreground">{audioSettings?.fadeOut}s</span>
        </div>
      </div>

      <Checkbox
        label="إضافة موسيقى خلفية"
        checked={audioSettings?.backgroundMusic}
        onChange={(e) => handleAudioSettingsChange('backgroundMusic', e?.target?.checked)}
      />

      {audioSettings?.backgroundMusic && (
        <div>
          <label className="block text-sm font-medium mb-2">مستوى الموسيقى الخلفية</label>
          <input
            type="range"
            min="0"
            max="100"
            value={audioSettings?.musicVolume}
            onChange={(e) => handleAudioSettingsChange('musicVolume', parseInt(e?.target?.value))}
            className="w-full"
          />
          <span className="text-sm text-muted-foreground">{audioSettings?.musicVolume}%</span>
        </div>
      )}
    </div>
  );

  const renderTransitionTab = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">نوع الانتقال</label>
        <select
          value={transition?.type}
          onChange={(e) => handleTransitionChange('type', e?.target?.value)}
          className="w-full px-3 py-2 border border-border rounded-md bg-background"
        >
          {transitionTypes?.map(type => (
            <option key={type?.value} value={type?.value}>{type?.label}</option>
          ))}
        </select>
      </div>

      {transition?.type !== 'none' && (
        <div>
          <label className="block text-sm font-medium mb-2">مدة الانتقال (ثانية)</label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={transition?.duration}
            onChange={(e) => handleTransitionChange('duration', parseFloat(e?.target?.value))}
            className="w-full"
          />
          <span className="text-sm text-muted-foreground">{transition?.duration}s</span>
        </div>
      )}

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">معاينة الانتقال</h4>
        <div className="flex gap-2">
          <div className="w-16 h-12 bg-accent/20 rounded flex items-center justify-center text-xs">
            مقطع 1
          </div>
          <div className="flex items-center">
            <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
          </div>
          <div className="w-16 h-12 bg-accent/20 rounded flex items-center justify-center text-xs">
            مقطع 2
          </div>
        </div>
      </div>
    </div>
  );

  const renderExportTab = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">جودة التصدير</label>
        <select
          value={exportSettings?.quality}
          onChange={(e) => handleExportSettingsChange('quality', e?.target?.value)}
          className="w-full px-3 py-2 border border-border rounded-md bg-background"
        >
          {qualityOptions?.map(quality => (
            <option key={quality?.value} value={quality?.value}>{quality?.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">نسبة العرض إلى الارتفاع</label>
        <select
          value={exportSettings?.aspectRatio}
          onChange={(e) => handleExportSettingsChange('aspectRatio', e?.target?.value)}
          className="w-full px-3 py-2 border border-border rounded-md bg-background"
        >
          {aspectRatios?.map(ratio => (
            <option key={ratio?.value} value={ratio?.value}>{ratio?.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">المنصة المستهدفة</label>
        <select
          value={exportSettings?.platform}
          onChange={(e) => handleExportSettingsChange('platform', e?.target?.value)}
          className="w-full px-3 py-2 border border-border rounded-md bg-background"
        >
          {platforms?.map(platform => (
            <option key={platform?.value} value={platform?.value}>{platform?.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <Checkbox
          label="تضمين الترجمة"
          checked={exportSettings?.includeSubtitles}
          onChange={(e) => handleExportSettingsChange('includeSubtitles', e?.target?.checked)}
        />

        <Checkbox
          label="تضمين العلامة التجارية"
          checked={exportSettings?.includeBranding}
          onChange={(e) => handleExportSettingsChange('includeBranding', e?.target?.checked)}
        />
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">معلومات التصدير</h4>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>الجودة: {qualityOptions?.find(q => q?.value === exportSettings?.quality)?.label}</p>
          <p>النسبة: {aspectRatios?.find(r => r?.value === exportSettings?.aspectRatio)?.label}</p>
          <p>المنصة: {platforms?.find(p => p?.value === exportSettings?.platform)?.label}</p>
          <p>الحجم المتوقع: ~{Math.round(Math.random() * 50 + 10)} MB</p>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'text':
        return renderTextOverlayTab();
      case 'color':
        return renderColorCorrectionTab();
      case 'audio':
        return renderAudioTab();
      case 'transition':
        return renderTransitionTab();
      case 'export':
        return renderExportTab();
      default:
        return null;
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs?.map(tab => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab?.id
                  ? 'text-accent border-b-2 border-accent' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              {tab?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-4">
        {!activeSegment && activeTab !== 'export' && (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="MousePointer" size={48} className="mx-auto mb-4 opacity-50" />
            <p>اختر مقطعاً من الخط الزمني لبدء التحرير</p>
          </div>
        )}
        
        {(activeSegment || activeTab === 'export') && renderTabContent()}
      </div>
    </div>
  );
};

export default EditingTools;