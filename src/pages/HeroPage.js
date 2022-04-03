import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled, CardMedia } from "@mui/material";

const Box = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  height: 300px;
  background-color: #3c3e44;
  color: #ffffff;
`;

const Name = styled("div")`
  font-size: 30px;
  font-weight: 800;
`;

const Status = styled("div")`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  &:before {
    content: "";
    height: 15px;
    width: 15px;
    border-radius: 50%;
    display: inline-block;
    background-color: ${(props) =>
      props.status === "Alive"
        ? "green"
        : props.status === "Dead"
        ? "red"
        : "yellow"};
    margin-right: 10px;
  }
`;

const Label = styled("div")`
  font-size: 24px;
  font-weight: 700;
`;

const Data = styled("div")`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
`;

export function HeroPage() {
  const params = useParams();
  const [data, setData] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setDate(new Date(data.created));
      });
  }, [params.id]);

  return (
    data &&
    date && (
      <Box>
        <CardMedia
          component="img"
          image={data.image}
          alt={data.name}
          sx={{
            width: "250px",
            height: "250px",
            boxSizing: "border-box",
            marginTop: "25px",
            marginLeft: "25px",
          }}
        />

        <div style={{ marginTop: "15px", height: "300px" }}>
          <Name>{data.name}</Name>
          <Status status={data.status}>Status: {data.status}</Status>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              height: "200px",
              flexDirection: "column",
              columnGap: "25px",
            }}
          >
            <div>
              <Label>Species:</Label>
              <Data> {data.species}</Data>
            </div>
            <div>
              <Label>Gender:</Label>
              <Data> {data.gender}</Data>
            </div>
            <div>
              <Label>Last known location: </Label>
              <Data> {data.location.name}</Data>
            </div>
            <div>
              <Label>Origin: </Label>
              <Data> {data.origin.name}</Data>
            </div>
            <div>
              <Label>Created in: </Label>
              <Data> {date.toLocaleDateString()}</Data>
            </div>
          </div>
        </div>
      </Box>
    )
  );
}
