import React, { useState } from "react";
import { Grid, makeStyles, Box, Typography, Button } from "@material-ui/core";
import axios from "axios";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import NoDataFound from "src/component/NoDataFound";

const useStyles = makeStyles((theme)=>({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  dot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    backgroundColor: "#B55A06",
  },
  mainContent: {
    display: "flex",
    alignItems: "center",
  },
  btnSection: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
  UserBox: {
    "& figure": {
      margin: "0",
      marginRight: "15px",
      height: "40px",
      width: "40px",
      borderRadius: "50%",
      overflow: "hidden",
      backgroundColor: "#101010",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      [theme.breakpoints.down("xs")]: {
        height: "30px",
        width: "30px",
        marginRight: "8px",
      },
      "& img": {
        width: "auto",
        minWidth: "100%",
        minHeight: "100%",
      },
    },
  },
}));

function BlockingCard({ userData1, callBackFun }) {
  const classes = useStyles();
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [idd1, setIDD] = React.useState(false);

  const handleClickOpen = (data) => {
    setOpen(true);
    setIDD(data?._id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const blockuser = async (id) => {
    setLoader(true);
    axios({
      method: "POST",
      url: ApiConfig.userBlockUnblock,
      data: {
        _id: idd1,
      },
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setLoader(false);
        if (res.data.responseCode === 200) {
          if (callBackFun) {
            callBackFun();
          }
          toast.success(res.data.responseMessage);
          setOpen(false);
          setLoader(false);

          if (res.data.result.docs) {
            toast.success(res.response_message);
            setLoader(false);
          }
        }
      })
      .catch(() => {
        setLoader(false);
      });
  };

  return (
    <>
      <Box className={classes.main}>
        <Grid container direction={"cloumn"} spacing={1}>
          {userData1?.blockedUser.length > 0 ? (
            <>
              {userData1 &&
                userData1?.blockedUser?.map((data, i) => {
                  return (
                    <Grid item xs={12} key={i}>
                      <Box pt={1} pb={2} className={classes.root}>
                        <Box className={classes.mainContent}>
                          <Box className={classes.UserBox}>
                            <figure>
                              <img
                                src={
                                  data?.profilePic
                                    ? data?.profilePic
                                    : "images/notificationimg.png"
                                }
                              />
                            </figure>
                          </Box>
                          <Box ml={2}>
                            <Typography variant="h6">
                              {data?.userName ? data?.userName : data?.name}
                            </Typography>
                            <Typography
                              variant="body"
                              component="small"
                              style={{ color: "#989595" }}
                            >
                              {data?.blockeddate}
                            </Typography>
                          </Box>
                        </Box>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          {blockuser ? (
                            <Button
                              variant="contained"
                              color="secondary"
                              style={{ height: "30px" }}
                              size="small"
                              onClick={() => handleClickOpen(data)}
                            >
                              Unblock
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="secondary"
                              style={{ height: "30px" }}
                              size="small"
                              onClick={() => handleClickOpen(data)}
                            >
                              Block
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
            </>
          ) : (
            <Grid item xs={12}>
              <Box align="center">
                <NoDataFound />
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description" align="center">
            Are you sure you want to Unblock this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            No
          </Button>
          <Button
            onClick={() => blockuser()}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BlockingCard;
