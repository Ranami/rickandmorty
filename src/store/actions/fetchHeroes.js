export const SET_HEROES = "heroes/set";
export const SET_HEROES_PAGE_INFO = "heroes/setPageInfo";
export const SET_HEROES_QUERY = "movies/setQuery";
export const SET_HEROES_STATUS_BY = "movies/setStatusBy";

export const fetchHeroes =
  ({ query = "", page = 1, status = "" } = {}) =>
  (dispatch) => {
    fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&status=${status}&name=${query}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: SET_HEROES,
          payload: data.results,
        });
        dispatch({
          type: SET_HEROES_PAGE_INFO,
          payload: {
            page,
            total_pages: data?.info.pages,
          },
        });
      });
  };
