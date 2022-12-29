import React, { useState, useEffect } from "react";
import "src/scss/main.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import {
  Typography,
  Button,
  Box,
  Paper,
  TextField,
  Link,
  makeStyles,
  Grid,
  Container,
  FormControl,
  FormHelperText,
  OutlinedInput,
} from "@material-ui/core";
import axios from "axios";
import * as yup from "yup";
import moment from "moment";
import Page from "src/component/Page";
import { toast } from "react-toastify";
import Dialog from "@material-ui/core/Dialog";
import ApiConfig from "src/ApiConfig/ApiConfig";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { Formik, ErrorMessage, Form, useFormik } from "formik";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { calculateTimeLeft, tokenName } from "src/utils";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const useStyles = makeStyles((theme) => ({
  get: {
    alignItems: "center",
    textAlign: "center",
    marginTop: "5rem",
    marginBottom: "1rem",
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
}));

// const initialValues = {
//   email: "",
// };

// const validationSchema = yup.object({
//   email: yup.string().email().required("Required"),
// });

function Forgetassword(props) {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState();
  const [errorMessage, setErrorMesage] = useState("");
  const [endTime, setEndtime] = React.useState();
  const [verifyOTPOpen, setVerifyOTPOpen] = useState(false);
  const [emailOtp, setEmail] = React.useState();
  const [errorMessageresend, setErrorMesageResend] = useState();
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoadingresend, setIsLoadingResend] = useState(false);
  const [isloading, setIsloading] = React.useState(false);
  const [timeLeft, setTimeLeft] = useState();
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  console.log("emailOtp", emailOtp, mobileNumber);
  const [countryCode, setCountryCode] = useState("");
  const [formValue, setFormValue] = useState({
    email: "",
  });

  const formInitialSchema = {
    email: "",
    mobileNumber: "",
  };
  console.log("errorMessage", errorMessage);

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
  const formValidationSchema = yup.object().shape(
    checked1
      ? {
        email: yup
          .string()
          .email(
            "You have entered an invalid email address. Please try again"
          )
          .required("Email address is required")
          .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
      }
      : {}
  );

  const verifyOTP = async (values) => {
    setIsLoading(true);
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
        setIsLoading(false);
        setTimeout(() => {
          setErrorMesageResend(""); // count is 0 here
        }, 5000);
        setErrorMesageResend(res.data?.responseMessage);
        toast.success(`${res.data.responseMessage} please login`);
        localStorage.setItem("email", res.data?.result.email);

        history.push("/reset-password");
        // window.sessionStorage.setItem("otp", values.otp);
      }
    } catch (error) {
      setIsLoading(false);
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
        toast.success("resend otp succefully");
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
  const formValidationSchemaOtp = yup.object().shape({
    otp: yup
      .string()
      // .required("Otp is required")
      .max(4, "Only four character OTP are allowed"),
  });

  useEffect(() => {
    if (verifyOTPOpen && endTime) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(endTime));
      }, 1000);
      return () => clearTimeout(timer);
    }
  });
  console.log("endTime", endTime, timeLeft);
  return (
    <>
      <Page title="Forget Password">
        <Container maxWidth="sm">
          <Box textAlign="center" mt={5} mb={5}>
            <Typography variant="h2" style={{ color: "rgb(186 184 189)" }}>
              Forgot Password?
            </Typography>
            <Typography variant="h6" style={{ color: "rgb(186 184 189)" }}>
              Enter your details to receive a rest link
            </Typography>
          </Box>
          <Paper className={classes.loginBox} elevation={2}>
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
                    setChecked2(true);
                    setChecked1(false);
                    setIsSubmit(false);
                  }}
                >
                  Mobile number
                </span>
              </Box>
            </Grid>
            <Box textAlign="center">
              <Formik
                initialValues={formInitialSchema}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={formValidationSchema}
                onSubmit={async (values) => {
                  setIsSubmit(true);
                  if (isValidNumber(mobileNumber) || values.email !== "") {
                    setIsLoading(true);
                    try {
                      const res = await axios({
                        method: "POST",
                        url: ApiConfig.forgotPassword,
                        data: {
                          email: checked2
                            ? mobileNumber?.slice(countryCode.length)
                            : values.email,
                        },
                      });
                      if (res.data.responseCode === 200) {
                        setEndtime(moment().add(5, "m").unix());
                        setIsSubmit(false);
                        setEmail(
                          mobileNumber
                            ? mobileNumber?.slice(countryCode.length)
                            : values.email
                        );
                        setVerifyOTPOpen(true);
                        setIsLoading(false);
                        toast.success("Please check your email for OTP");
                        // history.push("/verify-otp");
                        window.sessionStorage.setItem("email", values.email);
                      }
                    } catch (error) {
                      setIsSubmit(false);

                      setIsLoading(false);
                      setTimeout(() => {
                        setErrorMesage(""); // count is 0 here
                      }, 3000);
                      setErrorMesage(error?.response?.data?.responseMessage);

                    }
                  }
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  touched,
                  values,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Grid container direction={"column"} spacing={2}>
                      {checked1 && (
                        <Grid item>
                          <FormControl fullWidth style={{ marginTop: "30px" }}>
                            <TextField
                              type="text"
                              variant="outlined"
                              size="small"
                              name="email"
                              placeholder="Enter your email"
                              fullWidth
                              value={values.email}
                              // error={Boolean(touched.email && errors.email)}
                              error={Boolean(
                                (isSubmit &&
                                  checked1 &&
                                  formValue.email === "") ||
                                (formValue.email !== "" &&
                                  checked1 &&
                                  !isValidEmail(formValue.email))
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              InputProps={{
                                startAdornment: (
                                  <MailOutlineIcon position="start">
                                    Kg
                                  </MailOutlineIcon>
                                ),
                              }}
                            />
                            <FormHelperText error>
                              {touched.email && errors.email}
                            </FormHelperText>
                          </FormControl>

                        </Grid>
                      )}
                      &nbsp;
                      {checked2 && (
                        <Grid item>
                          <FormControl
                            fullWidth
                            style={{ marginTop: "12px", marginBottom: "16px" }}
                          >
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
                      {errorMessage && (
                        <Box
                          textAlign="start"
                          // textAlign="left"
                          ml={1}
                          mt={1}
                          style={{ color: "#ba1f11", fontWeight: 600 }}
                        >
                          {errorMessage}
                        </Box>
                      )}
                    </Grid>{" "}
                    <Box mt={2} mb={3}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        size="large"
                        disabled={isLoading}
                      // onClick={forgetPassword}
                      >
                        Send {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>

              <Box>
                <Link
                  component={RouterComponent}
                  to="/signup"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#E31A89",
                    textDecoration: "none"
                  }}
                >
                  <ChevronLeftIcon />Back to Sign Up
                </Link>
              </Box>
            </Box>
          </Paper>
        </Container>

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
                              disabled={isloading || isLoading}
                            >
                              Verify OTP{" "}
                              {isLoading && <ButtonCircularProgress />}
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
                            &nbsp;
                          </Box>
                        )}
                      </>
                    )}
                  </Typography>
                </Box>
              </Page>
            </DialogContent>

          </Dialog>
        )}
      </Page>
    </>
  );
}

export default Forgetassword;
