import React from "react";

export function BasketItem({ product, count }) {
  return (
    <div className="basket_item">
      <h3>{product.product.title}</h3>
      <p>Total Price: {product.product.price * count}$</p>
      <p>Amount: {count}</p>
    </div>
  );
}
