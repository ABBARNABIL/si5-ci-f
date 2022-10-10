import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 10,
  p: 4,
};

export default function QuantityModal(props) {
  const [quantity, setQuantity] = React.useState(1);

  const handleAdd = () => {
    setQuantity(quantity + 1);
  };

  const handleRemove = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const confirmQuantity = () => {
    props.confirm(props.item, quantity);
    setQuantity(1);
  };

  return (
    <div>
      <Modal
        open={props.openModal}
        onClose={props.closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Add {props.name} to cart
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <IconButton onClick={() => handleRemove()}>
                <RemoveCircleIcon fontSize="large" />
              </IconButton>
            </div>
            <Typography fontSize={30}>{quantity}</Typography>
            <div>
              <IconButton onClick={() => handleAdd()}>
                <AddCircleIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
          <Button
            style={{ top: "20%" }}
            size={"large"}
            variant="contained"
            color="success"
            onClick={() => confirmQuantity()}
          >
            Add to cart
          </Button>
          <Button
            style={{ top: "20%", left: "40%", width: 130 }}
            size={"large"}
            variant="contained"
            color="error"
            onClick={props.closeModal}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
