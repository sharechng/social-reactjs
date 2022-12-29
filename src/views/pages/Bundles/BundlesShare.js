import React from "react";
import {
  makeStyles,
  TextField,
  Paper,
  Grid,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import BundlesCard from "src/component/BundlesCard";
import { useHistory, Link  } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px",
    "& .heading": {
      paddingBottom: "20px",
    },
    "& .main": {
      backgroundColor: "#000000",
      padding: "25px",
      "& .upload": {
        height: "75px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  },
}));

const bundleData = [
  {
    image: "images/bundles/Bundles2.png",
    img: "images/User2.png",
    name: "Zunda mochi",
    text1: "Bundles Price",
    text2: "0.004 ETH",
    text3: "Duration:",
    text4: "60 Days",
    text5: "Subscriber:",
    text6: "2",
  },
  {
    image: "images/bundles/Bundles1.png",
    img: "images/User2.png",
    name: "Zunda mochi",
    text1: "Bundles Price",
    text2: "0.004 ETH",
    text3: "Duration:",
    text4: "60 Days",
    text5: "Subscriber:",
    text6: "2",
  },
  {
    image: "images/bundles/Bundles2.png",
    img: "images/User2.png",
    name: "Zunda mochi",
    text1: "Bundles Price",
    text2: "0.004 ETH",
    text3: "Duration:",
    text4: "60 Days",
    text5: "Subscriber:",
    text6: "2",
  },
];
function BundlesShare() {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <>
      <Paper className={classes.root}>
        <Box className="heading">
          <Typography variant="h6">Share with your audience</Typography>
        </Box>
        <Box className="main">
          <Grid container>
            <Grid item lg={6} sm={6} md={6} xs={12}>
              <TextField placeholder="Title:" variant="outlined" fullWidth />
              &nbsp;
              <TextField
                placeholder="Details:"
                multiline
                // rows={4}
                variant="outlined"
                fullWidth
              />
              &nbsp;
              <Paper className="upload">
                <Button>
                  {" "}
                  Upload a photo/videos here <AiOutlineCloudUpload />
                </Button>
              </Paper>
              &nbsp;
              <Typography variant="body2">Select Post type:</Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="Public"
                    control={<Radio />}
                    label="Public"
                  />

                  <FormControlLabel
                    value="Private"
                    control={<Radio />}
                    label="Private"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          &nbsp;
          <Typography variant="h6">
            Select a collection to share with:{" "}
          </Typography>{" "}
          &nbsp;
          <Grid container spacing={2}>
            {bundleData.map((data, i) => {
              return (
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <BundlesCard data={data} type="card" key={i} />
                </Grid>
              );
            })}
          </Grid>
          <Box align="center" mb={2} mt={4}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => {
                history.push("/collections");
              }}
            >
              Back
            </Button>{" "}
            &nbsp; &nbsp;
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => {
                history.push("/bundles-share");
              }}
            >
              Share
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default BundlesShare;
