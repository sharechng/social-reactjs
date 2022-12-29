import React, { useState, useEffect, useContext } from "react";
import "src/scss/main.css";
import {
  Box,
  Typography,
  Grid,
  Button,
  Link,
  Paper,
  Checkbox,
  FormControl,
  TextField,
  IconButton,
  FormHelperText,
  OutlinedInput,
} from "@material-ui/core";
import moment from "moment";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core";
import Page from "src/component/Page";
import TwitterLogin from "react-twitter-login";
import { calculateTimeLeft } from "src/utils";

import { FaApple, FaFacebookF, FaFontAwesome, FaGoogle } from "react-icons/fa";
// import { FaApple, FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import { Formik, Form } from "formik";
import axios from "axios";
import * as yup from "yup";
import { toast } from "react-toastify";
import LockIcon from "@material-ui/icons/Lock";
import { BsTwitter } from "react-icons/bs";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import AppleLogin from "react-apple-login";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { AuthContext } from "src/context/Auth";
import PhoneInput from "react-phone-input-2";
// import InstagramLogin from 'react-instagram-login';
import "react-phone-input-2/lib/style.css";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& .checkbox": {
      display: "flex",
      alignItems: "center",
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

  btnFacebook: {
    marginRight: "5px",
    backgroundColor: "#fff",
    color: "#1877f2",
    width: "100%",
    height: "50px",
    borderRadius: "60px",
    letterSpacing: "1px",
    border: "1px solid #ffffff",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
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
  loginBox: {
    padding: "40px 30px",
  },
  headingBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "40px 0px",
    flexDirection: "column",
    "& h2": {
      color: "rgb(186 184 189)",
    },
    "& h6": {
      color: "rgb(186 184 189)",
    },
    "& p": {
      color: "rgb(186 184 189)",
    },
  },
}));

