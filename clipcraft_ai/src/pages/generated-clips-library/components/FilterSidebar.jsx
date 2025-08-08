import React from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isOpen, 
  onClose,
  isMobile = false 
}) => {
  const sourceVideoOptions = [
    { value: 'all', label: 'جميع الفيديوهات' },
    { value: 'tutorial-basics', label: 'أساسيات التصميم' },
    { value: 'advanced-tips', label: 'نصائح متقدمة' },
    { value: 'case-studies', label: 'دراسات الحالة' },
    { value: 'interviews', label: 'المقابلات' }
  ];

  const platformOptions = [
    { value: 'all', label: 'جميع المنصات' },
    { value: 'youtube', label: 'يوتيوب شورتس' },
    { value: 'tiktok', label: 'تيك توك' },
    { value: 'instagram', label: 'إنستغرام ريلز' },
    { value: 'twitter', label: 'تويتر' }
  ];

  const performanceOptions = [
    { value: 'all', label: 'جميع المستويات' },
    { value: 'excellent', label: 'ممتاز (80%+)' },
    { value: 'good', label: 'جيد (60-79%)' },
    { value: 'average', label: 'متوسط (40-59%)' },
    { value: 'poor', label: 'ضعيف (<40%)' }
  ];

  const durationOptions = [
    { value: 'all', label: 'جميع المدد' },
    { value: '15', label: '15 ثانية' },
    { value: '30', label: '30 ثانية' },
    { value: '60', label: '60 ثانية' },
    { value: '90', label: '90 ثانية' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters)?.filter(value => value && value !== 'all')?.length;
  };

  const sidebarContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">المرشحات</h3>
        {isMobile && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        )}
      </div>

      {/* Search */}
      <div>
        <Input
          type="search"
          placeholder="البحث في المقاطع..."
          value={filters?.search || ''}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>

      {/* Source Video Filter */}
      <div>
        <Select
          label="الفيديو المصدر"
          options={sourceVideoOptions}
          value={filters?.sourceVideo || 'all'}
          onChange={(value) => handleFilterChange('sourceVideo', value)}
        />
      </div>

      {/* Platform Filter */}
      <div>
        <Select
          label="المنصة المستهدفة"
          options={platformOptions}
          value={filters?.platform || 'all'}
          onChange={(value) => handleFilterChange('platform', value)}
        />
      </div>

      {/* Performance Filter */}
      <div>
        <Select
          label="مستوى الأداء"
          options={performanceOptions}
          value={filters?.performance || 'all'}
          onChange={(value) => handleFilterChange('performance', value)}
        />
      </div>

      {/* Duration Filter */}
      <div>
        <Select
          label="مدة المقطع"
          options={durationOptions}
          value={filters?.duration || 'all'}
          onChange={(value) => handleFilterChange('duration', value)}
        />
      </div>

      {/* Date Range */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">نطاق التاريخ</label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="date"
            placeholder="من"
            value={filters?.dateFrom || ''}
            onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
          />
          <Input
            type="date"
            placeholder="إلى"
            value={filters?.dateTo || ''}
            onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
          />
        </div>
      </div>

      {/* Clear Filters */}
      {getActiveFiltersCount() > 0 && (
        <Button
          variant="outline"
          fullWidth
          iconName="X"
          onClick={onClearFilters}
        >
          مسح المرشحات ({getActiveFiltersCount()})
        </Button>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
            <div className="absolute right-0 top-0 h-full w-80 bg-card border-l border-border p-6 overflow-y-auto">
              {sidebarContent}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="w-80 bg-card border-l border-border p-6 overflow-y-auto">
      {sidebarContent}
    </div>
  );
};

export default FilterSidebar;