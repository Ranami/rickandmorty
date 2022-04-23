import React from "react";
import { styled } from "@mui/material";

const Image = styled("img")`
  width: 100px;
  height: 120px;
  object-fit: contain;
`;

const ItemInfo = styled("div")`
  display: flex;
  column-gap: 20px;
  height: 100px;
  margin-bottom: 30px;
`;

const ItemTitle = styled("h3")`
  margin: 0;
  width: 330px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const TotalPrice = styled("p")`
  margin: 0;
`;
const Description = styled("p")`
  margin: 0;
  display: -webkit-box;
  overflow-y: hidden;
  -webkit-line-clamp: 5;
  height: 98px;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  font-size: 14px;
  margin-bottom: 13px;
  width: 310px;
`;

export function BasketItem({ product, count }) {
  return (
    <ItemInfo className="basket_item">
      <Image src={product.product.image} alt={product.product.title} />
      <div>
        <ItemTitle>{product.product.title}</ItemTitle>
        <Description>Description: {product.product.description}</Description>
        <TotalPrice>
          Total Price: {product.product.price * count.toFixed(2)}$
        </TotalPrice>
      </div>
    </ItemInfo>
  );
}
