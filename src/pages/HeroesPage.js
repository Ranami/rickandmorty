import { useEffect, useState } from "react";
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

export function HeroesPage() {
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    total_pages: 0,
  });
  const [heroes, setHeroes] = useState([]);
  const [query, setQuery] = useState("");
  const [statusBy, setStatusBy] = useState("");

  useEffect(() => {
    searchHeroes();
  }, []);

  function searchHeroes({ page = 1, status = statusBy } = {}) {
    fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&status=${status}&name=${query}`
    )
      .then((response) => response.json())
      .then((data) => {
        setHeroes(data?.results);
        setPageInfo({
          page,
          total_pages: data?.info.pages,
        });
      });
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      searchHeroes();
    }
  }
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
              Filter by Status
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
            justifyContent: "flex-end",
          }}
        >
          <TextField
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="small"
            label="Search"
            onKeyDown={handleKeyDown}
          />
          <Button onClick={() => searchHeroes()}>Search</Button>
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
