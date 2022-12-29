import React, { useState, useContext, useEffect } from "react";
import {
  makeStyles,
  Grid,
  Box,
  Typography,
  FormControl,
  OutlinedInput,
  FormHelperText,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Paper,
} from "@material-ui/core";
import { FaTransgender } from "react-icons/fa";
import Page from "src/component/Page";
import { FiUpload } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import "react-country-dropdown/dist/index.css";
import PhoneInput from "react-phone-input-2";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import { Formik, Form } from "formik";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import * as yup from "yup";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { AuthContext } from "src/context/Auth";
import Apiconfig from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  radio: {
    width: "100%",
    height: "47px",
    display: "flex",
    borderRadius: "15px",
    alignItems: "center",
    backgroundColor: "#242526",
    justifyContent: "space-evenly",
    border: "1px solid rgb(83 84 85)",
    [theme.breakpoints.down("xs")]: {
      height: "35px",
    },
    "&:hover": {
      borderColor: "#fff",
    },
    "& .innerRadio": {
      display: "flex",
      alignItems: "center",
      // border: "none",
    },
  },
  root: {
    "& .postImg": {
      width: "120px",
      height: "120px",
      margin: "16px 0",
      borderRadius: "20px",
      position: "relative",
      "& img": {
        width: "100%",
        objectFit: "cover",
        height: "100%",
        borderRadius: "50%",
      },

      "& button": {
        position: "absolute",
        border: "3px solid #373737",
        bottom: 0,
        right: 0,
        backgroundColor: "#fff",
        color: "#000",
        fontSize: "15px",
        "& input": {
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0",
          left: "0",
          opacity: 0,
        },
      },
    },
    "& .postImg1": {
      width: "120px",
      height: "120px",
      margin: "16px 0",
      borderRadius: "20px",
      position: "relative",
      "& img": {
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        objectFit: "cover",
      },

      "& button": {
        position: "absolute",
        border: "3px solid #373737",
        bottom: 0,
        right: 0,
        backgroundColor: "#fff",
        color: "#000",
        fontSize: "15px",
        "& input": {
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0",
          left: "0",
          opacity: 0,
        },
      },
    },
    "& .uploadbtn": {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      margin: "auto",
      backgroundColor: "#FFF",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "5px",
    },
    "& .form": {
      "& .sociallinks": {
        padding: "15px 0px 0px",
        "& h5": {
          padding: "15px 0px",
        },
      },
      "& .innerRadio": {
        borderRadius: "14px",
        // border: "0.25px solid #656565",
        height: "45px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
    },
  },
}));

