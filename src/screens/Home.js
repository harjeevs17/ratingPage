import React, { useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import emailjs from "emailjs-com";
import { Link, useParams } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import { FaGoogle, FaFacebook, FaShareAlt } from "react-icons/fa";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { fetchCompany } from "../apis/index";

import {
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  MailruShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import styles from "./Home.css";

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
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  icons: {
    padding: 10,
  },
  intro: {
    fontSize: 20,
  },
  mainBox: {
    height: "80vh",
    flexDirection: "column",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
}));

const Main = () => {
  const [value, setValue] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pop, setPop] = useState(false);
  const [data, setdata] = useState(null);
  const [open, setOpen] = useState(false);
  const [btn, setbtn] = useState("Send Message");
  const classes = useStyles();
  const params = useParams();
  useEffect(() => {
    if (value != null) {
      console.log(value);
      if (value < 4) {
        setOpen(true);
      } else {
        setOpen(true);
      }
    }
  }, [value]);
  useEffect(() => {
    const FetchDetails = async () => {
      setdata(await fetchCompany(params.name));
    };
    FetchDetails();
  }, []);
  const closeModal = () => {
    setOpen(false);
  };
  console.log("data", data);
  const submitData = () => {
    console.log(name);
    // setPop(true);
    setbtn("Loading");
    const html = `<div>
    <p>The name is ${name}
    <p>The email is ${email}
    <p>The phone is ${phone}
    <p>The message is ${message}
    </div>`;
    emailjs
      .send(
        "sendgrid",
        "template_VRUeOVhw",
        {
          reply_to: "harjeevs17@gmail.com",
          to_name: "Harjeev",
          from_name: "noreply@gmail.com",
          sender: name,
          message_html: html,
        },
        "user_8fCHR8UMMvdJCNYX8uhVe"
      )
      .then(
        (result) => {
          setbtn("Send Message");
          setPop(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className={classes.mainBox}>
      {data ? (
        <>
          <div>
            <p style={{ margin: 20 }}>
              Help us. Help others. You’re invited to review:
            </p>
            <h1 style={{ padding: 10, fontSize: 50, color: "#1b75bb" }}>
              <img className="responsiveImg" src={data.Logo} alt="Logo" />
            </h1>
            <Typography
              className={classes.intro}
              style={{ padding: 20, color: "#1b75bb" }}
            >
              Please take a moment to review your experience with us. Your
              feedback not only helps us, it helps other potential customers.
            </Typography>
          </div>
          <div className="stars">
            <Rating
              style={{ fontSize: 70, paddingTop: 20 }}
              name="simple-controlled"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
          <Modal
            open={open}
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
              {value < 4 ? (
                <>
                  <h2 id="simple-modal-title">Give us your review</h2>
                  <div className={classes.root} noValidate autoComplete="off">
                    <div>
                      <p>
                        We strive for 100% customer satisfaction. If we fell
                        short, please tell us more so we can address your
                        concerns.
                      </p>
                    </div>

                    <form noValidate autoComplete="off">
                      <TextField
                        fullWidth
                        id="standard-basic"
                        label="Name"
                        onChange={(event, newValue) => {
                          setName(event.target.value);
                        }}
                      />
                      <TextField
                        fullWidth
                        id="standard-basic"
                        label="Phone"
                        onChange={(event, newValue) => {
                          setPhone(event.target.value);
                        }}
                      />
                      <TextField
                        fullWidth
                        id="standard-basic"
                        label="Email"
                        onChange={(event, newValue) => {
                          setEmail(event.target.value);
                        }}
                      />
                      <TextField
                        fullWidth
                        onChange={(event, newValue) => {
                          setMessage(event.target.value);
                        }}
                        id="outlined-multiline-static"
                        label="Message"
                        multiline
                        rows={4}
                      />
                      <Button variant="contained" onClick={submitData}>
                        {btn}
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <h2 id="simple-modal-title">Share the word</h2>
                  <div className={classes.root}>
                    <div>
                      <p>
                        Thank you! We need your help. Would you share your
                        experience on one of these sites?
                      </p>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <a target="_blank" href={data.GoogleLink}>
                          <div
                            style={{
                              height: "50px",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "100px 40px",
                              width: "100px",
                              backgroundImage: `url(${require("../assets/google.png")})`,
                            }}
                          ></div>
                        </a>
                        <a target="_blank" href={data.FbLink}>
                          <div
                            style={{
                              height: "50px",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "100px 40px",
                              width: "100px",
                              backgroundImage: `url(${require("../assets/facebook.png")})`,
                            }}
                          ></div>
                        </a>
                        <a target="_blank" href={data.CompanyLink}>
                          <div
                            style={{
                              height: "50px",
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "100px 40px",
                              width: "100px",
                              backgroundImage: `url(${require("../assets/solor.jpg")})`,
                            }}
                          ></div>
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Modal>
        </>
      ) : (
        <h2>Loading</h2>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={pop}
        autoHideDuration={6000}
        onClose={() => setPop(false)}
        message="Successully submitted"
      />
    </div>
  );
};

export default Main;
