import React, { useState, useEffect, useContext } from "react";
import {
  makeStyles,
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import WalletCard from "src/component/WalletCard";
import { FaCopy } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ApiConfig from "src/ApiConfig/ApiConfig";
import Bundles from "src/views/pages/Profile/Bundles";
import { AuthContext } from "src/context/Auth";
import { BiCopy } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { sortAddress, getWeb3Obj } from "src/utils";
import { BsClockHistory } from "react-icons/bs";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "& .main": {
      padding: "15px",
      backgroundColor: "#101010",
      "& .left": {
        display: "flex",
        alignItems: "center",
      },
    },
    // "& .right": {
    //     width: "fit-content",
    //     padding: "15px 30px",
    //     backgroundColor: "#242526",
    //     borderRadius: "14px",
    // }
  },
  depositbox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .content": {
      display: "flex",
      justifyContent: "space-evenly",
      borderBottom: "0.25px solid #6c6d6e",
      width: "fit-content",
      alignItems: "center",
      "& .tokenaddress": {
        display: "flex",
        alignItems: "center",
        "& h6": {
          paddingRight: "15px",
        },
      },
      "& .selectimg": {
        width: "100px",
        display: "flex",
        alignItems: "center",
      },
      "& .dialogImg": {
        width: "100%",
        maxWidth: "20px",
        height: "100%",
        maxHeight: "20px",
        margin: "16px 5px",
        borderRadius: "50%",
        overflow: "hidden",
        "& img": {
          maxWidth: "20px",
          maxHeight: "20px",
        },
      },
    },
    "& .basetext": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& p": {
        paddingRight: "5px",
      },
    },
  },
  addphotos: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",

    // border: "1px solid #FFF",
    // position: "relative",
    "& .imagebox": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "5px",
      // padding: "15px",
    },
    "& .text": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "& .address": {
        display: "flex",
        alignItems: "center",
      },
      "& p": {
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "200px",
      },
    },
  },
}));

