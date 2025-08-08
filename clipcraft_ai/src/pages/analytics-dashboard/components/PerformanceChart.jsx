import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';


const PerformanceChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('views');

  const chartData = [
    { date: '2025-08-01', views: 12500, engagement: 8.5, shares: 450, likes: 2100 },
    { date: '2025-08-02', views: 15200, engagement: 9.2, shares: 520, likes: 2800 },
    { date: '2025-08-03', views: 18900, engagement: 7.8, shares: 380, likes: 2200 },
    { date: '2025-08-04', views: 22100, engagement: 10.1, shares: 680, likes: 3400 },
    { date: '2025-08-05', views: 19800, engagement: 9.6, shares: 590, likes: 2900 },
    { date: '2025-08-06', views: 25400, engagement: 11.2, shares: 750, likes: 3800 },
    { date: '2025-08-07', views: 28600, engagement: 12.5, shares: 820, likes: 4200 },
    { date: '2025-08-08', views: 31200, engagement: 13.1, shares: 890, likes: 4600 }
  ];

  const timeRanges = [
    { value: '7d', label: '7 أيام' },
    { value: '30d', label: '30 يوم' },
    { value: '90d', label: '90 يوم' },
    { value: '1y', label: 'سنة واحدة' }
  ];

  const metrics = [
    { value: 'views', label: 'المشاهدات', color: '#3182CE' },
    { value: 'engagement', label: 'التفاعل', color: '#38A169' },
    { value: 'shares', label: 'المشاركات', color: '#D69E2E' },
    { value: 'likes', label: 'الإعجابات', color: '#E53E3E' }
  ];

  const formatValue = (value, metric) => {
    if (metric === 'engagement') return `${value}%`;
    if (value >= 1000) return `${(value / 1000)?.toFixed(1)}k`;
    return value?.toString();
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('ar-SA', { month: 'short', day: 'numeric' });
  };

  const currentMetric = metrics?.find(m => m?.value === selectedMetric);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">أداء المحتوى</h3>
          <p className="text-sm text-muted-foreground">تتبع مقاييس الأداء عبر الوقت</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {/* Time Range Selector */}
          <div className="flex bg-muted rounded-lg p-1">
            {timeRanges?.map((range) => (
              <button
                key={range?.value}
                onClick={() => setTimeRange(range?.value)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  timeRange === range?.value
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range?.label}
              </button>
            ))}
          </div>

          {/* Chart Type Toggle */}
          <div className="flex bg-muted rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded-md transition-colors ${
                chartType === 'line' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="TrendingUp" size={16} />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded-md transition-colors ${
                chartType === 'bar' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="BarChart3" size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Metric Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {metrics?.map((metric) => (
          <button
            key={metric?.value}
            onClick={() => setSelectedMetric(metric?.value)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedMetric === metric?.value
                ? 'bg-accent text-accent-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: metric?.color }}
            />
            {metric?.label}
          </button>
        ))}
      </div>
      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                tickFormatter={(value) => formatValue(value, selectedMetric)}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                formatter={(value) => [formatValue(value, selectedMetric), currentMetric?.label]}
                labelFormatter={(label) => formatDate(label)}
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey={selectedMetric} 
                stroke={currentMetric?.color}
                strokeWidth={3}
                dot={{ fill: currentMetric?.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: currentMetric?.color, strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                tickFormatter={(value) => formatValue(value, selectedMetric)}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                formatter={(value) => [formatValue(value, selectedMetric), currentMetric?.label]}
                labelFormatter={(label) => formatDate(label)}
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <Bar 
                dataKey={selectedMetric} 
                fill={currentMetric?.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;