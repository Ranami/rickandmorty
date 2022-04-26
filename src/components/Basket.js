import React, { useState, useCallback } from "react";
import { styled, Button, Drawer, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementBasket,
  decrementBasket,
  OPEN_MODAL,
} from "../store/actions/shopActions";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { BasketItem } from "./BasketItem";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import CloseIcon from "@mui/icons-material/Close";
import { OrderFormModal } from "./OrderFormModal";

const Wrapper = styled("div")`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
`;

const BasketButtons = styled("span")`
  color: #000000;
  display: flex;
  column-gap: 15px;
  justify-content: space-between;
  width: 105px;
  margin-left: auto;
  align-items: center;
  background-color: rgb(243, 243, 247);
  border-radius: 50px;
`;

const ItemsWrapper = styled("div")`
  width: 500px;
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  margin: ${(props) => (props.length ? "15px auto" : "auto")};
`;

const Divider = styled("div")`
  &:after {
    content: "";
    width: 2px;
    height: 10px;
    background-color: #1976d2;
    margin: 0 3px;
  }
`;

const TotalHeader = styled("h2")`
  margin: 0;
`;

const CloseButton = styled("div")`
  margin: 5px 10px 0 auto;
  height: 1px;
  transition: 0.5s;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const ProductCount = styled("p")`
  margin: 0;
  margin-bottom: 1px;
`;

export function Basket() {
  const basket = useSelector((state) => state.shop.basket);
  const dispatch = useDispatch();

  // const handleRemoveFromBasket = useCallback(
  //   (id) => {
  //     dispatch(removeFromBasket(id));
  //   },
  //   [dispatch]
  // );

  const handleOpenModel = useCallback(() => {
    dispatch({ type: OPEN_MODAL });
  }, [dispatch]);

  const handleIncrementBasket = useCallback(
    (id) => {
      dispatch(incrementBasket(id));
    },
    [dispatch]
  );
  const handleDecrementBasket = useCallback(
    (id) => {
      dispatch(decrementBasket(id));
    },
    [dispatch]
  );

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDrawer = useCallback((state) => {
    setShowSidebar(state);
  }, []);

  const getCountOfAllItems = useCallback(
    () => basket.reduce((prev, item) => prev + item.count, 0),
    [basket]
  );

  const getSumOfAllItems = useCallback(
    () =>
      basket
        .reduce((prev, item) => prev + item.product.price * item.count, 0)
        .toFixed(2),
    [basket]
  );

  return (
    <Wrapper>
      <Button
        sx={{ width: 100, marginRight: 3 }}
        variant="outlined"
        onClick={() => toggleDrawer(true)}
      >
        Basket
        {basket.length ? (
          <>
            <Divider />
            <div>{getCountOfAllItems()}</div>
          </>
        ) : (
          ""
        )}
      </Button>
      <Drawer
        open={showSidebar}
        onClose={() => toggleDrawer(false)}
        anchor="right"
      >
        <CloseButton onClick={() => toggleDrawer(false)}>
          <CloseIcon />
        </CloseButton>
        <ItemsWrapper length={basket.length}>
          {basket.length === 0 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: "bold" }}>
                Your basket is empty!
              </div>

              <SentimentVeryDissatisfiedIcon
                sx={{ fontSize: 150, opacity: 0.4 }}
              />
            </div>
          )}
          {basket.length > 0 && (
            <TotalHeader>
              {getCountOfAllItems()} good(-s) worth {getSumOfAllItems()}$
            </TotalHeader>
          )}
          {basket.length > 0 &&
            basket.map((product) => (
              <div
                onClick={() => toggleDrawer(false)}
                onKeyDown={() => toggleDrawer(false)}
                key={product.product.id}
                style={{ marginBottom: 5, width: 450 }}
              >
                <BasketItem product={product} count={product.count} />
                <BasketButtons>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDecrementBasket(product.product.id);
                    }}
                    className="basket_button"
                  >
                    <RemoveIcon style={{ fontSize: 16, color: "black" }} />
                  </IconButton>
                  <ProductCount>{product.count}</ProductCount>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIncrementBasket(product.product.id);
                    }}
                    className="basket_button"
                  >
                    <AddIcon style={{ fontSize: 16, color: "black" }} />
                  </IconButton>
                </BasketButtons>
                <hr />
              </div>
            ))}
          {showSidebar && basket.length > 0 && (
            <Button type="submit" variant="outlined" onClick={handleOpenModel}>
              Place an order
            </Button>
          )}
          <OrderFormModal />
        </ItemsWrapper>
      </Drawer>
    </Wrapper>
  );
}
