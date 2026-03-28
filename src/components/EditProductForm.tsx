import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { FormInstance, UploadFile } from 'antd';
import type { RcFile } from 'rc-upload/lib/interface';
import { useCategories } from '../hooks/useProducts';

const { TextArea } = Input;
const { Dragger } = Upload;

interface EditProductFormProps {
  form: FormInstance;
  onFinish: (values: Record<string, unknown>) => void;
  existingImages?: string[];
}

interface CategoryOption {
  slug: string;
  name: string;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ form, onFinish, existingImages = [] }) => {
  const { categoryOptions } = useCategories();
  const [fileList, setFileList] = useState<UploadFile[]>(() =>
    existingImages.map((url, index) => ({
      uid: `existing-${index}`,
      name: `image-${index + 1}.jpg`,
      status: 'done' as const,
      url,
      thumbUrl: url,
    }))
  );

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} requiredMark="optional" scrollToFirstError >

      {/* Title */}
      <Form.Item
        label="Product Title"
        name="title"
        rules={[
          { required: true, message: 'Title is required' },
          { whitespace: true, message: 'Title cannot be blank' },
          { min: 3, message: 'At least 3 characters' },
          { max: 100, message: 'Max 100 characters' },
          {
            validator: (_rule, value: unknown) =>
              value && typeof value === 'string' && /[a-zA-Z]/.test(value)
                ? Promise.resolve()
                : Promise.reject('Title must contain letters'),
          },
        ]}
      >
        <Input size="large" placeholder="Product title" />
      </Form.Item>

      {/* Brand + Category */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Form.Item
          label="Brand"
          name="brand"
          rules={[
            { required: true, message: 'Brand is required' },
            { whitespace: true, message: 'Brand cannot be blank' },
            { min: 2, message: 'At least 2 characters' },
            { max: 50, message: 'Max 50 characters' },
          ]}
        >
          <Input size="large" placeholder="e.g. Sony" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select
            size="large"
            placeholder="Select category"
            options={categoryOptions.map((c: CategoryOption): { value: string; label: string } => ({ value: c.slug, label: c.name }))}
          />
        </Form.Item>
      </div>

      {/* Description */}
      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: 'Description is required' },
          { whitespace: true, message: 'Description cannot be blank' },
          { min: 20, message: 'At least 20 characters' },
          { max: 500, message: 'Max 500 characters' },
        ]}
      >
        <TextArea rows={4} showCount maxLength={500} placeholder="Describe the product..." />
      </Form.Item>

      {/* Price + Stock + Discount */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <Form.Item
          label="Price ($)"
          name="price"
          rules={[
            { required: true, message: 'Price is required' },
            { type: 'number', min: 0.01, message: 'Must be > $0' },
            { type: 'number', max: 99999, message: 'Max $99,999' },
            {
              validator: (_rule, value: unknown) =>
                value !== undefined && value !== null && typeof value === 'number' && !isNaN(value)
                  ? Promise.resolve()
                  : Promise.reject('Enter a valid price'),
            },
          ]}
        >
          <InputNumber size="large" style={{ width: '100%' }} precision={2} min={0.01} prefix="$" />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="stock"
          rules={[
            { required: true, message: 'Stock is required' },
            { type: 'number', min: 0, message: 'Cannot be negative' },
            { type: 'number', max: 10000, message: 'Max 10,000' },
            {
              validator: (_rule, value: unknown) =>
                typeof value === 'number' && Number.isInteger(value)
                  ? Promise.resolve()
                  : Promise.reject('Stock must be a whole number'),
            },
          ]}
        >
          <InputNumber size="large" style={{ width: '100%' }} min={0} precision={0} />
        </Form.Item>

        <Form.Item
          label="Discount (%)"
          name="discountPercentage"
          rules={[
            { type: 'number', min: 0, message: 'Cannot be negative' },
            { type: 'number', max: 90, message: 'Max 90%' },
            {
              validator: (_rule, value: unknown) => {
                if (value === undefined || value === null) return Promise.resolve();
                const decimals = (String(value).split('.')[1] || '').length;
                return decimals <= 2
                  ? Promise.resolve()
                  : Promise.reject('Max 2 decimal places');
              },
            },
          ]}
        >
          <InputNumber size="large" style={{ width: '100%' }} min={0} max={90} precision={2} suffix="%" />
        </Form.Item>
      </div>

      {/* Images */}
      <Form.Item label="Product Images" name="images">
        <Dragger
          multiple
          listType="picture"
          beforeUpload={(file: RcFile) => {
            const isImage = file.type.startsWith('image/');
            const isUnder5MB = file.size / 1024 / 1024 < 5;
            if (!isImage) {
              form.setFields([{ name: 'images', errors: ['Only image files are allowed'] }]);
              return Upload.LIST_IGNORE;
            }
            if (!isUnder5MB) {
              form.setFields([{ name: 'images', errors: ['Each file must be under 5MB'] }]);
              return Upload.LIST_IGNORE;
            }
            return false;
          }}
          accept="image/*"
          fileList={fileList}
          onChange={({ fileList: updated }: { fileList: UploadFile[] }) => setFileList(updated)}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ fontSize: 40, color: '#6366f1' }} />
          </p>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', margin: '8px 0 4px' }}>
            Drop images here or click to upload
          </p>
          <p style={{ fontSize: 12, color: '#94a3b8' }}>
            JPG, PNG, GIF — max 5MB each
          </p>
        </Dragger>
      </Form.Item>
    </Form>
  );
};

export default EditProductForm;
