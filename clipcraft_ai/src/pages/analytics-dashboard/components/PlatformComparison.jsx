import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';

const PlatformComparison = () => {
  const platformData = [
    {
      platform: 'TikTok',
      icon: 'Music',
      color: '#FF0050',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      views: 125000,
      engagement: 12.5,
      growth: '+18.2%',
      growthType: 'positive',
      clips: 45
    },
    {
      platform: 'Instagram Reels',
      icon: 'Instagram',
      color: '#E4405F',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600',
      views: 89000,
      engagement: 9.8,
      growth: '+12.4%',
      growthType: 'positive',
      clips: 38
    },
    {
      platform: 'YouTube Shorts',
      icon: 'Youtube',
      color: '#FF0000',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      views: 67000,
      engagement: 8.2,
      growth: '+8.7%',
      growthType: 'positive',
      clips: 32
    }
  ];

  const pieData = platformData?.map(platform => ({
    name: platform?.platform,
    value: platform?.views,
    color: platform?.color
  }));

  const barData = platformData?.map(platform => ({
    platform: platform?.platform?.replace(' ', '\n'),
    engagement: platform?.engagement,
    color: platform?.color
  }));

  const formatViews = (views) => {
    if (views >= 1000000) return `${(views / 1000000)?.toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000)?.toFixed(0)}K`;
    return views?.toString();
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground">{data?.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatViews(data?.value)} مشاهدة
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">مقارنة المنصات</h3>
          <p className="text-sm text-muted-foreground">أداء المحتوى عبر المنصات المختلفة</p>
        </div>
        <Icon name="BarChart2" size={20} className="text-muted-foreground" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Stats */}
        <div className="space-y-4">
          {platformData?.map((platform, index) => (
            <div key={platform?.platform} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${platform?.bgColor}`}>
                  <Icon name={platform?.icon} size={20} className={platform?.textColor} />
                </div>
                <div>
                  <p className="font-medium text-foreground">{platform?.platform}</p>
                  <p className="text-sm text-muted-foreground">{platform?.clips} مقطع</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{formatViews(platform?.views)}</p>
                <div className="flex items-center gap-1 text-success">
                  <Icon name="TrendingUp" size={14} />
                  <span className="text-sm font-medium">{platform?.growth}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="space-y-6">
          {/* Views Distribution */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">توزيع المشاهدات</h4>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Engagement Comparison */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-3">معدل التفاعل</h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="platform" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={10}
                    interval={0}
                  />
                  <YAxis hide />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'معدل التفاعل']}
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar 
                    dataKey="engagement" 
                    radius={[4, 4, 0, 0]}
                    fill="#3182CE"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformComparison;