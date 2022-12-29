import React, { useState } from "react";
import {
  Typography,
  Box,
  FormControl,
  Button,
  FormHelperText,
  Link,
  IconButton,
  InputAdornment,
  OutlinedInput,
  makeStyles,
  Grid,
  Container
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Link as RouterComponent } from "react-router-dom";
import { Formik, Form } from "formik";
import * as yup from "yup";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function PasswordAndSecurity(props) {
  const classes = useStyles();
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [newPasowordChecking, setNewPasowordChecking] = useState(false);
  const [errorMessage, setErrorMesage] = useState(false);
  const [errorMesageSucces, setErrorMesageSucces] = useState(false);

  const formInitialSchema = {
    currentPassword: "",
    password: "",
    confirmPassword: "",
  };
  const formValidationSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .required(<Box ml={1}>Current password is required</Box>),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/
      ),
    confirmPassword: yup
      .string()
      .required(<Box ml={1}>Confirm password is required</Box>)
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const handleFormSubmit = async (values, actions) => {
    try {
      const res = await axios({
        method: "POST",
        url: Apiconfig.changePassword,

        headers: {
          token: localStorage.getItem("token"),
        },
        data: {
          currentPassword: values.currentPassword,
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
      });
      if (res.data.responseCode === 200) {
        setTimeout(() => {
          setErrorMesageSucces(""); // count is 0 here
        }, 5000);
        setErrorMesageSucces(res.data.responseMessage);
      } else {
      }
    } catch (error) {
      toast.error(error);
      setTimeout(() => {
        setErrorMesage(""); // count is 0 here
      }, 5000);
      setErrorMesage(error?.response?.data?.responseMessage);
    }
  };
  return (
    <>
      <Box className={classes.root}>
        <Grid container direction={"column"} spacing={2}>
          <Grid item xs={12}>
            <Box>
              <Typography variant="h3"> Password & Security</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="sm" mt={1}>
              <Formik
                onSubmit={(values, { resetForm }) => {
                  handleFormSubmit(values);
                  // resetForm();
                }}
                initialValues={formInitialSchema}
                initialStatus={{
                  success: false,
                  successMsg: "",
                }}
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
                    <Grid container spacing={1} direction={"column"}>
                      <Grid item xs={12} lg={12}>
                        <Box>
                          <FormControl fullWidth style={{ marginTop: "1rem" }}>
                            <Typography
                              variant="h6"
                              style={{ paddingBottom: "10px" }}
                            >
                              Current Password
                            </Typography>
                            <OutlinedInput
                              type={currentPassword ? "text" : "password"}
                              variant="outlined"
                              size="small"
                              name="currentPassword"
                              autocomplete="off"
                              // value={values.currentPassword}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={Boolean(
                                touched.currentPassword &&
                                errors.currentPassword
                              )}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle currentPassword visibility"
                                    onClick={() =>
                                      setCurrentPassword(!currentPassword)
                                    }
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {currentPassword ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                          <FormHelperText error>
                            {touched.currentPassword && errors.currentPassword}
                          </FormHelperText>
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <Box mt={2}>
                          <FormControl fullWidth style={{ marginTop: "1rem" }}>
                            <Typography
                              variant="h6"
                              style={{ paddingBottom: "10px" }}
                            >
                              New Password
                            </Typography>
                            <OutlinedInput
                              type={newPassword ? "text" : "password"}
                              variant="outlined"
                              size="small"
                              name="password"
                              autocomplete="off"
                              // value={values.password}
                              error={Boolean(
                                touched.password && errors.password && (
                                  <Box ml={1}>Current password is required</Box>
                                )
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setNewPassword(!newPassword)}
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {newPassword ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                            <FormHelperText error>
                              {touched.password && errors.password && (
                                <Box ml={1}>
                                  {/* Must contain 8 characters, one uppercase, one
                                lowercase, one number and one special
                                character */}
                                  Password must be minimum 8 and maximum 16 characters , one special character, uppercase letter , lowercase letter.
                                </Box>
                              )}
                            </FormHelperText>
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={12}>
                        <Box mt={2}>
                          <FormControl fullWidth style={{ marginTop: "1rem" }}>
                            <Typography
                              variant="h6"
                              style={{ paddingBottom: "10px" }}
                            >
                              Confirm Password
                            </Typography>
                            <OutlinedInput
                              type={newPasowordChecking ? "text" : "password"}
                              variant="outlined"
                              size="small"
                              name="confirmPassword"
                              autocomplete="off"
                              // value={values.confirmPassword}
                              error={Boolean(
                                touched.confirmPassword &&
                                errors.confirmPassword
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle confirmPassword visibility"
                                    onClick={() =>
                                      setNewPasowordChecking(
                                        !newPasowordChecking
                                      )
                                    }
                                    // onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {newPasowordChecking ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                            <FormHelperText error>
                              {touched.confirmPassword &&
                                errors.confirmPassword}
                            </FormHelperText>
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid></Grid>
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
                      {errorMesageSucces && (
                        <Box
                          ml={1}
                          mt={1}
                          style={{ color: "green", fontWeight: 600 }}
                        >
                          {errorMesageSucces}
                        </Box>
                      )}

                      <Grid item xs={12} lg={12} align="center">
                        <Box mt={5}>
                          <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            size="large"
                          >
                            Save
                          </Button>
                        </Box>
                      </Grid>
                      <Grid item xs={12} lg={12} align="center">
                        {/* <Box mt={2} mb={8}>
                          <Typography color="secondary.main" variant="body2">
                            <Link
                              component={RouterComponent}
                              to="/forget-password"
                            >
                              Forget Password?
                            </Link>
                          </Typography>
                        </Box> */}
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default PasswordAndSecurity;
