import React, { useState, useEffect, useContext } from "react";

import {
  Typography,
  Box,
  makeStyles,
  Avatar,
  Grid,
  Button,
  Link,
} from "@material-ui/core";
import { FaEllipsisV } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { BsClockHistory } from "react-icons/bs";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "5px 0px",
  },
  bottomblock: {
    display: "flex",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    maxWidth: "40px",
    minWidth: "40px",
    height: "40px",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "0px",
    position: "relative",
    background:
      "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
    backdropFilter: " blur(42px)",
    border: "3px solid #EC167F",
    background: "#000",
    "& img": {
      width: "100%",
    },
    "& .vectorBox": {
      position: "absolute",
      top: "0px",
      right: "0px",
      zIndex: "1",
    },
  },
}));

export default function UsersCard(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const auth = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { type, data, listfollowerHandler } = props;
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const followUnfollowHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.followUnfollowUser + data?._id,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoading(false);
        toast.success(res.data.responseMessage);
        if (listfollowerHandler) {
          listfollowerHandler();
        }
      } else {
        toast.error(res.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      toast.error(error.response.data.responseMessage);
    }
  };
  const [isFollowing, setisFollowing] = useState(false);

  useEffect(() => {
    if (data && auth?.userData) {
      const filterFun = data.followers.filter((data) => {
        return data === auth?.userData?._id;
      });
      if (filterFun[0]) {
        setisFollowing(true);
      } else {
        setisFollowing(false);
      }
    }
  }, [data, auth?.userData]);

  return (
    <Box className={classes.root}>
      <Box className={classes.bottomblock}>
        <figure className={classes.profileImage}>
          <Box className="vectorBox">
            <img src={data.check} className="check_icon2" />
          </Box>
          <img
            src={data?.profilePic ? data?.profilePic : "/images/user.png"}
            alt="user"
          />
        </figure>
        <Box pl={1}>
          <Typography variant="h5" style={{ fontSize: "16px" }}>
            {" "}
            {data?.userName ? data?.userName : data?.name}
          </Typography>
          {/* <Typography variant="body2" style={{ color: "#ffffffab" }}>
            {data?.followersCount}
          </Typography> */}
        </Box>
      </Box>
      &nbsp;&nbsp;&nbsp;
      <Button
        onClick={followUnfollowHandler}
        variant="contained"
        size="medium"
        color="primary"
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </Box>
  );
}
