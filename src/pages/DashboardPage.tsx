import React from 'react';
import { Card, Row, Col, Statistic, Progress, List, Avatar } from 'antd';
import {
  ShoppingCartOutlined,
  DollarOutlined,
  UserOutlined,
  TrophyOutlined,
} from '@ant-design/icons';

const DashboardPage: React.FC = () => {
  const recentProducts = [
    {
      id: 1,
      title: 'iPhone 14 Pro',
      price: 999,
      image: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
    },
    {
      id: 2,
      title: 'MacBook Pro',
      price: 1299,
      image: 'https://cdn.dummyjson.com/product-images/6/thumbnail.png',
    },
    {
      id: 3,
      title: 'Samsung Galaxy',
      price: 899,
      image: 'https://cdn.dummyjson.com/product-images/3/thumbnail.jpg',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Products"
              value={1128}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={112893}
              precision={2}
              prefix={<DollarOutlined />}
              suffix="$"
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={93}
              prefix={<UserOutlined />}
              suffix="/ 100"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Conversion Rate"
              value={9.3}
              precision={2}
              prefix={<TrophyOutlined />}
              suffix="%"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Sales Performance" className="h-full">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Monthly Target</span>
                  <span>75%</span>
                </div>
                <Progress percent={75} status="active" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Quarterly Goal</span>
                  <span>60%</span>
                </div>
                <Progress percent={60} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Annual Revenue</span>
                  <span>45%</span>
                </div>
                <Progress percent={45} />
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Recent Products" className="h-full">
            <List
              itemLayout="horizontal"
              dataSource={recentProducts}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.image} />}
                    title={item.title}
                    description={`$${item.price}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;