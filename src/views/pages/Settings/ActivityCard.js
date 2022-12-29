import { Grid, makeStyles, Box, Typography, Link } from "@material-ui/core";
import React from "react";
import { Link as RouterComponent } from "react-router-dom";
import NoDataFound from "src/component/NoDataFound";
import DataLoading from "src/component/DataLoading";
import moment from "moment";
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    "& small": {
      fontSize: "12px",
      color: "#8B8B8B",
    },
  },

  dot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    backgroundColor: "#B55A06",
  },
  mainContent: {
    display: "flex",
    alignItems: "center",
    "& img": {
      height: 40,
      width: 40,
    },
  },
  btnSection: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
});

function BlockingCard({ activityData, loading }) {
  const classes = useStyles();
  return (
    <Box className={classes.main}>
      {loading ? (
        <DataLoading />
      ) : (
        <Grid container direction={"cloumn"} spacing={1}>
          {activityData?.length > 0 ? (
            <>
              {activityData &&
                activityData?.map((data, i) => {
                  return (
                    <Grid item xs={12} key={i}>
                      <Box pt={1} pb={2} className={classes.root}>
                        <Box className={classes.mainContent}>
                          <Link
                            component={RouterComponent}
                            to="/profile"
                            style={{ textDecoration: "none" }}
                          >
                            <Box>
                              <img
                                src={
                                  data?.userId?.profilePic
                                    ? data?.userId?.profilePic
                                    : "images/Activity.png"
                                }
                                style={{ borderRadius: "50%" }}
                              />
                            </Box>
                          </Link>
                          <Box ml={3}>
                            <Typography variant="body2">
                              {data?.title}
                            </Typography>
                            <Typography variant="h6">
                              {data?.desctiption}
                            </Typography>
                            <Typography variant="body2" component="small">
                              {moment(data?.createdAt).local().fromNow()}
                            </Typography>
                            &nbsp;
                            <br />
                            <Typography variant="body2" component="small">
                              Only Me - hidden from profile
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Grid>
                  );
                })}
            </>
          ) : (
            <NoDataFound />
          )}
        </Grid>
      )}
    </Box>
  );
}

export default BlockingCard;
