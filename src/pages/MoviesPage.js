import { useCallback, useEffect } from "react";
import {
  Container,
  Pagination,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import ImgMediaCard from "../components/ImgMediaCard";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  SET_MOVIES_QUERY,
  SET_MOVIES_SORT_BY,
} from "../store/actions/fetchMovies";

export function MoviesPage() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const query = useSelector((state) => state.movies.query);
  const sortBy = useSelector((state) => state.movies.sortBy);
  const pageInfo = useSelector((state) => state.movies.pageInfo);
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  const setSortBy = useCallback(
    (payload) => {
      dispatch({ type: SET_MOVIES_SORT_BY, payload });
    },
    [dispatch]
  );
  const setQuery = useCallback(
    (payload) => {
      dispatch({ type: SET_MOVIES_QUERY, payload });
    },
    [dispatch]
  );
  const searchMovies = useCallback(
    ({ page = 1, sort = sortBy } = {}) => {
      dispatch(fetchMovies({ page, sort, query }));
    },
    [dispatch, query, sortBy]
  );

  return (
    <Container maxWidth="xl">
      <div
        style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
      >
        <div style={{ marginLeft: "auto", flexGrow: 1, maxWidth: "300px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              sx={{ width: 250 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortBy}
              label="Sort by"
              disabled={!!query && query.length > 0}
              onChange={(e) => {
                setSortBy(e.target.value);
                searchMovies({ sort: e.target.value });
              }}
              size="large"
            >
              <MenuItem value="popularity.desc">Popularity</MenuItem>
              <MenuItem value="release_date.desc">Release Date</MenuItem>
              <MenuItem value="vote_average.desc">Rating</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="search_block">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchMovies();
            }}
          >
            <TextField
              id="outlined-basic"
              label="Search"
              variant="outlined"
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              className="search_button"
            >
              Поиск
            </Button>
          </form>
        </div>
      </div>
      <h1>Movies</h1>

      <div className="movie_cards">
        {movies?.map((movie) => (
          <ImgMediaCard movie={movie} key={movie.id} />
        ))}
      </div>
      <Pagination
        sx={{ display: "flex", justifyContent: "center", marginBottom: 5 }}
        count={pageInfo.total_pages}
        page={pageInfo.page}
        size="large"
        onChange={(e, value) => searchMovies({ page: value })}
      />
    </Container>
  );
}
