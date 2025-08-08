import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ImportHistory = ({ history, onReprocess, onViewClips }) => {
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'text-success bg-success/10', text: 'مكتمل', icon: 'CheckCircle' },
      processing: { color: 'text-warning bg-warning/10', text: 'قيد المعالجة', icon: 'Loader2' },
      failed: { color: 'text-error bg-error/10', text: 'فشل', icon: 'XCircle' },
      partial: { color: 'text-accent bg-accent/10', text: 'جزئي', icon: 'AlertTriangle' }
    };

    const config = statusConfig?.[status] || statusConfig?.failed;
    
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${config?.color}`}>
        <Icon name={config?.icon} size={12} className={status === 'processing' ? 'animate-spin' : ''} />
        {config?.text}
      </div>
    );
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}س ${minutes}د`;
    }
    return `${minutes}د`;
  };

  const filteredHistory = history?.filter(item => {
    if (filterStatus === 'all') return true;
    return item?.status === filterStatus;
  });

  const sortedHistory = [...filteredHistory]?.sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.processedAt) - new Date(a.processedAt);
      case 'clips':
        return b?.clipsGenerated - a?.clipsGenerated;
      case 'duration':
        return b?.processingTime - a?.processingTime;
      default:
        return 0;
    }
  });

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            سجل المعالجة
          </h2>
          <p className="text-sm text-muted-foreground">
            تاريخ الفيديوهات التي تم معالجتها والمقاطع المنشأة
          </p>
        </div>
        <Icon name="History" size={24} className="text-muted-foreground" />
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e?.target?.value)}
          className="px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm"
        >
          <option value="date">ترتيب حسب التاريخ</option>
          <option value="clips">ترتيب حسب عدد المقاطع</option>
          <option value="duration">ترتيب حسب وقت المعالجة</option>
        </select>
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e?.target?.value)}
          className="px-3 py-2 border border-border rounded-md bg-card text-foreground text-sm"
        >
          <option value="all">جميع الحالات</option>
          <option value="completed">مكتمل</option>
          <option value="processing">قيد المعالجة</option>
          <option value="failed">فشل</option>
          <option value="partial">جزئي</option>
        </select>
      </div>
      {/* History List */}
      <div className="space-y-4">
        {sortedHistory?.map((item) => (
          <div key={item?.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="relative">
                <Image
                  src={item?.thumbnail}
                  alt={item?.title}
                  className="w-24 h-16 object-cover rounded"
                />
                <div className="absolute bottom-1 left-1 bg-black/80 text-white px-1 py-0.5 rounded text-xs">
                  {formatDuration(item?.duration)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-foreground line-clamp-2 text-right">
                    {item?.title}
                  </h3>
                  {getStatusBadge(item?.status)}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                  <div>
                    <span className="block font-medium text-foreground">
                      {item?.clipsGenerated}
                    </span>
                    <span>مقطع منشأ</span>
                  </div>
                  <div>
                    <span className="block font-medium text-foreground">
                      {formatDuration(item?.processingTime)}
                    </span>
                    <span>وقت المعالجة</span>
                  </div>
                  <div>
                    <span className="block font-medium text-foreground">
                      {new Date(item.processedAt)?.toLocaleDateString('ar-SA')}
                    </span>
                    <span>تاريخ المعالجة</span>
                  </div>
                  <div>
                    <span className="block font-medium text-foreground">
                      {item?.viewsGenerated?.toLocaleString('ar-SA')}
                    </span>
                    <span>مشاهدات المقاطع</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {item?.status === 'completed' && item?.clipsGenerated > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                      onClick={() => onViewClips(item?.id)}
                    >
                      عرض المقاطع
                    </Button>
                  )}
                  
                  {(item?.status === 'failed' || item?.status === 'partial') && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="RefreshCw"
                      iconPosition="left"
                      onClick={() => onReprocess(item?.id)}
                    >
                      إعادة معالجة
                    </Button>
                  )}
                  
                  {item?.aiInsights && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Brain"
                      iconPosition="left"
                      className="text-accent hover:text-accent"
                    >
                      رؤى الذكاء الاصطناعي
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            {item?.errorMessage && (
              <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-error">خطأ في المعالجة</p>
                    <p className="text-sm text-error/80">{item?.errorMessage}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {sortedHistory?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="History" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            لا يوجد سجل معالجة
          </h3>
          <p className="text-muted-foreground">
            {filterStatus === 'all' ?'لم يتم معالجة أي فيديوهات بعد'
              : `لا توجد فيديوهات بحالة "${filterStatus}"`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ImportHistory;