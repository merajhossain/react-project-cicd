import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-96 text-center py-24">
      <div className="text-8xl font-black text-slate-100 mb-4 select-none">404</div>
      <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Page not found</h2>
      <p className="text-slate-500 mb-8 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button
        type="primary"
        size="large"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate('/products')}
        className="font-semibold h-12 px-8"
      >
        Back to Products
      </Button>
    </div>
  );
};

export default NotFoundPage;
