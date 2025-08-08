import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingTimeline = ({ stages, currentStage }) => {
  const getStageIcon = (stage) => {
    const iconMap = {
      'speech-to-text': 'Mic',
      'content-understanding': 'Brain',
      'expression-analysis': 'Eye',
      'clip-generation': 'Scissors'
    };
    return iconMap?.[stage?.id] || 'Circle';
  };

  const getStageStatus = (stage, index) => {
    if (index < currentStage) return 'completed';
    if (index === currentStage) return 'processing';
    return 'pending';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10 border-success/20';
      case 'processing':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'error':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">معالجة الذكي الاصطناعي</h2>
        <div className="text-sm text-muted-foreground">
          المرحلة {currentStage + 1} من {stages?.length}
        </div>
      </div>
      <div className="relative">
        {stages?.map((stage, index) => {
          const status = getStageStatus(stage, index);
          const isLast = index === stages?.length - 1;

          return (
            <div key={stage?.id} className="relative flex items-start gap-4 pb-8">
              {/* Timeline Line */}
              {!isLast && (
                <div className="absolute right-6 top-12 w-0.5 h-16 bg-border" />
              )}
              {/* Stage Icon */}
              <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${getStatusColor(status)}`}>
                {status === 'processing' ? (
                  <Icon name="Loader2" size={20} className="animate-spin" />
                ) : status === 'completed' ? (
                  <Icon name="Check" size={20} />
                ) : status === 'error' ? (
                  <Icon name="X" size={20} />
                ) : (
                  <Icon name={getStageIcon(stage)} size={20} />
                )}
              </div>
              {/* Stage Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-foreground">
                    {stage?.title}
                  </h3>
                  {status === 'processing' && (
                    <div className="text-sm text-accent font-medium">
                      {stage?.progress}%
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {stage?.description}
                </p>

                {/* Progress Bar */}
                {status === 'processing' && (
                  <div className="mb-3">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stage?.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Stage Details */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {status === 'processing' && (
                    <>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={14} />
                        <span>الوقت المتبقي: {stage?.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Activity" size={14} />
                        <span>{stage?.currentTask}</span>
                      </div>
                    </>
                  )}
                  
                  {status === 'completed' && (
                    <div className="flex items-center gap-1 text-success">
                      <Icon name="CheckCircle" size={14} />
                      <span>مكتمل في {stage?.completedTime}</span>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="flex items-center gap-1 text-error">
                      <Icon name="AlertCircle" size={14} />
                      <span>{stage?.errorMessage}</span>
                    </div>
                  )}
                </div>

                {/* Retry Button for Error State */}
                {status === 'error' && (
                  <button className="mt-3 px-4 py-2 bg-error/10 text-error rounded-lg hover:bg-error/20 transition-colors text-sm font-medium">
                    إعادة المحاولة
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessingTimeline;