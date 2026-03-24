import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./store";
import MainLayout from "./components/Layout/MainLayout";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#6366f1',
            colorPrimaryHover: '#4f46e5',
            borderRadius: 10,
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            colorBgContainer: '#ffffff',
            colorBgLayout: '#f8fafc',
            colorBorder: '#e2e8f0',
            colorText: '#0f172a',
            colorTextSecondary: '#64748b',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          },
          components: {
            Table: {
              cellPaddingBlock: 20,
              cellPaddingInline: 24,
              headerBg: '#f8fafc',
              headerColor: '#94a3b8',
              rowHoverBg: '#f8faff',
            },
          },
        }}
      >
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/products" replace />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/add-product" element={<AddProductPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </MainLayout>
        </Router>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
