import React, { useState, useRef } from 'react';
import { Table, Button, Input, Tag, Rate, Drawer, Form, Select } from 'antd';
import { ReloadOutlined, EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { useProductsList, useCategories } from '../hooks/useProducts';
import { formatPrice, getStockColor, formatCategoryName } from '../utils/formatters';
import type { Product } from '../store/slices/productsSlice';
import PageBreadcrumb from '../components/PageBreadcrumb';
import EditProductForm from '../components/EditProductForm';
import TableSkeleton from '../components/TableSkeleton';

const { Search } = Input;

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [form] = Form.useForm();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const {
    products, total, currentPage, pageSize,
    isLoading, isFetching, searchQuery, selectedCategory,
    updateSearch, updateCategory, updatePagination, clearFilters, refetch,
  } = useProductsList();

  const { categoryOptions, isLoading: categoriesLoading } = useCategories();

  const openEditDrawer = (record: Product) => {
    setEditingProduct(record);
    form.setFieldsValue({
      title: record.title,
      brand: record.brand,
      category: record.category,
      description: record.description,
      price: record.price,
      stock: record.stock,
      discountPercentage: record.discountPercentage,
    });
    setDrawerOpen(true);
  };

  const handleEditSubmit = (values: any) => {
    console.log('Edited product:', { id: editingProduct?.id, ...values });
    setDrawerOpen(false);
    form.resetFields();
    setEditingProduct(null);
  };

  const columns: ColumnsType<Product> = [
    {
      title: 'Image',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 70,
      render: (thumbnail: string, record: Product) => (
        <img src={thumbnail} alt={record.title} className="product-thumb" />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => (
        <span className="font-semibold text-slate-800 text-sm">{text}</span>
      ),
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      width: 130,
      render: (brand: string) => (
        <span className="text-sm text-slate-500">{brand}</span>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 110,
      render: (price: number) => (
        <span className="font-bold text-slate-800">{formatPrice(price)}</span>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      width: 160,
      render: (rating: number) => (
        <div className="flex items-center gap-2">
          <Rate disabled value={rating} allowHalf style={{ fontSize: 12 }} />
          <span className="text-xs text-slate-400 font-semibold">{rating}</span>
        </div>
      ),
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      width: 90,
      render: (stock: number) => (
        <Tag color={getStockColor(stock)} className="font-semibold">{stock}</Tag>
      ),
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      render: (category: string) => (
        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
          {formatCategoryName(category)}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 140,
      render: (_, record: Product) => (
        <div className="table-actions">
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            className="action-edit"
            onClick={() => openEditDrawer(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            size="small"
            className="action-view"
            onClick={() => navigate(`/products/${record.id}`)}
          >
            View →
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-10">
      <PageBreadcrumb items={[{ title: 'Products' }]} />

      {/* Page Title */}
      <div className="py-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Products</h1>
        <p className="text-base text-slate-500 mt-1">{total} items in your catalog</p>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-inner">
          <div className="toolbar-left">
            <Search
              placeholder="Search products..."
              allowClear
              className="toolbar-search"
              value={searchInput}
              onSearch={(val) => updateSearch(val)}
              onChange={(e) => {
                const val = e.target.value;
                setSearchInput(val);
                if (debounceRef.current) clearTimeout(debounceRef.current);
                if (!val) {
                  updateSearch('');
                } else if (val.length >= 3) {
                  debounceRef.current = setTimeout(() => updateSearch(val), 400);
                }
              }}
              loading={isFetching}
            />
            <Select
              placeholder="All Categories"
              allowClear
              className="toolbar-category"
              loading={categoriesLoading}
              value={selectedCategory ?? undefined}
              onChange={(val) => updateCategory(val ?? undefined)}
              options={categoryOptions.map((c) => ({ value: c.slug, label: c.name }))}
            />
            {(searchQuery || selectedCategory) && (
              <Button type="text" onClick={() => { clearFilters(); setSearchInput(''); }}>
                Clear
              </Button>
            )}
          </div>
          <div className="toolbar-right">
            <Button icon={<ReloadOutlined />} onClick={refetch} loading={isFetching}>
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper bg-white rounded-2xl overflow-hidden shadow-sm">
        {isLoading || isFetching ? (
          <TableSkeleton rows={pageSize} />
        ) : (
          <Table
            columns={columns}
            dataSource={products}
            rowKey="id"
            loading={false}
            pagination={{
              current: currentPage,
              pageSize,
              total,
              showSizeChanger: true,
              showTotal: (t, r) => `${r[0]}–${r[1]} of ${t}`,
              onChange: updatePagination,
              onShowSizeChange: updatePagination,
              style: { padding: '16px 24px', margin: 0 },
            }}
            scroll={{ x: 800 }}
            size="large"
          />
        )}
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
          existingImages={editingProduct?.images ?? []}
        />
      </Drawer>
    </div>
  );
};

export default ProductsPage;
