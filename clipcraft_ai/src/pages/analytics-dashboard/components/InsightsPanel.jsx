import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InsightsPanel = () => {
  const [activeTab, setActiveTab] = useState('patterns');

  const insights = {
    patterns: [
      {
        id: 1,
        type: 'timing',
        icon: 'Clock',
        title: 'أفضل أوقات النشر',
        description: 'المحتوى المنشور بين الساعة 7-9 مساءً يحقق تفاعلاً أعلى بنسبة 35%',
        impact: 'high',
        recommendation: 'انشر المحتوى الجديد خلال هذه الفترة لزيادة المشاهدات',
        data: '7:00 PM - 9:00 PM'
      },
      {
        id: 2,
        type: 'content',
        icon: 'TrendingUp',
        title: 'المحتوى الأكثر نجاحاً',
        description: 'مقاطع الطبخ والوصفات تحقق معدل تفاعل أعلى بـ 42% من المحتوى الآخر',
        impact: 'high',
        recommendation: 'ركز على إنتاج المزيد من محتوى الطبخ والوصفات',
        data: '42% أعلى'
      },
      {
        id: 3,
        type: 'duration',
        icon: 'Timer',
        title: 'المدة المثلى للمقاطع',
        description: 'المقاطع بمدة 30-45 ثانية تحقق أعلى معدل إكمال مشاهدة',
        impact: 'medium',
        recommendation: 'اجعل مقاطعك ضمن هذا النطاق الزمني',
        data: '30-45 ثانية'
      }
    ],
    audience: [
      {
        id: 1,
        type: 'demographics',
        icon: 'Users',
        title: 'الجمهور المستهدف',
        description: '68% من المتابعين من الفئة العمرية 25-35 سنة',
        impact: 'medium',
        recommendation: 'صمم المحتوى ليناسب اهتمامات هذه الفئة العمرية',
        data: '25-35 سنة'
      },
      {
        id: 2,
        type: 'engagement',
        icon: 'Heart',
        title: 'نمط التفاعل',
        description: 'المحتوى التعليمي يحصل على مشاركات أكثر بـ 28%',
        impact: 'high',
        recommendation: 'أضف عناصر تعليمية لمقاطعك لزيادة المشاركات',
        data: '+28% مشاركات'
      },
      {
        id: 3,
        type: 'retention',
        icon: 'Eye',
        title: 'معدل الاحتفاظ',
        description: 'المقاطع التي تبدأ بسؤال تحتفظ بـ 85% من المشاهدين',
        impact: 'high',
        recommendation: 'ابدأ مقاطعك بسؤال جذاب أو معلومة مثيرة',
        data: '85% احتفاظ'
      }
    ],
    trends: [
      {
        id: 1,
        type: 'hashtags',
        icon: 'Hash',
        title: 'الهاشتاجات الرائجة',
        description: '#طبخ_سريع و #نصائح_منزلية يزيدان الوصول بنسبة 45%',
        impact: 'high',
        recommendation: 'استخدم هذه الهاشتاجات في منشوراتك القادمة',
        data: '+45% وصول'
      },
      {
        id: 2,
        type: 'seasonal',
        icon: 'Calendar',
        title: 'المحتوى الموسمي',
        description: 'محتوى رمضان حقق أعلى معدلات مشاهدة هذا العام',
        impact: 'medium',
        recommendation: 'خطط للمحتوى الموسمي مسبقاً',
        data: 'رمضان 2025'
      },
      {
        id: 3,
        type: 'competition',
        icon: 'Target',
        title: 'تحليل المنافسين',
        description: 'المنافسون يستخدمون المزيد من المحتوى التفاعلي',
        impact: 'medium',
        recommendation: 'أضف عناصر تفاعلية مثل الاستطلاعات والأسئلة',
        data: 'محتوى تفاعلي'
      }
    ]
  };

  const tabs = [
    { id: 'patterns', label: 'الأنماط', icon: 'BarChart3' },
    { id: 'audience', label: 'الجمهور', icon: 'Users' },
    { id: 'trends', label: 'الاتجاهات', icon: 'TrendingUp' }
  ];

  const getImpactColor = (impact) => {
    const colors = {
      high: 'text-success bg-success/10',
      medium: 'text-warning bg-warning/10',
      low: 'text-muted-foreground bg-muted'
    };
    return colors?.[impact] || colors?.medium;
  };

  const getImpactLabel = (impact) => {
    const labels = {
      high: 'تأثير عالي',
      medium: 'تأثير متوسط',
      low: 'تأثير منخفض'
    };
    return labels?.[impact] || labels?.medium;
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">رؤى ذكية</h3>
            <p className="text-sm text-muted-foreground">اكتشافات مدعومة بالذكاء الاصطناعي</p>
          </div>
          <Button variant="outline" size="sm" iconName="Download">
            تصدير التقرير
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex bg-muted rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
                activeTab === tab?.id
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {insights?.[activeTab]?.map((insight) => (
            <div key={insight?.id} className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-accent/10 text-accent rounded-lg flex-shrink-0">
                  <Icon name={insight?.icon} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-semibold text-foreground">{insight?.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight?.impact)}`}>
                      {getImpactLabel(insight?.impact)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {insight?.description}
                  </p>
                  
                  <div className="bg-muted/50 rounded-lg p-3 mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name="Lightbulb" size={16} className="text-accent" />
                      <span className="text-sm font-medium text-foreground">التوصية</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight?.recommendation}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon name="BarChart2" size={16} className="text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{insight?.data}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" iconName="BookmarkPlus">
                        حفظ
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Share">
                        مشاركة
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Summary Stats */}
      <div className="p-6 bg-muted/30 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">12</p>
            <p className="text-sm text-muted-foreground">رؤى جديدة</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">8</p>
            <p className="text-sm text-muted-foreground">توصيات عالية التأثير</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">95%</p>
            <p className="text-sm text-muted-foreground">دقة التنبؤات</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPanel;