import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';

import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import ClipCard from './components/ClipCard';
import FilterSidebar from './components/FilterSidebar';
import PreviewModal from './components/PreviewModal';
import BulkActions from './components/BulkActions';
import EmptyState from './components/EmptyState';
import LoadingSkeleton from './components/LoadingSkeleton';

const GeneratedClipsLibrary = () => {
  const navigate = useNavigate();
  const [clips, setClips] = useState([]);
  const [filteredClips, setFilteredClips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClips, setSelectedClips] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [previewClip, setPreviewClip] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    search: '',
    sourceVideo: 'all',
    platform: 'all',
    performance: 'all',
    duration: 'all',
    dateFrom: '',
    dateTo: ''
  });

  // Mock data
  const mockClips = [
    {
      id: 1,
      title: "أساسيات التصميم الجرافيكي - النقاط الرئيسية",
      description: "مقطع يلخص أهم النقاط في تعلم التصميم الجرافيكي للمبتدئين",
      thumbnail: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      duration: 45,
      platforms: ['youtube', 'tiktok', 'instagram'],
      createdAt: "2025-01-05T10:30:00Z",
      views: 12500,
      performanceScore: 85,
      sourceVideo: "tutorial-basics"
    },
    {
      id: 2,
      title: "نصائح سريعة لتحسين الألوان في التصميم",
      description: "مقطع قصير يشرح كيفية اختيار الألوان المناسبة",
      thumbnail: "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      duration: 30,
      platforms: ['instagram', 'tiktok'],
      createdAt: "2025-01-04T15:45:00Z",
      views: 8900,
      performanceScore: 72,
      sourceVideo: "advanced-tips"
    },
    {
      id: 3,
      title: "دراسة حالة: تصميم هوية بصرية كاملة",
      description: "عرض سريع لمشروع تصميم هوية بصرية من البداية للنهاية",
      thumbnail: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      duration: 60,
      platforms: ['youtube', 'instagram'],
      createdAt: "2025-01-03T09:20:00Z",
      views: 15600,
      performanceScore: 91,
      sourceVideo: "case-studies"
    },
    {
      id: 4,
      title: "أخطاء شائعة في التصميم يجب تجنبها",
      description: "مقطع يسلط الضوء على الأخطاء الأكثر شيوعاً في التصميم",
      thumbnail: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      duration: 35,
      platforms: ['tiktok', 'twitter'],
      createdAt: "2025-01-02T14:10:00Z",
      views: 6700,
      performanceScore: 58,
      sourceVideo: "tutorial-basics"
    },
    {
      id: 5,
      title: "مقابلة مع مصمم محترف - أهم النصائح",
      description: "أبرز اللحظات من مقابلة مع مصمم جرافيك محترف",
      thumbnail: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      duration: 50,
      platforms: ['youtube', 'instagram', 'twitter'],
      createdAt: "2025-01-01T11:30:00Z",
      views: 9800,
      performanceScore: 76,
      sourceVideo: "interviews"
    },
    {
      id: 6,
      title: "تقنيات متقدمة في الفوتوشوب",
      description: "شرح سريع لتقنيات متقدمة في برنامج الفوتوشوب",
      thumbnail: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      duration: 40,
      platforms: ['youtube', 'tiktok'],
      createdAt: "2024-12-30T16:20:00Z",
      views: 11200,
      performanceScore: 83,
      sourceVideo: "advanced-tips"
    }
  ];

  const sortOptions = [
    { value: 'newest', label: 'الأحدث أولاً' },
    { value: 'oldest', label: 'الأقدم أولاً' },
    { value: 'performance', label: 'الأفضل أداءً' },
    { value: 'views', label: 'الأكثر مشاهدة' },
    { value: 'duration', label: 'المدة' },
    { value: 'alphabetical', label: 'أبجدياً' }
  ];

  // Load clips
  useEffect(() => {
    const loadClips = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setClips(mockClips);
      setLoading(false);
    };

    loadClips();
  }, []);

  // Filter and sort clips
  useEffect(() => {
    let filtered = [...clips];

    // Apply filters
    if (filters?.search) {
      filtered = filtered?.filter(clip =>
        clip?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        clip?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.sourceVideo && filters?.sourceVideo !== 'all') {
      filtered = filtered?.filter(clip => clip?.sourceVideo === filters?.sourceVideo);
    }

    if (filters?.platform && filters?.platform !== 'all') {
      filtered = filtered?.filter(clip => clip?.platforms?.includes(filters?.platform));
    }

    if (filters?.performance && filters?.performance !== 'all') {
      const performanceRanges = {
        excellent: [80, 100],
        good: [60, 79],
        average: [40, 59],
        poor: [0, 39]
      };
      const range = performanceRanges?.[filters?.performance];
      if (range) {
        filtered = filtered?.filter(clip => 
          clip?.performanceScore >= range?.[0] && clip?.performanceScore <= range?.[1]
        );
      }
    }

    if (filters?.duration && filters?.duration !== 'all') {
      const targetDuration = parseInt(filters?.duration);
      filtered = filtered?.filter(clip => 
        Math.abs(clip?.duration - targetDuration) <= 10
      );
    }

    if (filters?.dateFrom) {
      filtered = filtered?.filter(clip => 
        new Date(clip.createdAt) >= new Date(filters.dateFrom)
      );
    }

    if (filters?.dateTo) {
      filtered = filtered?.filter(clip => 
        new Date(clip.createdAt) <= new Date(filters.dateTo)
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'performance':
          return b?.performanceScore - a?.performanceScore;
        case 'views':
          return b?.views - a?.views;
        case 'duration':
          return a?.duration - b?.duration;
        case 'alphabetical':
          return a?.title?.localeCompare(b?.title, 'ar');
        default:
          return 0;
      }
    });

    setFilteredClips(filtered);
  }, [clips, filters, sortBy]);

  const handleClipSelect = useCallback((clipId) => {
    setSelectedClips(prev => {
      if (prev?.includes(clipId)) {
        return prev?.filter(id => id !== clipId);
      } else {
        return [...prev, clipId];
      }
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedClips(filteredClips?.map(clip => clip?.id));
  }, [filteredClips]);

  const handleDeselectAll = useCallback(() => {
    setSelectedClips([]);
    setSelectionMode(false);
  }, []);

  const handlePreview = useCallback((clip) => {
    setPreviewClip(clip);
    setShowPreview(true);
  }, []);

  const handleEdit = useCallback((clip) => {
    navigate('/video-clip-editor', { state: { clipId: clip?.id } });
  }, [navigate]);

  const handleShare = useCallback((clip) => {
    // Mock share functionality
    console.log('Sharing clip:', clip?.title);
    // In real app, would open share modal or direct social media integration
  }, []);

  const handleDownload = useCallback((clip) => {
    // Mock download functionality
    console.log('Downloading clip:', clip?.title);
    // In real app, would trigger file download
  }, []);

  const handleBulkDownload = useCallback(() => {
    console.log('Bulk downloading clips:', selectedClips);
    // Mock bulk download
  }, [selectedClips]);

  const handleBulkDelete = useCallback(() => {
    if (window.confirm(`هل أنت متأكد من حذف ${selectedClips?.length} مقطع؟`)) {
      setClips(prev => prev?.filter(clip => !selectedClips?.includes(clip?.id)));
      setSelectedClips([]);
      setSelectionMode(false);
    }
  }, [selectedClips]);

  const handleBulkShare = useCallback(() => {
    console.log('Bulk sharing clips:', selectedClips);
    // Mock bulk share
  }, [selectedClips]);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      search: '',
      sourceVideo: 'all',
      platform: 'all',
      performance: 'all',
      duration: 'all',
      dateFrom: '',
      dateTo: ''
    });
  }, []);

  const hasActiveFilters = Object.values(filters)?.some(value => value && value !== 'all');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onClose={() => {}}
            isOpen={true}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6" />

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">مكتبة المقاطع المُنشأة</h1>
              <p className="text-muted-foreground">
                إدارة وتنظيم المقاطع القصيرة التي تم إنشاؤها بواسطة الذكاء الاصطناعي
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                size="sm"
                iconName="Filter"
                onClick={() => setShowFilters(true)}
                className="lg:hidden"
              >
                المرشحات
              </Button>

              {/* Selection Mode Toggle */}
              <Button
                variant={selectionMode ? "default" : "outline"}
                size="sm"
                iconName="CheckSquare"
                onClick={() => {
                  setSelectionMode(!selectionMode);
                  if (selectionMode) {
                    setSelectedClips([]);
                  }
                }}
              >
                تحديد متعدد
              </Button>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex items-center border border-border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="xs"
                  iconName="Grid3X3"
                  onClick={() => setViewMode('grid')}
                />
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="xs"
                  iconName="List"
                  onClick={() => setViewMode('list')}
                />
              </div>
            </div>
          </div>

          {/* Stats & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>المجموع: {clips?.length} مقطع</span>
              <span>المعروض: {filteredClips?.length} مقطع</span>
              {selectedClips?.length > 0 && (
                <span className="text-accent font-medium">
                  محدد: {selectedClips?.length}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={setSortBy}
                placeholder="ترتيب حسب"
                className="w-40"
              />
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <LoadingSkeleton count={12} />
          ) : filteredClips?.length === 0 ? (
            <EmptyState 
              hasFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
            />
          ) : (
            <div className={`grid gap-4 ${
              viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6' : 'grid-cols-1'
            }`}>
              {filteredClips?.map((clip) => (
                <ClipCard
                  key={clip?.id}
                  clip={clip}
                  isSelected={selectedClips?.includes(clip?.id)}
                  onSelect={handleClipSelect}
                  onPreview={handlePreview}
                  onEdit={handleEdit}
                  onShare={handleShare}
                  onDownload={handleDownload}
                  selectionMode={selectionMode}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        isMobile={true}
      />
      {/* Preview Modal */}
      <PreviewModal
        clip={previewClip}
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onEdit={handleEdit}
        onShare={handleShare}
        onDownload={handleDownload}
      />
      {/* Bulk Actions */}
      <BulkActions
        selectedClips={selectedClips}
        totalClips={filteredClips?.length}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        onBulkDownload={handleBulkDownload}
        onBulkDelete={handleBulkDelete}
        onBulkShare={handleBulkShare}
      />
    </div>
  );
};

export default GeneratedClipsLibrary;