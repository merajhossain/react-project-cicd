import React, { useState } from 'react';
import { Button, Carousel, Drawer, Form, Alert } from 'antd';
import { ArrowLeftOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import PageBreadcrumb from '../components/PageBreadcrumb';
import ProductInfo from '../components/ProductInfo';
import EditProductForm from '../components/EditProductForm';
import ProductDetailSkeleton from '../components/ProductDetailSkeleton';

const ProductDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, error } = useProduct(id ? parseInt(id) : undefined);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();

  const openEditDrawer = () => {
    if (!product) return;
    form.setFieldsValue({
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
      brand: product.brand,
      category: product.category,
      discountPercentage: product.discountPercentage,
    });
    setDrawerOpen(true);
  };

  const handleEditSubmit = (values: any) => {
    console.log('Updated values:', values);
    setDrawerOpen(false);
    form.resetFields();
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="max-w-lg mx-auto py-24 text-center space-y-6">
        <Alert
          type="error"
          showIcon
          message="Product Not Found"
          description="This product doesn't exist or could not be loaded."
        />
        <Button type="primary" size="large" icon={<ArrowLeftOutlined />} onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </div>
    );
  }

  const allImages = [
    product.thumbnail,
    ...(product.images ?? []).filter((img) => img !== product.thumbnail),
  ];

  return (
    <div className="space-y-6 pb-16">
      <PageBreadcrumb
        items={[{ title: 'Products', path: '/products' }, { title: product.title }]}
      />

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
            Product Details
          </h1>
          <p style={{ fontSize: 14, color: '#94a3b8', margin: '4px 0 0' }}>{product.title}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/products')} size="large">
            Back
          </Button>
          <Button type="primary" icon={<EditOutlined />} size="large" onClick={openEditDrawer}>
            Edit Product
          </Button>
        </div>
      </div>

      {/* Content Grid */}
      <div style={{ marginTop: 32, gap: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>

        {/* Carousel */}
        <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 1px 8px rgba(0,0,0,0.06)', alignSelf: 'start' }}>
          <Carousel autoplay arrows infinite>
            {allImages.map((img, i) => (
              <div key={i}>
                <img
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  style={{ width: '100%', height: 360, objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Details */}
        <div style={{ paddingTop: 8 }}>
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Edit Drawer */}
      <Drawer
        title={
          <div className="drawer-title">
            <EditOutlined className="drawer-title-icon" />
            <span className="drawer-title-text">Edit Product</span>
          </div>
        }
        placement="right"
        width={520}
        open={drawerOpen}
        onClose={() => { setDrawerOpen(false); form.resetFields(); }}
        extra={
          <div className="drawer-actions">
            <Button icon={<CloseOutlined />} onClick={() => { setDrawerOpen(false); form.resetFields(); }}>
              Cancel
            </Button>
            <Button type="primary" icon={<SaveOutlined />} onClick={() => form.submit()}>
              Save Changes
            </Button>
          </div>
        }
      >
        <EditProductForm
          form={form}
          onFinish={handleEditSubmit}
          existingImages={product.images ?? []}
        />
      </Drawer>
    </div>
  );
};

export default ProductDetailPage;
