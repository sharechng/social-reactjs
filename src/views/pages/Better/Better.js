import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Axios from "axios";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import { AuthContext } from "src/context/Auth";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { MdOutlineAddBox } from "react-icons/md";

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
    padding: "10px 0px 150px 0px",
    [theme.breakpoints.down("xs")]: {
      padding: "90px 0",
    },
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

export default function Interest() {
  const history = useHistory();

  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [interestList, setInterestList] = useState([]);
  const [allintrestList, setAllIntrestList] = useState([]);
  const [intrestValue, setIntrest] = useState("");
  const [selectedTeam, setSelectedTeam] = useState();

  const [isOpenInterest, setIsopenInterest] = useState(false);
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

  const listInterestHandler = async (id) => {
    try {
      const res = await Axios({
        method: "GET",
        url: Apiconfigs.listInterest,
      });
      if (res.data.responseCode === 200) {
        const list = res.data.result.docs.map((data, i) => data.name);
        setAllIntrestList(list);
      }
    } catch (error) {}
  };
  useEffect(() => {
    listInterestHandler();
  }, []);

  const createInterestHandler = async (id) => {
    const intrestValueArr = intrestValue.split(",");
    for (let i = 0; i < intrestValueArr.length; i++) {
      const singlerIntrestValue = intrestValueArr[i];
      try {
        const res = await Axios({
          method: "POST",
          url: Apiconfigs.createInterest,
          headers: {
            token: localStorage.getItem("token"),
          },
          data: {
            name: singlerIntrestValue,
          },
        });
        if (res.data.responseCode === 200) {
        }
      } catch (error) {}
    }
  };

  const addInterestHandler = async () => {
    if (selectedTeam?.length > 2) {
      try {
        setIsLoading(true);
        const intrestValueArr = intrestValue.split(",");
        // if (intrestValueArr.length > 0) {
        //   // await createInterestHandler();
        // }

        const res = await Axios.put(
          Apiconfigs.addInterest,
          {
            interest: selectedTeam,
          },
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        if (res.data.responseCode === 200) {
          // history.push("/explore");
          toast.success(res.data.responseMessage);
          auth.handleUserProfileApi();
          setTimeout(() => {
            history.push("/explore");
          }, 3000);
          
        } else {
          toast.error(res.data.responseMessage);
        }
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    } else {
      toast.warn("Select atleast 3 interest");
    }
  };

  useEffect(() => {
    if (auth.userData) {
      // const interest = auth.userData?.interest;
      setSelectedTeam(auth.userData?.interest);
    }
  }, [auth.userData]);

  return (
    <>
      <Box className={classes.bannerBox}>
        <Paper className={classes.root} elevation={2}>
          <Box className={classes.root}>
            <Box className={classes.heading} align="center">
              <Typography variant="h4">
                Tell us more about your interest.
              </Typography>
              <Typography variant="body2">
                Pick at least 3 favorite topics of yours.
              </Typography>
            </Box>

            <Box mt={2}>
              <Autocomplete
                multiple
                id="tags-standard"
                options={allintrestList}
                value={selectedTeam}
                defaultValue={auth.userData?.interest}
                onChange={(_event, newTeam) => {
                  setSelectedTeam(newTeam);
                }}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Interest"
                    // autoComplete="none"
                    // placeholder="Interest"
                  />
                )}
              />
              {/* <Box className={classes.Buttonbox}>
                <Box mt={1} style={{ display: "flex", alignItems: "center" }}>
                  <MdOutlineAddBox
                    onClick={() => setIsopenInterest(!isOpenInterest)}
                    style={{
                      fontSize: "23px",
                      color: "rgb(227, 26, 137)",
                      cursor: "pointer",
                    }}
                  />
                  <small style={{ fontSize: "13px", marginLeft: "7px" }}>
                    {" "}
                    Add Intrest
                  </small>
                </Box>{" "}
              </Box> */}
              {/* {isOpenInterest && (
                <Box mt={2}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    name="Text Field"
                    placeholder="Intrest name, Please enter comma separated values"
                    type="text"
                    fullWidth
                    value={intrestValue}
                    filterSelectedOptions
                    onChange={(e) => setIntrest(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      setIsopenInterest(false);
                      setIntrest("");
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              )} */}
            </Box>

            <Box className={classes.Buttonbox} mt={3}>
              {/* <Box className={classes.TabButtonsBox}>
                <Box className={classes.Buttonbox}>
                  {interestList.map((data, i) => {
                    return (
                      <Button
                        key={i}
                        variant='contained'
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
              </Box> */}
              <Box style={{ marginBottom: "-10px" }}>Your interests</Box>
              <Box
                mt={3}
                textAlign="left"
                display="flex"
                style={{
                  maxWidth: "100%",
                  overflow: "auto",
                  marginTop: "24px",
                }}
              >
                {auth?.userData?.interest?.map((data) => {
                  return (
                    <Typography
                      style={{
                        background: "#e31a89",
                        marginRight: "10px",
                        borderRadius: "5px",
                        padding: "5px",
                      }}
                    >
                      {data}
                    </Typography>
                  );
                })}
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
