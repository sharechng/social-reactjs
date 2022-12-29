import React, { useState, useContext } from "react";
import {
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  FormHelperText,
  makeStyles,
  withStyles,
  Menu,
  IconButton,
  MenuItem,
  ListItemText,
  Dialog,
  DialogActions,
} from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import { FaEllipsisH } from "react-icons/fa";
import { TbFileExport } from "react-icons/tb";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { Link, useHistory } from "react-router-dom";
import { sortAddress } from "src/utils";
import Axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import LoadingSkeleton from "./LoadingSkeleton";
import { AuthContext } from "src/context/Auth";
import moment from "moment";
import SocialShareBox from "./SocialShareBox";
import FormControl from "@material-ui/core/FormControl";
import { KeyboardDatePicker } from "@material-ui/pickers";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const Accordion = withStyles({
  root: {
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "0",
    },
  },
  expanded: {},
})(MuiAccordion);
const AccordionSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: "auto",
    "&$expanded": {
      minHeight: "auto",
    },
  },
  content: {
    margin: "0px 0 ",
    justifyContent: "center",
    "&$expanded": {
      margin: "0px 0 ",
    },
  },
  expanded: {},
})(MuiAccordionSummary);
const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      padding: "10px 0 !important",
    },
  },
}))(MuiAccordionDetails);
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #484849 !important",
    backgroundColor: "#101010 !important",
    minWidth: "120px !important",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
