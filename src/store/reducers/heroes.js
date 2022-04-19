import {
  SET_HEROES_STATUS_BY,
  SET_HEROES,
  SET_HEROES_PAGE_INFO,
  SET_HEROES_QUERY,
} from "../actions/fetchHeroes";

const initState = {
  pageInfo: {
    page: 1,
    total_pages: 0,
  },
  heroes: [],
  query: "",
  statusBy: "",
};

export const heroes = function (state = initState, action) {
  const newState = { ...state };
  switch (action.type) {
    case SET_HEROES:
      newState.heroes = action.payload;
      break;
    case SET_HEROES_STATUS_BY:
      newState.statusBy = action.payload;
      break;
    case SET_HEROES_PAGE_INFO:
      newState.pageInfo = action.payload;
      break;
    case SET_HEROES_QUERY:
      newState.query = action.payload;
      break;
    default:
      return state;
  }

  return newState;
};
