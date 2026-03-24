import React from "react";
import { Card, Rate, Tag, Button } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { formatCategoryName, getStockColor } from "../utils/formatters";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  thumbnail: string;
  description?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id, title, price, rating, stock, category, thumbnail, description,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      className="overflow-hidden border-none rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group bg-white"
      cover={
        <div className="relative h-64 overflow-hidden bg-gray-50">
          <img
            alt={title}
            src={thumbnail}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Tag color="#fff" className="m-0 border-none shadow-md font-bold text-[10px] uppercase text-gray-900 rounded-lg px-3 py-1 bg-white/90 backdrop-blur-md">
              {formatCategoryName(category)}
            </Tag>
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              size="large"
              className="hover:scale-110 transition-transform bg-white/20 backdrop-blur-md border-none text-white shadow-xl"
              onClick={() => navigate(`/products/${id}`)}
            />
            <Button
              shape="circle"
              icon={<ShoppingCartOutlined />}
              size="large"
              className="hover:scale-110 transition-transform bg-white text-blue-600 border-none shadow-xl"
            />
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-gray-900 text-lg leading-tight truncate group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Rate disabled defaultValue={rating} allowHalf style={{ fontSize: 10 }} />
            <span className="text-[10px] font-bold text-gray-400">({rating})</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="text-2xl font-black text-gray-900">
            <span className="text-sm font-bold text-gray-400 mr-1">$</span>
            {price.toLocaleString()}
          </div>
          <Tag color={getStockColor(stock)} className="m-0 border-none font-black text-[10px] uppercase rounded-full px-3 py-0.5">
            {stock} In Stock
          </Tag>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 h-10 leading-relaxed font-medium">
          {description || 'Comprehensive specifications for this premium inventory listing.'}
        </p>
      </div>
    </Card>
  );
};

export default ProductCard;
