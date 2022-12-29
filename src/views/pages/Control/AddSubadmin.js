import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  FormHelperText,
  FormControl,
  IconButton,
  CircularProgress,
  OutlinedInput,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/styles";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";
import LockIcon from "@material-ui/icons/Lock";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import { FaTransgender } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  adminBox: {
    backgroundColor: "#242526",
    padding: "20px",
    borderRadius: "14px",
  },
  adminBox1: {
    backgroundColor: "#000",
    padding: "20px",
    borderRadius: "14px",
  },
  root: {
    padding: "30px 0",
    [theme.breakpoints.down("sm")]: {
      padding: "5px 0",
    },
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& h3": {
      color: "#e6e5e8",
    },
  },
  gridSection: {
    "& label": {
      color: theme.palette.secondary.white,
      fontSize: "14px",
      margin: "6px 0",
      "& span": {
        display: "inline-block",
        marginTop: "-9px",
      },
      "& .MuiFormGroup-root": {
        flexDirection: "revert",
        marginLeft: 13,
        "& .MuiSvgIcon-root": {
          width: "13px",
          height: "13px",
        },
      },
    },
    "& .MuiInputBase-input": {
      color: theme.palette.secondary.white,
    },
  },
  btnbox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  colorbox: {
    // marginTop: "16px",
    width: "100%",
    height: "auto",
    background: "rgba(59, 13, 96, 0.4)",
    backdropFilter: "blur(44px)",
    borderRadius: "15px",
    padding: "20px",
  },
  main: {
    backgroundColor: "#242526",
    padding: "15px",
    borderRadius: "10px",
    "& .content": {
      backgroundColor: "#101010",
      // width: "100%",
      padding: "15px",
      "& .heading": {
        paddingBottom: "15px",
      },
    },
  },
  inputBox: {
    display: "block",
    border: "0.5px solid #8080809e",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "10px",
    background: "#242526",
    "&:hover": {
      border: "1px solid #ffff",
    },
  },
  icons: {
    "& p": {
      marginLeft: "5px",
      color: "white",
    },
  },
  radio: {
    border: "0.25px solid #656565",
    borderRadius: "14px",
    background: "#242526",
    height: "45px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      height: "35px",
    },
    "&:hover": {
      borderColor: "#fff",
    },
    "& .innerRadio": {
      display: "flex",
      alignItems: "center",
    },
  },
  radioButton: {
    marginTop: "0px !important",
  },
  phoneinput: {
    border: "0.5px solid #575758",
    borderRadius: "14px",
    "&:hover": {
      borderColor: " #ffff",
      borderRadius: "14px",
    },
  },
}));

