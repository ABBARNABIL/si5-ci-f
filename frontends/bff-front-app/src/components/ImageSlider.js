import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../src/style.css";
import React from "react";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

const ImageSlider = ({ images }) => {
  const navigate = useNavigate();

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <>
      <div className="tag">
        <h1>
          <SportsEsportsIcon fontSize="large" /> Jeux
        </h1>
      </div>
      <div className="imgslider">
        <Slider {...settings}>
          {images.map((item) => (
            <div key={item.id}>
              <img
                src={item.src}
                alt={item.alt}
                style={{ width: 300, height: 300, borderRadius: 300 / 2 }}
                onClick={() => navigate("/gameplay")}
              />
            </div>
          ))}
        </Slider>
      </div>
      <Typography variant="h4" style={{ textAlign: "center", top: 30 }}>
        Play a game while waiting for your order
      </Typography>
    </>
  );
};
export default ImageSlider;
