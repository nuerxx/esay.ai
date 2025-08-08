import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const AdvancedSettings = ({ settings, onSettingsChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const contentTypes = [
    { id: 'educational', label: 'تعليمي', description: 'محتوى تعليمي وشروحات', icon: 'GraduationCap' },
    { id: 'entertainment', label: 'ترفيهي', description: 'محتوى ترفيهي وكوميدي', icon: 'Smile' },
    { id: 'promotional', label: 'ترويجي', description: 'محتوى تسويقي وإعلاني', icon: 'Megaphone' },
    { id: 'informational', label: 'إخباري', description: 'أخبار ومعلومات', icon: 'Newspaper' }
  ];

  const focusAreas = [
    { id: 'highlights', label: 'اللحظات المميزة', description: 'أهم اللحظات في الفيديو', icon: 'Star' },
    { id: 'quotes', label: 'الاقتباسات', description: 'العبارات والاقتباسات المهمة', icon: 'Quote' },
    { id: 'reactions', label: 'ردود الأفعال', description: 'تعبيرات الوجه والانفعالات', icon: 'Heart' },
    { id: 'transitions', label: 'الانتقالات', description: 'نقاط التحول في المحتوى', icon: 'ArrowRight' }
  ];

  const analysisOptions = [
    { id: 'speech_analysis', label: 'تحليل الكلام', description: 'تحويل الكلام إلى نص وتحليل المحتوى' },
    { id: 'emotion_detection', label: 'كشف المشاعر', description: 'تحليل تعبيرات الوجه والمشاعر' },
    { id: 'scene_detection', label: 'كشف المشاهد', description: 'تحديد تغييرات المشاهد والانتقالات' },
    { id: 'audio_analysis', label: 'تحليل الصوت', description: 'تحليل جودة الصوت والموسيقى' }
  ];

  const handleContentTypeChange = (typeId, checked) => {
    const updatedTypes = checked
      ? [...(settings?.contentTypes || []), typeId]
      : (settings?.contentTypes || [])?.filter(t => t !== typeId);
    
    onSettingsChange({ ...settings, contentTypes: updatedTypes });
  };

  const handleFocusAreaChange = (areaId, checked) => {
    const updatedAreas = checked
      ? [...(settings?.focusAreas || []), areaId]
      : (settings?.focusAreas || [])?.filter(a => a !== areaId);
    
    onSettingsChange({ ...settings, focusAreas: updatedAreas });
  };

  const handleAnalysisOptionChange = (optionId, checked) => {
    const updatedOptions = checked
      ? [...(settings?.analysisOptions || []), optionId]
      : (settings?.analysisOptions || [])?.filter(o => o !== optionId);
    
    onSettingsChange({ ...settings, analysisOptions: updatedOptions });
  };

  return (
    <div className="space-y-6">
      {/* Toggle Button */}
      <Button
        variant="ghost"
        onClick={() => setIsExpanded(!isExpanded)}
        iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
        iconPosition="right"
        className="w-full justify-between p-4 bg-muted/30 hover:bg-muted/50"
      >
        <span className="flex items-center gap-2">
          <Icon name="Settings" size={20} />
          الإعدادات المتقدمة
        </span>
      </Button>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="space-y-8 bg-card border border-border rounded-lg p-6">
          {/* Content Type */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Icon name="Tag" size={20} />
              نوع المحتوى
            </h4>
            <p className="text-sm text-muted-foreground">
              اختر نوع المحتوى لتحسين دقة التحليل والاستخراج
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contentTypes?.map((type) => (
                <div key={type?.id} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                  <Checkbox
                    checked={(settings?.contentTypes || [])?.includes(type?.id)}
                    onChange={(e) => handleContentTypeChange(type?.id, e?.target?.checked)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name={type?.icon} size={16} className="text-accent" />
                      <span className="font-medium text-foreground">{type?.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{type?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Focus Areas */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Icon name="Target" size={20} />
              مناطق التركيز
            </h4>
            <p className="text-sm text-muted-foreground">
              حدد العناصر التي تريد التركيز عليها عند إنشاء المقاطع
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {focusAreas?.map((area) => (
                <div key={area?.id} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                  <Checkbox
                    checked={(settings?.focusAreas || [])?.includes(area?.id)}
                    onChange={(e) => handleFocusAreaChange(area?.id, e?.target?.checked)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name={area?.icon} size={16} className="text-accent" />
                      <span className="font-medium text-foreground">{area?.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{area?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis Options */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Icon name="Brain" size={20} />
              خيارات التحليل بالذكاء الاصطناعي
            </h4>
            <p className="text-sm text-muted-foreground">
              اختر أنواع التحليل التي تريد تطبيقها على الفيديو
            </p>
            
            <div className="space-y-3">
              {analysisOptions?.map((option) => (
                <div key={option?.id} className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
                  <Checkbox
                    checked={(settings?.analysisOptions || [])?.includes(option?.id)}
                    onChange={(e) => handleAnalysisOptionChange(option?.id, e?.target?.checked)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-foreground block mb-1">{option?.label}</span>
                    <p className="text-xs text-muted-foreground">{option?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Processing Priority */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Icon name="Zap" size={20} />
              أولوية المعالجة
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {['standard', 'fast', 'premium']?.map((priority) => (
                <div
                  key={priority}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    settings?.processingPriority === priority
                      ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
                  }`}
                  onClick={() => onSettingsChange({ ...settings, processingPriority: priority })}
                >
                  <div className="text-center space-y-2">
                    <Icon 
                      name={priority === 'standard' ? 'Clock' : priority === 'fast' ? 'Zap' : 'Crown'} 
                      size={24} 
                      className={priority === 'premium' ? 'text-yellow-500' : 'text-accent'} 
                    />
                    <h5 className="font-medium text-foreground">
                      {priority === 'standard' ? 'عادي' : priority === 'fast' ? 'سريع' : 'مميز'}
                    </h5>
                    <p className="text-xs text-muted-foreground">
                      {priority === 'standard' ?'15-30 دقيقة' 
                        : priority === 'fast' ?'5-15 دقيقة' :'2-5 دقائق'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSettings;