import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { fetchCatalogItems } from "../store/actions/catalogActions";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material";

const Wrapper = styled("div")`
  background-color: white;
  z-index: 10;
  position: absolute;
  align-items: baseline;
`;

const Columns = styled("div")`
  display: flex;
  border: ${(props) => (props.expended ? "2px solid #757ce8" : "none")};
  border-radius: 10px;
`;

const FirstLevel = styled("div")`
  padding-left: 25px;
  margin-top: 15px;
  width: 250px;
  height: 550px;
`;

const SecondLevel = styled("div")`
  margin-top: 15px;
  width: 400px;
  height: 600px;
`;

const ItemName = styled("p")`
  font-size: 14px;
  cursor: pointer;
  height: 20px;
  margin: 0;
  margin-bottom: 15px;
`;

export const Catalog = () => {
  const [expended, setExpended] = useState(false);
  const catalogItems = useSelector((state) => state.shop.catalogItems);
  const [childItems, setChildItems] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalogItems());
  }, [dispatch]);
  const handleMouseEnter = useCallback((childCategories = []) => {
    setExpended(true);
    setChildItems(childCategories);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setExpended(false);
  }, []);

  return (
    <Wrapper onMouseLeave={handleMouseLeave}>
      <Button
        onMouseEnter={() => handleMouseEnter(childItems)}
        sx={{ width: 100 }}
        variant="outlined"
      >
        Каталог
      </Button>
      <Columns expended={expended}>
        {expended && (
          <FirstLevel>
            {catalogItems.map((items) => (
              <ItemName
                items={items}
                key={items.id}
                onMouseEnter={() => handleMouseEnter(items.childCategories)}
              >
                {items.name}
              </ItemName>
            ))}
          </FirstLevel>
        )}
        {childItems.length > 0 && expended && (
          <SecondLevel>
            {childItems.map((childItem) => (
              <ItemName onMouseEnter={() => handleMouseEnter(childItems)}>
                {childItem.name}
              </ItemName>
            ))}
          </SecondLevel>
        )}
      </Columns>
    </Wrapper>
  );
};
