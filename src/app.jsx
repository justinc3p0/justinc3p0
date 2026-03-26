import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Countdown from './components/Countdown';
import { products, categories } from './data';

function App() {
  const [currentCategory, setCurrentCategory] = useState('公仔');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState('pickup');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [showPaypal, setShowPaypal] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 更新当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 过滤当前分类的商品
  const filteredProducts = products.filter(product => product.category === currentCategory);

  // 计算购物车总价
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // 计算配送费
  const calculateShippingFee = () => {
    if (deliveryType === 'pickup') return 0;
    return subtotal >= 299 ? 0 : 15;
  };
  
  const shippingFee = calculateShippingFee();
  const total = subtotal + shippingFee;

  // 添加商品到购物车
  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // 更新商品数量
  const updateQuantity = (productId, change) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change;
          if (newQuantity <= 0) {
            return null;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean);
    });
  };

  // 从购物车移除商品
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // 处理结算
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setShowCountdown(true);
    setShowPaypal(true);
  };

  // 处理倒计时结束
  const handleTimeUp = () => {
    alert('订单已超时，请重新下单');
    setShowPaypal(false);
    setShowCountdown(false);
  };

  // 格式化时间显示
  const formatTime = (date) => {
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral">
      {/* 导航栏 */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="https://p26-doubao-search-sign.byteimg.com/ecom-shop-material/png_m_7abee91f28e273d0c76039b058daad64_sx_313574_www800-800~tplv-be4g95zd3a-image.jpeg?lk3s=feb11e32&x-expires=1790064822&x-signature=LemrYIjOtX%2BJFvZlYX6woBgKIds%3D" 
              alt="Chikawa Logo" 
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-2xl font-bold text-primary-dark">Chikawa 周边商店</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-gray-600">
              {formatTime(currentTime)}
            </div>
            <button 
              className="relative btn-secondary"
              onClick={() => setIsCartOpen(true)}
            >
              <i className="fa fa-shopping-cart mr-2"></i>
              购物车
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <section className="bg-gradient-to-r from-primary to-secondary h-[250px] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-accent rounded-full animate-bounce-slow"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white rounded-full animate-bounce-slow" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-primary-dark rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="text-center z-10 text-white">
          <h2 className="text-4xl font-bold text-shadow mb-4">欢迎来到 Chikawa 世界！</h2>
          <p className="text-xl max-w-2xl mx-auto">可爱的 Chikawa 周边商品等你来收集～</p>
        </div>
      </section>

      {/* 主要内容 */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* 分类标签 */}
        <div className="mb-8 flex justify-center flex-wrap gap-4">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${currentCategory === category ? 'btn-primary active' : 'btn-secondary'}`}
              onClick={() => setCurrentCategory(category)}
            >
              {category === '公仔' && <i className="fa fa-paw mr-2"></i>}
              {category === '徽章' && <i className="fa fa-star mr-2"></i>}
              {category === '大号玩偶' && <i className="fa fa-heart mr-2"></i>}
              {category === '盲盒' && <i className="fa fa-gift mr-2"></i>}
              {category}
            </button>
          ))}
        </div>

        {/* 商品网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4">关于我们</h4>
              <p>Chikawa 周边商店致力于为粉丝提供最可爱、最优质的 Chikawa 周边商品。</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">联系方式</h4>
              <p><i className="fa fa-envelope mr-2"></i> email@chikawa-shop.com</p>
              <p><i className="fa fa-phone mr-2"></i> 400-123-4567</p>
              <p><i className="fa fa-map-marker mr-2"></i> 上海市浦东新区动漫大道123号</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">关注我们</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-primary"><i className="fa fa-weixin text-2xl"></i></a>
                <a href="#" className="text-white hover:text-primary"><i className="fa fa-weibo text-2xl"></i></a>
                <a href="#" className="text-white hover:text-primary"><i className="fa fa-instagram text-2xl"></i></a>
                <a href="#" className="text-white hover:text-primary"><i className="fa fa-twitter text-2xl"></i></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center">
            <p>&copy; {new Date().getFullYear()} Chikawa 周边商店. 版权所有.</p>
          </div>
        </div>
      </footer>

      {/* 购物车抽屉 */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        subtotal={subtotal}
        shippingFee={shippingFee}
        total={total}
        deliveryType={deliveryType}
        onDeliveryTypeChange={setDeliveryType}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        onCheckout={handleCheckout}
      />

      {/* PayPal 支付弹窗 */}
      {showPaypal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">支付确认</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => {
                  setShowPaypal(false);
                  setShowCountdown(false);
                }}
              >
                <i className="fa fa-times"></i>
              </button>
            </div>
            
            {showCountdown && (
              <Countdown 
                initialTime={15 * 60}
                onTimeUp={handleTimeUp}
              />
            )}
            
            <div className="mt-4">
              <p className="text-center mb-4">订单总额：<span className="font-bold text-primary-dark">¥{total.toFixed(2)}</span></p>
              <div id="paypal-button-container" className="py-4">
                {/* PayPal 按钮将在这里渲染 */}
                <div className="text-center py-8">
                  <p className="text-gray-600">正在加载支付界面...</p>
                  <button 
                    className="btn-primary mt-4"
                    onClick={() => {
                      alert('支付成功！订单号：' + Math.random().toString(36).substr(2, 9).toUpperCase());
                      setCart([]);
                      setShowPaypal(false);
                      setShowCountdown(false);
                    }}
                  >
                    模拟支付成功
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;