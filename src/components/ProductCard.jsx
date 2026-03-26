import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  const getStarRating = (rating) => {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fa fa-star"></i>';
    }
    
    if (hasHalfStar) {
      stars += '<i class="fa fa-star-half-o"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="fa fa-star-o"></i>';
    }
    
    return <div dangerouslySetInnerHTML={{ __html: stars }} />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-contain p-4"
        />
        <div className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
          热度 {product.popularity}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{product.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {getStarRating(product.rating)}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-primary-dark">¥{product.price}</span>
          <button 
            className="add-to-cart btn-primary text-sm" 
            onClick={() => onAddToCart(product.id)}
          >
            <i className="fa fa-plus mr-1"></i> 加入购物车
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;