import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

// Base selectors
export const selectProductsState = (state: RootState) => state.products;
export const selectUiState = (state: RootState) => state.ui;

// Products selectors
export const selectProducts = createSelector(
  [selectProductsState],
  (productsState) => productsState.products
);

export const selectCurrentProduct = createSelector(
  [selectProductsState],
  (productsState) => productsState.currentProduct
);

export const selectProductsLoading = createSelector(
  [selectProductsState],
  (productsState) => productsState.loading
);

export const selectProductsError = createSelector(
  [selectProductsState],
  (productsState) => productsState.error
);

export const selectCategories = createSelector(
  [selectProductsState],
  (productsState) => productsState.categories
);

export const selectSearchQuery = createSelector(
  [selectProductsState],
  (productsState) => productsState.searchQuery
);

export const selectSelectedCategory = createSelector(
  [selectProductsState],
  (productsState) => productsState.selectedCategory
);

export const selectPagination = createSelector(
  [selectProductsState],
  (productsState) => productsState.pagination
);

// Filtered products selector
export const selectFilteredProducts = createSelector(
  [selectProducts, selectSearchQuery, selectSelectedCategory],
  (products, searchQuery, selectedCategory) => {
    let filtered = products;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    return filtered;
  }
);

// Product statistics selectors
export const selectProductStats = createSelector(
  [selectProducts],
  (products) => {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);
    const averagePrice = totalProducts > 0 ? products.reduce((sum, product) => sum + product.price, 0) / totalProducts : 0;
    const lowStockProducts = products.filter((product) => product.stock < 20).length;
    const outOfStockProducts = products.filter((product) => product.stock === 0).length;

    return {
      totalProducts,
      totalValue,
      averagePrice,
      lowStockProducts,
      outOfStockProducts,
    };
  }
);

// UI selectors
export const selectNotifications = createSelector(
  [selectUiState],
  (uiState) => uiState.notifications
);

export const selectUnreadNotifications = createSelector(
  [selectNotifications],
  (notifications) => notifications.filter((notification) => !notification.read)
);

export const selectTheme = createSelector(
  [selectUiState],
  (uiState) => uiState.theme
);

export const selectLoadingStates = createSelector(
  [selectUiState],
  (uiState) => uiState.loading
);