function Login(props) {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setLoader] = useState(false);
  const [errorMessage, setErrorMesage] = useState();
  const [errorMessageOtp, setErrorMesageOtp] = useState();
  const [emailLogin, setEmailLogin] = useState();
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [checkBoxRemember, setCheckedBox] = useState(false);
  const [timeLeft, setTimeLeft] = useState();
  const [isLoadingOtp, setIsLoadingOtp] = React.useState(false);
  const [errorMessageOtpVerify, setErrorMesageOtpVerify] = useState();
  const [verifyOTPOpen, setVerifyOTPOpen] = useState(false);
  const [emailOtp, setEmail] = React.useState();
  const [errorMessageresend, setErrorMesageResend] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [endTime, setEndtime] = React.useState();
  const [referralOpen, setReferralOpen] = useState(false);
  const [refferalIdData, setRefferalIdData] = useState("");
  const [refwrLoader, setReferLoader] = useState(false);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };

  useEffect(() => {
    if (verifyOTPOpen && endTime) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(endTime));
      }, 1000);
      return () => clearTimeout(timer);
    }
  });
  useEffect(() => {
    if (auth?.userLoggedIn) {
      history.push("/explore");
    }
  }, [auth?.userLoggedIn]);
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
  const validPassword = (value) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
    return re.test(value);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmit(true);

    if (
      isValidNumber(mobileNumber) ||
      (isValidEmail(formValue.email) &&
        validPassword(formValue.password) &&
        formValue.password)
    ) {
      try {
        setIsLoading(true);
        const res = await axios.post(ApiConfig.userlogin, {
          email: checked2
            ? mobileNumber?.slice(countryCode?.length)
            : formValue.email,
          password: formValue.password,
        });
        if (res.data.responseCode === 200) {
          window.localStorage.setItem("status", res.data.result.status);

          setTimeout(() => {
            auth.handleUserProfileApi();
          }, 500);
          if (checkBoxRemember) {
            window.localStorage.setItem("email", res.data.result.email);
            window.localStorage.setItem("password", formValue.password);
          }
          if (
            res.data.result.userType === "Admin" ||
            res.data.result.userType === "Subadmin"
          ) {
            auth.setIsLogin(true);
            toast.success(res.data.responseMessage);
            setEmailLogin(res.data.result.email);
            setIsLoading(false);
            history.push("/dashboard");
            window.sessionStorage.setItem("email", res.data.result.email);
            window.sessionStorage.setItem("token", res.data.result.token);
            window.localStorage.setItem("token", res.data.result.token);
            window.localStorage.setItem("status", res.data.result.status);
          } else {
            // auth.setIsLogin(true);
            setTimeout(() => {
              auth.handleUserProfileApi(res.data.result.token);
            }, 500);
            // user?.getProfileHandler(res.data.result.token);
            toast.success(res.data.responseMessage);
            setEmailLogin(res.data.result.email);
            setIsLoading(false);
            setTimeout(() => {
              history.push("/explore");
            }, 2000);
            console.log("email--------->", res);
            window.sessionStorage.setItem("email", res.data.result.email);
            window.localStorage.setItem("email", res.data.result.email)
            window.sessionStorage.setItem("token", res.data.result.token);
            window.localStorage.setItem("token", res.data.result.token);
            window.localStorage.setItem("status", res.data.result.status);
          }
        } else {
          setIsLoading(false);
          toast.error(res.data.responseMessage);
        }
      } catch (error) {
        if (error?.response) {
          setErrorMesage(error?.response?.data?.responseMessage);
        } else {
          setErrorMesage(error.message);
        }
        auth.setIsLogin(false);
        setEmail(
          mobileNumber
            ? mobileNumber?.slice(countryCode?.length)
            : formValue.email
        );
        if (error?.response?.data?.responseCode === 400) {
          setIsLoading(false);
          setVerifyOTPOpen(true);
          resendOTP();
          setTimeout(() => {
            setErrorMesage(""); // count is 0 here
          }, 5000);
        } else {
          setIsLoading(false);
          setTimeout(() => {
            setErrorMesage(""); // count is 0 here
          }, 5000);
        }
        auth.setIsLogin(false);
      }
    }
  };
  const responseGoogle = async (response) => {
    setIsLoading(true);

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
        toast.success("You are successfully logged in.");
        console.log("email--------->", res);
        // auth.setIsLogin(true);
        window.localStorage.setItem("email", res.data.result.email);
        window.localStorage.setItem("status", res.data.result.userInfo.status);
        window.sessionStorage.setItem("email", res.data.result.userInfo.email);
        window.sessionStorage.setItem("token", res.data.result.token);
        window.localStorage.setItem("token", res.data.result.token);
        window.localStorage.setItem("status", res.data.result.userInfo.status);

        setTimeout(() => {
          auth.handleUserProfileApi();
        }, 500);
        if (res.data.result.userInfo.firstTime === false) {
          setReferralOpen(true);
        } else {
          history.push({
            pathname: "/explore",
            search: res.data.result.email
          });
        }

        // if (res.data.result.name) {
        //   history.push("/explore");
        // } else {
        //   history.push({
        //     pathname: "/settings",
        //     search: res.data.result?._id,
        //     hash: "editProfile",
        //   });
        // }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.responseMessage);
    }
  };


  const responseFacebook = async (response) => {
    console.log("response-----", response);
    setIsLoading(true);

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
        // auth.setIsLogin(true);

        toast.success("You are successfully logged in.");
        console.log("email--------->", res);
        window.localStorage.setItem("email", res.data.result.email);
        window.localStorage.setItem("status", res.data.result.status);
        window.sessionStorage.setItem("email", res.data.result.email);
        window.sessionStorage.setItem("token", res.data.result.token);
        window.localStorage.setItem("token", res.data.result.token);
        window.localStorage.setItem("status", res.data.result.userInfo.status);

        setTimeout(() => {
          auth.handleUserProfileApi();
        }, 500);
        if (res.data.result.userInfo.firstTime === false) {
          setReferralOpen(true);
        } else {
          history.push("/explore");
        }


        // if (res.data.result.name) {
        //   history.push("/explore");
        // } else {
        //   history.push({
        //     pathname: "/settings",
        //     hash: "editProfile",
        //   });
        // }
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.responseMessage);
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   auth.logout();
  // }, []);

  const verifyOTP = async (values) => {
    setIsLoadingOtp(true);
    try {
      const res = await axios({
        method: "PUT",
        url: ApiConfig.verifyOtp,
        data: {
          otp: values.otp,
          email: emailOtp ? emailOtp : formValue.email,
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoadingOtp(false);
        setVerifyOTPOpen(false);
        setTimeout(() => {
          setErrorMesageOtp(""); // count is 0 here
        }, 5000);
        setErrorMesageOtp(res.data?.responseMessage);
        toast.success(`${res.data.responseMessage} please login`);
        history.push("/");
      }
    } catch (error) {
      setIsLoadingOtp(false);

      setTimeout(() => {
        setErrorMesageOtpVerify("");
      }, 5000);
      if (error?.response) {
        setErrorMesageOtpVerify(error?.response?.data?.responseMessage);
      } else {
        setErrorMesageOtpVerify(error.message);
      }
    }
  };
  const resendOTP = async () => {
    // setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.resendOtp,
        data: {
          email: emailOtp ? emailOtp : formValue.email,
        },
      });
      if (res.data.responseCode === 200) {
        setEndtime(moment().add(5, "m").unix());
        setIsLoading(false);
        setTimeout(() => {
          setErrorMesageOtp(""); // count is 0 here
        }, 5000);
        setErrorMesageOtp(res.data?.responseMessage);
        toast.success("resend otp succefully");
      }
    } catch (error) {
      setIsLoading(false);
      // toast.error(error.message);
      setTimeout(() => {
        setErrorMesageOtpVerify(""); // count is 0 here
      }, 5000);

      if (error?.response) {
        setErrorMesageOtpVerify(error?.response?.data?.responseMessage);
      } else {
        setErrorMesageOtpVerify(error.message);
      }
    }
  };
  const authHandler = (err, data) => {
    console.log("errror", err, data);
    // if (err) return thirdPartyLoginHandler({ error: true, provider: 'twitter', response: {} })
    // thirdPartyLoginHandler({ error: false, provider: 'twitter', response: data })
  };
  const formInitialSchema = {
    email: emailOtp,
    otp: "",
  };
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

  // instagram login

  const responseInstagram = async (response) => {
    console.log("response-----", response);
    setIsLoading(true);

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
        // auth.setIsLogin(true);

        toast.success("You are successfully logged in.");
        console.log("email--------->", res);
        window.localStorage.setItem("email", res.data.result.email);
        window.localStorage.setItem("status", res.data.result.status);
        window.sessionStorage.setItem("email", res.data.result.email);
        window.sessionStorage.setItem("token", res.data.result.token);
        window.localStorage.setItem("token", res.data.result.token);
        window.localStorage.setItem("status", res.data.result.userInfo.status);

        setTimeout(() => {
          auth.handleUserProfileApi();
        }, 500);
        if (res.data.result.userInfo.firstTime === false) {
          setReferralOpen(true);
        } else {
          history.push("/explore");
        }


        // if (res.data.result.name) {
        //   history.push("/explore");
        // } else {
        //   history.push({
        //     pathname: "/settings",
        //     hash: "editProfile",
        //   });
        // }
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.responseMessage);
      setIsLoading(false);
    }
  };




  return (
    <form onSubmit={(event) => handleFormSubmit(event)}>
      <Page title="Login In ">
        <Box className={classes.headingBox}>
          <Typography variant="h2">Sign In</Typography>
          <Typography variant="h6">
            Welcome back, you’ve been missed!
          </Typography>
          <Typography variant="body2">
            If you have already registerd ?
          </Typography>
        </Box>
        <Paper className={classes.loginBox} elevation={2}>
          <Box className="loginForm">
            <Grid container direction={"column"} spacing={2}>
              <Grid item style={{ marginTop: "10px" }}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
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
                              // marginRight: "5px",
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
                    {/* 

                      <Grid item xs={12} sm={6}>
                      <AppleLogin
                        appId="1088597931155576 "
                        render={(renderProps) => (
                          <Button
                            disabled={renderProps.disabled}
                            onClick={renderProps.onClick}
                            startIcon={<FaApple />}
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            style={{
                              marginRight: "5px",
                              backgroundColor: "#000000",
                              borderRadius: "60px",
                              height: "50px",
                            }}
                          >
                            Continue With Apple
                          </Button>
                        )}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={"single_host_origin"}
                      />
                    </Grid>

                  
                  */}

                    <Grid item xs={12} sm={6}>
                      <FacebookLogin
                        // appId="358926006190709"
                        appId="580453067092332"
                        // autoLoad={true}
                        fields="name,email,picture"
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
                    {/*<Grid item xs={12} sm={6}>


                      <InstagramLogin cssClass="twitterBtn"
                        clientId="5fd2f11482844c5eba963747a5f34556"
                        onSuccess={responseInstagram}
                        onFailure={responseInstagram}
                      >
                        <FaFontAwesome
                          name="instagram"
                        />
                        <span> Login with Instagram</span>
                      </InstagramLogin>

                      </Grid> */}
                    {/* <Grid item xs={12} sm={6}>
                      <TwitterLogin
                        // loginUrl="http://localhost:3000/api/v1/auth/twitter"
                        // requestTokenUrl="http://localhost:3000/api/v1/auth/twitter/reverse"
                        // style={{ width: "23vw", borderRadius: "0" }}
                        icon={
                          <BsTwitter
                            style={{
                              fontSize: "20px",
                              marginRight: "5px",
                            }}
                          />
                        }
                        fullWidth
                        authCallback={authHandler}
                        consumerKey="bzhpU0lGSVprQmFwc2Zkb0x1clE6MTpjaQ"
                        consumerSecret="k-0IKxC8_aVkgull0qtBM8t6RyC87K52Wv3AcOnTDijbdhAlxV"
                        className={classes.twitterButton}
                        buttonTheme="dark"
                        // onSuccess={authHandler}
                      />
                    </Grid> */}
                    {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<FaTwitter style={{ color: "#1877f2" }} />}
                      size="large"
                      fullWidth
                      style={{
                        marginRight: "5px",
                        backgroundColor: "#fff",
                        color: "#1877f2",
                      }}
                    >
                      Log in with Twitter
                    </Button>
                  </Grid> */}
                  </Grid>
                </Box>
              </Grid>
              <Grid item>
                <Box className={classes.or}>
                  {/* 
             
               
                  <Typography variant="body2">OR</Typography>
              
             
          */}
                </Box>
              </Grid>
              <Grid item xs={12} className={classes.donation}>
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

                      variant="outlined"
                      size="small"
                      name="email"
                      type="email"
                      placeholder="Enter your email "
                      fullWidth
                      onChange={_onInputChange}
                      error={Boolean(
                        (isSubmit && checked1 && formValue.email === "") ||
                        (formValue.email !== "" &&
                          checked1 &&
                          !isValidEmail(formValue.email))
                      )}
                      InputProps={{
                        startAdornment: (
                          <MailOutlineIcon position="start">Kg</MailOutlineIcon>
                        ),
                      }}
                    />
                    <FormHelperText error>
                      {(isSubmit && checked1 && formValue.email === "" && (
                        <Box ml={1}>Email is a required </Box>
                      )) ||
                        (formValue.email !== "" &&
                          checked1 &&
                          !isValidEmail(formValue.email) && (
                            <Box ml={1}>Enter a valid email address </Box>
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
                        (isSubmit && checked2 && !isValidNumber(mobileNumber))
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
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    size="small"
                    name="password"
                    placeholder="Enter your password!"
                    onChange={_onInputChange}
                    error={Boolean(
                      (isSubmit && formValue.password === "") ||
                      (isSubmit && !validPassword(formValue.password))
                    )}
                    InputProps={{
                      startAdornment: <LockIcon position="start">Kg</LockIcon>,
                      endAdornment: (
                        <IconButton
                          position="end"
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          // onMouseDown={handleMouseDownPassword}
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
                          Password must be minimum 8 and maximum 16 characters , one special character, uppercase letter , lowercase letter.
                        </Box>
                      ))}
                  </FormHelperText>
                </FormControl>
                {errorMessage && (
                  <Box
                    ml={1}
                    mt={1}
                    style={{ color: "#ba1f11", fontWeight: 600 }}
                  >
                    {errorMessage}
                  </Box>
                )}
              </Grid>
              <Grid item>
                <Box className={classes.root}>
                  <Box className="checkbox">
                    <Checkbox
                      checked={checkBoxRemember}
                      onChange={(event) => setCheckedBox(!checkBoxRemember)}
                      // defaultChecked
                      size="small"
                      inputProps={{
                        "aria-label": "checkbox with small size",
                      }}
                    />
                    <Typography variant="body2">Remember me</Typography>
                  </Box>
                  <Typography variant="body2">
                    <Link component={RouterComponent} to="/forget-password">
                      Forgot Password?
                    </Link>
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box className="d-flex justify-space-between">
                  <Button
                    variant="contained"
                    type="submit"
                    color="secondary"
                    fullWidth
                    size="large"
                    // type="submit"
                    // onClick={handleFormSubmit}
                    disabled={isLoading}
                  >
                    Sign In {isLoading && <ButtonCircularProgress />}
                  </Button>
                </Box>
              </Grid>
              <Box textAlign="center">
                <Typography
                  // color="primary.main"
                  variant="body2"
                  style={{ marginTop: "20px" }}
                >
                  Don’t have any Account? &nbsp;
                  <Link component={RouterComponent} to="/signup">
                    Sign Up
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Box>
        </Paper>

        {verifyOTPOpen && (
          <Dialog
            fullWidth
            maxWidth="sm"
            open={verifyOTPOpen}
          // onClose={() => setVerifyOTPOpen(false)}
          >
            <DialogContent>
              <Page title="Verify OTP">
                <Box textAlign="center">
                  <Typography variant="h2">Verify OTP</Typography>
                  <Box mt={2}>
                    <Typography variant="h6">
                      Please Enter The Verification Code Send To Your Email
                      Address Or Mobile Number
                    </Typography>
                  </Box>
                </Box>
                <Box
                  className="coin_list"
                  elevation={2}
                  style={{ padding: "25px", textAlign: "center" }}
                >
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
                                if (event?.key === "-" || event?.key === "+") {
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
                          {errorMessageOtpVerify && (
                            <Box
                              textAlign="left"
                              ml={1}
                              mt={1}
                              style={{ color: "#ba1f11", fontWeight: 600 }}
                            >
                              {errorMessageOtpVerify}
                            </Box>
                          )}
                          {errorMessageOtp && (
                            <Box
                              textAlign="left"
                              ml={1}
                              mt={1}
                              style={{ color: "green", fontWeight: 600 }}
                            >
                              {errorMessageOtp}
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
                            disabled={isLoading}
                          >
                            Resend OTP
                          </label>{" "}
                          &nbsp;
                          {/* <Box mt={1}>
                            <Typography variant="h6">
                              Always Make Sure That You Are Visiting The Current
                              URL
                            </Typography>
                          </Box> */}
                          &nbsp;
                        </Box>
                      )}
                    </>
                  )}
                </Box>
              </Page>
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
      </Page>


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
    </form>
  );
}

export default Login;
