// Utility functions for formatting data

/**
 * Formats a category name for display
 * @param category - The category string to format
 * @returns Formatted category name
 */
export const formatCategoryName = (category: string): string => {
  if (typeof category !== 'string' || !category) {
    return 'Unknown Category';
  }
  
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Formats a price for display
 * @param price - The price number
 * @returns Formatted price string
 */
export const formatPrice = (price: number): string => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '$0.00';
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

/**
 * Formats a rating for display
 * @param rating - The rating number
 * @returns Formatted rating string
 */
export const formatRating = (rating: number): string => {
  if (typeof rating !== 'number' || isNaN(rating)) {
    return '0.0';
  }
  
  return rating.toFixed(1);
};

/**
 * Gets stock status color based on stock level
 * @param stock - The stock number
 * @returns Color string for Ant Design Tag
 */
export const getStockColor = (stock: number): string => {
  if (typeof stock !== 'number' || isNaN(stock)) {
    return 'red';
  }
  
  if (stock > 50) return 'green';
  if (stock > 20) return 'orange';
  return 'red';
};

/**
 * Gets stock status text based on stock level
 * @param stock - The stock number
 * @returns Status text
 */
export const getStockStatus = (stock: number): string => {
  if (typeof stock !== 'number' || isNaN(stock)) {
    return 'Unknown';
  }
  
  if (stock > 50) return 'In Stock';
  if (stock > 20) return 'Low Stock';
  if (stock > 0) return 'Limited Stock';
  return 'Out of Stock';
};