export default function Controls() {
  const classes = useStyles();
  const [collectionId, setCollection] = useState();
  const history = useHistory();
  const [auctionId, setAuction] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [addAdmin, setAddAdmin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [bannerImage, setBannerImage] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [fieldvalue1, setFieldValue] = useState("");
  console.log("fieldvalue1",fieldvalue1)
  const [state, setState] = React.useState({
    collectionManagement: false,
    postManagement: false,
    notificationManagment: false,
    auctionManagment: false,
    feeManagement: true,
    userManagement: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
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
        setCollection(
          response.data.result.filter((data) => data?.type === "COLLECTION")
        );
        setAuction(
          response.data.result.filter((data) => data?.type === "AUCTION")
        );
        // setIsLoading(false);
      }
    } catch (error) {
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    feelistHandler();
  }, []);
  const [fieldValue, setFieldValueDateOfBirth] = useState();

  const [formValue, setFormValue] = useState({
    email: "",
    userName: "",
    password: "",
    gender: "",
    dob: new Date(),
    name: "",
    mobileNumber: "",
  });
  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };

  const getBase64 = (file, cb) => {
    // setprofileImageBlob(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {};
  };
  const myAge = (date) => {
    const age = moment().diff(moment(date), "years") >= 18;
    return age;
  };
  const addSubAdmin = async (values) => {
    setIsSubmit(true);
    if (
      formValue.userName !== "" &&
      formValue.password !== "" &&
      validPassword(formValue.password) &&
      formValue.gender !== "" &&
      formValue?.name !== "" &&
      fieldvalue1 !== "" &&
      bannerImage !== "" &&
      myAge(fieldValue)
    ) {
      setIsLoading(true);

      try {
        const response = await axios({
          method: "POST",
          url: ApiConfig.addSubamin,
          headers: {
            token: window.localStorage.getItem("token"),
          },
          data: {
            userName: formValue?.userName,
            email: formValue?.email,
            password: formValue?.password,
            mobileNumber: fieldvalue1,
            dob: fieldValue,
            gender: formValue?.gender,
            name: formValue?.name,
            profilePic: bannerImage,
            countryCode: `+${countryCode}`,
            permissions: {
              collectionManagement: state.collectionManagement,
              postManagement: state.postManagement,
              notificationManagement: state.notificationManagment,
              auctionManagement: state.auctionManagment,
              feeManagement: state.feeManagement,
              userManagement: state.userManagement,
            },
          },
        });
        if (response.data.responseCode === 200) {
          setAddAdmin(response.data.result);
          history.push("/control");
          setIsLoading(false);
          toast.success(response.data.responseMessage);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.responseMessage);
      }
    }
  };

  const validPassword = (value) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(value);
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.adminBox} mt={4}>
          <Box className={classes.adminBox1}>
            <Grid container spacing={2}>
              <Grid item lg={12} sm={12} md={12} xs={12} align="left">
                <Box className={classes.heading}>
                  <Typography variant="h3">Add Sub Admin</Typography>
                </Box>
              </Grid>
              <Grid item lg={6} sm={6} xs={12}>
                <Box mt={2}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body1"
                      style={{ paddingBottom: "8px", color: "#fff" }}
                      // color="primary.main"
                    >
                      User Name
                    </Typography>
                    <TextField
                      type="text"
                      variant="outlined"
                      size="small"
                      name="userName"
                      placeholder="Enter User Name"
                      // value={}
                      onChange={_onInputChange}
                      error={Boolean(isSubmit && formValue.userName === "")}
                    />
                    <FormHelperText error>
                      {isSubmit && formValue.userName === "" && (
                        <Box ml={1}>User name is a required </Box>
                      )}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item lg={6} sm={6} xs={12}>
                <Box mt={2}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body1"
                      style={{ paddingBottom: "8px", color: "#fff" }}
                      // color="primary.main"
                    >
                      Name
                    </Typography>
                    <TextField
                      type="text"
                      variant="outlined"
                      size="small"
                      name="name"
                      onChange={_onInputChange}
                      error={Boolean(isSubmit && formValue.name === "")}
                      placeholder="Enter Your Name"
                    />
                    <FormHelperText error>
                      {isSubmit && formValue.name === "" && (
                        <Box ml={1}>Name is a required </Box>
                      )}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item lg={6} sm={6} xs={12}>
                <Box mt={2}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body1"
                      style={{ paddingBottom: "8px", color: "#fff" }}
                      // color="primary.main"
                    >
                      Password
                    </Typography>
                    <TextField
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      size="small"
                      name="password"
                      placeholder="Create password!"
                      onChange={_onInputChange}
                      error={Boolean(
                        (isSubmit && formValue.password === "") ||
                          (isSubmit && !validPassword(formValue.password))
                      )}
                      InputProps={{
                        startAdornment: (
                          <LockIcon position="start">Kg</LockIcon>
                        ),
                        endAdornment: (
                          <IconButton
                            position="end"
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        ),
                      }}
                    />
                    <FormHelperText error>
                      {(isSubmit && formValue.password === "" && (
                        <Box ml={1}>Password is a required </Box>
                      )) ||
                        (isSubmit && !validPassword(formValue.password) && (
                          <Box ml={1}>
                            Must contain 8 characters, one uppercase, one
                            lowercase, one number and one special character
                          </Box>
                        ))}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item lg={6} sm={6} xs={12}>
                <Box mt={2}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body1"
                      style={{ paddingBottom: "8px", color: "#fff" }}
                      // color="primary.main"
                    >
                      {" "}
                      Email
                    </Typography>
                    <TextField
                      type="text"
                      variant="outlined"
                      size="small"
                      onChange={_onInputChange}
                      error={Boolean(isSubmit && formValue.email === "")}
                      name="email"
                      placeholder="Enter Email"
                    />
                    <FormHelperText error>
                      {isSubmit && formValue.email === "" && (
                        <Box ml={1}>Email is a required </Box>
                      )}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item lg={6} sm={6} xs={12}>
                <Box mt={2}>
                  <FormControl fullWidth>
                    <Typography
                      variant="body1"
                      style={{ paddingBottom: "8px", color: "#fff" }}
                      // color="primary.main"
                    >
                      {" "}
                      Mobile No.
                    </Typography>
                    <PhoneInput
                      country={"in"}
                      //   disabled={isEdit}
                      name="mobileNumber"
                      //  onChange={_onInputChange}
                      error={Boolean(fieldvalue1 === undefined )}
                      placeholder="Enter Mobile No."
                      onChange={(phone, e) => {
                        setCountryCode(e.dialCode);
                        setFieldValue(phone);
                      }}
                      className={classes.phoneinput}
                      inputStyle={{
                        borderRadius: "14px",
                        width: "100%",
                       height:'2.1876em',
                        backgroundColor: "rgb(36 37 38)",
                     

                      }}
                    />
                    <FormHelperText error>
                      {isSubmit && fieldvalue1 === undefined || isSubmit && fieldvalue1 === ""&& (
                        <Box ml={1}>Mobile number is a required </Box>
                      )}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box mt={2}>
                  <Typography
                    variant="body1"
                    name="gender"
                    onChange={_onInputChange}
                    style={{ paddingBottom: "8px", color: "#fff" }}
                    // color="primary.main"
                  >
                    Gender
                  </Typography>
                  <FormControl fullWidth>
                    <Box className={classes.radio}>
                      <FaTransgender
                        style={{ fontSize: "25px", margin: "13px" }}
                      />{" "}
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        <RadioGroup
                          className={classes.radioButton}
                          aria-label="gender"
                          name="gender"
                          // value={value}
                          onChange={_onInputChange}
                          error={Boolean(isSubmit && formValue.gender === "")}
                          display="flex"
                          marginTop="0px !important"
                        >
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="Male"
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            labelPlacement="end"
                            label="Female"
                            style={{ fontSize: ".5rem" }}
                          />
                        </RadioGroup>
                      </Box>
                    </Box>
                    <FormHelperText error>
                      {isSubmit && formValue.gender === "" && (
                        <Box ml={1}>Gender is required </Box>
                      )}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Grid>

              <Grid item lg={6} sm={6} md={6} xs={12}>
                <Box mt={2}>
                  <Typography
                    variant="body1"
                    style={{ color: "#fff" }}
                    // color="primary.main"
                  >
                    {" "}
                    Profile Image
                  </Typography>
                  <FormControl fullWidth>
                    <input
                      accept="image/*"
                      id="raised-button-file-img"
                      // className="choosefile"
                      onChange={(e, files) => {
                        // HandleSubmit1(e.target.files[0]);
                        // handleFiles(e);
                        // setprofileImageBlob(e.target.files[0]);
                        getBase64(e.target.files[0], (result) => {
                          setBannerImage(result);
                        });
                      }}
                      multiple=""
                      type="file"
                      name="profilePic"
                      variant="outlined"
                      className={classes.inputBox}
                    />
                    <label for="raised-button-file-img">
                      <div className="MuiBox-root jss74"></div>
                    </label>
                    
                  </FormControl>
                  <FormHelperText error>
                      {isSubmit && bannerImage==="" && (
                        <Box ml={1}>Profile image is required</Box>
                      )}
                    </FormHelperText>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Box mt={2}>
                  <Typography
                    variant="body1"
                    style={{ color: "#fff", marginBottom: "8px" }}
                    // color="primary.main"
                  >
                    Date of Birth
                  </Typography>
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
                      maxDate={moment().subtract(18, "year")}
                      format="DD/MM/YYYY"
                      inputVariant="outlined"
                      disableFuture
                      margin="dense"
                      helperText=""
                      name="dob"
                      // onChange={_onInputChange}
                      error={Boolean(isSubmit && !myAge(fieldValue))}
                      // helperText={touched.dob && errors.dob}
                    />
                    <FormHelperText error>
                      {isSubmit && !myAge(fieldValue) && (
                        <Box ml={1}>You must be 18 years old or above</Box>
                      )}
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>

            <Box align="right" mt={2}>
              <Button
                variant="contained"
                onClick={addSubAdmin}
                color="secondary"
                size="medium"
              >
                Submit {isLoading && <CircularProgress />}
              </Button>
            </Box>
            <Box mt={3} className={classes.icons}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={8} sm={5}>
                  <Typography variant="body2">Collection Management</Typography>
                </Grid>
                <Grid item xs={4} sm={7}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.collectionManagement}
                        onChange={handleChange}
                        name="collectionManagement"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={8} sm={5}>
                  <Typography variant="body2">Post Management</Typography>
                </Grid>
                <Grid item xs={4} sm={7}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.postManagement}
                        onChange={handleChange}
                        name="postManagement"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={8} sm={5}>
                  <Typography variant="body2">
                    Notification Management
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={7}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.notificationManagment}
                        onChange={handleChange}
                        name="notificationManagment"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={8} sm={5}>
                  <Typography variant="body2">Auction Management</Typography>
                </Grid>
                <Grid item xs={4} sm={7}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.auctionManagment}
                        onChange={handleChange}
                        name="auctionManagment"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={8} sm={5}>
                  <Typography variant="body2">Fee Management</Typography>
                </Grid>
                <Grid item xs={4} sm={7}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.feeManagement}
                        onChange={handleChange}
                        name="feeManagement"
                      />
                    }
                  />
                </Grid>
                <Grid item xs={8} sm={5}>
                  <Typography variant="body2">User Management</Typography>
                </Grid>
                <Grid item xs={4} sm={7}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={state.userManagement}
                        onChange={handleChange}
                        name="userManagement"
                      />
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
