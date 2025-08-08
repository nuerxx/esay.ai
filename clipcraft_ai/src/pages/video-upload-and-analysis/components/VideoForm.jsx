import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const VideoForm = ({ formData, onFormChange, selectedFile }) => {
  const [clipDuration, setClipDuration] = useState(30);

  const platforms = [
    { id: 'tiktok', label: 'تيك توك', icon: 'Music', color: 'text-pink-600' },
    { id: 'instagram', label: 'إنستغرام ريلز', icon: 'Instagram', color: 'text-purple-600' },
    { id: 'youtube', label: 'يوتيوب شورتس', icon: 'Youtube', color: 'text-red-600' }
  ];

  const handlePlatformChange = (platformId, checked) => {
    const updatedPlatforms = checked
      ? [...(formData?.targetPlatforms || []), platformId]
      : (formData?.targetPlatforms || [])?.filter(p => p !== platformId);
    
    onFormChange({ ...formData, targetPlatforms: updatedPlatforms });
  };

  const handleDurationChange = (e) => {
    const duration = parseInt(e?.target?.value);
    setClipDuration(duration);
    onFormChange({ ...formData, clipDuration: duration });
  };

  return (
    <div className="space-y-6">
      {/* File Info */}
      {selectedFile && (
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="FileVideo" size={20} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{selectedFile?.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile?.size / (1024 * 1024))?.toFixed(1)} ميجابايت
              </p>
            </div>
            <Icon name="CheckCircle" size={20} className="text-success" />
          </div>
        </div>
      )}
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Info" size={20} />
          معلومات الفيديو
        </h3>

        <Input
          label="عنوان الفيديو"
          type="text"
          placeholder="أدخل عنوان وصفي للفيديو"
          value={formData?.title || ''}
          onChange={(e) => onFormChange({ ...formData, title: e?.target?.value })}
          required
        />

        <Input
          label="وصف الفيديو"
          type="text"
          placeholder="وصف مختصر لمحتوى الفيديو"
          value={formData?.description || ''}
          onChange={(e) => onFormChange({ ...formData, description: e?.target?.value })}
        />
      </div>
      {/* Target Platforms */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Target" size={20} />
          المنصات المستهدفة
        </h3>
        
        <div className="grid gap-3">
          {platforms?.map((platform) => (
            <div key={platform?.id} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
              <Checkbox
                checked={(formData?.targetPlatforms || [])?.includes(platform?.id)}
                onChange={(e) => handlePlatformChange(platform?.id, e?.target?.checked)}
              />
              <Icon name={platform?.icon} size={20} className={platform?.color} />
              <span className="font-medium text-foreground">{platform?.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Clip Duration */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Clock" size={20} />
          مدة المقطع المفضلة
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">15 ثانية</span>
            <span className="text-lg font-semibold text-accent">{clipDuration} ثانية</span>
            <span className="text-sm text-muted-foreground">60 ثانية</span>
          </div>
          
          <input
            type="range"
            min="15"
            max="60"
            step="5"
            value={clipDuration}
            onChange={handleDurationChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${((clipDuration - 15) / 45) * 100}%, var(--color-muted) ${((clipDuration - 15) / 45) * 100}%, var(--color-muted) 100%)`
            }}
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>مناسب لتيك توك</span>
            <span>مناسب لجميع المنصات</span>
            <span>الحد الأقصى</span>
          </div>
        </div>
      </div>
      {/* Keywords */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Hash" size={20} />
          كلمات مفتاحية (اختياري)
        </h3>
        
        <Input
          label="كلمات مفتاحية"
          type="text"
          placeholder="مثال: تسويق، محتوى، إبداع (افصل بفاصلة)"
          description="ستساعد الذكي الاصطناعي في فهم السياق بشكل أفضل"
          value={formData?.keywords || ''}
          onChange={(e) => onFormChange({ ...formData, keywords: e?.target?.value })}
        />
      </div>
    </div>
  );
};

export default VideoForm;