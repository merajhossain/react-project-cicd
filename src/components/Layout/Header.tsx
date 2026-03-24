import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
//deploment
const Header: React.FC = () => {
  return (
    <AntHeader className="site-header">
      <div className="header-inner">
        <Link to="/products" className="logo-wrap">
          <div className="logo-mark">
            <ShoppingOutlined />
          </div>
          <span className="logo-text">Product Store</span>
        </Link>
      </div>
    </AntHeader>
  );
};

export default Header;
