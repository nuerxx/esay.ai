import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingDetails = ({ analysisData, isProcessing }) => {
  const [activeTab, setActiveTab] = useState('insights');

  const tabs = [
    { id: 'insights', label: 'الرؤى', icon: 'Brain' },
    { id: 'topics', label: 'المواضيع', icon: 'Hash' },
    { id: 'sentiment', label: 'المشاعر', icon: 'Heart' },
    { id: 'suggestions', label: 'الاقتراحات', icon: 'Lightbulb' }
  ];

  const renderInsights = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="font-medium text-foreground">معدل المشاركة المتوقع</span>
          </div>
          <div className="text-2xl font-bold text-success">
            {analysisData?.engagementScore}%
          </div>
          <p className="text-sm text-muted-foreground">
            أعلى من المتوسط بنسبة 23%
          </p>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Clock" size={16} className="text-accent" />
            <span className="font-medium text-foreground">أفضل مدة للمقاطع</span>
          </div>
          <div className="text-2xl font-bold text-accent">
            {analysisData?.optimalClipDuration}ث
          </div>
          <p className="text-sm text-muted-foreground">
            مناسب لجميع المنصات
          </p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">نقاط القوة المكتشفة</h4>
        <div className="space-y-2">
          {analysisData?.strengths?.map((strength, index) => (
            <div key={index} className="flex items-center gap-2">
              <Icon name="Check" size={14} className="text-success" />
              <span className="text-sm text-foreground">{strength}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTopics = () => (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">المواضيع الرئيسية</h4>
        <div className="flex flex-wrap gap-2">
          {analysisData?.topics?.map((topic, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
            >
              #{topic?.name}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">الكلمات المفتاحية</h4>
        <div className="space-y-2">
          {analysisData?.keywords?.map((keyword, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{keyword?.word}</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-muted rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full"
                    style={{ width: `${keyword?.frequency}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8">
                  {keyword?.frequency}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSentiment = () => (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">تحليل المشاعر العام</h4>
        <div className="space-y-3">
          {Object.entries(analysisData?.sentiment)?.map(([emotion, percentage]) => (
            <div key={emotion} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon 
                  name={emotion === 'positive' ? 'Smile' : emotion === 'negative' ? 'Frown' : 'Meh'} 
                  size={16} 
                  className={
                    emotion === 'positive' ? 'text-success' : 
                    emotion === 'negative' ? 'text-error' : 'text-warning'
                  }
                />
                <span className="text-sm text-foreground capitalize">
                  {emotion === 'positive' ? 'إيجابي' : 
                   emotion === 'negative' ? 'سلبي' : 'محايد'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      emotion === 'positive' ? 'bg-success' : 
                      emotion === 'negative' ? 'bg-error' : 'bg-warning'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-foreground w-10">
                  {percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">اللحظات العاطفية</h4>
        <div className="space-y-2">
          {analysisData?.emotionalMoments?.map((moment, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
              <span className="text-sm text-foreground">{moment?.description}</span>
              <span className="text-xs text-muted-foreground">{moment?.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSuggestions = () => (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">عناوين مقترحة للمقاطع</h4>
        <div className="space-y-2">
          {analysisData?.suggestedTitles?.map((title, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <span className="text-sm text-foreground">{title?.text}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  احتمالية النجاح: {title?.successRate}%
                </span>
                <button className="text-accent hover:text-accent/80">
                  <Icon name="Copy" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">توصيات التحسين</h4>
        <div className="space-y-3">
          {analysisData?.recommendations?.map((rec, index) => (
            <div key={index} className="flex items-start gap-3">
              <Icon name="ArrowRight" size={16} className="text-accent mt-0.5" />
              <div>
                <p className="text-sm text-foreground font-medium">{rec?.title}</p>
                <p className="text-xs text-muted-foreground">{rec?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'insights':
        return renderInsights();
      case 'topics':
        return renderTopics();
      case 'sentiment':
        return renderSentiment();
      case 'suggestions':
        return renderSuggestions();
      default:
        return renderInsights();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">تفاصيل التحليل</h2>
        {isProcessing && (
          <div className="text-sm text-muted-foreground">
            جاري تحديث البيانات...
          </div>
        )}
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 space-x-reverse">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab?.id
                  ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              {tab?.label}
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProcessingDetails;