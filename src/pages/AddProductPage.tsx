import React from 'react';
import { Form, Input, InputNumber, Select, Upload, Button, Row, Col } from 'antd';
import { PlusOutlined, ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { UploadProps } from 'antd';
import { useAddProduct, useCategories } from '../hooks/useProducts';
import { formatCategoryName } from '../utils/formatters';
import PageBreadcrumb from '../components/PageBreadcrumb';

const { TextArea } = Input;

const AddProductPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { addProduct, isLoading } = useAddProduct();
  const { categories } = useCategories();

  const handleSubmit = async (values: any) => {
    try {
      await addProduct({
        ...values,
        images: values.images?.fileList?.map((f: any) => f.url || f.thumbUrl) || [],
      });
      form.resetFields();
      setTimeout(() => navigate('/products'), 1500);
    } catch (e) {
      console.error(e);
    }
  };

  const uploadProps: UploadProps = {
    multiple: true,
    listType: 'picture-card',
    beforeUpload: () => false,
  };

  return (
    <div className="space-y-6 pb-16">
      <PageBreadcrumb items={[{ title: 'Products', path: '/products' }, { title: 'Add Product' }]} />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Add Product</h1>
          <p className="text-sm text-slate-500 mt-1">Fill in the details to add a new product</p>
        </div>
        <div className="flex items-center gap-3">
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/products')} className="font-semibold">
            Back
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            loading={isLoading}
            onClick={() => form.submit()}
            className="font-semibold"
          >
            Save Product
          </Button>
        </div>
      </div>

      {/* Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
        initialValues={{ stock: 0, discountPercentage: 0 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="surface p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Basic Information</h3>
              <Row gutter={[20, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Product Title"
                    name="title"
                    rules={[{ required: true, message: 'Required' }, { min: 3 }]}
                  >
                    <Input placeholder="e.g. Wireless Headphones" size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Brand"
                    name="brand"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="e.g. Sony" size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Required' }, { min: 10 }]}
              >
                <TextArea rows={4} placeholder="Describe the product..." showCount maxLength={500} />
              </Form.Item>
            </div>

            <div className="surface p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Pricing & Inventory</h3>
              <Row gutter={[20, 0]}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Price ($)"
                    name="price"
                    rules={[{ required: true, message: 'Required' }, { type: 'number', min: 0.01 }]}
                  >
                    <InputNumber placeholder="0.00" size="large" precision={2} min={0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Stock"
                    name="stock"
                    rules={[{ required: true, message: 'Required' }, { type: 'number', min: 0 }]}
                  >
                    <InputNumber placeholder="0" size="large" min={0} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Discount (%)"
                    name="discountPercentage"
                    rules={[{ type: 'number', min: 0, max: 100 }]}
                  >
                    <InputNumber placeholder="0" size="large" min={0} max={100} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[20, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="SKU"
                    name="sku"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="e.g. WH-1000XM5" size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Select
                      placeholder="Select category"
                      size="large"
                      options={categories.map((c) => ({ value: c, label: formatCategoryName(c) }))}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>

          {/* Images */}
          <div className="surface p-6 h-fit">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Product Images</h3>
            <Form.Item name="images">
              <Upload {...uploadProps}>
                <div className="flex flex-col items-center justify-center py-8 px-4 text-slate-400 cursor-pointer">
                  <PlusOutlined className="text-2xl mb-2 text-indigo-400" />
                  <div className="text-sm font-semibold">Upload Images</div>
                  <div className="text-xs mt-1">JPG, PNG up to 5MB</div>
                </div>
              </Upload>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddProductPage;
