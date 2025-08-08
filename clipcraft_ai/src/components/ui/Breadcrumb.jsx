import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ className = '', customBreadcrumbs = null }) => {
  const location = useLocation();

  const routeMap = {
    '/video-upload-and-analysis': { label: 'Upload & Analysis', parent: null },
    '/ai-processing-status': { label: 'Processing Status', parent: null },
    '/generated-clips-library': { label: 'Clips Library', parent: null },
    '/video-clip-editor': { label: 'Clip Editor', parent: '/generated-clips-library' },
    '/you-tube-channel-integration': { label: 'YouTube Integration', parent: null },
    '/analytics-dashboard': { label: 'Analytics Dashboard', parent: null }
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/' }];

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap?.[currentPath];
      
      if (routeInfo) {
        breadcrumbs?.push({
          label: routeInfo?.label,
          path: currentPath,
          isLast: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs?.map((crumb, index) => (
          <li key={crumb?.path || index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground mx-2" 
              />
            )}
            
            {crumb?.isLast ? (
              <span className="text-foreground font-medium">
                {crumb?.label}
              </span>
            ) : (
              <Link
                to={crumb?.path}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {crumb?.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;