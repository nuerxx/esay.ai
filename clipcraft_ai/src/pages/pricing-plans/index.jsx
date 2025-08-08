import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Crown, Building2, Zap } from 'lucide-react';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import BillingToggle from './components/BillingToggle';
import PricingCard from './components/PricingCard';
import FeatureComparison from './components/FeatureComparison';

const PricingPlans = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingTiers = [
    {
      id: 'free',
      name: 'Free',
      subtitle: 'Get started with basic features',
      monthlyPrice: 0,
      annualPrice: 0,
      icon: Zap,
      iconColor: 'text-gray-600',
      cardStyle: 'border border-gray-200',
      buttonStyle: 'secondary',
      features: [
        { name: '1 clip per week', included: true, highlight: true },
        { name: 'Watermark included', included: true },
        { name: 'Automatic video analysis', included: true },
        { name: 'Store up to 3 clips', included: true },
        { name: 'Basic export options', included: true },
        { name: 'HD downloads', included: false },
        { name: 'Advanced AI controls', included: false },
        { name: 'Priority support', included: false }
      ],
      limitations: ['Limited to 1 clip weekly', 'ClipCraft watermark on exports'],
      popular: false
    },
    {
      id: 'creator',
      name: 'Creator',
      subtitle: 'Perfect for content creators',
      monthlyPrice: 19,
      annualPrice: 15,
      icon: Star,
      iconColor: 'text-blue-600',
      cardStyle: 'border border-blue-200 bg-gradient-to-br from-white to-blue-50/30',
      buttonStyle: 'primary',
      features: [
        { name: 'Up to 10 clips monthly', included: true, highlight: true },
        { name: 'No watermark', included: true, highlight: true },
        { name: 'HD downloads', included: true, highlight: true },
        { name: 'Smart auto-generation', included: true },
        { name: 'Advanced video analysis', included: true },
        { name: 'Multiple export formats', included: true },
        { name: 'Email support', included: true },
        { name: 'Analytics dashboard', included: false }
      ],
      limitations: ['10 clips per month limit'],
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro',
      subtitle: 'For professional creators',
      monthlyPrice: 49,
      annualPrice: 39,
      icon: Crown,
      iconColor: 'text-purple-600',
      cardStyle: 'border border-purple-200 bg-gradient-to-br from-white to-purple-50/30',
      buttonStyle: 'primary',
      features: [
        { name: 'Unlimited clips', included: true, highlight: true },
        { name: 'Advanced AI precision', included: true, highlight: true },
        { name: 'Video editing capabilities', included: true },
        { name: 'Performance analytics', included: true },
        { name: 'Direct support', included: true },
        { name: 'Custom branding', included: true },
        { name: 'API access', included: true },
        { name: 'Bulk processing', included: true }
      ],
      limitations: [],
      popular: false
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      subtitle: 'Custom solutions for teams',
      monthlyPrice: null,
      annualPrice: null,
      icon: Building2,
      iconColor: 'text-gray-700',
      cardStyle: 'border border-gray-300 bg-gradient-to-br from-gray-50 to-white',
      buttonStyle: 'secondary',
      features: [
        { name: 'Custom team setup', included: true },
        { name: 'Multi-account management', included: true },
        { name: 'Enhanced security & privacy', included: true },
        { name: 'Monthly detailed reports', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'SLA guarantees', included: true },
        { name: 'Training & onboarding', included: true }
      ],
      limitations: [],
      popular: false,
      customPricing: true
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <motion.section 
        className="pt-16 pb-12 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div variants={itemVariants}>
            <h1 className="font-sf-display text-5xl md:text-6xl font-semibold text-foreground mb-6">
              Choose Your Plan
            </h1>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <p className="font-sf-text text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              Select the perfect plan to accelerate your content creation journey with ClipCraft AI
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <BillingToggle 
              isAnnual={isAnnual}
              onToggle={setIsAnnual}
            />
          </motion.div>
        </div>
      </motion.section>
      {/* Pricing Cards */}
      <motion.section 
        className="pb-24"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingTiers?.map((tier, index) => (
              <motion.div
                key={tier?.id}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <PricingCard
                  tier={tier}
                  isAnnual={isAnnual}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* Feature Comparison */}
      <motion.section 
        className="py-24 bg-surface/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="font-sf-display text-4xl font-semibold text-foreground mb-4">
              Compare All Features
            </h2>
            <p className="font-sf-text text-lg text-muted-foreground max-w-2xl mx-auto">
              See what's included in each plan to make the best choice for your needs
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <FeatureComparison tiers={pricingTiers} />
          </motion.div>
        </div>
      </motion.section>
      {/* CTA Section */}
      <motion.section 
        className="py-24 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div variants={itemVariants}>
            <h2 className="font-sf-display text-4xl font-semibold text-foreground mb-4">
              Ready to Get Started?
            </h2>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <p className="font-sf-text text-lg text-muted-foreground mb-8">
              Join thousands of creators who are already using ClipCraft AI to transform their content
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="px-8 py-3 font-sf-text font-medium"
              size="lg"
            >
              Start Free Trial
            </Button>
            <Button
              variant="secondary"
              className="px-8 py-3 font-sf-text font-medium"
              size="lg"
            >
              Contact Sales
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default PricingPlans;