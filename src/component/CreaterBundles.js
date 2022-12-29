import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  Button,
  Grid,
  IconButton,
} from "@material-ui/core";
import { useHistory} from "react-router-dom";
import { MdFavorite } from "react-icons/md";
import { Dialog } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px",
    backgroundColor: "#373636",
    transition: "0.5s",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "&:hover": {
      transform: "translateY(-10px)",
    },
    "& .postImg": {
      width: "100%",
      margin: "16px 0",
      borderRadius: "20px",
      overflow: "hidden",
      "& img": {
        width: "100%",
      },
    },
    "& .top": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "10px",
      "& .icons": {
        display: "flex",
        justifyContent: "right",
        "& .iconbutton": {
          backgroundColor: "#FFFFFF",
          width: "35px",
          height: "35px",
          margin: "3px",
          [theme.breakpoints.down("xs")]: {
            width: "15px",
            height: "15px",
            padding: "3px",
          },
        },
      },
      "& .Userbox": {
        display: "flex",
        alignItems: "center",
        "& figure": {
          margin: "0",
          marginLeft: "-10px",
          height: "30px",
          width: "30px",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#101010",
          position: "relative",
          transition: "0.3s",
          cursor: "pointer",
          "&:first-child": {
            marginLeft: "0px",
          },
          "&:hover": {
            zIndex: "2",
            transform: "scale(1.2)",
          },
          "& img": {
            width: "auto",
            maxWidth: "100%",
            maxHeight: "40px",
          },
          "& typo3": {
            color: "#928E8E",
          },
        },
      },
    },
    "& .content": {
      marginTop: "10px",
    },
    "& .buttonbox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "24px",
      [theme.breakpoints.down("xs")]: {
        marginTop: "16px",
      },
    },
  },
  mainimg: {
    width: "100%",
    height: "200px !important",
    overflow: "hidden",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "30px",
    backgroundColor: "#ccc !important",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "10px",
      height: "130px !important",
    },
  },
  textstyle: {
    whiteSpace: "pre",
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "calc(100% - 5px)",
  },
}));

function CreatorsBundles(props) {
  const { data, type, index } = props;
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const updateDimensions = () => {
    var offsetWidth = document.getElementById("imagecard" + index).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + index).style.height =
      newoofsetWidth + "px";
  };

  useEffect(() => {
    updateDimensions();
  }, [data, index]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <>
      <Paper elevation={2} className={classes.root}>
        <Box className="top">
          <Typography variant="h6" color="primary.main">
            {data?.name}
          </Typography>
          <Box className="icons">
            <IconButton
              style={{ backgroundColor: "#FFF" }}
              className="iconbutton"
            >
              <MdFavorite style={{ color: "#E24444" }} />
            </IconButton>
          </Box>
        </Box>
        <Box
          id={`imagecard${index}`}
          className={classes.mainimg}
          style={{ background: "url(" + data?.image + ")" }}
          // onClick={() => {
          //   history.push("/author");
          // }}
        ></Box>
        <Box className="content">
          <Grid container spacing={1}>
            <Grid item xs={6} align="left">
              <Typography variant="body1" color="primary.main">
                Donation Amount
              </Typography>
            </Grid>
            <Grid item xs={6} align="right">
              <Typography variant="body2">{data?.text1}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6} align="left">
              <Typography variant="body1" color="primary.main">
                Duration
              </Typography>
            </Grid>
            <Grid item xs={6} align="right">
              <Typography variant="body2">{data?.text2}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6} align="left">
              <Typography variant="body1" color="primary.main">
                No. of Subscribers
              </Typography>
            </Grid>
            <Grid item xs={6} align="right">
              <Typography variant="body2">{data?.text3}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6} align="left">
              <Typography variant="body1" color="primary.main">
                Creator
              </Typography>
            </Grid>
            <Grid item xs={6} align="right">
              <Typography variant="body2">{data?.text4}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box className="buttonbox">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpen(true)}
          >
            Subscribe Now
          </Button>
        </Box>
      </Paper>

      <Dialog
        onClose={handleClose}
        // onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Box mb={2}>
          <img
            src="images/bundles/Bundles1.png"
            style={{ width: "100%", height: "200px" }}
          />
        </Box>
        <Grid container>
          <Grid item lg={6} sm={6} md={6} xs={12}>
            <Box style={{ display: "flex" }}>
              <img src="images/User1.png" className={classes.img} />

              <Typography
                variant="h6"
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "10px",
                }}
              >
                Zunda Mochi
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            md={6}
            xs={12}
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Box style={{ display: "flex" }}>
              <Typography>Bundles Price:</Typography>&nbsp;
              <Typography>0.004</Typography>
            </Box>
          </Grid>
        </Grid>
        &nbsp;
        <Box style={{ display: "flex" }} mb={2}>
          <Typography>Duration: </Typography>&nbsp;
          <Typography>60 days</Typography>
        </Box>
        <Typography variant="h6">Details:</Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor donec
          in dictumst luctus ipsum tempor. Id duis quisque dolor vestibulum elit
          hendrerit ut lobortis. In tempus sapien volutpat enim ac. Et sit
          quisque accumsan amet eget in in.s
        </Typography>
        <Box style={{ display: "flex", justifyContent: "center" }} mt={2}>
          <Box mr={2}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </Box>
          <Button variant="contained" color="secondary" size="medium">
            Subscribe Now
          </Button>
        </Box>
      </Dialog>
    </>
  );
}

export default CreatorsBundles;
