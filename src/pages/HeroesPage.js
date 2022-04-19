import { useCallback, useEffect } from "react";
import { HeroCard } from "../components/HeroCard";
import Grid from "@mui/material/Grid";
import {
  Container,
  TextField,
  Button,
  Pagination,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_HEROES_STATUS_BY,
  SET_HEROES_QUERY,
  fetchHeroes,
} from "../store/actions/fetchHeroes";

export function HeroesPage() {
  const dispatch = useDispatch();
  const heroes = useSelector((state) => state.heroes.heroes);
  const query = useSelector((state) => state.heroes.query);
  const statusBy = useSelector((state) => state.heroes.statusBy);
  const pageInfo = useSelector((state) => state.heroes.pageInfo);

  useEffect(() => {
    dispatch(fetchHeroes());
  }, [dispatch]);

  const setStatusBy = useCallback(
    (payload) => {
      dispatch({ type: SET_HEROES_STATUS_BY, payload });
    },
    [dispatch]
  );
  const setQuery = useCallback(
    (payload) => {
      dispatch({ type: SET_HEROES_QUERY, payload });
    },
    [dispatch]
  );

  const searchHeroes = useCallback(
    ({ page = 1, status = statusBy } = {}) => {
      dispatch(fetchHeroes({ page, status, query }));
    },
    [dispatch, query, statusBy]
  );

  return (
    <Container maxWidth="x1" style={{ margin: "10px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1>Heroes</h1>
        <div style={{ marginLeft: "auto", flexGrow: 1, maxWidth: "300px" }}>
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ position: "absolute", top: "-6px" }}
            >
              Sort by Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={statusBy}
              label="Sort by Status"
              disabled={!!query && query.length > 0}
              onChange={(e) => {
                setStatusBy(e.target.value);
                searchHeroes({ status: e.target.value });
              }}
              size="small"
            >
              <MenuItem value="alive">Alive</MenuItem>
              <MenuItem value="dead">Dead</MenuItem>
              <MenuItem value="unknown">Unknown</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchHeroes();
            }}
          >
            <TextField
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              size="small"
              label="Search"
            />
            <Button type="submit" variant="contained">
              Search
            </Button>
          </form>
        </div>
      </div>
      <Grid container spacing={4}>
        {heroes?.map((hero) => (
          <Grid item xs={6} key={hero.id}>
            <HeroCard hero={hero} key={hero.id} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={pageInfo.total_pages}
        page={pageInfo.page}
        onChange={(e, value) => searchHeroes({ page: value })}
        size="large"
        style={{
          margin: "20px 0",
          display: "flex",
          justifyContent: "center",
        }}
      />
    </Container>
  );
}
