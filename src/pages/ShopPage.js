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
    <Container sx={{ marginTop: 5 }}>
      <Basket />
      <Grid container spacing={{ xs: 2, sm: 6, md: 5 }}>
        {products.map((product) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductBlock
                product={product}
                onAddToBasket={() => handleAddToBasket(product)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
