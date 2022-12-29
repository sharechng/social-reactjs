import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  makeStyles,
  Typography,
  Button,
  Grid,
  TextField,
  Link,
  Paper,
  IconButton,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  CircularProgress,
} from "@material-ui/core";

import {
  FaApple,
  FaFacebook,
  FaFacebookF,
  FaGoogle,
  FaTwitter,
} from "react-icons/fa";
import Page from "src/component/Page";
import axios from "axios";
import AppleIcon from "@material-ui/icons/Apple";
import { Formik, Form } from "formik";
import PersonIcon from "@material-ui/icons/Person";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockIcon from "@material-ui/icons/Lock";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { useHistory, Link as RouterComponent, useLocation } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import * as yup from "yup";
import moment from "moment";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DialogActions from "@material-ui/core/DialogActions";
import { ErrorMessage, useFormik } from "formik";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import DialogTitle from "@material-ui/core/DialogTitle";
import ApiConfig from "src/ApiConfig/ApiConfig";
// import { BsGenderMale } from "react-icons/bs";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import AppleLogin from "react-apple-login";
import TwitterLogin from "react-twitter-login";
import { FaTransgender } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { calculateTimeLeft, tokenName } from "src/utils";
import { SiVerizon } from "react-icons/si";

const useStyles = makeStyles((theme) => ({
  radio: {
    border: "1px solid rgb(83 84 85)",
    borderRadius: "15px",
    height: "47px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-evenly",
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
  loginBox: {
    padding: "40px 30px",
  },
  donation: {
    "& span": {
      fontSize: "12px",
      padding: "2px 5px",
      // border: "1px solid #e31a89",
      cursor: "pointer",
      "&.active": {
        backgroundColor: "#e31a89",
        borderRadius: "7px",
      },
    },
  },
  or: {
    width: "100%",
    borderTop: "1px solid #555555",
    marginTop: "20px",
    textAlign: "center",
    position: "relative",
    marginBottom: "20px",
    "& p": {
      position: "absolute",
      top: "-10px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#242526",
      padding: "0 10px",
    },
  },
  twitterButton: {
    width: "100%",
    display: "flex !important",
    fontSize: "10px !important",
    alignItems: "center !important",
    justifyContent: "center !important",
    "& svg": {
      width: "100%",
      display: "flex !important",
      fontSize: "10px !important",
      alignItems: "center !important",
      justifyContent: "center !important",
    },
    "& rect": {
      width: "100%",
      display: "flex !important",
      fontSize: "10px !important",
      alignItems: "center !important",
      justifyContent: "center !important",
    },
  },
  iconSvg: {
    "& svg": {
      fontSize: "30px",
    },
  },
  btnFacebook: {
    marginRight: "5px",
    backgroundColor: "#fff",
    color: "#1877f2",
    width: "100%",
    letterSpacing: "1px",
    height: "50px",
    borderRadius: "60px",
    border: "1px solid #ffffff",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
}));

function Signup() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation()
  const [checked, setChecked] = React.useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isloading, setloaders] = useState(false);
  const [errorMessageSignin, setErrorMesagesignin] = useState();
  const [errorMessageresend, setErrorMesageResend] = useState();
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoadingresend, setIsLoadingResend] = useState(false);
  const [loader, setloader] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoadingOtp, setIsLoadingOtp] = React.useState(false);

  const [minuteTimer, setMinuteTimer] = useState();
  const [emailOtp, setEmail] = React.useState();
  const [otpPop, setOtpPop] = React.useState(false);
  const [termsPopUp, setTermsPopUp] = React.useState(false);
  const [verifyOTPOpen, setVerifyOTPOpen] = useState(false);
  const [fieldValue, setFieldValueDateOfBirth] = useState("");
  const [timeLeft, setTimeLeft] = useState();
  const [refferalId, setRefferalId] = useState("");
  const [refferalIdData, setRefferalIdData] = useState("");
  const [referralOpen, setReferralOpen] = useState(false);
  const [refwrLoader, setReferLoader] = useState(false);
  const [codeReferalPath, setCodeReferalPath] = useState("");

  const [formValue, setFormValue] = useState({
    email: "",
    userName: "",
    referralCode: "",
    password: "",
    gender: "",
    dob: new Date(),

  });

  console.log("location----", location);
  useEffect(() => {
    const referalCode = location.search.split("?")[1];
    if (location.search) {
      setCodeReferalPath(referalCode ? referalCode : "");
      setRefferalIdData(referalCode ? referalCode : "")
    }
  }, [location.search]);

  console.log("emailOtp", emailOtp, formValue);
  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };

  const formInitialSchema = {
    email: emailOtp,
    otp: "",
  };
  const [endTime, setEndtime] = React.useState();
  console.log("timeLeft", timeLeft, endTime, verifyOTPOpen);

  useEffect(() => {
    if (verifyOTPOpen && endTime) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(endTime));
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const verifyOTP = async (values) => {
    setIsLoadingOtp(true);
    try {
      const res = await axios({
        method: "PUT",
        url: ApiConfig.verifyOtp,
        data: {
          otp: values.otp,
          email: emailOtp,
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoadingOtp(false);
        setVerifyOTPOpen(false);
        setTimeout(() => {
          setErrorMesageResend(""); // count is 0 here
        }, 5000);
        setErrorMesageResend(res.data?.responseMessage);
        toast.success(`${res.data.responseMessage} please login`);
        history.push("/");
        // window.sessionStorage.setItem("otp", values.otp);
      }
    } catch (error) {
      setIsLoadingOtp(false);
      // toast.error(error.message);
      // toast.error(error.response.data.responseMessage);
      setTimeout(() => {
        setErrorMesage(""); // count is 0 here
      }, 5000);
      setErrorMesage(error?.response?.data?.responseMessage);
    }
  };
  const resendOTP = async () => {
    setIsLoadingResend(true);
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.resendOtp,
        data: {
          email: emailOtp,
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoadingResend(false);
        setEndtime(moment().add(5, "m").unix());
        setIsLoading(false);
        setTimeout(() => {
          setErrorMesageResend(""); // count is 0 here
        }, 5000);
        setErrorMesageResend(res.data?.responseMessage);
        // toast.success("resend otp succefully");
      }
    } catch (error) {
      setIsLoadingResend(false);
      setIsLoading(false);
      // toast.error(error.message);
      setTimeout(() => {
        setErrorMesage(""); // count is 0 here
      }, 5000);
      setErrorMesage(error?.response?.data?.responseMessage);
      // setErrorMesage(error?.response?.data?.responseMessage);
    }
  };
  const isValidEmail = (value) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
    return re.test(String(value).toLowerCase());
  };
  const isValidNumber = (value) => {
    const re =
      /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
    return re.test(value);
  };
  const validUsername = (value) => {
    const re = /^\S*$/;
    return re.test(value);
  };
  const validPassword = (value) => {
    const re =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    return re.test(value);
  };

  const isEmailValid =
    formValue.email !== "" ? isValidEmail(formValue.email) : true;
  const isNumberValid =
    formValue.email !== "" ? isValidNumber(formValue.email) : true;

  const myAge = (date) => {
    const age = moment().diff(moment(date), "years") >= 18;
    return age;
  };
  const [errorMessage, setErrorMesage] = useState(false);
  const [creatorListData, setCreatorListData] = useState([]);
  const [errorMessageSignup, setErrorMesageSignup] = useState();
  const [errorMessageerror, setErrorMesageerror] = useState();

  const creatorHandler = async () => {
    // setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.searchUserNameForsignUpTime,
        params: {
          search: formValue?.userName,
        },
      });

      if (res.data.responseCode === 200) {
        if (res.data.result.docs) {
          setCreatorListData(res.data.result.docs);
          // setNoOfPages(res.data.result.pages);
        }
        setTimeout(() => {
          setErrorMesageSignup(""); // count is 0 here
        }, 5000);
        setErrorMesageSignup("Already exists");
        setErrorMesageerror("");
      } else {
        setTimeout(() => {
          setErrorMesageerror(""); // count is 0 here
        }, 10000);
        setErrorMesageerror(res.data.responseMessage);
      }
      // setIsLoading(false);
    } catch (error) {
      if (error?.response?.data?.responseCode === 404) {
        setTimeout(() => {
          setErrorMesageerror(""); // count is 0 here
        }, 10000);
        setErrorMesageerror("Available");
        setErrorMesageSignup("");
      }
      // setIsLoading(false);
    }
  };
  useEffect(() => {
    if (formValue?.userName.length > 3) {
      creatorHandler();
    }
  }, [formValue?.userName]);

  const gethandleSubmitApi = async (event) => {
    event.preventDefault();
    let EmailData = {
      email: formValue.email,
      userName: formValue.userName,
      password: formValue.password,
      dob: fieldValue,
      gender: formValue.gender,
      refereeCode: codeReferalPath ? codeReferalPath : "",
    };

    let MobileData = {
      userName: formValue.userName,
      mobileNumber: mobileNumber.slice(countryCode.length),
      password: formValue.password,
      dob: fieldValue,
      gender: formValue.gender,
      countryCode: `+${mobileNumber?.slice(0, 2)}`,
      refereeCode: codeReferalPath ? codeReferalPath : "",
    };
    // setIsSubmit(true);

    setIsSubmit(true);
    if (
      (formValue.userName !== "" &&
        formValue.password !== "" &&
        validPassword(formValue.password) &&
        formValue.gender !== "" &&
        myAge(fieldValue) &&
        formValue.userName.length < 40 &&
        isValidNumber(mobileNumber)) ||
      isValidEmail(formValue.email)
    ) {
      setIsLoading(true);
      axios({
        method: "POST",
        url: ApiConfig.register,
        data: checked2 ? MobileData : EmailData,
      })
        .then(async (response) => {
          if (response.data.responseCode !== 200) {
            toast.error(response.data.responseMessage);
            setIsLoading(false);
          } else if (response.data.responseCode === 409) {
            toast.error(response.data.responseMessage);
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setEmail(
              formValue.email
                ? formValue.email
                : mobileNumber.slice(countryCode.length)
            );
            setVerifyOTPOpen(true);
            setOtpPop(true);
            setEndtime(moment().add(5, "m").unix());
            window.sessionStorage.setItem(
              "loginToken",
              response.data.result.token
            );
            toast.success(
              `We have sent an OTP on your ${checked2 ? "mobile number" : "registered email ID"
              }. Please verify.`
            );
          }
        })
        .catch((error) => {
          // if (error.response.responseCode === 409) {
          //   setIsLoading(false);
          //   toast.error(error.response.responseMessage);
          // } else {
          setIsLoading(false);
          setTimeout(() => {
            setErrorMesagesignin(""); // count is 0 here
          }, 5000);
          setErrorMesagesignin(error?.response?.data?.responseMessage);
          // }
          // setIsLoading(false);
          // toast.error(err.message);
        });
    }
  };
  const responseGoogle = async (response) => {
    try {
      const creadentails = {
        socialId: response.profileObj?.googleId,
        socialType: response.tokenObj.idpId,
        email: response.profileObj?.email.toLowerCase(),
        name: response.profileObj?.name,
      };
      const res = await axios({
        method: "POST",
        url: ApiConfig.socialLogin,
        data: creadentails,
      });
      if (res.data.responseCode === 200) {
        if (res.data.result.userInfo.firstTime === false) {
          setReferralOpen(true);
        } else {
          history.push("/explore");
        }

        // if (!res.data.result.name) {
        //   history.push({
        //     pathname: "/settings",
        //     // search: res.data.result?._id,
        //     hash: "editProfile",
        //   });
        // } else {
        //   history.push("/explore");
        // }
        toast.success("You are successfully logged in.");
        window.localStorage.setItem("token", res.data.result.token);

        sessionStorage.setItem("token", res.data.result.token);
      }
    } catch (error) { }
  };

  const responseFacebook = async (response) => {
    try {
      const creadentails = {
        socialId: response.id,
        socialType: response?.graphDomain,
        email: response.profileObj?.email.toLowerCase(),
        name: response.name,
      };
      const res = await axios({
        method: "POST",
        url: ApiConfig.socialLogin,
        data: creadentails,
      });
      if (res.data.responseCode === 200) {
        // toast.success(res.data.responseMessage);
        // if (res.data.result.name) {
        if (res.data.result.userInfo.firstTime === false) {
          setReferralOpen(true);
        } else {
          history.push("/explore");
        }
        // history.push("/explore");
        // setReferralOpen(true)

        //   history.push("/explore");
        // } else {
        //   history.push({
        //     pathname: "/settings",
        //     search: res.data.result?._id,
        //     hash: "editProfile",
        //   });
        // }
        window.localStorage.setItem("token", res.data.result.token);

        sessionStorage.setItem("token", res.data.result.token);
      }
    } catch (error) { }
  };
  //   const thirdPartyLoginHandler = ({ response, provider, error }) => {
  //     dispatch(login({ user: response, provider, error }))

  // }
  const authHandler = (err, data) => {
    // if (err) return thirdPartyLoginHandler({ error: true, provider: 'twitter', response: {} })
    // thirdPartyLoginHandler({ error: false, provider: 'twitter', response: data })
  };
  const CONSUMER_KEY = "6QrATuQlxlutY1vGKrrCIAwyD";
  const CONSUMER_SECRET = "dCrmloBGOPw5NlxZ5GSMjDsJ0oASyCvlrZiyTxvx5gGNgxoOYB";
  const formValidationSchemaOtp = yup.object().shape({
    otp: yup
      .string()
      // .required("Otp is required")
      .max(4, "Only four character OTP are allowed"),
  });

  const referralApiHandler = async () => {
    setReferLoader(true);
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.refferralAfterSocialLogin,
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          refereeCode: refferalIdData,
        },
      });
      console.log("res----", res);
      if (res.data.responseCode) {
        history.push("/explore");
        setReferLoader(false);
        toast.success("Referral code added successfully");
        if (localStorage.getItem("token")) {
          history.push("/explore");
        }
      }
      setReferLoader(false);
    } catch (error) {
      setReferLoader(false);

      console.log(error);
    }
  };

  return (
    <form onSubmit={(event) => gethandleSubmitApi(event)}>
      <Page title="SignUp">
        <Box textAlign="center" mt={5} mb={5}>
          <Typography variant="h2" style={{ color: "rgb(186 184 189)" }}>
            Getting Started
          </Typography>
          <Typography variant="h6" style={{ color: "rgb(186 184 189)" }}>
            Create an account to continue and connect with the people
          </Typography>
        </Box>
        <Box mb={5}>
          <Paper
            className={classes.loginBox}
            elevation={2}
            style={{ padding: "25px" }}
          >
            <Grid className="d-flex height100">
              <Box className="loginForm">
                <form noValidate>
                  <Grid container direction={"column"} spacing={2}>
                    <Grid item style={{ marginTop: "10px" }}>
                      <Box className="d-flex justify-space-between">
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <GoogleLogin
                              clientId="1091699329963-mp80c9sgbl77l4ncsga7m0cq52pn7hje.apps.googleusercontent.com"
                              render={(renderProps) => (
                                <Button
                                  disabled={renderProps.disabled}
                                  onClick={renderProps.onClick}
                                  startIcon={
                                    <FaGoogle style={{ fontSize: "20px" }} />
                                  }
                                  variant="contained"
                                  color="primary"
                                  size="large"
                                  fullWidth
                                  style={{
                                    marginRight: "5px",
                                    backgroundColor: "#DC4E41",
                                    borderRadius: "60px",
                                    height: "50px",
                                  }}
                                >
                                  Continue With Google
                                </Button>
                              )}
                              buttonText="Login"
                              onSuccess={responseGoogle}
                              onFailure={responseGoogle}
                              cookiePolicy={"single_host_origin"}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <FacebookLogin
                              appId="358926006190709"
                              // autoLoad={true}
                              cssClass={classes.btnFacebook}
                              icon={
                                <FaFacebookF
                                  style={{
                                    fontSize: "23px",
                                    marginRight: "11px",
                                  }}
                                />
                              }
                              callback={responseFacebook}
                              buttonText="Login"
                              onSuccess={responseGoogle}
                              onFailure={responseGoogle}
                              cookiePolicy={"single_host_origin"}
                            />
                          </Grid>
                          {/* <Grid
                            item
                            xs={12}
                            sm={6}
                            md={6}
                            lg={6}
                            // style={{ width: "100%" }}
                          >
                            <TwitterLogin
                              icon={
                                <BsTwitter
                                  style={{
                                    fontSize: "20px",
                                    marginRight: "5px",
                                  }}
                                />
                              }
                              text="LogIn With Twitter"
                              authCallback={authHandler}
                              consumerKey="bzhpU0lGSVprQmFwc2Zkb0x1clE6MTpjaQ"
                              consumerSecret="k-0IKxC8_aVkgull0qtBM8t6RyC87K52Wv3AcOnTDijbdhAlxV"
                              buttonTheme="dark"
                              fullWidth
                              className={classes.twitterButton}
                            />
                          </Grid> */}
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item>
                      <Box className={classes.or}>
                        <Typography variant="body2">OR</Typography>
                      </Box>
                    </Grid>
                    {/* <form onSubmit={gethandleSubmitApi}> */}
                    <Grid item xs={8} className={classes.donation}>
                      <Box>
                        <span
                          style={{ fontSize: "14px", marginRight: "8px" }}
                          className={checked1 ? "active" : null}
                          onClick={() => {
                            setChecked1(true);
                            setChecked2(false);
                            setIsSubmit(false);
                          }}
                        >
                          Email
                        </span>
                        <span
                          style={{ fontSize: "14px", marginRight: "8px" }}
                          className={checked2 ? "active" : null}
                          onClick={() => {
                            setFormValue({
                              email: "",
                              userName: formValue.userName
                                ? formValue.userName
                                : "",
                              referralCode: "",
                              password: formValue.password
                                ? formValue.password
                                : "",
                              gender: formValue.gender ? formValue.gender : "",
                              dob: fieldValue ? fieldValue : new Date(),
                            });
                            setChecked2(true);
                            setChecked1(false);
                            setIsSubmit(false);
                          }}
                        >
                          Mobile number
                        </span>
                      </Box>
                    </Grid>
                    {checked1 && (
                      <Grid item>
                        <FormControl fullWidth>
                          <TextField
                            type="text"
                            variant="outlined"
                            size="small"
                            name="email"
                            placeholder="Enter your email "
                            fullWidth
                            onChange={_onInputChange}
                            error={Boolean(
                              (isSubmit &&
                                checked1 &&
                                formValue.email === "") ||
                              (formValue.email !== "" &&
                                checked1 &&
                                !isValidEmail(formValue.email))
                            )}
                            InputProps={{
                              startAdornment: (
                                <MailOutlineIcon position="start">
                                  Kg
                                </MailOutlineIcon>
                              ),
                            }}
                          />
                          <FormHelperText error>
                            {(isSubmit &&
                              checked1 &&
                              formValue.email === "" && (
                                <Box ml={1}>Email is a required </Box>
                              )) ||
                              (formValue.email !== "" &&
                                checked1 &&
                                !isValidEmail(formValue.email) && (
                                  <Box ml={1}>Enter a valid email address</Box>
                                ))}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                    )}

                    {checked2 && (
                      <Grid item>
                        <FormControl fullWidth>
                          <PhoneInput
                            country={"in"}
                            // disabled={isEdit}
                            name="mobileNumber"
                            value={mobileNumber}
                            error={Boolean(
                              (isSubmit && checked2 && !mobileNumber) ||
                              (isSubmit &&
                                checked2 &&
                                !isValidNumber(mobileNumber))
                            )}
                            onChange={(phone, e) => {
                              setCountryCode(e.dialCode);
                              setMobileNumber(phone);
                            }}
                            inputStyle={{
                              borderRadius: "14px",
                              width: "100%",
                              height: "48px",
                              backgroundColor: "rgb(36 37 38)",
                              border: "1px solid #575758",
                            }}
                          />
                          <FormHelperText error>
                            {(isSubmit &&
                              checked2 &&
                              mobileNumber === "" &&
                              "Mobile number is a required") ||
                              (mobileNumber !== "" &&
                                checked2 &&
                                !isValidNumber(mobileNumber) &&
                                "Enter a valid mobile number")}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                    )}
                    <Grid item>
                      <FormControl fullWidth>
                        <TextField
                          type="text"
                          placeholder="Your username"
                          variant="outlined"
                          autoComplete="off"
                          // autoComplete="off"
                          size="small"
                          name="userName"
                          fullWidth
                          onChange={_onInputChange}
                          error={
                            (isSubmit && formValue.userName === "") ||
                            (formValue.userName !== "" &&
                              !validUsername(formValue.userName)) ||
                            (formValue.userName !== "" &&
                              formValue.userName.length > 40)
                          }
                          InputProps={{
                            startAdornment: (
                              <PersonIcon position="start">Kg</PersonIcon>
                            ),
                            endAdornment: (
                              <Box>
                                {validUsername(formValue.userName) && (
                                  <>
                                    {errorMessageerror && (
                                      <Box
                                        textAlign="left"
                                        ml={1}
                                        mt={1}
                                        mr={1}
                                        style={{
                                          display: "flex",
                                          color: "green",
                                          fontWeight: 600,
                                        }}
                                      >
                                        <Typography>
                                          <SiVerizon />
                                        </Typography>
                                        <Typography>
                                          {errorMessageerror}
                                        </Typography>
                                      </Box>
                                    )}
                                    {errorMessageSignup && (
                                      <Box
                                        textAlign="left"
                                        ml={1}
                                        mt={1}
                                        style={{
                                          color: "#ba1f11",
                                          fontWeight: 600,
                                        }}
                                      >
                                        {errorMessageSignup}
                                      </Box>
                                    )}
                                  </>
                                )}
                              </Box>
                            ),
                          }}
                        />
                        <FormHelperText error>
                          {(isSubmit && formValue.userName === "" && (
                            <Box ml={1}>Name is a required </Box>
                          )) ||
                            (formValue.userName !== "" &&
                              !validUsername(formValue.userName) && (
                                <Box ml={1}>Space not allowed in name </Box>
                              )) ||
                            (formValue.userName !== "" &&
                              formValue.userName.length > 40 && (
                                <Box ml={1}>
                                  User name should be less than or equal to 40
                                  characters.
                                </Box>
                              ))}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl fullWidth>
                        <TextField
                          type={showPassword ? "text" : "password"}
                          variant="outlined"
                          size="small"
                          name="password"
                          placeholder="Password!"
                          onChange={_onInputChange}
                          error={Boolean(
                            (isSubmit && formValue.password === "") ||
                            (formValue.password !== "" &&
                              !validPassword(formValue.password))
                          )}
                          InputProps={{
                            autoComplete: "new-password",
                            form: {
                              autocomplete: "off",
                            },
                            startAdornment: (
                              <LockIcon position="start">Kg</LockIcon>
                            ),
                            endAdornment: (
                              <IconButton
                                position="end"
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                // onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            ),
                          }}
                        />
                        <FormHelperText error>
                          {(isSubmit && formValue.password === "" && (
                            <Box ml={1}>Password is a required </Box>
                          )) ||
                            (formValue.password !== "" &&
                              !validPassword(formValue.password) && (
                                <Box ml={1}>
                                  {/* Must contain 8 characters, one uppercase, one
                                  lowercase, one number and one special
                                  character */}
                                  Password must be minimum 8 and maximum 16
                                  characters , one special character, uppercase
                                  letter , lowercase letter.
                                </Box>
                              ))}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item lg={6} sm={6} md={6} xs={12}>
                          {/* <FormControl fullWidth>
                                <TextField
                                  id="date"
                                  variant="outlined"
                                  type="date"
                                  name="date"
                                  fullWidth
                                  value={values.dateOfBirth}
                                  error={Boolean(
                                    touched.dateOfBirth && errors.dateOfBirth
                                  )}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  // {...formik.getFieldProps("dateOfBirth")}
                                  className={classes.textField}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                />
                                <FormHelperText error>
                                  {touched.dateOfBirth && errors.dateOfBirth}
                                </FormHelperText>
                              </FormControl> */}
                          <FormControl fullWidth>
                            <KeyboardDatePicker
                              // value={fieldValue}
                              placeholder="DD/MM/YYYY"
                              onChange={(date) => {
                                setFieldValueDateOfBirth(new Date(date));
                              }}
                              maxDate={moment().subtract(18, "year")}
                              format="DD/MM/YYYY"
                              inputVariant="outlined"
                              disableFuture
                              margin="dense"
                              helperText=""
                              name="dob"
                              value={fieldValue}
                              // onChange={_onInputChange}
                              error={Boolean(isSubmit && !myAge(fieldValue))}
                            // helperText={touched.dob && errors.dob}
                            />
                            <FormHelperText error>
                              {isSubmit && !myAge(fieldValue) && (
                                <Box ml={1}>
                                  You must be 18 years old or above
                                </Box>
                              )}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item lg={6} sm={6} md={6} xs={12}>
                          <FormControl component="fieldset" fullWidth>
                            <Box className={classes.radio}>
                              <FaTransgender
                                style={{ fontSize: "25px", margin: "13px" }}
                              />{" "}
                              <Box className="innerRadio">
                                <RadioGroup
                                  style={{ marginBottom: "10px" }}
                                  aria-label="gender"
                                  name="gender"
                                  // value={value}
                                  onChange={_onInputChange}
                                  error={Boolean(
                                    isSubmit && formValue.gender === ""
                                  )}
                                  display="flex"
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
                        </Grid>
                        <Grid item lg={12} sm={12} md={12} xs={12}>
                          <Typography
                            style={{ paddingBottom: "7px", fontSize: "18px" }}
                          >
                            Add Refferal ID
                          </Typography>
                          <FormControl fullWidth>
                            <TextField
                              type="text"
                              variant="outlined"
                              size="small"
                              name="refereeCode"
                              value={codeReferalPath}
                              placeholder="Type your refferal link...."
                              onChange={(e) => setCodeReferalPath(e.target.value)}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body1">
                        By clicking Sign Up, you agree to our{" "}
                        <Link target="_blank" href="/terms-conditions">
                          Terms
                        </Link>{" "}
                        and{" "}
                        <Link target="_blank" href="/privacy-policy">
                          Privacy Policy
                        </Link>
                        .{" "}
                      </Typography>
                    </Grid>
                    <Grid item>
                      {errorMessageSignin && (
                        <Box
                          textAlign="left"
                          ml={1}
                          mt={1}
                          style={{ color: "#ba1f11", fontWeight: 600 }}
                        >
                          {errorMessageSignin}
                        </Box>
                      )}
                      <Box mt={2} mb={3}>
                        <Button
                          // type="submit"
                          variant="contained"
                          color="secondary"
                          fullWidth
                          type="submit"
                          size="large"
                          disabled={
                            isLoading ||
                            !validUsername(formValue.userName) ||
                            !validPassword(formValue.password) ||
                            !myAge(fieldValue) ||
                            formValue.gender === ""
                          }
                        // onClick={gethandleSubmitApi}
                        // onClick={() => verifyOTPOpen(true)}
                        // onClick={() => history.push("/")}
                        >
                          Sign Up
                          {isLoading && <CircularProgress />}
                        </Button>
                      </Box>
                    </Grid>
                    {/* </form> */}
                    <Grid item>
                      <Box textAlign="center">
                        <Typography color="primary.main" variant="body2">
                          If you have already registerd ? &nbsp;
                          <Link component={RouterComponent} to="/">
                            Sign In
                          </Link>
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Paper>

          {verifyOTPOpen && (
            <Dialog
              fullWidth
              maxWidth="sm"
              open={verifyOTPOpen}
            // onClose={() => setVerifyOTPOpen(false)}
            >
              <DialogContent>
                <Box>
                  <Box textAlign="center">
                    <Typography variant="h2">Verify OTP</Typography>
                    <Box mt={2}>
                      <Typography variant="h6">
                        Please Enter The Verification Code Send To Your Email
                        Address Or Mobile Number
                      </Typography>
                    </Box>
                  </Box>
                  <Box p={3} align="center">
                    <Formik
                      onSubmit={(values) => verifyOTP(values)}
                      // onSubmit={(values) => VerifyOtp12(values)}
                      // noValidate onSubmit={handleSubmit}
                      initialValues={formInitialSchema}
                      validationSchema={formValidationSchemaOtp}
                    >
                      {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        touched,
                        values,
                        DateOfBirth,
                      }) => (
                        <Form>
                          <Box mt={2}>
                            <FormControl fullWidth>
                              <OutlinedInput
                                type="number"
                                variant="outlined"
                                placeholder="Enter your OTP"
                                size="small"
                                name="otp"
                                maxLength="4"
                                error={Boolean(touched.otp && errors.otp)}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                onKeyPress={(event) => {
                                  if (
                                    event?.key === "-" ||
                                    event?.key === "+" ||
                                    event?.key.length > 4
                                  ) {
                                    event.preventDefault();
                                  }
                                }}
                              // onKeyPress={(event) => {
                              //   if (event?.key === '-' || event?.key === '+') {
                              //     event.handleChange(event)
                              //   }
                              // }}
                              // onChange={(e) => {
                              //   if (e.target.value && e.target.value != '-') {
                              //     handleChange(Math.abs(Number(e.target.value)))
                              //   } else {
                              //     handleChange()
                              //   }
                              // }}
                              />
                              <FormHelperText error>
                                {touched.otp && errors.otp}
                              </FormHelperText>
                            </FormControl>
                            {errorMessage && (
                              <Box
                                textAlign="left"
                                ml={1}
                                mt={1}
                                style={{ color: "#ba1f11", fontWeight: 600 }}
                              >
                                {errorMessage}
                              </Box>
                            )}
                            {errorMessageresend && (
                              <Box
                                textAlign="left"
                                ml={1}
                                mt={1}
                                style={{ color: "green", fontWeight: 600 }}
                              >
                                {errorMessageresend}
                              </Box>
                            )}
                          </Box>
                          {values.otp > 0 && (
                            <Box mt={3}>
                              <Button
                                type="submit"
                                variant="contained"
                                color="secondary"
                                fullWidth
                                size="large"
                                disabled={isloading || isLoadingOtp}
                              >
                                Verify OTP{" "}
                                {isLoadingOtp && <ButtonCircularProgress />}
                              </Button>
                            </Box>
                          )}
                        </Form>
                      )}
                    </Formik>
                    <Typography variant="body1" style={{ textAlign: "center" }}>
                      {timeLeft && timeLeft.seconds >= 0 ? (
                        <>
                          <Typography
                            variant="body1"
                            style={{
                              color: "#f44336",
                              fontSize: "13px",
                              fontWeight: 500,
                              marginTop: "10px",
                            }}
                          // onClick={sendOTP}
                          // disabled={timeLeft && timeLeft.seconds > 0}
                          >
                            Your OTP will expire in {timeLeft?.minutes} m :{" "}
                            {timeLeft?.seconds} s
                          </Typography>{" "}
                        </>
                      ) : (
                        <>
                          {!isloading && (
                            <Box align="center" mt={5}>
                              <label
                                style={{ cursor: "pointer" }}
                                onClick={resendOTP}
                                disabled={isLoadingresend}
                              >
                                Resend OTP{" "}
                                {isLoadingresend && <ButtonCircularProgress />}
                              </label>{" "}
                            </Box>
                          )}
                        </>
                      )}
                    </Typography>
                  </Box>
                </Box>
              </DialogContent>
              {/* <DialogActions>
                <Button onClick={() => setVerifyOTPOpen(false)}>Cancel</Button>
                <Button
                  disabled={loader}
                  onSubmit={(values) => verifyOTP(values)}
                >
                  Submit {loader && <ButtonCircularProgress />}
                </Button>
              </DialogActions> */}
            </Dialog>
          )}
          {referralOpen && (
            <Dialog
              fullWidth
              maxWidth="sm"
              open={referralOpen}
              onClose={() => {
                if (!refwrLoader) {
                  setReferralOpen(false);
                }
              }}
            >
              <DialogContent>
                <Box textAlign="center">
                  <Typography
                    style={{ paddingBottom: "7px", fontSize: "18px" }}
                  >
                    Add Refferal ID
                  </Typography>
                  <Box mt={2}>
                    <FormControl fullWidth>
                      <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        name="refereeCode"
                        value={refferalIdData}
                        placeholder="Type your refferal link...."
                        onChange={(e) => setRefferalIdData(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </Box>
              </DialogContent>
              <Box mt={1}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Box style={{ marginLeft: "5px" }}>
                      <Button
                        variant="contained"
                        style={{ borderRadius: "10px", height: "45px" }}
                        fullWidth
                        disabled={refwrLoader}
                        color="primary"
                        onClick={() => history.push("/explore")}
                      >
                        Skip
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box style={{ marginRight: "5px" }}>
                      <Button
                        variant="contained"
                        style={{ borderRadius: "10px", height: "45px" }}
                        fullWidth
                        disabled={refwrLoader}
                        color="primary"
                        onClick={() => {
                          referralApiHandler();
                          if (localStorage.getItem("token")) {
                            history.push("/explore");
                          }
                        }}
                      >
                        Submit {refwrLoader && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Dialog>
          )}
        </Box>
      </Page>
    </form>
  );
}

export default Signup;
