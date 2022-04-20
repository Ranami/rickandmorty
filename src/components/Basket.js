import React, { useState, useCallback } from "react";
import { styled, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { removeFromBasket } from "../store/actions/shopActions";

const Wrapper = styled("div")`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 100px;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: black;
  border-radius: 50px;
  transition: 0.5s;
  ${({ expanded }) =>
    expanded && {
      width: "400px",
      height: "600px",
      background: "white",
      border: "1px solid black",
      borderRadius: "10px",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      padding: "16px",
    }}
`;

export function BasketItem({ product, count }) {
  return (
    <div>
      {product.product.title} {count}
    </div>
  );
}

export function Basket() {
  const [expanded, setExpanded] = useState(false);
  const basket = useSelector((state) => state.shop.basket);
  const dispatch = useDispatch();

  const handleRemoveFromBasket = useCallback(
    (id) => {
      dispatch(removeFromBasket(id));
    },
    [dispatch]
  );
  return (
    <Wrapper onClick={() => setExpanded(!expanded)} expanded={expanded}>
      {!expanded ? (
        <ShoppingBasketIcon sx={{ fontSize: 40, color: "white" }} />
      ) : (
        ""
      )}
      {expanded &&
        basket.map((product) => (
          <div>
            <BasketItem
              product={product}
              key={product.product.id}
              count={product.count}
            />
            <Button
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFromBasket(product.product.id);
              }}
            >
              Remove
            </Button>
          </div>
        ))}
    </Wrapper>
  );
}
