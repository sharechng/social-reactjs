import React, { useEffect, useState, useContext } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import Page from "src/component/Page";
import CreatorsCard from "src/component/CreatorsCard";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import DataLoading from "src/component/DataLoading";
import NoDataFound from "src/component/NoDataFound";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "& .heading": {
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  mainmodalBox: {
    "& .formControl": {
      width: "100%",
      backgroundColor: "transparent",
      border: "none",
      color: "#fff",
      "&:focus-visible": {
        outline: "none",
      },
    },
    "& .addphotos": {
      display: "flex",
      alignItems: "center",
      textAlign: "center",
      justifyContent: "center",
      padding: "30px 20px",
      border: "1px dashed",
      cursor: "pointer",
      position: "relative",
      "& input": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 0,
      },
      "& svg": {
        fontSize: "30px",
      },
    },
  },
  cancelBtn: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  btn1: {
    marginRight: "8px",
    "@media(max-width:767px)": {
      marginBottom: "10px",
    },
  },
}));

function Creators() {
  const classes = useStyles();
  const [creatorListData, setCreatorListData] = useState([]);

  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [isLoadingContent, setIsLoading] = useState(false);
  const creatorHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listAllcreator,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          page: page,
          limit: 12,
        },
      });

      if (res.data.responseCode === 200) {
        if (res.data.result.docs) {
          setCreatorListData(res.data.result.docs);
          setNoOfPages(res.data.result.pages);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    creatorHandler();
  }, [page]);

  const pageCheck = page === 1 ? 12 : 0;

  return (
    <>
      <Page title='Creators'>
        <Paper className={classes.root} elevation={2}>
          <Box className='heading'>
            <Typography variant='h3'>Creators</Typography>
          </Box>
          <Grid container spacing={2}>
            {creatorListData &&
              creatorListData.map((data, i) => {
                return (
                  <Grid item lg={3} md={4} sm={6} xs={6}>
                    <CreatorsCard
                      data={data}
                      type='card'
                      key={i}
                      index={i}
                      callbackFun={creatorHandler}
                    />
                  </Grid>
                );
              })}
            {!isLoadingContent &&
              creatorListData &&
              creatorListData.length == 0 && <NoDataFound />}
            {isLoadingContent && <DataLoading />}
          </Grid>
          {creatorListData && creatorListData.length >= pageCheck && (
            <Box mt={2} display='flex' justifyContent='center'>
              <Pagination
                count={noOfPages}
                page={page}
                onChange={(e, v) => setPage(v)}
              />
            </Box>
          )}
        </Paper>
      </Page>
    </>
  );
}

export default Creators;
