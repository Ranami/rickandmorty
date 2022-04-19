import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material";
import { getStartsByRating } from "../utils/getStartsByRating";
import ImgMediaCard from "../components/ImgMediaCard";

const MovieBlock = styled("div")`
  background-image: ${(props) =>
    `url("https://image.tmdb.org/t/p/original${props.backgroundimageurl}");`};
  width: 100%;
  background-size: cover;
  height: 648px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 132px 0 0 236px;
  position: relative;
  margin-bottom: 30px;
  &:before {
    width: 100%;
    height: 648px;
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(
      269.96deg,
      rgba(29, 29, 29, 0) 0.04%,
      rgba(29, 29, 29, 0.8) 99.5%
    );
  }
`;

const Title = styled("div")`
  font-weight: 500;
  font-size: 56px;
  line-height: 64px;
  z-index: 1;
  margin-bottom: 16px;
  color: white;
`;

const Stars = styled("div")`
  z-index: 1;
  font-size: 20px;
  margin-bottom: 16px;
  color: white;
`;

const Description = styled("div")`
  z-index: 1;
  font-size: 16px;
  margin-bottom: 16px;
  color: white;
  text-align: justify;
`;

const SimilarMovies = styled("div")`
  margin-left: 88px;
`;

export function MoviePage() {
  const params = useParams();
  const [data, setData] = useState();
  const [similarMovies, setSimilarMovies] = useState();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU`
    )
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [params.id]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=d65708ab6862fb68c7b1f70252b5d91c&language=ru-RU`
    )
      .then((res) => res.json())
      .then((data) => setSimilarMovies(data.results));
  }, [params.id]);

  return (
    <div style={{ backgroundColor: "#1d1d1d" }}>
      {data && similarMovies && (
        <div>
          <MovieBlock backgroundimageurl={data.backdrop_path}>
            <div className="full_description">
              <Stars>{getStartsByRating(data.vote_average)}</Stars>
              <Title>{data.title}</Title>
              <Description>{data.overview}</Description>
            </div>
          </MovieBlock>
          <SimilarMovies>
            <Title>Similar Movies</Title>
            <div className="movie_cards">
              {similarMovies.slice(0, 5).map((similarMovie) => (
                <ImgMediaCard key={similarMovie.id} movie={similarMovie} />
              ))}
            </div>
          </SimilarMovies>
        </div>
      )}
    </div>
  );
}
