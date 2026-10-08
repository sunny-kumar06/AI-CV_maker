import React from 'react';

const PageHeader = ({
  title,
  description,
  breadcrumb = "CareerAI Platform",
  action
}) => {
  return (
    <div className="c-page-header">
      <div className="header-meta">
        {breadcrumb && <span className="header-breadcrumb">{breadcrumb}</span>}
        <h1 className="header-main-title">{title}</h1>
        {description && <p className="header-description">{description}</p>}
      </div>
      {action && <div className="header-action-slot">{action}</div>}
    </div>
  );
};

export default PageHeader;
