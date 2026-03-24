import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

interface BreadcrumbItem {
  title: string;
  path?: string;
}

interface PageBreadcrumbProps {
  items: BreadcrumbItem[];
}

const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({ items }) => {
  const crumbs = [
    {
      title: (
        <Link to="/products">
          <HomeOutlined />
        </Link>
      ),
    },
    ...items.map((item) => ({
      title: item.path ? <Link to={item.path}>{item.title}</Link> : item.title,
    })),
  ];

  return (
    <div className="page-breadcrumb">
      <Breadcrumb items={crumbs} />
    </div>
  );
};

export default PageBreadcrumb;
