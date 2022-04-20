import React from "react";
import { styled, Button } from "@mui/material";

const Box = styled("div")`
  width: 260px;
  padding: 16px 16px 12px 16px;
  border-radius: 8px;
  box-sizing: border-box;
  transition: 0.2s;
  &:hover {
    box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled("img")`
  width: 240px;
  height: 260px;
  object-fit: contain;
`;

const Title = styled("h3")`
  font-size: 16px;
  font-weight: normal;
  color: #19191d;
  margin-top: 12px;
`;
const Price = styled("h3")`
  font-size: 24px;
  color: #19191d;
  margin-top: 12px;
`;

export function ProductBlock({ product, onAddToBasket }) {
  return (
    <Box>
      <Image src={product.image} alt={product.title} />
      <Title>{product.title}</Title>
      <Price>{product.price}</Price>
      <Button variant="outlined" onClick={onAddToBasket}>
        Add to Basket
      </Button>
    </Box>
  );
}
