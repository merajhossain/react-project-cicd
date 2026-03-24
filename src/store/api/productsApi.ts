import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Product } from '../slices/productsSlice';

// Define API response types
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductsQueryParams {
  limit?: number;
  skip?: number;
  search?: string;
  category?: string;
}

export interface AddProductRequest {
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail?: string;
  images?: string[];
}

// Define the API slice
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  tagTypes: ['Product', 'Category'],
  endpoints: (builder) => ({
    // Get all products with optional filtering and pagination
    getProducts: builder.query<ProductsResponse, ProductsQueryParams>({
      query: ({ limit = 10, skip = 0, search, category }) => {
        let url = 'products';
        
        if (search) {
          url = `products/search?q=${encodeURIComponent(search)}`;
        } else if (category) {
          url = `products/category/${encodeURIComponent(category)}`;
        }
        
        // Add pagination parameters
        const separator = url.includes('?') ? '&' : '?';
        url += `${separator}limit=${limit}&skip=${skip}`;
        
        return url;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),

    // Get single product by ID
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),

    // Get all categories
    getCategories: builder.query<{ slug: string; name: string; url: string }[], void>({
      query: () => 'products/categories',
      providesTags: [{ type: 'Category', id: 'LIST' }],
    }),

    // Add new product
    addProduct: builder.mutation<Product, AddProductRequest>({
      query: (productData) => ({
        url: 'products/add',
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    // Update product
    updateProduct: builder.mutation<Product, { id: number; data: Partial<AddProductRequest> }>({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
      ],
    }),

    // Delete product
    deleteProduct: builder.mutation<{ id: number; isDeleted: boolean }, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'Product', id },
        { type: 'Product', id: 'LIST' },
      ],
    }),

    // Search products
    searchProducts: builder.query<ProductsResponse, { query: string; limit?: number; skip?: number }>({
      query: ({ query, limit = 10, skip = 0 }) =>
        `products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`,
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'SEARCH' },
            ]
          : [{ type: 'Product', id: 'SEARCH' }],
    }),

    // Get products by category
    getProductsByCategory: builder.query<ProductsResponse, { category: string; limit?: number; skip?: number }>({
      query: ({ category, limit = 10, skip = 0 }) =>
        `products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`,
      providesTags: (result, _error, { category }) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: `CATEGORY-${category}` },
            ]
          : [{ type: 'Product', id: `CATEGORY-${category}` }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSearchProductsQuery,
  useGetProductsByCategoryQuery,
  useLazyGetProductsQuery,
  useLazySearchProductsQuery,
  useLazyGetProductsByCategoryQuery,
} = productsApi;