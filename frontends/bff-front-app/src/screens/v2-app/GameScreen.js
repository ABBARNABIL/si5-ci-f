import images from "../../assets/images";
import ImageSlider from "../../components/ImageSlider";

const GameScreen = () => {
  return (
    <div className="App">
      <ImageSlider images={images} />
    </div>
  );
};

export default GameScreen;
