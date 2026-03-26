import React, { useEffect } from 'react';
import { regionTimes } from '../data';

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  subtotal, 
  shippingFee, 
  total, 
  deliveryType, 
  onDeliveryTypeChange, 
  selectedRegion, 
  onRegionChange, 
  onCheckout 
}) => {
  const estimatedTime = selectedRegion ? regionTimes[selectedRegion] || '预计3-5天送达' : '';

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold">购物车</h3>
          <button 
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <i className="fa fa-times text-xl"></i>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <i className="fa fa-shopping-cart text-4xl mb-4"></i>
              <p>购物车还是空的呢～</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center py-4 border-b">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-16 h-16 object-contain mr-4"
                />
                <div className="flex-grow">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">¥{item.price}</p>
                </div>
                <div className="flex items-center">
                  <button 
                    className="quantity-btn minus bg-gray-200 hover:bg-gray-300 w-6 h-6 rounded-full flex items-center justify-center"
                    onClick={() => onUpdateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="mx-3">{item.quantity}</span>
                  <button 
                    className="quantity-btn plus bg-gray-200 hover:bg-gray-300 w-6 h-6 rounded-full flex items-center justify-center"
                    onClick={() => onUpdateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                  <button 
                    className="remove-item ml-3 text-red-500 hover:text-red-700"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="p-4 border-t">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>商品总价：</span>
              <span className="font-bold">¥{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>配送费：</span>
              <span className="font-bold">¥{shippingFee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between text-lg font-bold">
              <span>总计：</span>
              <span className="text-primary-dark">¥{total.toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            className={`w-full btn-primary mb-4 ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={onCheckout}
            disabled={cart.length === 0}
          >
            结算
          </button>
          
          <div className="space-y-4">
            <h4 className="font-bold mb-2">配送方式：</h4>
            <div className="flex space-x-4">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="delivery" 
                  value="pickup" 
                  checked={deliveryType === 'pickup'}
                  onChange={() => onDeliveryTypeChange('pickup')}
                  className="mr-2"
                />
                <span>到店自取</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input 
                  type="radio" 
                  name="delivery" 
                  value="delivery" 
                  checked={deliveryType === 'delivery'}
                  onChange={() => onDeliveryTypeChange('delivery')}
                  className="mr-2"
                />
                <span>配送到家</span>
              </label>
            </div>
            
            {deliveryType === 'delivery' && (
              <div className="space-y-2">
                <label className="block">
                  <span className="font-medium">选择地区：</span>
                  <select 
                    className="w-full p-2 border rounded mt-1"
                    value={selectedRegion}
                    onChange={(e) => onRegionChange(e.target.value)}
                  >
                    <option value="">请选择地区</option>
                    <option value="beijing">北京</option>
                    <option value="shanghai">上海</option>
                    <option value="guangzhou">广州</option>
                    <option value="shenzhen">深圳</option>
                    <option value="hangzhou">杭州</option>
                  </select>
                </label>
                {estimatedTime && (
                  <div className="text-sm text-gray-600">{estimatedTime}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;