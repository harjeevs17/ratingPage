import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { updateData } from "../apis/index";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    width: 600,
    //border: "2px solid #000",
    //boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const EditModal = (props) => {
  const classes = useStyles();
  const [fblink, setfblink] = useState("");
  const [googlelink, setgooglelink] = useState("");
  const [companyname, setcompanyname] = useState("");
  const [companylink, setcompanylink] = useState("");
  const [logo, setlogo] = useState("");
  useEffect(() => {
    //console.log(props.data);
    if (props.data) {
      setfblink(props.data.FbLink);
      setgooglelink(props.data.GoogleLink);
      setcompanyname(props.data.CompanyName);
      setcompanylink(props.data.CompanyLink);
      setlogo(props.data.Logo);
    }
  }, [props]);
  const closeModal = () => {
    props.close(false);
  };
  const submitData = async () => {
    const info = {
      fb: fblink,
      google: googlelink,
      name: companyname,
      logo: logo,
      company: companylink,
    };
    console.log(info);
    const data = await updateData(info);
    window.location.reload();
  };
  return (
    <Modal
      open={props.show}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <Button
          variant="contained"
          onClick={closeModal}
          style={{ float: "right" }}
        >
          X
        </Button>
        <form noValidate autoComplete="off">
          <TextField
            fullWidth
            id="standard-basic"
            label="Company Name"
            onChange={(event, newValue) => {
              setcompanyname(event.target.value);
            }}
            value={companyname}
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="FaceBook Link"
            onChange={(event, newValue) => {
              setfblink(event.target.value);
            }}
            value={fblink}
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Google Link"
            onChange={(event, newValue) => {
              setgooglelink(event.target.value);
            }}
            value={googlelink}
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="Company Link"
            onChange={(event, newValue) => {
              setcompanylink(event.target.value);
            }}
            value={companylink}
          />
          <TextField
            fullWidth
            onChange={(event, newValue) => {
              setlogo(event.target.value);
            }}
            id="outlined-multiline-static"
            label="Logo"
            value={logo}
            rows={4}
          />
          <Button variant="contained" onClick={submitData}>
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};
export default EditModal;
