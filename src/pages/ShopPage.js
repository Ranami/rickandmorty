import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Container } from "@mui/material";
import { addToBasket, fetchProducts } from "../store/actions/shopActions";
import { ProductBlock } from "../components/ProductBlock";
import { Basket } from "../components/Basket";

export function ShopPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shop.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToBasket = useCallback(
    (product) => {
      dispatch(addToBasket(product));
    },
    [dispatch]
  );

  return (
    <Container>
      <Grid container spacing={2}>
        {products.map((product) => {
          return (
            <Grid item xs={3} key={product.id}>
              <ProductBlock
                product={product}
                onAddToBasket={() => handleAddToBasket(product)}
              />
            </Grid>
          );
        })}
      </Grid>
      <Basket />
    </Container>
  );
}