const useStyles = makeStyles((theme) => ({
  PostBox: {
    backgroundColor: "theme",
    position: "relative",
    padding: "25px",

    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "& p": {
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
    },
    "& .price": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& .text": {
        display: "flex",
        alignItems: "center",
        "& h6": {
          fontWeight: "700",
          wordBreak: "break-all",
        },
      },
    },
    "& .postImg": {
      width: "100%",
      backgroundColor: "#000",
      margin: "16px 0",
      borderRadius: "20px",

      overflow: "hidden",
      [theme.breakpoints.down("xs")]: {
        margin: "5px 0",
        borderRadius: "10px",
      },
      "& img": {
        width: "100%",
        height: "255px",
        maxHeight: "380px",
        objectFit: "cover",
      },
    },
    "& label": {
      color: "#BFBFBF",
      [theme.breakpoints.down("xs")]: {
        fontSize: "10px",
      },
    },
    "& .commentBox": {
      //   borderTop: "0.5px solid #737373",
      //   borderBottom: "0.5px solid #737373",
      marginTop: "16px",
      padding: "5px 0",
      [theme.breakpoints.down("xs")]: {
        padding: "0px 0",
        marginTop: "10px",
      },
      "& button": {
        [theme.breakpoints.down("xs")]: {
          fontSize: "10px !important",
        },

        "& svg": {
          fontSize: "20px",
          marginRight: "5px",
          [theme.breakpoints.down("xs")]: {
            fontSize: "15px",
          },
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
          [theme.breakpoints.down("xs")]: {
            height: "30px",
            width: "30px",
          },
          "& img": {
            width: "auto",
            maxWidth: "100%",
            maxHeight: "50px",
            [theme.breakpoints.down("xs")]: {
              maxHeight: "30px",
            },
          },
        },
      },
      "& button": {
        backgroundColor: "#373636",
        height: "48px",
        borderRadius: "5px",
        [theme.breakpoints.down("xs")]: {
          height: "30px",
          "& svg": {
            fontSize: "16px",
          },
        },
      },
    },
    "& .UserBox": {
      display: "flex",
      alignItems: "center",
      marginBottom: "16px",
      justifyContent: "space-between",
      [theme.breakpoints.down("xs")]: {
        marginBottom: "10px",
      },
      "& a": {
        textDecoration: "none",
        "& h6": {
          fontWeight: "600",
          color: "#fff",
          [theme.breakpoints.down("xs")]: {
            fontSize: "12px",
          },
        },
      },
      "& small": {
        color: "#BFBFBF",
        [theme.breakpoints.down("xs")]: {
          fontSize: "10px",
        },
      },
      "& figure": {
        margin: "0",
        marginRight: "15px",
        height: "60px",
        minWidth: "60px",
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: "#101010",
        display: "flex",
        [theme.breakpoints.down("xs")]: {
          height: "40px",
          width: "40px",
        },
        "& img": {
          width: "auto",
          maxWidth: "100%",
          maxHeight: "60px",
          [theme.breakpoints.down("xs")]: {
            maxHeight: "40px",
          },
        },
      },
    },
  },
  menuShare: {
    position: "absolute",
    right: "16px",
    top: "16px",
    [theme.breakpoints.down("xs")]: {
      right: "0px",
      top: "0px",
    },
  },

  sharemodal: {
    "& button": {
      textAlign: "center",
      "& svg": {
        fontSize: "25px",
      },
    },
  },

  cancelBtn: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

export default function (props) {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openExport, setOpenExport] = useState(false);
  const [fieldValue, setFieldValueDateOfBirth] = useState();
  const [open1, setOpen1] = React.useState(false);
  const [isLoadingFunction, setIsLoadingFunc] = React.useState(false);
  const { data, buyPostList, isAuction, isLoadingContent } = props;
  // console.log("boughtList", data);
  const [price, setPrice] = useState(data?.amount);
  const [walletAddress, setWalletAddress] = useState("");
  const [idData, setIdData] = useState({});

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  console.log("anchorEl---", anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setAllData = (data) => {
    console.log("data----", data);
    setIdData(data)
  }

  const handleClickOpenExport = () => {
    setOpenExport(true);
    setAnchorEl(false);
  };

  const handleCloseExport = () => {
    setOpenExport(false);
  };


  const sortAddress = (add) => {
    if (add) {
      const sortAdd = `${add.slice(0, 6)}...${add.slice(add.length - 4)}`;
      return sortAdd;
    } else {
      return add;
    }
  };

  let isLike = false;
  if (auth.userData?._id && data) {
    const likeUser = data?.likesUsers?.filter(
      (data) => data === auth.userData?._id
    );
    isLike = likeUser?.length > 0;
  }

  const handleClickOpen1 = () => {
    setOpen1(true);
    setAnchorEl(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };



  const addAuctionPost = async () => {
    setIsSubmit(true);

    if (Number(price) > 0 && fieldValue && Number(price) < 2000) {
      setIsLoadingFunc(true);
      setIsLoading(true);
      try {
        const res = await Axios({
          method: "POST",
          url: Apiconfigs.addAuction,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          data: {
            postId: isAuction ? data.postId?._id : data?._id,
            title: isAuction ? data?.title : data?.postTitle,
            mediaUrl: data?.mediaUrl,
            details: data?.details,
            amount: price,
            time: fieldValue,
          },
        });
        if (res.data.responseCode === 200) {
          buyPostList();
          setIsLoadingFunc(false);
          toast.success(res.data.responseMessage);
          setIsLoading(false);
          setMessage("");
          setOpen1(false);
        }
      } catch (error) {
        if (error?.response?.data?.responseCode === 200) {
          setIsLoadingFunc(false);
          buyPostList();
          toast.success(error?.response?.data?.responseMessage);
          setIsLoading(false);
          setOpen1(false);
        } else {
          setIsLoadingFunc(false);
          toast.error(error?.response?.data?.responseMessage);
          setIsLoading(false);
          buyPostList();
          setOpen1(false);
        }
      }
    }
  };
  const likesHandler = async () => {
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.postLikeDislike + data?._id,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        // data: {
        //   postId: data._id,
        // },
      });
      if (res.data.responseCode === 200) {
        buyPostList();
        toast.success(res.data.responseMessage);
      }
    } catch (error) { }
  };

  const isVideo = data.mediaUrl.includes(".mp4");

  const abc = () => {
    addAuctionPost();
    // setOpen1(false);
  };


  const exportToAddress = async () => {
    setIsSubmit(true);

    if (walletAddress !== "") {
      try {
        setIsLoadingFunc(true)
        const res = await Axios({
          method: 'POST',
          url: Apiconfigs.exportOnMarketPlace,
          headers: {
            token: sessionStorage.getItem("token")
          },
          data: {
            postId: idData?._id,
            walletAddress: walletAddress
          }
        })
        if (res.data.responseCode === 200) {
          setIsLoadingFunc(false)
          toast.success(res.data.responseMessage)
          buyPostList();
          setOpenExport(false)

        }

      } catch (error) {
        setIsLoadingFunc(false)

      }

    } else {
      toast.warn("Please Enter Wallet Address")
    }

  }

  return (
    <Paper>
      <Box className={classes.PostBox}>
        <Box className="UserBox">
          <Box style={{ display: "flex", alignItems: "center" }}>
            <figure>
              {isLoadingContent ? (
                <LoadingSkeleton data={8} />
              ) : (
                <img
                  src={
                    data?.buyerId.profilePic
                      ? data?.buyerId.profilePic
                      : "/images/user.png"
                  }
                />
              )}
            </figure>
            <Box>
              <Typography variant="h5">
                {sortAddress(
                  data?.buyerId?.userName
                    ? data?.buyerId?.userName
                    : data?.buyerId?.name
                )}
              </Typography>
              <Box>
                <Link to="#">
                  {" "}
                  <Typography variant="h6">
                    {data?.postTitle.length > 40
                      ? sortAddress(data?.postTitle)
                      : data?.postTitle}
                  </Typography>
                </Link>
                <Typography variant="body2" component="small">
                  {moment(data?.createdAt).local().fromNow()}
                  {/* {data?.createdAt} */}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            {
              !data?.isauction &&
              !data?.postId?.isauction && !data?.isExport && (
                <>
                  <IconButton
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    onClick={(event) => {
                      handleClick(event)
                      setAllData(data)
                    }}


                    className={classes.menuShare}
                  >
                    <FaEllipsisH />
                  </IconButton>
                  <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}

                  >
                    <StyledMenuItem onClick={handleClickOpenExport}>
                      <ListItemText primary="Export" />
                    </StyledMenuItem>
                    <StyledMenuItem>
                      <ListItemText
                        onClick={handleClickOpen1}
                        primary="Resell"
                      />
                    </StyledMenuItem>
                  </StyledMenu>
                </>
              )}

          </Box>
        </Box>
        <Typography variant="body2">{data?.text}</Typography>
        <Box mt={1} mb={1} className="price">
          <Box className="text">
            <Typography variant="body">{sortAddress(data?.details)}</Typography>
          </Box>
          {/* {data?.postType !== "PUBLIC" &&
            !data?.isauction &&
            !data?.postId?.isauction && (
              <Button
                variant="contained"
                color="secondary"
                disabled={isLoadingFunction}
                onClick={handleClickOpen1}
              >
                Resell
              </Button>
            )} */}
        </Box>
        <Box>
          {isVideo ? (
            <Box
              style={{
                width: "100%",
                margin: "16px 0",
                overflow: "hidden",
                borderRadius: "20px",
              }}
            >
              <video
                controls
                style={{
                  width: "100%",
                  height: "255px",
                  maxHeight: "380px",
                  objectFit: "cover",
                }}
              >
                <source src={data.mediaUrl} type="video/mp4" />
              </video>
            </Box>
          ) : (
            <figure className="postImg">
              {isLoadingContent ? (
                <LoadingSkeleton data={8} />
              ) : (
                <img src={data?.mediaUrl} />
              )}
            </figure>
          )}
        </Box>
      </Box>

      {/*  <--- Dialog for Export---> */}
      <Dialog
        onClose={() => {
          if (!isLoadingFunction) {
            handleCloseExport()

          }
        }}
        aria-labelledby="customized-dialog-title"
        open={openExport}
      >
        <Box p={1}>
          <Typography variant="h6">Wallet Address</Typography>
          <Box my={2}>
            <TextField

              variant="outlined"
              value={walletAddress}
              placeholder="Enter wallet address"
              onChange={(e) => setWalletAddress(e.target.value)}
              style={{ width: "20rem" }}
              disabled={isLoadingFunction}

              onKeyPress={(event) => {
                if (event?.key === "-" || event?.key === "+") {
                  event.preventDefault();
                }
              }}
            />
            <FormHelperText error>
              {(isSubmit && (walletAddress === "") && (
                <Box ml={1}>Enter wallet address</Box>
              ))}
            </FormHelperText>
          </Box>
        </Box>

        <Box style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}>
          <Button
            onClick={handleCloseExport}
            color="primary"
            variant="contained"
            size="large"
            disabled={isLoadingFunction}
          >
            Cancel
          </Button>&nbsp;
          <Button

            color="secondary"
            variant="contained"
            size="large"
            disabled={isLoadingFunction}

            onClick={() => exportToAddress()}

          >
            Export  {isLoadingFunction && <ButtonCircularProgress />}
          </Button>
        </Box>

      </Dialog>
      {/*  <--- Dialog for Resell---> */}
      <Dialog
        onClose={handleClose1}
        aria-labelledby="customized-dialog-title"
        open={open1}
      >
        <Box>
          <Typography variant="h6">Price</Typography>
          <TextField
            type="number"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ width: "20rem" }}
            error={
              Boolean(isSubmit && (price === "" || Number(price) <= 0)) ||
              (price !== "" && Number(price) > 2000)
            }
            onKeyPress={(event) => {
              if (event?.key === "-" || event?.key === "+") {
                event.preventDefault();
              }
            }}
          />
          <FormHelperText error>
            {(isSubmit && (price === "" || Number(price) <= 0) && (
              <Box ml={1}>Enter valid price</Box>
            )) ||
              (price !== "" && Number(price) > 2000 && (
                <Box ml={1}>Price should be less than or equal to 2000</Box>
              ))}
          </FormHelperText>
        </Box>
        <Box mt={2}>
          {" "}
          <Typography variant="h6">Expiry Time</Typography>
          <FormControl fullWidth>
            <KeyboardDatePicker
              value={fieldValue}
              // placeholder="DD/MM/YYYY"
              onChange={(date) => {
                setFieldValueDateOfBirth(new Date(date));
              }}
              // maxDate={(date) =>
              //   moment().diff(
              //     moment(new Date(date)),
              //     "years"
              //   ) >= 18
              // }
              // minDate={moment().subtract(6, "months")}
              minDate={moment().add(15, "minutes")}
              format="DD/MM/YYYY"
              inputVariant="outlined"
              disablePast
              margin="dense"
              helperText=""
              name="dob"
              // onChange={_onInputChange}
              error={Boolean(isSubmit && !fieldValue)}
            // helperText={touched.dob && errors.dob}
            />
            <FormHelperText error>
              {isSubmit && !fieldValue && (
                <Box ml={1}>Expiry time is required</Box>
              )}
            </FormHelperText>
          </FormControl>
        </Box>
        <DialogActions align="center">
          <Button
            onClick={handleClose1}
            color="primary"
            variant="contained"
            size="large"
          >
            Cancel
          </Button>
          <Button
            // onClick={() => setOpen(false)}
            color="secondary"
            variant="contained"
            size="large"
            disabled={isLoadingFunction}
            onClick={abc}
          // onClickCapture={() => {
          //   history.push("/");
          // }}
          >
            Create Auction {isLoadingFunction && <ButtonCircularProgress />}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
