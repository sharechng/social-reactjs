import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";

const ContactForm = (props) => {
  return (
    <Box className="sectionPadding">
      <Container maxWidth="md">
        <Box mb={10} textAlign="center">
          <Container maxWidth="sm">
            <Typography variant="h4" paragraph>
              Have Any Question?
            </Typography>
            <Typography>
              Suspendisse elementum risus eu aliquam sollicitudin. Fusce
              convallis hendrerit urna sit amet bibendum
            </Typography>
          </Container>
        </Box>
        <Box mb={5}>
          <Typography variant="body1" align="center">
            Suspendisse elementum risus eu aliquam sollicitudin. Fusce convallis
            hendrerit urna sit amet bibendum. Nullam viverra, risus eu pretium
            faucibus, augue dui finibus dolor. Suspendisse elementum risus eu
            aliquam sollicitudin. dolor,
          </Typography>
        </Box>
        <Formik
          initialValues={{
            email: "",
            firstName: "",
            number: "",
            subject: "",
            msg: "",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required("Required"),
            firstName: Yup.string().required("Required"),
            number: Yup.string()
              .required("Required")
              .min(10, "Please enter valid mobile number")
              .max(10, "Please enter valid mobile number"),
            subject: Yup.string().required("Required"),
            msg: Yup.string().required("Required"),
          })}
          onSubmit={async (
            values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            // console.log("Submited");
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    helperText={touched.firstName && errors.firstName}
                    label="Name *"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address *"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.number && errors.number)}
                    fullWidth
                    helperText={touched.number && errors.number}
                    label="Phone Number *"
                    name="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"
                    value={values.number}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.subject && errors.subject)}
                    fullWidth
                    helperText={touched.subject && errors.subject}
                    label="Subject *"
                    name="subject"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.subject}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Box mt={2}>
                <TextField
                  error={Boolean(touched.msg && errors.msg)}
                  fullWidth
                  helperText={touched.msg && errors.msg}
                  label="Message *"
                  name="msg"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.msg}
                  variant="outlined"
                  multiline
                  maxRows={10}
                  // rows={10}
                />
              </Box>
              <Box mt={2} textAlign="center">
                <Button
                  color="secondary"
                  disabled={isSubmitting}
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Send message
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};

export default ContactForm;
