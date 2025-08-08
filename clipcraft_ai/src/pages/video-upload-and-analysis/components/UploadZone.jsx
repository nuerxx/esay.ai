import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFileSelect, uploadProgress, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const supportedFormats = [
    { format: 'MP4', description: 'الأكثر شيوعاً' },
    { format: 'MOV', description: 'آيفون وماك' },
    { format: 'AVI', description: 'ويندوز' },
    { format: 'MKV', description: 'جودة عالية' }
  ];

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    const videoFiles = files?.filter(file => file?.type?.startsWith('video/'));
    
    if (videoFiles?.length > 0) {
      onFileSelect(videoFiles?.[0]);
    }
  };

  const handleFileInput = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-accent bg-accent/5 scale-[1.02]'
            : isUploading
            ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50 hover:bg-muted/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileInput}
          className="hidden"
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-accent animate-pulse" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">جاري رفع الفيديو...</p>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-accent h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">{uploadProgress}% مكتمل</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-accent" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                اسحب وأفلت الفيديو هنا
              </h3>
              <p className="text-muted-foreground">
                أو انقر لاختيار ملف من جهازك
              </p>
            </div>
            <Button
              variant="outline"
              onClick={openFileDialog}
              iconName="FolderOpen"
              iconPosition="right"
              className="mx-auto"
            >
              اختر ملف فيديو
            </Button>
          </div>
        )}
      </div>
      {/* Supported Formats */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <Icon name="FileVideo" size={16} />
          الصيغ المدعومة
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {supportedFormats?.map((format) => (
            <div key={format?.format} className="text-center">
              <div className="bg-card border border-border rounded-md p-2">
                <p className="text-sm font-medium text-foreground">{format?.format}</p>
                <p className="text-xs text-muted-foreground">{format?.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          <p>• الحد الأقصى لحجم الملف: 2 جيجابايت</p>
          <p>• مدة الفيديو: من 1 دقيقة إلى 3 ساعات</p>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;