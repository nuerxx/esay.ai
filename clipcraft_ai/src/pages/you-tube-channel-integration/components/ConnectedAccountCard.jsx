import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ConnectedAccountCard = ({ account, onDisconnect, onViewVideos }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success/10';
      case 'limited':
        return 'text-warning bg-warning/10';
      case 'error':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'متصل بنشاط';
      case 'limited':
        return 'وصول محدود';
      case 'error':
        return 'خطأ في الاتصال';
      default:
        return 'غير متصل';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Image
              src={account?.avatar}
              alt={account?.channelName}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card flex items-center justify-center ${getStatusColor(account?.status)}`}>
              <div className="w-2 h-2 rounded-full bg-current" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {account?.channelName}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {account?.subscriberCount?.toLocaleString('ar-SA')} مشترك
            </p>
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(account?.status)}`}>
              <Icon name="Circle" size={8} className="fill-current" />
              {getStatusText(account?.status)}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreVertical"
          className="text-muted-foreground hover:text-foreground"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-foreground">
            {account?.totalVideos?.toLocaleString('ar-SA')}
          </p>
          <p className="text-sm text-muted-foreground">إجمالي الفيديوهات</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">
            {account?.processedVideos?.toLocaleString('ar-SA')}
          </p>
          <p className="text-sm text-muted-foreground">تم معالجتها</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewVideos(account?.id)}
          className="flex-1"
        >
          عرض الفيديوهات
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Unlink"
          iconPosition="left"
          onClick={() => onDisconnect(account?.id)}
          className="text-error hover:text-error hover:bg-error/10"
        >
          قطع الاتصال
        </Button>
      </div>
      {account?.lastSync && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            آخر مزامنة: {new Date(account.lastSync)?.toLocaleDateString('ar-SA')} في {new Date(account.lastSync)?.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      )}
    </div>
  );
};

export default ConnectedAccountCard;