function EditProfile({ userProfileData }) {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [errorMessage, setErrorMesage] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEdit, setIsEdit] = React.useState(true);
  const [base64Img, setBase64Img] = useState("");
  const [base64Img1, setBase64Img1] = useState("");
  console.log("isEdit", isEdit);
  const [userData, setUserData] = useState({
    userName: "",
    name: "",
    mobileNumber: "",
    coverPic: "",
    profilePic: "",
    email: "",
    countryCode: "",
    dob: "",
    bio: "",
    gender: "",
    profilePic: "",
    coverPic: "",
    location: "",
    // massPageUrl: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedIn: "",
  });

  useEffect(() => {
    if (auth?.userData) {
      setBase64Img(auth?.userData.profilePic);
      setBase64Img1(auth?.userData.coverPic);
    }
  }, [auth?.userData]);
  function imageUpload(event) {
    let base64img = userData.profilepic;
    let reader = new FileReader();
    reader.onload = function () {
      base64img = reader.result;
      setBase64Img(base64img);
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  function imageUpload1(event) {
    let base64img1 = userData.coverPic;
    let reader = new FileReader();
    reader.onload = function () {
      base64img1 = reader.result;
      setBase64Img1(base64img1);
    };

    reader.readAsDataURL(event.target.files[0]);
  }
  const [mobileNumberField, setMobileNumber] = useState("");

  const formInitialSchema = {
    email: auth?.userData.email ? auth?.userData.email : "",
    userName: auth?.userData.userName ? auth?.userData.userName : "",
    name: auth?.userData.name ? auth?.userData.name : "",
    // mobileNumber: auth?.userData.mobileNumber,
    dob: auth?.userData.dob ? auth?.userData.dob : "",
    bio: auth?.userData.bio ? auth?.userData.bio : "",
    gender: auth?.userData.gender ? auth?.userData.gender : "",
    profilePic: auth?.userData.profilePic ? auth?.userData.profilePic : "",
    coverPic: auth?.userData.coverPic ? auth?.userData.coverPic : "",
    location: auth?.userData.location ? auth?.userData.location : "",
    facebook: auth?.userData.facebook ? auth?.userData.facebook : "",
    twitter: auth?.userData.twitter ? auth?.userData.twitter : "",
    instagram: auth?.userData.instagram ? auth?.userData.instagram : "",
    linkedIn: auth?.userData.linkedIn ? auth?.userData.linkedIn : "",
  };

  const formValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("You have entered an invalid email address. Please try again")
      // .required("Email address is required")
      .matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"),
    // mobileNumber: yup
    //   .string()
    //   .matches(
    //     /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/,
    //     "Must be a valid mobilie number"
    //   ),
    name: yup
      .string()
      //  .min(2, 'Too Short!')
      .max(30, "Max charactor less than 30"),
    userName: yup
      .string()
      //  .min(2, 'Too Short!')
      .max(30, "Max charactor less than 30"),
    // .required("Required"),
    bio: yup
      .string()
      //  .min(2, 'Too Short!')
      .max(100, "Max charactor less than 100"),
    location: yup
      .string()
      //  .min(2, 'Too Short!')
      .max(100, "Max charactor less than 100"),
    dob: yup
      .string()
      .test(
        "DOB",
        " DOB is required you must be atleast 18 years old or above",
        (date) => moment().diff(moment(date), "years") >= 18
      ),
    facebook: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      ),
    twitter: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      ),
    instagram: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      ),
    linkedIn: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Enter correct url!"
      ),
    gender: yup.string(),
    // .required(" required")
  });
  const isValidNumber = (value) => {
    const re =
      /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
    return re.test(value);
  };
  useEffect(() => {
    if (auth?.userData) {
      setMobileNumber(
        auth?.userData?.mobileNumber
          ? `${auth?.userData?.countryCode}${auth?.userData?.mobileNumber}`
          : ""
      );
      setCountryCode(
        auth?.userData?.countryCode ? auth?.userData?.countryCode : ""
      );
    }
  }, [auth?.userData]);
  const handleFormSubmit = async (values) => {
    setIsUpdating(true);
    // if(

    // ){}
    axios({
      method: "PUT",
      url: Apiconfig.updateprofile,
      data: {
        userName: values.userName,
        name: values.name,
        mobileNumber: mobileNumberField
          ? mobileNumberField.slice(countryCode.length)
          : "",
        profilePic: base64Img,
        coverPic: base64Img1,
        email: values.email,
        gender: values.gender,
        bio: values.bio,
        location: values.location,
        facebook: values.facebook,
        twitter: values.twitter,
        instagram: values.instagram,
        linkedIn: values.linkedIn,
        dob: values.dob,
        countryCode: countryCode,
      },
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsUpdating(false);
        if (res.data.responseCode === 200) {
          history.push("/profile");
          auth.handleUserProfileApi();
          toast.success(res.data.responseMessage);
          if (res.data.result.docs) {
            toast.success(res.data.responseMessage);
          }
        }
      })
      .catch((error) => {
        setIsUpdating(false);
        setTimeout(() => {
          setErrorMesage(""); // count is 0 here
        }, 5000);
        setErrorMesage(error?.response?.data?.responseMessage);
        // toast.error(error?.response?.data?.responseMessage);
      });
  };

  return (
    <>
      <Page title='Edit Profile'>
        <Box className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} lg={3} md={12}>
              <Grid container direction={"column"} spacing={2}>
                <Grid item xs={12} align='center'>
                  <Typography variant='h3' align='left'>
                    Edit Profile
                  </Typography>
                </Grid>
                <Grid item xs={12} align='center'>
                  <Grid
                    container
                  // style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      lg={12}
                      md={6}
                      style={{ cursor: "pointer" }}
                    >
                      <figure className='postImg'>
                        <img src={base64Img ? base64Img : "/images/user.png"} />
                        {!isEdit && (
                          <IconButton disabled={isEdit}>
                            <FiUpload />
                            <input
                              type='file'
                              accept='image/*'
                              onChange={imageUpload}
                            />
                          </IconButton>
                        )}
                      </figure>
                      <Typography>Profile</Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      lg={12}
                      md={6}
                    // style={!isEdit ? { cursor: "pointer" } : ""}
                    >
                      <figure className='postImg1'>
                        <img
                          src={base64Img1 ? base64Img1 : "/images/user.png"}
                        />
                        {!isEdit && (
                          <IconButton disabled={isEdit}>
                            <FiUpload />
                            <input
                              type='file'
                              accept='image/*'
                              onChange={imageUpload1}
                            />
                          </IconButton>
                        )}
                      </figure>
                      <Typography>Banner</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} lg={9} md={12}>
              <Box className='form'>
                <Formik
                  initialValues={formInitialSchema}
                  initialStatus={{
                    success: false,
                    successMsg: "",
                  }}
                  validationSchema={formValidationSchema}
                  onSubmit={(values) => handleFormSubmit(values)}
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
                    <Form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item lg={9} sm={9} xs={9}></Grid>

                        <Grid item lg={3} sm={3} xs={3} align='right'>
                          <Button onClick={() => setIsEdit(!isEdit)}>
                            <Typography variant='h5'>Edit </Typography>
                            <EditIcon
                              fontSize='small'
                              style={{ marginLeft: "5px" }}
                            />
                          </Button>
                        </Grid>
                        <Grid item lg={6} sm={6} xs={12}>
                          <FormControl fullWidth>
                            <Typography
                              variant='h6'
                              style={{ paddingBottom: "8px" }}
                              color='primary.main'
                            >
                              Username
                            </Typography>
                            <OutlinedInput
                              type='text'
                              variant='outlined'
                              size='small'
                              name='userName'
                              style={{ height: "45px" }}
                              disabled={auth?.userData.userName !== "" || isEdit}
                              // disabled={true}
                              value={
                                values.userName
                                  ? values.userName
                                  : userData?.userName
                              }
                              placeholder='User name'
                              // value={values.userName}
                              error={Boolean(
                                touched.userName && errors.userName
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <FormHelperText error>
                              {touched.userName && errors.userName}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item lg={6} sm={6} xs={12}>
                          <FormControl fullWidth>
                            <Typography
                              variant='h6'
                              style={{ paddingBottom: "8px" }}
                              color='primary.main'
                            >
                              Full Name
                            </Typography>
                            <OutlinedInput
                              type='text'
                              variant='outlined'
                              size='small'
                              name='name'
                              style={{ height: "45px" }}
                              disabled={isEdit}
                              placeholder='Name'
                              value={values.name ? values.name : userData?.name}
                              // placeholder="Kollol Baran Nath"
                              // value={values.userName}
                              error={Boolean(touched.name && errors.name)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <FormHelperText error>
                              {touched.name && errors.name}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                          <FormControl fullWidth>
                            <Typography variant='h6' color='primary.main'>
                              Date of birth
                            </Typography>
                            <Box mt={1}>
                              <KeyboardDatePicker
                                placeholder='DD/MM/YYYY'
                                value={values.dob}
                                disabled={isEdit}
                                onChange={(date) => {
                                  setFieldValue("dob", new Date(date));
                                }}
                                maxDate={moment().subtract(18, "year")}
                                format='DD/MM/YYYY'
                                inputVariant='outlined'
                                disableFuture
                                fullWidth
                                margin='dense'
                                name='dob'
                                error={Boolean(touched.dob && errors.dob)}
                                helperText={touched.dob && errors.dob}
                              />
                            </Box>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                          <FormControl fullWidth>
                            <Typography
                              variant='h6'
                              style={{ paddingBottom: "8px" }}
                              color='primary.main'
                            >
                              Email address
                            </Typography>
                            <OutlinedInput
                              type='text'
                              variant='outlined'
                              size='small'
                              name='email'
                              style={{ height: "45px" }}
                              placeholder='Add email'
                              disabled={auth?.userData.email !== "" || isEdit}
                              value={
                                values.email ? values.email : userData?.email
                              }
                              error={Boolean(touched.email && errors.email)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <FormHelperText error>
                              {touched.email && errors.email}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                          <FormControl fullWidth>
                            <Typography
                              variant='h6'
                              style={{ paddingBottom: "8px" }}
                              color='primary.main'
                            >
                              Bio
                            </Typography>
                            <OutlinedInput
                              type='text'
                              variant='outlined'
                              size='small'
                              name='bio'
                              style={{ height: "45px" }}
                              disabled={isEdit}
                              placeholder='Add a bio'
                              value={values.bio ? values.bio : userData?.bio}
                              error={Boolean(touched.bio && errors.bio)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <FormHelperText error>
                              {touched.bio && errors.bio}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                          <FormControl fullWidth>
                            <Typography
                              variant='h6'
                              style={{ paddingBottom: "8px" }}
                              color='primary.main'
                            >
                              Mobile number
                            </Typography>
                            <PhoneInput
                              country={"in"}
                              disabled={!auth?.userData.email || isEdit}
                              name='mobileNumber'
                              value={mobileNumberField}
                              error={
                                mobileNumberField !== "" &&
                                !isValidNumber(mobileNumberField)
                              }
                              // onBlur={handleBlur}
                              onChange={(phone, e) => {
                                setCountryCode(e.dialCode);
                                setMobileNumber(phone);
                                setFieldValue(phone);
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
                              {mobileNumberField !== "" &&
                                !isValidNumber(mobileNumberField) &&
                                "Enter a valid mobile number"}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item lg={6} sm={6} md={6} xs={12}>
                          <Typography
                            variant='h6'
                            style={{ paddingBottom: "8px" }}
                            color='primary.main'
                          >
                            Gender
                          </Typography>
                          {/* <Paper className="innerRadio"> */}
                          <FormControl component='fieldset' fullWidth>
                            <Box className={classes.radio}>
                              <FaTransgender
                                style={{ fontSize: "25px", margin: "13px" }}
                              />{" "}
                              <Box className='innerRadio'>
                                <RadioGroup
                                  style={{ marginBottom: "10px" }}
                                  aria-label='gender'
                                  name='gender'
                                  // value={value}
                                  variant='outlined'
                                  onChange={handleChange}
                                  display='flex'
                                  value={
                                    values.gender
                                      ? values.gender
                                      : userData?.gender
                                  }
                                  error={Boolean(
                                    touched.gender && errors.gender
                                  )}
                                  onBlur={handleBlur}
                                >
                                  <FormControlLabel
                                    value='male'
                                    control={<Radio />}
                                    label='Male'
                                    labelPlacement='end'
                                    disabled={isEdit}
                                  />
                                  <FormControlLabel
                                    value='female'
                                    control={<Radio />}
                                    labelPlacement='end'
                                    label='Female'
                                    style={{
                                      fontSize: ".5rem",
                                    }}
                                    disabled={isEdit}
                                  />
                                </RadioGroup>
                              </Box>
                            </Box>
                            <FormHelperText error>
                              <Box mt={1} ml={1}>
                                {touched.gender && errors.gender}
                              </Box>
                            </FormHelperText>
                          </FormControl>
                          {/* </Paper> */}
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                          <FormControl fullWidth>
                            <Typography
                              variant='h6'
                              style={{ paddingBottom: "8px" }}
                              color='primary.main'
                            >
                              Location
                            </Typography>
                            <OutlinedInput
                              type='text'
                              variant='outlined'
                              size='small'
                              name='location'
                              style={{ height: "45px" }}
                              disabled={isEdit}
                              placeholder='Add a location'
                              value={values.location ? values.location : userData?.location}
                              error={Boolean(touched.location && errors.location)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <FormHelperText error>
                              {touched.location && errors.location}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Box className='sociallinks'>
                        <Typography variant='h5' color='primary.main'>
                          Social Links
                        </Typography>
                      </Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} lg={6}>
                          <FormControl fullWidth>
                            <Typography
                              variant='h6'
                              style={{ paddingBottom: "8px" }}
                              color='primary.main'
                            >
                              Facebook
                            </Typography>
                            <OutlinedInput
                              type='text'
                              variant='outlined'
                              disabled={isEdit}
                              size='small'
                              name='facebook'
                              placeholder='Facebook.com'
                              style={{ height: "45px" }}
                              value={
                                values.facebook
                                  ? values.facebook
                                  : userData?.facebook
                              }
                              error={Boolean(
                                touched.facebook && errors.facebook
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <FormHelperText error>
                              {touched.facebook && errors.facebook}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                          <FormControl fullWidth>
                            <Typography
                              variant='h6'
                              style={{ paddingBottom: "8px" }}
                              color='primary.main'
                            >
                              Twitter
                            </Typography>
                            <OutlinedInput
                              type='text'
                              variant='outlined'
                              size='small'
                              disabled={isEdit}
                              name='twitter'
                              placeholder='Twitter.com'
                              style={{ height: "45px" }}
                              value={
                                values.twitter
                                  ? values.twitter
                                  : userData?.twitter
                              }
                              error={Boolean(touched.twitter && errors.twitter)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <FormHelperText error>
                              {touched.twitter && errors.twitter}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                          <FormControl fullWidth>
                            <Typography
                              variant='h6'
                              style={{ paddingBottom: "8px" }}
                              color='primary.main'
                            >
                              LinkedIn
                            </Typography>
                            <OutlinedInput
                              type='text'
                              variant='outlined'
                              size='small'
                              name='linkedIn'
                              disabled={isEdit}
                              placeholder='Linkedin.com'
                              style={{ height: "45px" }}
                              value={
                                values.linkedIn
                                  ? values.linkedIn
                                  : userData?.linkedIn
                              }
                              error={Boolean(
                                touched.linkedIn && errors.linkedIn
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <FormHelperText error>
                              {touched.linkedIn && errors.linkedIn}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                          <FormControl fullWidth>
                            <Typography
                              variant='h6'
                              style={{ paddingBottom: "8px" }}
                              color='primary.main'
                            >
                              Instagram
                            </Typography>
                            <OutlinedInput
                              type='text'
                              variant='outlined'
                              size='small'
                              name='instagram'
                              placeholder='Instagram.com'
                              style={{ height: "45px" }}
                              disabled={isEdit}
                              value={
                                values.instagram
                                  ? values.instagram
                                  : userData?.instagram
                              }
                              error={Boolean(
                                touched.instagram && errors.instagram
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <FormHelperText error>
                              {touched.instagram && errors.instagram}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                      </Grid>
                      {errorMessage && (
                        <Box
                          textAlign='left'
                          ml={1}
                          mt={1}
                          style={{ color: "#ba1f11", fontWeight: 600 }}
                        >
                          {errorMessage}
                        </Box>
                      )}
                      <Box mt={4} mb={4}>
                        <Grid container spacing={4}>
                          <Grid item xs={6} align='right'>
                            <Button
                              variant='contained'
                              color='primary'
                              size='large'
                              onClick={() => history.push("/profile")}
                            >
                              Cancel
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              type='submit'
                              variant='contained'
                              color='secondary'
                              size='large'
                              disabled={
                                isEdit ||
                                isUpdating ||
                                (mobileNumberField !== "" &&
                                  !isValidNumber(mobileNumberField))
                              }
                            >
                              Update {isUpdating && <ButtonCircularProgress />}
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Page>
    </>
  );
}
export default EditProfile;
