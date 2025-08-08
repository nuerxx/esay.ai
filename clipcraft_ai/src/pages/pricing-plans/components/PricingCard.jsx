import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import Button from '../../../components/ui/Button';

const PricingCard = ({ tier, isAnnual }) => {
  const IconComponent = tier?.icon;
  const price = isAnnual ? tier?.annualPrice : tier?.monthlyPrice;
  const savings = tier?.monthlyPrice && tier?.annualPrice ? 
    ((tier?.monthlyPrice - tier?.annualPrice) * 12) : 0;

  const handleSubscribe = () => {
    if (tier?.id === 'enterprise') {
      // Handle contact sales
      console.log('Contact sales for enterprise plan');
    } else {
      // Handle subscription
      console.log(`Subscribe to ${tier?.name} plan`);
    }
  };

  return (
    <motion.div
      className={`relative rounded-2xl p-8 apple-hover ${tier?.cardStyle} ${tier?.popular ? 'ring-2 ring-accent' : ''}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Popular Badge */}
      {tier?.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-accent text-accent-foreground px-4 py-1 rounded-full font-sf-text text-sm font-medium">
            Most Popular
          </div>
        </div>
      )}
      {/* Header */}
      <div className="text-center mb-8">
        <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gray-100 flex items-center justify-center ${tier?.iconColor}`}>
          <IconComponent size={24} />
        </div>
        
        <h3 className="font-sf-display text-2xl font-semibold text-foreground mb-2">
          {tier?.name}
        </h3>
        
        <p className="font-sf-text text-muted-foreground mb-6">
          {tier?.subtitle}
        </p>

        {/* Pricing */}
        <div className="mb-4">
          {tier?.customPricing ? (
            <div>
              <div className="font-sf-display text-3xl font-bold text-foreground">
                Custom
              </div>
              <div className="font-sf-text text-muted-foreground text-sm">
                Contact us for pricing
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-sf-display text-4xl font-bold text-foreground">
                  ${price}
                </span>
                <span className="font-sf-text text-muted-foreground">
                  /month
                </span>
              </div>
              
              {isAnnual && savings > 0 && (
                <div className="text-green-600 text-sm font-medium mt-1">
                  Save ${savings}/year
                </div>
              )}
              
              {!isAnnual && tier?.annualPrice && (
                <div className="text-muted-foreground text-sm mt-1">
                  ${tier?.annualPrice}/month billed annually
                </div>
              )}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleSubscribe}
          variant={tier?.buttonStyle}
          className="w-full font-sf-text font-medium"
          size="lg"
        >
          {tier?.customPricing ? 'Contact Sales' : 
           tier?.id === 'free' ? 'Get Started Free' : 'Start Free Trial'}
        </Button>
      </div>
      {/* Features */}
      <div className="space-y-4">
        {tier?.features?.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`mt-0.5 ${feature?.included ? 'text-green-500' : 'text-gray-300'}`}>
              {feature?.included ? <Check size={16} /> : <X size={16} />}
            </div>
            <span className={`font-sf-text text-sm ${
              feature?.included ? 'text-foreground' : 'text-muted-foreground'
            } ${feature?.highlight ? 'font-medium' : ''}`}>
              {feature?.name}
            </span>
          </div>
        ))}
        
        {/* Limitations */}
        {tier?.limitations?.length > 0 && (
          <div className="pt-4 border-t border-border">
            <div className="text-xs font-sf-text text-muted-foreground">
              {tier?.limitations?.join(' • ')}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PricingCard;