import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function HomeScreen() {
  //navigate to the menu page
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <video
        loop
        autoPlay
        muted
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          objectFit: "cover",
        }}
      >
        <source
          src="https://rr4---sn-25glen7e.googlevideo.com/videoplayback?expire=1665884789&ei=FQ5LY9ntDo6G8gOY8peQCw&ip=31.171.154.70&id=o-AHSgL2VV0jbq6oGbMdKsMdj5Ad0v93ID4_B8RxDD-muL&itag=136&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278&source=youtube&requiressl=yes&spc=yR2vp8JcJX8F2H-ME1Ci4aFn2JHfn5k&vprv=1&mime=video%2Fmp4&ns=HlJ1LybscxU4pRotr3FMBJ0I&gir=yes&clen=5067730&otfp=1&dur=49.883&lmt=1633465971714113&keepalive=yes&fexp=24001373,24007246&c=WEB&txp=6216224&n=eN4G-CmIa6nigg&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cspc%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cotfp%2Cdur%2Clmt&sig=AOq0QJ8wRAIgGt97_w0bHEWwSEpgpY5bfzm2MY0cOBKKtEu0_xeSrpACIEjrZlIKDpi4Pz4_sKrLlvev3mOpNz_6bYQCZdLRaPDq&rm=sn-5cjvh-up5z7e,sn-nv4e67s&req_id=c8e1deddaf03a3ee&cmsv=e&redirect_counter=2&cms_redirect=yes&ipbypass=yes&mh=9u&mip=46.193.1.18&mm=29&mn=sn-25glen7e&ms=rdu&mt=1665862639&mv=m&mvi=4&pl=26&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAORFw362o7ZUVcZ6qB13L3xPfefwXd9iet53Sbg_cMlBAiBuP9NnOD1p5dvbUZU7HziohHxFwtRNX8EMUxCCYDH0lA%3D%3D"
          type="video/mp4"
        />
      </video>
      <Button
        onClick={() => navigate("/order")}
        variant="contained"
        style={{
          top: "80%",
          width: "300px",
          height: "60px",
          position: "absolute",
          left: "40%",
          fontSize: "20px",
        }}
        endIcon={<SendIcon />}
        color="success"
      >
        Place Order
      </Button>
    </div>
  );
}
