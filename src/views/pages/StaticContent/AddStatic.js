import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Box,
  TextField,
  Grid,
  Typography,
  makeStyles,
  FormHelperText,
  Paper,
  Container,
} from "@material-ui/core";
import "react-phone-input-2/lib/style.css";
import Page from "src/component/Page";
import { Form, Formik } from "formik";
import { AuthContext } from "src/context/Auth";
import { toast } from "react-toastify";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import * as yep from "yup";
import ApiConfig from "src/ApiConfig/ApiConfig";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "15px",
  },
  formBox: {
    padding: "15px",
    position: "relative",
    background: "#000",
    borderRadius: "10px",
    marginTop: "30px",
    marginBottom: "15px",
  },
}));

const formValidationSchema = yep.object().shape({
  subject: yep
    .string()
    .required(" Subject is required")
    .min(2, "Please enter atleast 2 characters")
    .max(35, "You can enter only 35 characters")
    .matches(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
      "Only alphabets and whitespaces are allowed for this field number are not. "
    ),
  description: yep
    .string()
    .required(" Message is required")
    .min(2, "Please enter atleast 2 characters")
    .max(750, "You can enter only 750 characters"),
});

export default function AddStatic() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [btnText, setBtnText] = useState("SUBMIT");
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const [imgLoader, setImgLoader] = useState(false);
  const auth = useContext(AuthContext);
  const userIdd = auth?.userData?.userId;
  const [imageFront, setImageFront] = useState("");
  const userName =
    `${auth.userData?.firstName}` + " " + `${auth.userData?.lastName}`;
  const userEmail = auth.userData?.email;
  const userImage = auth.userData?.imageUrl;

  const formInitialValue = {
    supportType: "",
    imageUrl: "",
    subject: "",
    description: "",
  };

  const FormHandleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.addStaticContent,
        data: {
          //   subject: values.subject,
          //   description: values.description,
          type: "string",
          title: "string",
          description: "string",
        },
      });
      if (res.data.status === 200) {
        setBtnText("SUBMIT");
        toast.success("Your request has been sent successfully");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <Page title="Add Static Content">
      <Paper className={classes.root}>
        <Box>
          <Typography variant="h3" color="primary.main">
            Add Static Content
          </Typography>
        </Box>
        <Container maxWidth="md">
          <Box className={classes.formBox}>
            <Formik
              initialValues={formInitialValue}
              initialStatus={{
                success: false,
                successMsg: "",
              }}
              validationSchema={formValidationSchema}
              onSubmit={(values, { resetForm }) => {
                FormHandleSubmit(values);
                resetForm();
              }}
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
                  <Grid container spacing={2} direction={"column"}>
                    <Grid item xs={12} md={12}>
                      <label>
                        Title<sup>*</sup>
                      </label>
                      <Box mt={1}>
                        <TextField
                          placeholder="Enter Subject"
                          type="text"
                          size="small"
                          variant="outlined"
                          fullWidth
                          name="subject"
                          value={values.subject}
                          error={Boolean(touched.subject && errors.subject)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <FormHelperText
                          error
                          style={{ margin: "0px", fontSize: "12px" }}
                        >
                          {touched.subject && errors.subject}
                        </FormHelperText>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <label>
                        Description<sup>*</sup>
                      </label>
                      <Box mt={1}>
                        <TextField
                          placeholder="Enter your message"
                          type="text"
                          size="small"
                          variant="outlined"
                          //  multiline
                          fullWidth
                          maxRows={4}
                          Scroll="auto"
                          name="description"
                          className={classes.description}
                          value={values.description}
                          error={Boolean(
                            touched.description && errors.description
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <FormHelperText
                          error
                          style={{ margin: "0px", fontSize: "12px" }}
                        >
                          {touched.description && errors.description}
                        </FormHelperText>
                      </Box>
                    </Grid>
                    <Grid item xs={12} align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        size="large"
                        disabled={isLoading}
                      >
                        {btnText} {isLoading && <ButtonCircularProgress />}
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </Paper>
    </Page>
  );
}
