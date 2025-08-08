import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActions = ({ 
  selectedClips, 
  onSelectAll, 
  onDeselectAll, 
  onBulkDownload, 
  onBulkDelete, 
  onBulkShare,
  totalClips 
}) => {
  const selectedCount = selectedClips?.length;
  const allSelected = selectedCount === totalClips && totalClips > 0;

  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-card border border-border rounded-lg shadow-floating p-4 min-w-80">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon name="CheckSquare" size={20} className="text-accent" />
            <span className="font-medium text-foreground">
              تم تحديد {selectedCount} مقطع
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="xs"
              onClick={allSelected ? onDeselectAll : onSelectAll}
            >
              {allSelected ? 'إلغاء الكل' : 'تحديد الكل'}
            </Button>
            <Button
              variant="ghost"
              size="xs"
              iconName="X"
              onClick={onDeselectAll}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            iconName="Download"
            onClick={onBulkDownload}
            className="flex-1"
          >
            تحميل ({selectedCount})
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Share"
            onClick={onBulkShare}
          >
            مشاركة
          </Button>
          
          <Button
            variant="destructive"
            size="sm"
            iconName="Trash2"
            onClick={onBulkDelete}
          >
            حذف
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActions;