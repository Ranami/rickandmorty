import axios from "axios";

export const SET_CATALOG_ITEMS = "items/set";

export const fetchCatalogItems = () => async (dispatch) => {
  const response = await axios.get(
    "https://kdwed-f1dd2-default-rtdb.europe-west1.firebasedatabase.app/categories.json"
  );
  await dispatch({ type: SET_CATALOG_ITEMS, payload: response.data });
};
