import React from 'react';
import { Tag, Rate, Divider } from 'antd';
import {
  StarFilled,
  TagOutlined,
  InboxOutlined,
  CheckCircleFilled,
  FireFilled,
} from '@ant-design/icons';
import type { Product } from '../store/slices/productsSlice';
import { formatPrice, getStockColor, getStockStatus, formatCategoryName } from '../utils/formatters';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const discountedPrice = product.discountPercentage > 0
    ? product.price * (1 - product.discountPercentage / 100)
    : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Tag
          icon={<TagOutlined />}
          style={{
            background: '#ede9fe', color: '#6d28d9', border: 'none',
            fontWeight: 700, fontSize: 12, padding: '4px 12px', borderRadius: 20,
          }}
        >
          {formatCategoryName(product.category)}
        </Tag>
        <Tag
          icon={product.stock > 0 ? <CheckCircleFilled /> : <InboxOutlined />}
          color={getStockColor(product.stock)}
          style={{ fontWeight: 700, fontSize: 12, padding: '4px 12px', borderRadius: 20, border: 'none' }}
        >
          {getStockStatus(product.stock)}
        </Tag>
        {product.discountPercentage > 0 && (
          <Tag
            icon={<FireFilled />}
            style={{
              background: '#fef2f2', color: '#dc2626', border: 'none',
              fontWeight: 700, fontSize: 12, padding: '4px 12px', borderRadius: 20,
            }}
          >
            {product.discountPercentage}% OFF
          </Tag>
        )}
      </div>

      {/* Title */}
      <div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.25 }}>
          {product.title}
        </h2>
        {product.brand && (
          <p style={{ fontSize: 14, color: '#64748b', margin: '6px 0 0', fontWeight: 500 }}>
            by <span style={{ color: '#6366f1', fontWeight: 700 }}>{product.brand}</span>
          </p>
        )}
      </div>

      {/* Rating */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: '#fefce8', border: '1px solid #fde68a',
        borderRadius: 12, padding: '10px 16px', width: 'fit-content',
      }}>
        <Rate disabled value={product.rating} allowHalf style={{ fontSize: 15, color: '#f59e0b' }} />
        <span style={{ fontWeight: 700, color: '#92400e', fontSize: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
          <StarFilled style={{ color: '#f59e0b' }} />
          {product.rating} / 5
        </span>
      </div>

      {/* Price block */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
        borderRadius: 20, padding: '24px',
        boxShadow: '0 8px 32px rgba(99,102,241,0.2)',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
          Pricing
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 4 }}>
          <span style={{ fontSize: 42, fontWeight: 900, color: '#fff', lineHeight: 1 }}>
            {discountedPrice ? formatPrice(discountedPrice) : formatPrice(product.price)}
          </span>
          {discountedPrice && (
            <span style={{ fontSize: 18, color: '#64748b', textDecoration: 'line-through', marginBottom: 4 }}>
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div style={{
        background: '#f8fafc', border: '1px solid #e2e8f0',
        borderRadius: 16, padding: '20px',
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
          Description
        </div>
        <p style={{ color: '#475569', lineHeight: 1.75, fontSize: 14, margin: 0 }}>
          {product.description}
        </p>
      </div>

      <Divider style={{ margin: '0', borderColor: '#f1f5f9' }} />

      {/* Meta stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {[
          { label: 'Brand', value: product.brand || '—', icon: '🏷️' },
          { label: 'Stock', value: `${product.stock}`, sub: 'units', icon: '📦' },
          { label: 'Discount', value: product.discountPercentage ? `${product.discountPercentage}%` : '—', icon: '🎁' },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              background: '#fff', border: '1px solid #e2e8f0',
              borderRadius: 16, padding: '16px 14px', textAlign: 'center',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
              {item.label}
            </div>
            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: 15 }}>
              {item.value}
              {item.sub && <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, marginLeft: 3 }}>{item.sub}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;
