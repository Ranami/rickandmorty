import { styled, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Box = styled("div")`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  height: 300px;
  background-color: #3c3e44;
  color: #ffffff;

  &:hover {
    transform: scale(1.03);
    transition: 0.5s;
    cursor: pointer;
  }
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

export function HeroCard({ hero }) {
  const navigate = useNavigate();
  return (
    <Box onClick={() => navigate("/heroes/" + hero.id)}>
      <CardMedia
        component="img"
        image={hero.image}
        alt={hero.name}
        sx={{
          width: "250px",
          height: "250px",
          boxSizing: "border-box",
          marginTop: "25px",
          marginLeft: "25px",
        }}
      />
      <div style={{ marginTop: "15px" }}>
        <Name>{hero.name}</Name>
        <Status status={hero.status}>Status: {hero.status}</Status>
        <Label>Species:</Label>
        <Data> {hero.species}</Data>
        <Label>Last known location: </Label>
        <Data> {hero.location.name}</Data>
      </div>
    </Box>
  );
}
