import React, { useContext } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  Dialog,
  FormControl,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";

import { AuthContext } from "src/context/Auth";
import { sortAddress } from "src/utils";
import { BiCopy } from "react-icons/bi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    background:
      "radial-gradient(34% 57.15% at 92.64% 16%, rgba(238, 174, 77, 0.3) 0%, rgba(238, 174, 77, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, rgba(27, 26, 31, 0.6)",
    boxShadow: "0px 30px 30px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(42px)",
    borderRadius: "16px",
    padding: "15px",
    "& .imgbox": {
      padding: "15px",
      display: "flex",
      justifyContent: "center",
    },
    "& .imgbox1": {
      padding: "2px",
      display: "flex",
      justifyContent: "center",
    },

    "& .text": {
      padding: "15px",
      display: "flex",
      justifyContent: "center",
    },
  },
  menuShare: {
    position: "absolute",
    right: "16px",
    top: "16px",
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
      padding: "15px",
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

function WalletCard(props) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [openShare, setOpenShare] = React.useState(false);

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  return (
    <>
      <Paper className={classes.root} elevation={2}>
        <Box className='imgbox'>
          <Box>
            <img src='images/wallet.png' />
          </Box>
        </Box>
        <Box className='imgbox1'>
          <Box>
            Total Balance:&nbsp;{" "}
            {auth?.userData?.bnbBalace
              ? parseInt(auth?.userData?.bnbBalace)
              : 0}{" "}
            Share
            {/* {auth?.userData?.bnbBalace}  */}
          </Box>
        </Box>
        <Box className='text'>
          <Typography variant='body2' color='primary.main'>
            {sortAddress(auth?.userData?.bnbAccount?.address)}
            <CopyToClipboard text={auth?.userData?.bnbAccount?.address}>
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
        <Dialog
          open={openShare}
          onClose={handleCloseShare}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          maxWidth='xs'
          fullWidth
        >
          <DialogTitle id='alert-dialog-title' align='center'>
            {"Send Amount"}
          </DialogTitle>
          <DialogContent>
            {/* <IconButton className={classes.cancelBtn} >
              <MdCancel />
            </IconButton> */}
            <Grid container direction={"column"} spacing={2}>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth>
                  <TextField
                    id='outlined-basic'
                    variant='outlined'
                    name='Text Field'
                    placeholder='Enter valid Amount'
                    type='text'
                    fullWidth
                    // multiline
                    // onClick={handleClickOpen}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <FormControl fullWidth>
                  <TextField
                    id='outlined-basic'
                    variant='outlined'
                    name='Text Field'
                    placeholder='Enter valid Amount'
                    type='text'
                    fullWidth
                    // multiline
                    // onClick={handleClickOpen}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Box p={1}>
                  <Typography variant='body2' color='primary.main'>
                    Main Wallet Fees: &nbsp;&nbsp;0.005
                  </Typography>
                  <Typography variant='body2' color='primary.main'>
                    Final Amount: &nbsp;&nbsp;0.005
                  </Typography>
                  <Typography variant='body2' color='primary.main'>
                    Main Withdrawl Amount: &nbsp;&nbsp;0.005
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} lg={12}>
                <Box align='center' p={1}>
                  <Button
                    variant='contained'
                    color='primary'
                    style={{ marginRight: "8px" }}
                    onClick={handleCloseShare}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant='contained'
                    color='secondary'
                    style={{ marginLeft: "8px" }}
                    onClick={handleCloseShare}
                  >
                    Send
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Paper>
    </>
  );
}

export default WalletCard;
