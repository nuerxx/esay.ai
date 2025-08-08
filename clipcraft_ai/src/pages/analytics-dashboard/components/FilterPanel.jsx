import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterPanel = ({ isOpen, onClose, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    dateRange: '7d',
    platform: 'all',
    contentType: 'all',
    minViews: '',
    maxViews: '',
    minEngagement: '',
    status: 'all'
  });

  const dateRangeOptions = [
    { value: '7d', label: 'آخر 7 أيام' },
    { value: '30d', label: 'آخر 30 يوم' },
    { value: '90d', label: 'آخر 90 يوم' },
    { value: '1y', label: 'آخر سنة' },
    { value: 'custom', label: 'فترة مخصصة' }
  ];

  const platformOptions = [
    { value: 'all', label: 'جميع المنصات' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'instagram', label: 'Instagram Reels' },
    { value: 'youtube', label: 'YouTube Shorts' }
  ];

  const contentTypeOptions = [
    { value: 'all', label: 'جميع الأنواع' },
    { value: 'cooking', label: 'طبخ' },
    { value: 'fitness', label: 'لياقة بدنية' },
    { value: 'education', label: 'تعليمي' },
    { value: 'entertainment', label: 'ترفيهي' },
    { value: 'lifestyle', label: 'نمط حياة' }
  ];

  const statusOptions = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'active', label: 'نشط' },
    { value: 'processing', label: 'قيد المعالجة' },
    { value: 'draft', label: 'مسودة' }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      dateRange: '7d',
      platform: 'all',
      contentType: 'all',
      minViews: '',
      maxViews: '',
      minEngagement: '',
      status: 'all'
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />
      {/* Filter Panel */}
      <div className="absolute top-0 right-0 h-full w-80 bg-card border-l border-border shadow-lg lg:relative lg:w-full lg:h-auto lg:shadow-none lg:border lg:rounded-lg overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">تصفية البيانات</h3>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
              className="lg:hidden"
            />
          </div>

          <div className="space-y-6">
            {/* Date Range */}
            <div>
              <Select
                label="الفترة الزمنية"
                options={dateRangeOptions}
                value={filters?.dateRange}
                onChange={(value) => handleFilterChange('dateRange', value)}
              />
            </div>

            {/* Platform */}
            <div>
              <Select
                label="المنصة"
                options={platformOptions}
                value={filters?.platform}
                onChange={(value) => handleFilterChange('platform', value)}
              />
            </div>

            {/* Content Type */}
            <div>
              <Select
                label="نوع المحتوى"
                options={contentTypeOptions}
                value={filters?.contentType}
                onChange={(value) => handleFilterChange('contentType', value)}
              />
            </div>

            {/* Views Range */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">نطاق المشاهدات</label>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="الحد الأدنى"
                  value={filters?.minViews}
                  onChange={(e) => handleFilterChange('minViews', e?.target?.value)}
                />
                <Input
                  type="number"
                  placeholder="الحد الأعلى"
                  value={filters?.maxViews}
                  onChange={(e) => handleFilterChange('maxViews', e?.target?.value)}
                />
              </div>
            </div>

            {/* Engagement Rate */}
            <div>
              <Input
                label="الحد الأدنى لمعدل التفاعل (%)"
                type="number"
                placeholder="مثال: 5"
                value={filters?.minEngagement}
                onChange={(e) => handleFilterChange('minEngagement', e?.target?.value)}
              />
            </div>

            {/* Status */}
            <div>
              <Select
                label="الحالة"
                options={statusOptions}
                value={filters?.status}
                onChange={(value) => handleFilterChange('status', value)}
              />
            </div>
          </div>

          {/* Active Filters Summary */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="text-sm font-medium text-foreground mb-2">الفلاتر النشطة</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters)?.map(([key, value]) => {
                if (!value || value === 'all' || value === '') return null;
                
                let label = value;
                if (key === 'dateRange') {
                  label = dateRangeOptions?.find(opt => opt?.value === value)?.label || value;
                } else if (key === 'platform') {
                  label = platformOptions?.find(opt => opt?.value === value)?.label || value;
                } else if (key === 'contentType') {
                  label = contentTypeOptions?.find(opt => opt?.value === value)?.label || value;
                } else if (key === 'status') {
                  label = statusOptions?.find(opt => opt?.value === value)?.label || value;
                }

                return (
                  <span
                    key={key}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-accent/10 text-accent text-xs rounded-md"
                  >
                    {label}
                    <button
                      onClick={() => handleFilterChange(key, key === 'dateRange' ? '7d' : 'all')}
                      className="hover:text-accent/80"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="flex-1"
              iconName="RotateCcw"
            >
              إعادة تعيين
            </Button>
            <Button
              onClick={handleApplyFilters}
              className="flex-1"
              iconName="Filter"
            >
              تطبيق الفلاتر
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;