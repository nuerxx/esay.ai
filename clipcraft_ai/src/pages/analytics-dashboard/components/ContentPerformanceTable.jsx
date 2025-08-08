import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ContentPerformanceTable = () => {
  const [sortBy, setSortBy] = useState('views');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const contentData = [
    {
      id: 1,
      title: 'نصائح الطبخ السريع',
      thumbnail: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      platform: 'TikTok',
      views: 45200,
      likes: 3800,
      shares: 520,
      engagement: 12.5,
      duration: '00:30',
      publishDate: '2025-08-06',
      status: 'active'
    },
    {
      id: 2,
      title: 'تمارين منزلية سهلة',
      thumbnail: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=400',
      platform: 'Instagram',
      views: 32100,
      likes: 2900,
      shares: 380,
      engagement: 10.8,
      duration: '00:45',
      publishDate: '2025-08-05',
      status: 'active'
    },
    {
      id: 3,
      title: 'أفكار ديكور المنزل',
      thumbnail: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      platform: 'YouTube',
      views: 28900,
      likes: 2100,
      shares: 290,
      engagement: 8.9,
      duration: '00:60',
      publishDate: '2025-08-04',
      status: 'active'
    },
    {
      id: 4,
      title: 'وصفات حلويات سريعة',
      thumbnail: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=400',
      platform: 'TikTok',
      views: 52800,
      likes: 4200,
      shares: 680,
      engagement: 14.2,
      duration: '00:25',
      publishDate: '2025-08-03',
      status: 'active'
    },
    {
      id: 5,
      title: 'نصائح التصوير بالهاتف',
      thumbnail: 'https://images.pexels.com/photos/1983037/pexels-photo-1983037.jpeg?auto=compress&cs=tinysrgb&w=400',
      platform: 'Instagram',
      views: 19600,
      likes: 1800,
      shares: 240,
      engagement: 9.2,
      duration: '00:40',
      publishDate: '2025-08-02',
      status: 'processing'
    },
    {
      id: 6,
      title: 'أساسيات البرمجة',
      thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=400',
      platform: 'YouTube',
      views: 15400,
      likes: 1200,
      shares: 180,
      engagement: 7.5,
      duration: '01:20',
      publishDate: '2025-08-01',
      status: 'draft'
    }
  ];

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const sortedData = [...contentData]?.sort((a, b) => {
    const aValue = a?.[sortBy];
    const bValue = b?.[sortBy];
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const paginatedData = sortedData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000)?.toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000)?.toFixed(1)}K`;
    return num?.toString();
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      'TikTok': 'Music',
      'Instagram': 'Instagram',
      'YouTube': 'Youtube'
    };
    return icons?.[platform] || 'Video';
  };

  const getPlatformColor = (platform) => {
    const colors = {
      'TikTok': 'text-pink-600 bg-pink-50',
      'Instagram': 'text-rose-600 bg-rose-50',
      'YouTube': 'text-red-600 bg-red-50'
    };
    return colors?.[platform] || 'text-accent bg-accent/10';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'نشط', color: 'bg-success/10 text-success' },
      processing: { label: 'معالجة', color: 'bg-warning/10 text-warning' },
      draft: { label: 'مسودة', color: 'bg-muted text-muted-foreground' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.draft;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const SortButton = ({ column, children }) => (
    <button
      onClick={() => handleSort(column)}
      className="flex items-center gap-1 text-left font-medium text-foreground hover:text-accent transition-colors"
    >
      {children}
      <div className="flex flex-col">
        <Icon 
          name="ChevronUp" 
          size={12} 
          className={`${sortBy === column && sortOrder === 'asc' ? 'text-accent' : 'text-muted-foreground'}`}
        />
        <Icon 
          name="ChevronDown" 
          size={12} 
          className={`-mt-1 ${sortBy === column && sortOrder === 'desc' ? 'text-accent' : 'text-muted-foreground'}`}
        />
      </div>
    </button>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">أداء المحتوى</h3>
            <p className="text-sm text-muted-foreground">تفاصيل أداء المقاطع المنشورة</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" iconName="Download">
              تصدير
            </Button>
            <Button variant="outline" size="sm" iconName="Filter">
              تصفية
            </Button>
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">المحتوى</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">المنصة</th>
              <th className="text-right p-4">
                <SortButton column="views">المشاهدات</SortButton>
              </th>
              <th className="text-right p-4">
                <SortButton column="likes">الإعجابات</SortButton>
              </th>
              <th className="text-right p-4">
                <SortButton column="shares">المشاركات</SortButton>
              </th>
              <th className="text-right p-4">
                <SortButton column="engagement">التفاعل</SortButton>
              </th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">الحالة</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((item) => (
              <tr key={item?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={item?.thumbnail}
                        alt={item?.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {item?.duration}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-foreground line-clamp-1">{item?.title}</p>
                      <p className="text-sm text-muted-foreground">{item?.publishDate}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-lg ${getPlatformColor(item?.platform)}`}>
                    <Icon name={getPlatformIcon(item?.platform)} size={16} />
                    <span className="text-sm font-medium">{item?.platform}</span>
                  </div>
                </td>
                <td className="p-4 font-medium text-foreground">{formatNumber(item?.views)}</td>
                <td className="p-4 font-medium text-foreground">{formatNumber(item?.likes)}</td>
                <td className="p-4 font-medium text-foreground">{formatNumber(item?.shares)}</td>
                <td className="p-4 font-medium text-foreground">{item?.engagement}%</td>
                <td className="p-4">{getStatusBadge(item?.status)}</td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" iconName="Eye" />
                    <Button variant="ghost" size="sm" iconName="Edit" />
                    <Button variant="ghost" size="sm" iconName="Share" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden">
        {paginatedData?.map((item) => (
          <div key={item?.id} className="p-4 border-b border-border">
            <div className="flex items-start gap-3 mb-3">
              <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={item?.thumbnail}
                  alt={item?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                  {item?.duration}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground line-clamp-2 mb-1">{item?.title}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${getPlatformColor(item?.platform)}`}>
                    <Icon name={getPlatformIcon(item?.platform)} size={12} />
                    <span>{item?.platform}</span>
                  </div>
                  {getStatusBadge(item?.status)}
                </div>
                <p className="text-sm text-muted-foreground">{item?.publishDate}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">المشاهدات</p>
                <p className="font-semibold text-foreground">{formatNumber(item?.views)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">التفاعل</p>
                <p className="font-semibold text-foreground">{item?.engagement}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">الإعجابات</p>
                <p className="font-semibold text-foreground">{formatNumber(item?.likes)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">المشاركات</p>
                <p className="font-semibold text-foreground">{formatNumber(item?.shares)}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" iconName="Eye" />
                <Button variant="ghost" size="sm" iconName="Edit" />
                <Button variant="ghost" size="sm" iconName="Share" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              عرض {((currentPage - 1) * itemsPerPage) + 1} إلى {Math.min(currentPage * itemsPerPage, sortedData?.length)} من {sortedData?.length} نتيجة
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="ChevronRight"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              />
              <span className="text-sm font-medium text-foreground px-2">
                {currentPage} من {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                iconName="ChevronLeft"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentPerformanceTable;