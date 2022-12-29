import {
  Typography,
  Box,
  FormControl,
  Button,
  FormHelperText,
  TextField,
  Link,
  IconButton,
  InputAdornment,
  OutlinedInput,
  makeStyles,
  Container,
  Paper,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import "react-phone-input-2/lib/style.css";
import { Formik, Form } from "formik";
import LockIcon from "@material-ui/icons/Lock";
import * as yep from "yup";
import Page from "src/component/Page";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import axios from "axios";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { values } from "lodash";
import { toast } from "react-toastify";

export default function (props) {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const history = useHistory();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setLoader] = useState(false);
  const formInitialSchema = {
    otp: "",
    email: "",
  };
  const formValidationSchema = yep.object().shape({
    otp: yep
      .string()
      .max(4, "Only 4 digits are valid")
      .required("OTP is required"),
  });
  const useStyles = makeStyles((theme) => ({
    otp: {
      width: 30,
      height: 35,
      textAlign: "center",
      marginLeft: 10,
      // marginBottom: 10,
      border: "0.8px solid",
      borderRadius: "3px",
      fontSize: 20,
    },
  }));
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMesage] = useState();

  const verifyOTP = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "PUT",
        url: ApiConfig.verifyOtp,
        data: {
          otp: values.otp,
          email: window.sessionStorage.getItem("email"),
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoading(false);
        toast.success("otp verify succefully");
        history.push("/reset-password");
        // window.sessionStorage.setItem("otp", values.otp);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMesage(error?.response?.data?.responseMessage);
    }
  };
  const resendOTP = async () => {
    // setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.resendOtp,
        data: {
          email: window.sessionStorage.getItem("email"),
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoading(false);
        toast.success("resend otp successfully");
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMesage(error?.response?.data?.responseMessage);
    }
  };
  return (
    <>
      <Container maxWidth="sm">
        <Page title="Verify OTP">
          <Box textAlign="center" mt={5} mb={5}>
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
              // noValidate onSubmit={handleSubmit}
              initialValues={formInitialSchema}
              validationSchema={formValidationSchema}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
                setFieldValue,
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
                        value={values.otp}
                        error={Boolean(touched.otp && errors.otp)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error>
                        {touched.otp && errors.otp}
                      </FormHelperText>
                    </FormControl>
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
                  </Box>
                  <Box mt={3}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      fullWidth
                      size="large"
                      disabled={isloading || isLoading}
                      // onClick={verifyOTP}
                    >
                      Verify OTP {isloading && <ButtonCircularProgress />}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
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
              </Box>
            )}
          </Box>
        </Page>
      </Container>
    </>
  );
}