function Wallet() {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [deposit, setDeposit] = useState();
  const [withdraw, setWithdraw] = useState();
  const [userBalance, setuserBalance] = useState();
  const [userData1, setUserData1] = useState();
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [walletAddressWallet, setWalletAddressWallet] = useState("");
  const [textError, setTextZeroError] = useState("");
  const [getTokenDetails, setErrorValidTokenAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [withdrawtokenId, setWithdrawtokenId] = useState();
  const [withdrawtoken, setWithdrawtoken] = useState();

  console.log("withdrawtoken-----", withdrawtoken);

  console.log("withdrawtokenId---", withdrawtokenId);

  const handleUserProfileApi = () => {
    axios
      .get(ApiConfig.getWalletDetails, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.statusCode !== 200) {
        } else {
          setuserBalance(response.data.result);
        }
      })
      .catch((response) => { });
  };
  useEffect(() => {
    handleUserProfileApi();
  }, []);
  useEffect(() => {
    setUserData1(auth.userData);
  }, [auth.userData]);
  const getDepositApi = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.deposit,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        //   toast.succes
        // setDataList(res.data.result);
      }
    } catch (error) {
      toast.success(error?.response?.data?.responseMessage);
    }
  };
  const handleOpenDeposit = () => {
    setDeposit(true);
    // getDepositApi();
  };


  const getTokenAddressDetails = async () => {
    try {
      const web3 = await getWeb3Obj();
      const dataRes = web3.utils.isAddress(walletAddressWallet);
      console.log("datares", dataRes);
      if (dataRes) {
        setErrorValidTokenAddress(true);
      } else {
        setErrorValidTokenAddress(false);
      }
    } catch (error) {
      console.log("error", error);
      setErrorValidTokenAddress(false);
      toast.error("Please enter valid token address");
    }
  };
  useEffect(() => {
    if (walletAddressWallet && walletAddressWallet !== "") {
      getTokenAddressDetails();
    } else {
    }
  }, [walletAddressWallet]);

  const withdrawHandler = async () => {
    if (parseInt(userData1?.bnbBalace) > 0) {
      setIsSubmit(true);
      if (
        walletAddressWallet &&
        Number(withdrawAmount) > Number(withdrawtoken) + 1 &&
        getTokenDetails &&
        remainingBalance > 0
      ) {
        setIsLoading(true);

        try {
          const res = await axios({
            method: "POST",
            url: ApiConfig.withdraw,
            headers: {
              token: window.localStorage.getItem("token"),
            },
            data: {
              walletAddress: walletAddressWallet,
              amount: withdrawAmount,
            },
          });
          if (res.data.responseCode === 200) {
            setWithdraw(false);
            toast.success(res.data.responseMessage);
            auth.handleUserProfileApi();
          }
          setIsLoading(false);
        } catch (error) {
          toast.error(error?.response?.data?.responseMessage);
          setIsLoading(false);
          //   setAnchorEl(false);
        }
      }
    } else {
      toast.info("Insufficient Funds");
    }
  };


  const feelistHandler = async () => {
    // setIsLoading(true);
    try {
      const response = await axios({
        method: "GET",
        url: ApiConfig.feeList,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (response.data.responseCode === 200) {
        setWithdrawtokenId(response.data.result.filter((data) => data?.type === "WITHDRAW_TOKEN"));

        // setIsLoading(false);
      }
    } catch (error) {
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    feelistHandler();

  }, []);


  useEffect(() => {



    if (withdrawtokenId) {
      setWithdrawtoken(
        withdrawtokenId[0]?.amount ? withdrawtokenId[0]?.amount : ""
      );
    }

  }, [withdrawtokenId]);

  const remainingBalance = parseInt(userData1?.bnbBalace) - withdrawAmount;
  return (
    <>
      <Box mt={5} mb={5}>
        <Paper className={classes.root}>
          <Box className="main">
            <Box mt={2} mb={2}>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box className="left">
                    <Typography variant="h5">
                      Your Wallet Balance :{" "}
                    </Typography>{" "}
                    &nbsp;&nbsp;&nbsp;
                    <Typography variant="h5">
                      {userData1?.bnbBalace
                        ? parseInt(userData1?.bnbBalace)
                        : 0}{" "}
                      Share
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} align="right">
                  <Box className="right">
                    <Box className="buttonbox">
                      <Button
                        variant="outlined"
                        color="secandary"
                        // size="large"
                        onClick={() => history.push("/transaction-history")}
                        style={{ marginRight: "5px" }}
                      >
                        <BsClockHistory />
                        &nbsp;Transaction History
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        // size="large"
                        onClick={handleOpenDeposit}
                        style={{ marginRight: "5px" }}
                      >
                        Deposit
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        // size="large"
                        onClick={() => setWithdraw(true)}
                        style={{ marginLeft: "5px" }}
                      >
                        Withdraw
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <WalletCard type="card" />
              </Grid>
            </Grid>
            <Box mt={2} mb={2}>
              <Bundles />
            </Box>
          </Box>
          <Dialog
            open={deposit}
            onClose={() => {
              setDeposit(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="xs"
            fullWidth
          >
            <DialogTitle id="alert-dialog-title" align="center">
              {/* {"Deposit"} */}
              <Typography variant="h6" style={{ paddingTop: "8px" }}>
                Deposit
              </Typography>
            </DialogTitle>
            <DialogContent>
              <Box>
                <Box className={classes.addphotos}>
                  <Box className="imagebox">
                    <img src="images/wallet.png" alt="wallet Image" />
                  </Box>
                  <Box className="text">
                    <Typography variant="body2">My Wallet Address</Typography>
                    &nbsp;
                    {userData1?.bnbAccount?.address && (
                      <img
                        width="56%"
                        src={`https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${userData1?.bnbAccount?.address}&choe=UTF-8`}
                        alt=""
                      />
                    )}
                    &nbsp;
                    <Box className="address">
                      <Typography variant="body2">
                        {sortAddress(userData1?.bnbAccount?.address)}
                        {/* {userData1?.bnbAccount?.address} */}
                        <CopyToClipboard text={userData1?.bnbAccount?.address}>
                          <BiCopy
                            style={{
                              color: "#fff",
                              fontSize: " 14px",
                              cursor: "pointer",
                              marginLeft: "5px",
                            }}
                            onClick={() => toast.info("Copied successfully")}
                          />
                        </CopyToClipboard>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box mb={2} mt={1} align="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setDeposit(false)}
                  style={{ marginLeft: "10px" }}
                >
                  Close
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
          {/* withdraw dialog box */}
          <Dialog
            open={withdraw}
            onClose={() => {
              setWithdraw(false);
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle id="alert-dialog-title" align="center">
              {"Withdraw"}
            </DialogTitle>
            <DialogContent align="center">
              <Box className={classes.withdraw}>
                <Grid container direction={"column"} spacing={3}>
                  <Grid item xs={12}>
                    <Box>
                      <Typography variant="body2">
                        Choose amount to withdraw
                      </Typography>
                    </Box>
                  </Grid>
                  {/* {withdrawAmount && withdrawAmount > 0 && ( */}
                  <Box align="right" mr={2}>
                    Remaining Balance &nbsp;{remainingBalance}
                  </Box>
                  {/* )} */}
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      name="Text Field"
                      disabled={isLoading}
                      placeholder={
                        userData1?.bnbBalace
                          ? parseInt(userData1?.bnbBalace)
                          : 0
                      }
                      type="number"
                      fullWidth
                      value={withdrawAmount}
                      error={Boolean(
                        (isSubmit && withdrawAmount === "") ||
                        (withdrawAmount !== "" &&
                          Number(withdrawAmount) === 0)
                      )}
                      onChange={(e) => {
                        if (userData1?.bnbBalace > 0) {
                          if (remainingBalance > 0) {
                            setWithdrawAmount(e.target.value);
                          } else {
                            setWithdrawAmount(e.target.value);
                            const timer = setTimeout(() => {
                              setTextZeroError("");
                            }, 5000);
                            setTextZeroError(
                              "Your remaining balance is less than 0"
                            );
                          }
                        } else {
                          const timer = setTimeout(() => {
                            setTextZeroError("");
                          }, 5000);
                          setTextZeroError("Your wallet balance is 0");
                        }
                      }}
                      onKeyPress={(event) => {
                        if (event?.key === "-" || event?.key === "+") {
                          event.preventDefault();
                        }
                      }}
                    />
                    {textError && (
                      <FormHelperText error>
                        <Box ml={1}>{textError}</Box>
                      </FormHelperText>
                    )}

                    <FormHelperText error>
                      {(isSubmit && withdrawAmount === "" && (
                        <Box ml={1}>Enter a valid withdraw amount</Box>
                      )) ||
                        (withdrawAmount !== "" &&
                          Number(withdrawAmount) <= Number(withdrawtoken) + 1 && (
                            <Box ml={1}>Withdraw amount should be greator than {Number(withdrawtoken) + 1}</Box>
                          ))
                        //   ||
                        // (withdrawAmount !== "" &&
                        //   Number(withdrawAmount)< && (
                        //     <Box ml={1}>Enter a valid withdraw amount</Box>
                        //   ))
                      }
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      name="Text Field"
                      disabled={isLoading}
                      placeholder="Wallet Address"
                      type="text"
                      value={walletAddressWallet}
                      onChange={(e) => setWalletAddressWallet(e.target.value)}
                      fullWidth
                      error={
                        Boolean(isSubmit && !walletAddressWallet) ||
                        (walletAddressWallet !== "" && !getTokenDetails)
                      }

                    // onClick={handleClickOpen}
                    />
                    <FormHelperText error>
                      {(isSubmit && !walletAddressWallet && (
                        <Box ml={1}>Wallet address is required</Box>
                      )) ||
                        (walletAddressWallet !== "" && !getTokenDetails && (
                          <Box ml={1}>Please enter valid address</Box>
                        ))}
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12}>
                    <Box align="center" mt={2} mb={2}>
                      <Button
                        disabled={!withdrawAmount || isLoading}
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={withdrawHandler}
                      >
                        Withdraw {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
                {/* <Box className="basetext">
                <Typography variant="body2" color="secondary.main">
                  Fees
                </Typography>
                <Link
                  onClick={() => {
                    setDeposit(false);
                  }}
                >
                  Apply
                </Link>
              </Box> */}
              </Box>
            </DialogContent>
          </Dialog>
        </Paper>
      </Box>
    </>
  );
}
export default Wallet;
