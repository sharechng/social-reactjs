import React from "react";
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
  InputAdornment,
  FormControl,
  FormHelperText,
  OutlinedInput,
} from "@material-ui/core";
import Page from "src/component/Page";
import { FaApple, FaGoogle } from "react-icons/fa";
import AppleIcon from "@material-ui/icons/Apple";
// import { FaGoogle } from "react-icons/fa";
import PersonIcon from "@material-ui/icons/Person";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockIcon from "@material-ui/icons/Lock";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { Link as RouterComponent, useHistory } from "react-router-dom";
import * as yup from "yup";
import { Formik, ErrorMessage, Form, useFormik } from "formik";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import { BsGenderMale } from "react-icons/bs";
import axios from "axios";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import { FaTransgender } from "react-icons/fa";
import { values } from "lodash";
const useStyles = makeStyles((theme) => ({
  iconstyle: {
    // border: "1px solid #444",
    padding: "0 10px !important",
    // backgroundColor: "#f5f5f5",
    height: "45px",
    color: "white",
    fontSize: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    //  background: "black",
  },
  loginBox: {
    padding: "40px 30px",
  },
}));

const validationSchema = yup.object({
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,50}$/
    ),
  confirmPassword: yup
    .string()
    .required("Confirmation of your password is required")
    .oneOf([yup.ref("password"), null], "Password must match"),
});

function ResetPassword() {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState();
  const [isLoading, setIsLoading] = useState();

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const resetPassword = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.resetPassword,
        data: {
          email: window.localStorage.getItem("email"),
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
      });
      if (res.data.responseCode === 200) {
        setIsLoading(false);
        toast.success("Password reset successfully");
        history.push("/");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <Box>
      <Page title="Reset Password">
        <Container maxWidth="sm">
          <Box textAlign="center" mt={5} mb={5}>
            <Typography variant="h2">Set a new password</Typography>
            <Typography variant="h6">
              Please never share with anyone for safe use.
            </Typography>
          </Box>
          <Paper className={classes.loginBox} elevation={2}>
            <Box textAlign="center">
              <Formik
                onSubmit={(values) => resetPassword(values)}
                initialValues={{
                  password: "",
                  confirmPassword: "",
                  email: "",
                }}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
                validationSchema={yup.object().shape({
                  password: yup
                    .string()
                    .required("Password is required")
                    .matches(
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                    ),
                  confirmPassword: yup
                    .string()
                    .required("Confirmation of your password is required")
                    .oneOf([yup.ref("password"), null], "Passwords must match"),
                })}
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
                    <Grid item>
                      <FormControl fullWidth style={{ marginTop: "1rem" }}>
                        <TextField
                          type={showPassword ? "text" : "password"}
                          variant="outlined"
                          size="small"
                          name="password"
                          placeholder="Enter your New password!"
                          value={values.password}
                          error={Boolean(touched.password && errors.password)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
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
                          {touched.password && errors.password && (
                            <ul
                              style={{
                                padding: "0px 0px 0px 19px",
                                marginTop: "0px",
                              }}
                            >
                              <li>Must be at least 8 Characters long</li>
                              <li>Must be atleast One Uppercase letter</li>
                              <li> Must be atleast One Lowercase letter</li>
                              <li> Must be at least One digit</li>
                              <li>
                                Must be at least one special case Character
                              </li>
                            </ul>
                          )}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl fullWidth style={{ marginTop: "1rem" }}>
                        <TextField
                          type={showPassword1 ? "text" : "password"}
                          variant="outlined"
                          size="small"
                          placeholder="Confirm New Password!"
                          name="confirmPassword"
                          error={Boolean(
                            touched.confirmPassword && errors.confirmPassword
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          InputProps={{
                            startAdornment: (
                              <LockIcon position="start">Kg</LockIcon>
                            ),
                            endAdornment: (
                              <IconButton
                                position="end"
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword1(!showPassword1)}
                                // onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword1 ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            ),
                          }}
                        />
                        <FormHelperText error>
                          {touched.confirmPassword && errors.confirmPassword}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                    <Box mt={3} mb={3}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        fullWidth
                        size="large"
                      >
                        Submit and Reset
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Paper>
        </Container>
      </Page>
    </Box>
  );
}

export default ResetPassword;
