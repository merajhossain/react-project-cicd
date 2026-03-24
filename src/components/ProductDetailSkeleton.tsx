import React from 'react';
import { Skeleton } from 'antd';

const ProductDetailSkeleton: React.FC = () => {
  return (
    <div style={{ paddingBottom: 64 }}>
      {/* Breadcrumb */}
      <Skeleton.Input active size="small" style={{ width: 200, height: 12, marginBottom: 24 }} />

      {/* Page header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <div>
          <Skeleton.Input active style={{ width: 180, height: 28, marginBottom: 8, display: 'block' }} />
          <Skeleton.Input active size="small" style={{ width: 260, height: 14 }} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Skeleton.Button active style={{ width: 90, height: 40, borderRadius: 10 }} />
          <Skeleton.Button active style={{ width: 130, height: 40, borderRadius: 10 }} />
        </div>
      </div>

      {/* Content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 48 }}>

        {/* Left: image */}
        <Skeleton.Image
          active
          style={{ width: '100%', height: 360, borderRadius: 20 }}
        />

        {/* Right: info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 8 }}>
          {/* Tags */}
          <div style={{ display: 'flex', gap: 8 }}>
            <Skeleton.Button active size="small" style={{ width: 80, height: 26, borderRadius: 20 }} />
            <Skeleton.Button active size="small" style={{ width: 80, height: 26, borderRadius: 20 }} />
            <Skeleton.Button active size="small" style={{ width: 80, height: 26, borderRadius: 20 }} />
          </div>

          {/* Title */}
          <div>
            <Skeleton.Input active style={{ width: '85%', height: 32, marginBottom: 8, display: 'block' }} />
            <Skeleton.Input active size="small" style={{ width: 140, height: 14 }} />
          </div>

          {/* Rating */}
          <Skeleton.Input active style={{ width: 200, height: 44, borderRadius: 12 }} />

          {/* Price block */}
          <div style={{ background: '#f1f5f9', borderRadius: 20, padding: 24 }}>
            <Skeleton.Input active size="small" style={{ width: 60, height: 11, marginBottom: 10, display: 'block' }} />
            <Skeleton.Input active style={{ width: 140, height: 44, display: 'block' }} />
          </div>

          {/* Description */}
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: 20 }}>
            <Skeleton.Input active size="small" style={{ width: 90, height: 11, marginBottom: 12, display: 'block' }} />
            <Skeleton active paragraph={{ rows: 3 }} title={false} />
          </div>

          {/* Meta grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 16, textAlign: 'center' }}>
                <Skeleton.Avatar active size="small" style={{ marginBottom: 8 }} />
                <Skeleton.Input active size="small" style={{ width: '60%', height: 10, marginBottom: 6, display: 'block' }} />
                <Skeleton.Input active size="small" style={{ width: '80%', height: 14 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
