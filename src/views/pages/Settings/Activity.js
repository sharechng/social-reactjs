import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
} from "@material-ui/core";
import { useHistory, Link as RouterComponent } from "react-router-dom";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { Formik, Form } from "formik";
import { KeyboardDatePicker } from "@material-ui/pickers";
import * as yup from "yup";
import moment from "moment";
import ActivityCard from "./ActivityCard";
import axios from "axios";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import { Pagination } from "@material-ui/lab";

const currenciesUser = [
  {
    value: "COLLECTION",
    label: "COLLECTION",
  },
  {
    value: "RATING",
    label: "RATING",
  },
  {
    value: "TRACKING",
    label: "TRACKING",
  },
  {
    value: "AUCTION",
    label: "AUCTION",
  },
  {
    value: "STORY",
    label: "STORY",
  },
  {
    value: "LIKE",
    label: "LIKE",
  },
  {
    value: "UNLIKE",
    label: "UNLIKE",
  },
];
const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Activity() {
  const classes = useStyles();
  const [activityData, setActivitydata] = useState([]);
  const [typeactivty, setTypeactivty] = useState("All");
  const [isClear, setIsClear] = useState(false);
  const [timeFilter, setTimeFilter] = useState();
  const [toTimeFilter, setToTimeFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);

  const handlActivityeApi = () => {
    setLoading(true);
    setActivitydata([]);
    axios
      .get(ApiConfig.userActivity, {
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          page: page,
          limit: 10,
          fromDate: timeFilter ? `${moment(timeFilter)}` : null,
          toDate: toTimeFilter ? `${moment(toTimeFilter)}` : null,
          type: typeactivty === "All" ? null : typeactivty,
        },
      })
      .then((response) => {
        if (response.data.responseCode === 200) {
          setActivitydata(response.data.result.docs);
          setNoOfPages(response.data.result.pages);
        } else {
          setActivitydata();
          toast.error(response.data.responseMessage);
        }
        setIsClear(false);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setIsClear(false);
        setActivitydata();
      });
  };
  useEffect(() => {
    handlActivityeApi();
  }, [isClear, page]);

  const clearHandler = () => {
    handlActivityeApi();
    setTimeFilter();
    setToTimeFilter();
    setTypeactivty("All");
    setIsClear(true);
  };
  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h3" color="primary.main">
          Activity
        </Typography>

        <Box mt={3}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Typography variant="boay2" color="primary.main">
              From  Date:
              </Typography>
              <Box mt={1}>
                <KeyboardDatePicker
                  value={timeFilter}
                  onChange={(date) => {
                    setTimeFilter(new Date(date));
                  }}
                  // maxDate={toTimeFilter ? toTimeFilter : ""}
                  format="DD/MM/YYYY"
                  // inputVariant="outlined"
                  disableFuture
                  margin="dense"
                  helperText=""
                  name="dob"
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Typography variant="boay2" color="primary.main">
                To Date:
              </Typography>
              <Box mt={1}>
                <KeyboardDatePicker
                  value={toTimeFilter}
                  onChange={(date) => {
                    setToTimeFilter(new Date(date));
                  }}
                  // minDate={}
                  minDate={timeFilter}
                  //   maxDate={moment(toTimeFilter).format("YYYY-MM-DDThh:mm")}
                  format="DD/MM/YYYY"
                  // inputVariant="outlined"
                  disableFuture
                  margin="dense"
                  helperText=""
                  name="dob"
                  fullWidth
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Typography variant="boay2" color="primary.main">
                By Type:
              </Typography>
              <Box mt={1}>
                <FormControl fullWidth>
                  <Select
                    id="datetime-local"
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                    //   type='date'
                    defaultValue="2017-05-24T10:30"
                    onChange={(e) => setTypeactivty(e.target.value)}
                    value={typeactivty}
                    select
                    className={classes.textField2}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ padding: "0 !important" }}
                  >
                    <MenuItem disableScrollLock={true} value={"All"}>
                      All
                    </MenuItem>{" "}
                    {currenciesUser.map((option, i) => (
                      <MenuItem
                        disableScrollLock={true}
                        key={i}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Typography variant="boay2" color="primary.main">
                &nbsp;
              </Typography>
              <Box
                style={{
                  display: "flex",
                  // justifyContent: "flex-end",
                  marginTop: "7px",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handlActivityeApi}
                  color="secondary"
                  style={{ marginRight: "10px" }}
                >
                  Submit
                </Button>

                <Button
                  variant="contained"
                  onClick={clearHandler}
                  color="secondary"
                  style={{ width: "90px" }}
                >
                  Clear
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <ActivityCard loading={loading} activityData={activityData} />
        {activityData && activityData.length >=10 && (
          <Box mt={2} display="flex" justifyContent="center">
            <Pagination
              count={noOfPages}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          </Box>
        )}
      </Box>
    </>
  );
}

export default Activity;
