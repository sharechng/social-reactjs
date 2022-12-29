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
import { useHistory, useLocation } from "react-router-dom";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import * as yep from "yup";
import ApiConfig from "src/ApiConfig/ApiConfig";
import axios from "axios";
import JoditEditor from "jodit-react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "15px",
    "& .headingBox": {
      "& h2": {
        color: "#FFFFFF",
      },
    },
    "& .mainContent": {
      backgroundColor: "#000",
      borderRadius: "15px",
      padding: "15px",
    },
  },
}));

export default function StaticContentDetail() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [btnText, setBtnText] = useState("SUBMIT");
  const [staticData, setSattaicsData] = useState();
  const location = useLocation();
  const auth = useContext(AuthContext);
  const editor = useRef(null);
  const [descritionValue, setdescriptionValue] = useState("");
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
  return (
    <Page title="Static Content Details">
      <Paper className={classes.root}>
        <Box className="headingBox">
          <Typography variant="h2">Static Content Details</Typography>
        </Box>
        <Box className="mainContent" mt={3}>
          <Container maxWidth="md">
            <Box mt={2} mb={2}>
              <Grid container spacing={2}>
                <Grid item xs={3} align="left">
                  <Typography variant="h5">Title &nbsp; :</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="h6">{staticData?.title}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={3} align="left">
                <Typography variant="h5">Description &nbsp; :</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h6" style={{ marginTop: "-14px" }}>
                  <label
                    style={{
                      wordBreak: "break-all",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: staticData?.description,
                    }}
                  ></label>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box align="center" mt={3}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => history.push("/static")}
          >
            Back
          </Button>
        </Box>
      </Paper>
    </Page>
  );
}
