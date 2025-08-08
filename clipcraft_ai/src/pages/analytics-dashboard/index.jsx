import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import KPICard from './components/KPICard';
import PerformanceChart from './components/PerformanceChart';
import PlatformComparison from './components/PlatformComparison';
import ContentPerformanceTable from './components/ContentPerformanceTable';
import InsightsPanel from './components/InsightsPanel';
import FilterPanel from './components/FilterPanel';

const AnalyticsDashboard = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock KPI data
  const kpiData = [
    {
      title: 'إجمالي المشاهدات',
      value: '2.4M',
      change: '+18.2%',
      changeType: 'positive',
      icon: 'Eye',
      color: 'accent'
    },
    {
      title: 'معدل التفاعل',
      value: '12.5%',
      change: '+2.3%',
      changeType: 'positive',
      icon: 'Heart',
      color: 'success'
    },
    {
      title: 'أفضل منصة',
      value: 'TikTok',
      change: '45% من المشاهدات',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'warning'
    },
    {
      title: 'المحتوى الرائج',
      value: 'طبخ',
      change: '+25% هذا الأسبوع',
      changeType: 'positive',
      icon: 'Flame',
      color: 'error'
    }
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    // Here you would typically refetch data with the new filters
    console.log('Applied filters:', filters);
  };

  const formatLastUpdated = (date) => {
    return date?.toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportToPDF = () => {
    // Simulate PDF export
    console.log('Exporting to PDF...');
  };

  const exportToCSV = () => {
    // Simulate CSV export
    console.log('Exporting to CSV...');
  };

  return (
    <>
      <Helmet>
        <title>لوحة التحليلات - ClipCraft AI</title>
        <meta name="description" content="تحليلات شاملة لأداء المحتوى عبر منصات التواصل الاجتماعي" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Header Section */}
          <div className="mb-6">
            <Breadcrumb className="mb-4" />
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  لوحة التحليلات
                </h1>
                <p className="text-muted-foreground">
                  رؤى شاملة لأداء المحتوى عبر جميع المنصات
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                {/* Last Updated */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span>آخر تحديث: {formatLastUpdated(lastUpdated)}</span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Filter"
                    onClick={() => setIsFilterOpen(true)}
                  >
                    تصفية
                  </Button>
                  
                  <div className="relative group">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Download"
                    >
                      تصدير
                    </Button>
                    
                    {/* Export Dropdown */}
                    <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-floating opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-2">
                        <button
                          onClick={exportToPDF}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                        >
                          <Icon name="FileText" size={16} />
                          تصدير PDF
                        </button>
                        <button
                          onClick={exportToCSV}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                        >
                          <Icon name="Table" size={16} />
                          تصدير CSV
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RefreshCw"
                    loading={isRefreshing}
                    onClick={handleRefresh}
                  >
                    تحديث
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi?.title}
                value={kpi?.value}
                change={kpi?.change}
                changeType={kpi?.changeType}
                icon={kpi?.icon}
                color={kpi?.color}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="xl:col-span-2">
              <PerformanceChart />
            </div>
            <div>
              <PlatformComparison />
            </div>
          </div>

          {/* Content Performance Table */}
          <div className="mb-8">
            <ContentPerformanceTable />
          </div>

          {/* Insights Panel */}
          <div className="mb-8">
            <InsightsPanel />
          </div>

          {/* Real-time Status */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-foreground">البيانات محدثة</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  المزامنة التلقائية نشطة
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="Database" size={16} />
                  <span>281 مقطع</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Activity" size={16} />
                  <span>12 قيد المعالجة</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Filter Panel */}
        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApplyFilters={handleApplyFilters}
        />
      </div>
    </>
  );
};

export default AnalyticsDashboard;