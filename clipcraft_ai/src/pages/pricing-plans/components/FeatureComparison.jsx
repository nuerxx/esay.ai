import React, { useState } from 'react';
import { Check, X, ChevronDown, ChevronRight } from 'lucide-react';

const FeatureComparison = ({ tiers }) => {
  const [expandedCategories, setExpandedCategories] = useState({
    'Core Features': true,
    'AI & Processing': true,
    'Export & Sharing': true,
    'Support & Analytics': true
  });

  // Group features by category
  const featureCategories = {
    'Core Features': [
      'clips_limit',
      'watermark',
      'storage',
      'video_analysis'
    ],
    'AI & Processing': [
      'ai_precision',
      'auto_generation',
      'bulk_processing',
      'custom_branding'
    ],
    'Export & Sharing': [
      'hd_downloads',
      'export_formats',
      'api_access'
    ],
    'Support & Analytics': [
      'support_level',
      'analytics',
      'reporting',
      'account_management'
    ]
  };

  const allFeatures = {
    clips_limit: {
      name: 'Clip Generation',
      free: '1 per week',
      creator: '10 per month',
      pro: 'Unlimited',
      enterprise: 'Unlimited'
    },
    watermark: {
      name: 'Watermark',
      free: 'Included',
      creator: 'Removed',
      pro: 'Removed',
      enterprise: 'Removed'
    },
    storage: {
      name: 'Storage',
      free: '3 clips',
      creator: 'Unlimited',
      pro: 'Unlimited',
      enterprise: 'Unlimited'
    },
    video_analysis: {
      name: 'Video Analysis',
      free: true,
      creator: true,
      pro: true,
      enterprise: true
    },
    ai_precision: {
      name: 'AI Precision',
      free: 'Basic',
      creator: 'Standard',
      pro: 'Advanced',
      enterprise: 'Custom'
    },
    auto_generation: {
      name: 'Auto-generation',
      free: true,
      creator: true,
      pro: true,
      enterprise: true
    },
    bulk_processing: {
      name: 'Bulk Processing',
      free: false,
      creator: false,
      pro: true,
      enterprise: true
    },
    custom_branding: {
      name: 'Custom Branding',
      free: false,
      creator: false,
      pro: true,
      enterprise: true
    },
    hd_downloads: {
      name: 'HD Downloads',
      free: false,
      creator: true,
      pro: true,
      enterprise: true
    },
    export_formats: {
      name: 'Export Formats',
      free: 'Basic',
      creator: 'Multiple',
      pro: 'All formats',
      enterprise: 'Custom'
    },
    api_access: {
      name: 'API Access',
      free: false,
      creator: false,
      pro: true,
      enterprise: true
    },
    support_level: {
      name: 'Support',
      free: 'Community',
      creator: 'Email',
      pro: 'Priority',
      enterprise: 'Dedicated'
    },
    analytics: {
      name: 'Analytics',
      free: false,
      creator: false,
      pro: true,
      enterprise: 'Advanced'
    },
    reporting: {
      name: 'Reporting',
      free: false,
      creator: false,
      pro: 'Basic',
      enterprise: 'Custom'
    },
    account_management: {
      name: 'Account Management',
      free: 'Self-service',
      creator: 'Self-service',
      pro: 'Self-service',
      enterprise: 'Dedicated manager'
    }
  };

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev?.[category]
    }));
  };

  const renderFeatureValue = (value, tierType) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check size={16} className="text-green-500 mx-auto" />
      ) : (
        <X size={16} className="text-gray-300 mx-auto" />
      );
    }

    const colorClass = tierType === 'pro' ? 'text-purple-600' : 
                     tierType === 'enterprise' ? 'text-gray-700' :
                     tierType === 'creator' ? 'text-blue-600' : 'text-gray-600';

    return (
      <span className={`font-sf-text text-sm ${colorClass} font-medium`}>
        {value}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-5 gap-4 p-6 bg-gray-50 border-b border-gray-200">
        <div className="font-sf-display text-lg font-semibold text-foreground">
          Features
        </div>
        {tiers?.map(tier => (
          <div key={tier?.id} className="text-center">
            <div className={`w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center ${tier?.iconColor}`}>
              <tier.icon size={16} />
            </div>
            <div className="font-sf-display font-semibold text-foreground">
              {tier?.name}
            </div>
            <div className="font-sf-text text-sm text-muted-foreground">
              {tier?.customPricing ? 'Custom' : `$${tier?.monthlyPrice || 0}/mo`}
            </div>
          </div>
        ))}
      </div>
      {/* Feature Categories */}
      <div>
        {Object?.entries(featureCategories)?.map(([category, features]) => (
          <div key={category}>
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 border-b border-gray-100 hover:bg-gray-100 transition-colors"
            >
              <span className="font-sf-text font-medium text-foreground">
                {category}
              </span>
              {expandedCategories?.[category] ? (
                <ChevronDown size={16} className="text-muted-foreground" />
              ) : (
                <ChevronRight size={16} className="text-muted-foreground" />
              )}
            </button>

            {/* Category Features */}
            {expandedCategories?.[category] && (
              <div>
                {features?.map(featureKey => {
                  const feature = allFeatures?.[featureKey];
                  if (!feature) return null;

                  return (
                    <div key={featureKey} className="grid grid-cols-5 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <div className="font-sf-text text-foreground">
                        {feature?.name}
                      </div>
                      <div className="text-center">
                        {renderFeatureValue(feature?.free, 'free')}
                      </div>
                      <div className="text-center">
                        {renderFeatureValue(feature?.creator, 'creator')}
                      </div>
                      <div className="text-center">
                        {renderFeatureValue(feature?.pro, 'pro')}
                      </div>
                      <div className="text-center">
                        {renderFeatureValue(feature?.enterprise, 'enterprise')}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Footer CTA */}
      <div className="grid grid-cols-5 gap-4 p-6 bg-gray-50">
        <div></div>
        {tiers?.map(tier => (
          <div key={tier?.id} className="text-center">
            <button className={`w-full py-2 px-4 rounded-lg font-sf-text font-medium transition-colors ${
              tier?.id === 'creator' || tier?.id === 'pro' ?'bg-accent text-accent-foreground hover:bg-accent/90' :'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}>
              {tier?.customPricing ? 'Contact Sales' : 
               tier?.id === 'free' ? 'Get Started' : 'Start Trial'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureComparison;