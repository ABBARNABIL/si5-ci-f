import images from "../../assets/images";
import ImageSlider from "../../components/ImageSlider";
import Typography from "@mui/material/Typography";

const GameScreen = () => {
  return (
    <div className="App">
      <ImageSlider images={images} />
      <Typography
        variant="h4"
        style={{
          textAlign: "center",
          top: "80%",
          left: "20%",
          position: "absolute",
        }}
      >
        Play a game while waiting for your order
      </Typography>
    </div>
  );
};

export default GameScreen;
