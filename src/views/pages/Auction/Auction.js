import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import Page from "src/component/Page";
import AuctionCard from "src/component/AuctionCard";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataLoading from "src/component/DataLoading";
import NoDataFound from "src/component/NoDataFound";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "& .heading": {
      marginBottom: "20px",
    },
  },
}));

function Auction(props) {
  const { myAuctionList, calBackFunc } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [auctionList, setAuctionList] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const allAuctionDeleteHandler = async () => {
    try {
      const res = await axios.get(Apiconfigs.expiredAuction, {});
      if (res.data.responseCode === 200) {
        // setAuctionList(res.data.result.docs);
        // setNoOfPages(res.data.result.pages);
      }
    } catch (error) { }
  };
  const allAuctionListHandler = async () => {
    try {
      const res = await axios.get(Apiconfigs.listAuction, {
        params: {
          limit: 10,
          page: page,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        setAuctionList(res.data.result.docs);
        setNoOfPages(res.data.result.pages);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    allAuctionDeleteHandler();
    allAuctionListHandler();
  }, [page]);


  const pageCheck = page === 1 ? 10 : 0;

  return (
    <>
      <Page title='Auction'>
        <Paper className={classes.root} elevation={2}>
          <Box className='heading'>
            {/* <Typography variant='h3'>Auctions</Typography> */}
          </Box>
          <Box className='heading'>
            {/* <Button
              variant='contained'
              color='secondary'
              size='large'
              onClick={() => setOpen(true)}
            >
              Make a New Auction
            </Button> */}
          </Box>
          {isLoading ? (
            <DataLoading />
          ) : (
            <Grid container spacing={2}>
              {myAuctionList && myAuctionList ? (
                <>
                  {myAuctionList && myAuctionList.length === 0 && (
                    <NoDataFound />
                  )}
                  {myAuctionList &&
                    myAuctionList.map((data, i) => {
                      return (
                        <Grid item lg={3} md={4} sm={6} xs={6}>
                          <AuctionCard
                            callbackFun={allAuctionListHandler}
                            data={data}
                            type='card'
                            index={i}
                            key={i}
                          />
                        </Grid>
                      );
                    })}
                </>
              ) : (
                <>
                  {auctionList && auctionList.length === 0 && <NoDataFound />}
                  {auctionList &&
                    auctionList.map((data, i) => {
                      return (
                        <Grid item lg={3} md={4} sm={6} xs={6}>
                          <AuctionCard
                            callbackFun={calBackFunc || allAuctionListHandler}
                            data={data}
                            type='card'
                            key={i}
                          />
                        </Grid>
                      );
                    })}
                </>
              )}
            </Grid>
          )}
        </Paper>
        {auctionList && auctionList.length >= pageCheck && (
          <Box mt={2} display='flex' justifyContent='center'>
            <Pagination
              count={noOfPages}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          </Box>
        )}
        {open && (
          <MakeAuctionModal
            callbackFun={allAuctionListHandler}
            open={open}
            setOpen={(status) => setOpen(status)}
          />
        )}
      </Page>
    </>
  );
}

export default Auction;

export function MakeAuctionModal({
  open,
  setOpen,
  callbackFun,
  isEdit,
  auctionNFTDetails,
}) {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  console.log("title", title, title.length);
  const [uploadFile, setUploadFile] = useState("");
  const [uploadFileBlob, setUploadFileBlob] = useState("");
  const [uploadFileType, setUploadFileType] = useState("");
  const [description, setDescription] = useState("");
  const [expiryDate, setExpiryDate] = useState();
  console.log(
    "expiryDate",
    moment(expiryDate).local().format("DD:MM:YYYY hh:mm")
  );
  const [startingBid, setStartingBid] = useState("");
  console.log("Number(startingBid", Number(startingBid), startingBid);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async () => {
    setIsSubmit(true);
    if (
      title != "" &&
      uploadFile != "" &&
      description != "" &&
      description.length < 200 &&
      title.length < 60 &&
      startingBid > 0 &&
      Number(startingBid) < 2000
    ) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", uploadFile);
        const res = await axios({
          method: "POST",
          url: Apiconfigs.updateAuction,
          data: formData,
        });
        if (res.data.responseCode === 200) {
          const uploadFileURL = res.data.result.secure_url;
          const createRes = await axios.post(
            Apiconfigs.createAuctionNft,
            {
              title: title,
              mediaUrl: uploadFileURL,
              details: description,
              time: expiryDate,
              price: startingBid,
            },
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
          if (createRes.data.responseCode === 200) {
            if (callbackFun) {
              callbackFun();
            }
            toast.success(createRes.data.responseMessage);
            setOpen(false);
          } else {
            toast.error(createRes.data.responseMessage);
          }
          setIsLoading(false);
        } else {
          toast.error(res.data.responseMessage);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error(error.message);
        }
        setIsLoading(false);
      }
    }
  };

  const updateAuctionNFTHandler = async () => {
    setIsSubmit(true);
    if (
      title != "" &&
      description != "" &&
      startingBid != "" &&
      Number(startingBid) > 0 &&
      Number(startingBid) < 2000
    ) {
      setIsLoading(true);
      try {
        let res = "";
        if (uploadFile) {
          const formData = new FormData();
          formData.append("file", uploadFile);
          res = await axios({
            method: "POST",
            url: Apiconfigs.uploadFile,
            data: formData,
          });
        }
        if (res?.data?.responseCode === 200 || !uploadFile) {
          let body = {
            auctionId: auctionNFTDetails?._id,
            title: title,
            details: description,
            time: expiryDate,
            amount: startingBid,
          };
          if (uploadFile && res?.data?.result?.secure_ur) {
            const uploadFileURL = res.data.result.secure_url;
            body.mediaUrl = uploadFileURL;
          }
          const createRes = await axios.put(Apiconfigs.updateAuction, body, {
            headers: {
              token: localStorage.getItem("token"),
            },
          });
          if (createRes.data.responseCode === 200) {
            if (callbackFun) {
              callbackFun();
            }
            toast.success(createRes.data.responseMessage);
            setOpen(false);
          } else {
            toast.error(createRes.data.responseMessage);
          }
          setIsLoading(false);
        } else {
          toast.error(res.data.responseMessage);
          setIsLoading(false);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error(error.message);
        }
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (auctionNFTDetails && isEdit) {
      setTitle(auctionNFTDetails?.title);
      setUploadFileBlob(auctionNFTDetails?.mediaUrl);
      setDescription(auctionNFTDetails?.details);
      setExpiryDate(auctionNFTDetails?.time);
      setStartingBid(auctionNFTDetails?.amount);
      const fileExtention = auctionNFTDetails.mediaUrl.split(".").pop();

      const fileType =
        fileExtention == "mp4" || fileExtention == "webp"
          ? "video"
          : fileExtention == "mp3"
            ? "audio"
            : "image";
      setUploadFileType(fileType);
      setUploadFileType(fileType);
    }
  }, [isEdit, auctionNFTDetails]);

  return (
    <Dialog
      open={open}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      maxWidth='sm'
      fullWidth
    >
      <DialogTitle id='alert-dialog-title' align='center'>
        {isEdit ? "Edit Auction" : "Make a New Auction"}
      </DialogTitle>
      <DialogContent>
        <Box className={classes.mainmodalBox}>
          <Grid container direction={"column"} spacing={3}>
            <Grid item xs={12}>
              <Box mt={2}>
                <Typography
                  variant='h6'
                  color='primary.main'
                  style={{ paddingBottom: "8px" }}
                >
                  Title
                </Typography>
                <TextField
                  id='outlined-basic'
                  variant='outlined'
                  name='Text Field'
                  placeholder='Write here...'
                  type='text'
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  inputProps={{
                    maxLength: 61,
                    readOnly: isLoading,
                  }}
                  error={
                    (isSubmit && title == "") ||
                    (title !== "" && title.length > 60)
                  }
                  helperText={
                    (isSubmit && title == "" && "Please enter title") ||
                    (title !== "" &&
                      title.length > 60 &&
                      " Title should be less than or equal to 60 characters")
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mt={2}>
                {/* <Typography
                  variant="h6"
                  color="primary.main"
                  style={{ paddingBottom: "8px" }}
                >
                  Upload a photo or Video
                </Typography>
                <input
                  readOnly={isLoading}
                  type="file"
                  accept="image/*,.mp4,.mp3"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setUploadFile(e.target.files[0]);
                      setUploadFileBlob(URL.createObjectURL(e.target.files[0]));
                      const fileExtention = e.target.files[0].name
                        .split(".")
                        .pop();

                      const fileType =
                        fileExtention == "mp4" || fileExtention == "webp"
                          ? "video"
                          : fileExtention == "mp3"
                          ? "audio"
                          : "image";
                      setUploadFileType(fileType);
                    }
                  }}
                />
                <Box>
                  <Typography variant="h5">Add photos/videos</Typography>
                </Box> */}
                {uploadFileBlob && uploadFileType && (
                  <Box>
                    {(uploadFileType == "video" ||
                      uploadFileType == "audio") && (
                        <video
                          // width='100%'
                          loop={false}
                          autoPlay={false}
                          muted={true}
                          controls
                          style={
                            uploadFileType === "audio"
                              ? { height: 75, width: "100%" }
                              : { height: 250, width: "100%" }
                          }
                        >
                          <source src={uploadFileBlob} type='video/mp4' />
                        </video>
                      )}
                    {uploadFileType == "image" && (
                      <img
                        src={uploadFileBlob}
                        style={{ height: 250 }}
                        alt=''
                      />
                    )}
                  </Box>
                )}

                {isSubmit && uploadFileBlob == "" && (
                  <FormHelperText error>Please select file</FormHelperText>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mt={2}>
                <Typography
                  variant='h6'
                  color='primary.main'
                  style={{ paddingBottom: "8px" }}
                >
                  Description
                </Typography>
                <TextField
                  id='outlined-basic'
                  variant='outlined'
                  name='Text Field'
                  placeholder='Write here...'
                  type='text'
                  fullWidth
                  multiline
                  maxRows={5}
                  // rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  inputProps={{
                    maxLength: 201,
                    readOnly: isLoading,
                  }}
                  error={
                    (isSubmit && description == "") ||
                    (description !== "" && description.length > 200)
                  }
                  helperText={
                    (isSubmit &&
                      description == "" &&
                      "Please enter description") ||
                    (description !== "" &&
                      description.length > 200 &&
                      "Description should be less than or equal to 200 characters")
                  }
                />
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={6} md={6}>
              <Box mt={3}>
                <FormControl fullWidth>
                  <Typography
                    variant='h6'
                    color='primary.main'
                    style={{ paddingBottom: "8px" }}
                  >
                    Expiry Date
                  </Typography>
                  <KeyboardDatePicker
                    format='DD/MM/YYYY'
                    inputVariant='outlined'
                    disablePast
                    margin='dense'
                    minDate={moment().add(10, "hours")}
                    onChange={(date) => setExpiryDate(date)}
                    value={expiryDate}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box mt={3}>
                <FormControl fullWidth>
                  <Typography
                    variant='h6'
                    color='primary.main'
                    style={{ paddingBottom: "8px" }}
                  >
                    Starting Bid
                  </Typography>
                  <TextField
                    id='outlined-basic'
                    variant='outlined'
                    name='Text Field'
                    type='number'
                    fullWidth
                    value={startingBid}
                    onKeyPress={(event) => {
                      if (event?.key === "-" || event?.key === "+") {
                        event.preventDefault();
                      }
                    }}
                    onChange={(e) => setStartingBid(e.target.value)}
                    inputProps={{
                      readOnly: isLoading,
                    }}
                    error={
                      (isSubmit && startingBid === "") ||
                      (startingBid !== "" && Number(startingBid) === 0) ||
                      (startingBid !== "" && Number(startingBid) > 2000)
                    }
                    helperText={
                      (isSubmit &&
                        startingBid === "" &&
                        "Please enter starting bid price is required") ||
                      (startingBid !== "" &&
                        Number(startingBid) === 0 &&
                        "Please enter valid starting bid price") ||
                      (startingBid !== "" &&
                        Number(startingBid) > 2000 &&
                        "Starting bid price should be less than or equal to 2000")
                    }
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Box mt={4} mb={3} align='center'>
            <Button
              variant='contained'
              size='large'
              color='primary'
              onClick={() => setOpen(false)}
              className={classes.btn1}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              size='large'
              color='secondary'
              onClick={() =>
                isEdit ? updateAuctionNFTHandler() : submitHandler()
              }
              style={{ marginLeft: "8px" }}
              disabled={isLoading}
            >
              {isEdit ? "Update" : "Submit"}{" "}
              {isLoading && <ButtonCircularProgress />}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
