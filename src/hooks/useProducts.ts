import { useState, useEffect } from 'react';
import { message } from 'antd';
import {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useLazyGetProductsQuery,
} from '../store/api/productsApi';
import type { ProductsQueryParams, AddProductRequest } from '../store/api/productsApi';

// Custom hook for products list with enhanced functionality
export const useProductsList = (initialParams: ProductsQueryParams = {}) => {
  const [params, setParams] = useState<ProductsQueryParams>({
    limit: 10,
    skip: 0,
    ...initialParams,
  });

  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetProductsQuery(params);

  // Update search parameters
  const updateSearch = (search: string) => {
    setParams(prev => ({ ...prev, search, skip: 0 }));
  };

  // Update category filter
  const updateCategory = (category: string | undefined) => {
    setParams(prev => ({ ...prev, category, skip: 0 }));
  };

  // Update pagination
  const updatePagination = (page: number, pageSize: number) => {
    setParams(prev => ({
      ...prev,
      skip: (page - 1) * pageSize,
      limit: pageSize,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setParams(prev => ({
      limit: prev.limit,
      skip: 0,
    }));
  };

  return {
    products: data?.products || [],
    total: data?.total || 0,
    currentPage: Math.floor((params.skip || 0) / (params.limit || 10)) + 1,
    pageSize: params.limit || 10,
    isLoading,
    isFetching,
    error,
    searchQuery: params.search || '',
    selectedCategory: params.category,
    updateSearch,
    updateCategory,
    updatePagination,
    clearFilters,
    refetch,
  };
};

// Custom hook for single product with error handling
export const useProduct = (id: number | undefined) => {
  const {
    data: product,
    error,
    isLoading,
    refetch,
  } = useGetProductByIdQuery(id!, {
    skip: !id,
  });

  useEffect(() => {
    if (error) {
      message.error('Failed to load product details');
    }
  }, [error]);

  return {
    product,
    isLoading,
    error,
    refetch,
  };
};

// Custom hook for categories
export const useCategories = () => {
  const {
    data: categories = [],
    error,
    isLoading,
  } = useGetCategoriesQuery();

  useEffect(() => {
    if (error) {
      message.error('Failed to load categories');
    }
  }, [error]);

  // Map category objects to { slug, name } pairs
  const validCategories = categories
    .filter((cat) => cat && typeof cat === 'object' && cat.slug)
    .map((cat) => ({ slug: cat.slug, name: cat.name }));

  return {
    categories: validCategories.map((c) => c.slug), // keep backward compat (slug used as value)
    categoryOptions: validCategories,
    isLoading,
    error,
  };
};

// Custom hook for adding products with enhanced UX
export const useAddProduct = () => {
  const [addProduct, { isLoading, error }] = useAddProductMutation();

  const handleAddProduct = async (productData: AddProductRequest) => {
    try {
      const result = await addProduct(productData).unwrap();
      message.success('Product added successfully!');
      return result;
    } catch (err) {
      message.error('Failed to add product. Please try again.');
      throw err;
    }
  };

  return {
    addProduct: handleAddProduct,
    isLoading,
    error,
  };
};

// Custom hook for updating products
export const useUpdateProduct = () => {
  const [updateProduct, { isLoading, error }] = useUpdateProductMutation();

  const handleUpdateProduct = async (id: number, data: Partial<AddProductRequest>) => {
    try {
      const result = await updateProduct({ id, data }).unwrap();
      message.success('Product updated successfully!');
      return result;
    } catch (err) {
      message.error('Failed to update product. Please try again.');
      throw err;
    }
  };

  return {
    updateProduct: handleUpdateProduct,
    isLoading,
    error,
  };
};

// Custom hook for deleting products
export const useDeleteProduct = () => {
  const [deleteProduct, { isLoading, error }] = useDeleteProductMutation();

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id).unwrap();
      message.success('Product deleted successfully!');
      return true;
    } catch (err) {
      message.error('Failed to delete product. Please try again.');
      throw err;
    }
  };

  return {
    deleteProduct: handleDeleteProduct,
    isLoading,
    error,
  };
};

// Custom hook for lazy loading products (useful for search-as-you-type)
export const useLazyProducts = () => {
  const [trigger, { data, error, isLoading, isFetching }] = useLazyGetProductsQuery();

  const loadProducts = (params: ProductsQueryParams) => {
    return trigger(params);
  };

  return {
    loadProducts,
    products: data?.products || [],
    total: data?.total || 0,
    isLoading,
    isFetching,
    error,
  };
};