import React, { useState, useEffect, useContext, useRef } from "react";
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
import {
  useHistory,
  Link as RouterComponent,
  useLocation,
} from "react-router-dom";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import * as yep from "yup";
import ApiConfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import JoditEditor from "jodit-react";

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
  const [staticData, setSattaicsData] = useState();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const editor = useRef(null);
  const [descritionValue, setdescriptionValue] = useState("");
  console.log("descritionValue",descritionValue)
  const [isSubmit, setIsSubmit] = useState(false);
  const [Idd, setIdd] = useState();
  // setIsSubmit(true)

  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
  });
  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...formValue, [name]: value };
    setFormValue(temp);
  };

  const FormHandleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmit(true);
    setIsLoading(true);
    if (
      formValue.title !== "" &&
      descritionValue !== "" &&
      formValue.title.length < 40
    ) {
      try {
        const res = await axios({
          method: "PUT",
          url: ApiConfig.editStatics,
          data: {
            _id: staticData?._id,
            title: formValue?.title,
            description: descritionValue,
          },
        });
        if (res.data.responseCode === 200) {
          setIsSubmit(false);
          setBtnText("SUBMIT");
          toast.success(res.data.responseMessage);
          history.push("/static");
          setIsLoading(false);
        }
      } catch (error) {
        setIsSubmit(false);
        toast.error(error.message);
        setIsLoading(false);
      }
    }
  };
  const viewExclusicContentHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.viewStatic,
        // headers: {
        //   token: window.localStorage.getItem("token"),
        // },
        params: {
          type: location.search.substring(1, location.search.length),
        },
      });
      if (res.data.responseCode === 200) {
        setSattaicsData(res.data.result);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      setIdd(id);
    }
    if (location.search.substring(1, location.search.length)) {
      viewExclusicContentHandler();
    }
  }, [location.search]);
  useEffect(() => {
    if (staticData) {
      setFormValue({
        title: staticData.title ? staticData.title : "",
        description: staticData.description ? staticData.description : "",
      });
      setdescriptionValue(staticData.description ? staticData.description : "");
    }
  }, [staticData]);
  const config = {
    readonly: false,
  };
  const getcube=()=>{  
    var number=document.getElementById("message").value; 
    setdescriptionValue(number) 
    }  
  return (
    <Page title="Edit Static Content">
      <Paper className={classes.root}>
        <Box>
          <Typography variant="h3" color="primary.main">
            Edit Static Content
          </Typography>
        </Box>
        <Container maxWidth="md">
          <Box className={classes.formBox}>
            {/* <Form onSubmit={FormHandleSubmit}> */}
            <form onSubmit={(event) => FormHandleSubmit(event)}>
              <Grid container spacing={2} direction={"column"}>
                <Grid item xs={12} md={12}>
                  <label>Title</label>
                 <Box mt={1}>
                 <TextField
                    placeholder="Enter Subject"
                    type="text"
                    size="small"
                    variant="outlined"
                    fullWidth
                    name="title"
                    value={formValue.title}
                    error={Boolean(
                      (isSubmit && formValue.title === "") ||
                        (formValue.title !== "" && formValue.title.length > 40)
                    )}
                    // onBlur={handleBlur}
                    onChange={_onInputChange}
                  />
                  {(isSubmit && formValue.title === "" && (
                    <FormHelperText error>Title is required</FormHelperText>
                  )) ||
                    (formValue.title !== "" && formValue.title.length > 40 && (
                      <FormHelperText error>
                        Title should be less than 40 characters.
                      </FormHelperText>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={12}>
                  <label>Description</label>
                <Box mt={1}>
                <JoditEditor
                  id="message"
                    ref={editor}
                    // value={descritionValue}
                    value={descritionValue}
                    // value={formData.description}
                    config={config}
                    // disabled={loader}
                    name="descritionValue"
                    variant="outlined"
                    fullWidth
                    size="small"
                    tabIndex={1}
                    // onBlur={(e) => setdescriptionValue(e)} // preferred to use only this option to update the content for performance reasons
                    // onChange={(newContent) => setdescriptionValue(newContent)}
                  />
                  {/* <TextField
                    placeholder="Enter your message"
                    type="text"
                    size="small"
                    variant="outlined"
                    multiline
                    fullWidth
                    maxRows={4}
                    Scroll="auto"
                    name="description"
                    value={formValue.description}
                    //   error={Boolean(touched.description && errors.description)}
                    // onBlur={handleBlur}
                    onChange={_onInputChange}
                  /> */}
                  {isSubmit && descritionValue === "" && (
                    <FormHelperText error>
                      Description is required
                    </FormHelperText>
                  )}
                </Box>
                </Grid>
                <Grid item xs={12} align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    size="large"
                    value="submit"
                    // disabled={isLoading}
                    onClick={()=>getcube()}

                  >
                    Submit
                    {/* {btnText} {isLoading && <ButtonCircularProgress />} */}
                  </Button>
                </Grid>
              </Grid>
            </form>

            {/* </Form> */}
          </Box>
        </Container>
      </Paper>
    </Page>
  );
}
