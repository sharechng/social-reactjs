import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, makeStyles, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { MdOutlineCollections } from "react-icons/md";
const useStyles = makeStyles((theme) => ({
  heading: {
    "& h4": {
      fontSize: "30px",
      color: "#696969",
      [theme.breakpoints.down("xs")]: {
        fontSize: "18px",
      },
    },

    "& p": {
      color: "#696969",
      maxWidth: "384px",
      lineHeight: "24px",
      marginTop: "10px",
    },
  },
  bannerBox: {
    "& label": {
      color: "#e8aa3e",
      fontSize: "14px",
    },
  },
  root: {
    padding: "25px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
  },
  button: {
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "0px",
    boxShadow: "none",
    borderBottom: "0",
    borderRadius: "0",
    height: "40px",
    background: "transparent",
    color: "#7E6196 ",
    "& svg": {
      width: "34px",
      height: "35px",
      background: "#FCF2FA",
      borderRadius: "10px",
      padding: "5px 6px",
      color: "rgba(152, 126, 171, 0.5)",
    },
    "&:hover": {
      backgroundColor: "#E6E6E6",
      boxShadow: "none",
      borderRadius: "5px",
    },
  },
  Buttonbox: {
    "& Button": {
      marginRight: "5px",
      minWidth: "106px",
      boxSizing: "border-box",
      fontWeight: "400",
      borderRadius: "10px",
      padding: "11px 16px",
      background: "#242526",
      color: "#9E9E9E",
      fontFamily: "'Montserrat'",
      marginTop: "7px",
      fontSize: "14px",
      "&:hover": {
        background: "#EC167F",
        color: "#fff",
      },
      "&:active": {
        background: "#EC167F",
        color: "#fff",
      },
    },
  },
}));

const allInterest = [
  { name: "Sport", isSelect: false },
  { name: "Music", isSelect: false },
  { name: "Songs", isSelect: false },
  { name: "Movie", isSelect: false },
  { name: "Shopping", isSelect: false },
  { name: "Reading", isSelect: false },
];

export default function Interest() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [interestList, setInterestList] = useState([]);

  const updateCollectionListHanlder = (id) => {
    let colList = interestList;
    let updatedList = colList.map((item, i) => {
      if (item.name == id) {
        return { ...item, isSelect: !item.isSelect };
      }
      return item;
    });
    setInterestList(updatedList);
  };

  const addInterestHandler = async () => {
    try {
      setIsLoading(true);
      const selectedInterest = interestList.filter(
        (data) => data.isSelect == true
      );
      const interest = selectedInterest.map((data, i) => data.name);
      const res = await Axios.put(
        Apiconfigs.addInterest,
        {
          interest: interest,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        auth.handleUserProfileApi();
      } else {
        toast.error(res.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (auth.userData) {
      const interest = auth.userData?.interest;
      const tempArr = [];
      allInterest.forEach((allItem) => {
        const isSelect = !interest.find(
          (userItem) => allItem.name === userItem
        );
        tempArr.push({
          name: allItem.name,
          isSelect: !isSelect,
        });
      });
      setInterestList(tempArr);
    }
  }, [auth.userData]);

  return (
    <>
      <Box className={classes.bannerBox}>
        <Paper className={classes.root} elevation={2}>
          <Box className={classes.root}>
            <Box className={classes.heading} align="center">
              <Typography variant="h4">Get to know you better</Typography>
              <Typography variant="body2">
                Select atleast 3 and based on that they will be shown relevant
                content creators
              </Typography>
            </Box>

            <Box className={classes.Buttonbox} mt={3}>
              <Box className={classes.TabButtonsBox}>
                <Box className={classes.Buttonbox}>
                  {interestList.map((data, i) => {
                    return (
                      <Button
                        key={i}
                        variant="contained"
                        style={
                          data?.isSelect
                            ? { backgroundColor: "#e31a89", color: "#fff" }
                            : { backgroundColor: "#242526" }
                        }
                        onClick={() => updateCollectionListHanlder(data.name)}
                      >
                        {data.name}
                      </Button>
                    );
                  })}
                </Box>
              </Box>

              <Box mt={3} textAlign="center">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#e31a89", color: "#fff" }}
                  onClick={() => addInterestHandler()}
                  disabled={isLoading}
                >
                  Submit {isLoading && <ButtonCircularProgress />}
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
