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
  border: ${(props) => (props.expended ? "2px solid #1565c0" : "none")};
`;

const FirstLevel = styled("div")`
  width: 200px;
  height: 100%;
`;

const SecondLevel = styled("div")`
  width: 500px;
  height: 100%;
`;

const ItemName = styled("p")`
  font-size: 16px;
  cursor: pointer;
  height: 20px;
  margin: 0;
  padding: 5px 5px 10px 5px;
  border-bottom: 1px solid #1565c0;
  width: 90%;
  &:last-child {
    border: 0;
  }
  &:hover {
    background-color: #1565c0;
    color: white;
  }
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
    setChildItems([]);
  }, []);

  return (
    <Wrapper onMouseLeave={handleMouseLeave}>
      <Button
        onMouseEnter={() => handleMouseEnter(childItems)}
        sx={{ width: 100 }}
        variant="contained"
      >
        Каталог
      </Button>
      <Columns expended={expended}>
        {expended && (
          <FirstLevel>
            {catalogItems.map((items, index) => (
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
            {childItems.map((childItem, index) => (
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
