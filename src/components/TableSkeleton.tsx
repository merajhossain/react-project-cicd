import React from 'react';
import { Skeleton } from 'antd';

interface TableSkeletonProps {
  rows?: number;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 8 }) => {
  return (
    <div style={{ padding: '0 0 8px' }}>
      {/* Header row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '70px 1fr 130px 110px 160px 90px 150px 140px',
        gap: 16,
        padding: '16px 24px',
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
      }}>
        {['Image', 'Title', 'Brand', 'Price', 'Rating', 'Stock', 'Category', 'Actions'].map((col) => (
          <Skeleton.Input key={col} active size="small" style={{ width: '70%', height: 12 }} />
        ))}
      </div>

      {/* Data rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: '70px 1fr 130px 110px 160px 90px 150px 140px',
            gap: 16,
            padding: '18px 24px',
            borderBottom: i < rows - 1 ? '1px solid #f1f5f9' : 'none',
            alignItems: 'center',
          }}
        >
          {/* Thumbnail */}
          <Skeleton.Avatar active shape="square" style={{ width: 52, height: 52, borderRadius: 10 }} />
          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Skeleton.Input active size="small" style={{ width: '80%', height: 13 }} />
            <Skeleton.Input active size="small" style={{ width: '50%', height: 11 }} />
          </div>
          {/* Brand */}
          <Skeleton.Input active size="small" style={{ width: '75%', height: 12 }} />
          {/* Price */}
          <Skeleton.Input active size="small" style={{ width: '60%', height: 13 }} />
          {/* Rating */}
          <Skeleton.Input active size="small" style={{ width: '90%', height: 12 }} />
          {/* Stock */}
          <Skeleton.Button active size="small" style={{ width: 48, height: 22, borderRadius: 6 }} />
          {/* Category */}
          <Skeleton.Button active size="small" style={{ width: 90, height: 24, borderRadius: 8 }} />
          {/* Actions */}
          <div style={{ display: 'flex', gap: 8 }}>
            <Skeleton.Button active size="small" style={{ width: 52, height: 28, borderRadius: 8 }} />
            <Skeleton.Button active size="small" style={{ width: 44, height: 28, borderRadius: 8 }} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;
