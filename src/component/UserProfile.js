import { Typography, Box, Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  UserBox: {
    display: "flex",
    alignItems: "center",
    "& h6": {
      fontWeight: "600",
    },
    "& small": {
      color: "#BFBFBF",
    },
    "& figure": {
      margin: "0",
      marginRight: "15px",
      height: "60px",
      width: "60px",
      borderRadius: "50%",
      overflow: "hidden",
      backgroundColor: "#101010",
      display:"flex",
      "& img": {
        width: "auto",
        minWidth: "100%",
        minHeight: "100%",
      },
    },
  },
}));

export default function ({ dataList }) {
  const classes = useStyles();
  const history = useHistory()
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box className={classes.UserBox}>
            <figure>
              <img
                src={
                  dataList?.userId?.profilePic
                    ? dataList?.userId?.profilePic
                    : "images/user.png"
                }
              />
            </figure>
            <Box>
                    <Typography
                      variant='h6'
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        history.push({
                          pathname: "/about-creators",
                          search: dataList?.userId?._id,
                        })
                      }
                   
                    >
                      {dataList?.userId?.userName
                        ? dataList?.userId?.userName
                        : dataList?.userId?.name}
                    </Typography>
                    <Typography variant="body2" component="small">
                {moment(dataList?.createdAt).local().fromNow()}
                {dataList?.postType}
              </Typography>
                    {/* </Link> */}
                  </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography variant="h6" style={{wordBreak:"break-all"}}>{dataList?.postTitle} </Typography>
            <Typography variant="body1" style={{wordBreak:"break-all"}}>{dataList?.details} </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
