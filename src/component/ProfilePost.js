import {
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import React from "react";
import UserProfile from "./UserProfile";
import MultyUser from "./MultyUser";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDots } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";
const useStyles = makeStyles((theme) => ({
  PostBox: {
    backgroundColor: "#101010",
    "& .postImg": {
      width: "100%",
      margin: "16px 0",
      borderRadius: "20px",
      overflow: "hidden",
      backgroundColor: "#000",
      "& img": {
        width: "100%",
      },
    },
    "& label": {
      color: "#BFBFBF",
    },
    "& .commentBox": {
      borderTop: "0.5px solid #737373",
      borderBottom: "0.5px solid #737373",
      marginTop: "16px",
      padding: "5px 0",
      "& button": {
        "& svg": {
          fontSize: "20px",
          marginRight: "5px",
        },
      },
    },
    "& .searchaddress": {
      paddingTop: "16px",
      "& .figure": {
        margin: "0",
        marginRight: "15px",
        position: "relative",
        "& .profileimage": {
          height: "50px",
          width: "50px",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#101010",
          "& img": {
            width: "auto",
            maxWidth: "100%",
            maxHeight: "50px",
          },
        },
      },
    },
  },
}));

export default function (props) {
  const { data } = props;
  const classes = useStyles();
  return (
    <Paper>
      <Box className={classes.PostBox} p={2}>
        <Box mb={2}>
          <UserProfile />
        </Box>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing
          tincidunt ac sed egestas. Ultrices Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Adipiscing tincidunt ac sed egestas.
          Ultrices...
        </Typography>
        <figure className="postImg">
          <img src="images/postImg.png" />
        </figure>
        <Box>
          <Grid container alignItems="center">
            <Grid item xs={7}>
              {" "}
              <MultyUser />
            </Grid>
            <Grid item xs={5} align="right">
              <label>3 Comments</label> &nbsp; &nbsp; &nbsp; &nbsp;
              <label>17 Share</label>
            </Grid>
          </Grid>
        </Box>
        <Box className="commentBox">
          <Grid container>
            <Grid item xs={4}>
              <Button color="primary" size="large">
                <AiOutlineHeart /> Like
              </Button>
            </Grid>
            <Grid item xs={4} align="center">
              <Button color="primary" size="large">
                {" "}
                <BiCommentDots />
                Comments
              </Button>
            </Grid>
            <Grid item xs={4} align="right">
              <Button color="primary" size="large">
                {" "}
                <RiShareForwardLine />
                Share
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box className="searchaddress">
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={2}>
              <Box className="figure">
                <Box className="profileimage">
                  <img src="images/user.png" alt="user data" />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="Text Field"
                placeholder="Write here..."
                type="text"
                fullWidth
                multiline
                style={{ height: "50px" }}
                maxRows={1}
                // rows={1}
              />
            </Grid>
            <Grid item xs={2} align="center">
              <Button size="large" color="primary">
                <SendIcon style={{ color: "#E31A89" }} />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
}
