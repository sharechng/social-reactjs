import React, { useState, useEffect } from "react";
import { makeStyles, Paper, Grid, Box, Typography } from "@material-ui/core";
import BundlesDetailCard from "src/component/BundlesDetailCard";
import { useHistory, Link as RouterLink, useLocation } from "react-router-dom";
import axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import NoDataFound from "src/component/NoDataFound";
import { Pagination } from "@material-ui/lab";
import DataLoading from "src/component/DataLoading";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "25px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "& .mainbox": {
      backgroundColor: "#101010",
      borderRadius: "15px",
      padding: "15px",
      [theme.breakpoints.down("xs")]: {
        padding: "10px",
        borderRadius: "10px",
      },
    },
  },
}));

function BundlesDetail() {
  const [idd, setIdd] = useState();
  const location = useLocation();
  const collectionTitle = location?.state?.title;
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [dataList, setDataList] = useState([]);
  const [loader, setLoader] = useState(true);
  const viewExclusivepostHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listPostWithCollection,
        headers: {
          token: window.localStorage.getItem("token"),
        },
        params: {
          collectionId: idd,
          limit: 9,
          page: page,
        },
      });
      if (res.data.responseCode === 200) {
        setDataList(res.data.result.docs);
        setNoOfPages(res.data.result.pages);
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
    }
  };
  const classes = useStyles();
  useEffect(() => {
    if (location.search.substring(1, location.search.length)) {
      const id = location.search.substring(1, location.search.length);
      setIdd(id);
    }
    if (idd) {
      viewExclusivepostHandler();
    }
  }, [location.search, idd, page]);

  return (
    <>
      <Paper className={classes.root} elevation={2}>
        <Box className='mainbox'>
          {loader ? (
            <DataLoading />
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant='h3'>{`${collectionTitle} Post's`}</Typography>
              </Grid>
              {dataList && dataList?.length > 0 ? (
                <>
                  {dataList &&
                    dataList?.map((data, i) => {
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <BundlesDetailCard
                            listPublicExclusiveHandler={
                              viewExclusivepostHandler
                            }
                            index={i}
                            type='card'
                            data={data}
                            key={i}
                          />
                        </Grid>
                      );
                    })}
                </>
              ) : (
                <NoDataFound />
              )}
            </Grid>
          )}
          {dataList && dataList.length > 9 && (
            <Box mt={2} display='flex' justifyContent='center'>
              <Pagination
                count={noOfPages}
                page={page}
                onChange={(e, v) => setPage(v)}
              />
            </Box>
          )}
        </Box>
      </Paper>
    </>
  );
}

export default BundlesDetail;
