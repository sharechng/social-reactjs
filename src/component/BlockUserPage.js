import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Typography,
  Grid,
  Container,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import NoDataFound from "src/component/NoDataFound";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import Axios from "axios";
import { Pagination } from "@material-ui/lab";
import DataLoading from "src/component/DataLoading";
import moment from "moment";
import { tokenName } from "src/utils";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import BlockIcon from "@material-ui/icons/Block";
import { toast } from "react-toastify";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .imgbox": {
      position: "relative",
      "& .editicon": {
        position: "absolute",
        bottom: "10px",
        right: "10px",
      },
      "& .postImg": {
        width: "100%",
        margin: "16px 0",
        borderRadius: "20px 20px 0px 0px",
        overflow: "hidden",
        [theme.breakpoints.down("xs")]: {
          borderRadius: "8px 8px 0px 0px",
        },
        "& img": {
          width: "100%",
          height: "250px",
          "@media(max-width:767px)": {
            height: "130px",
          },
        },
      },
    },
    "& .userProfile": {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "left",
      marginTop: "-20px",
      "& figure": {
        borderRadius: "50%",
        border: "2px solid #f1f1f1",
        maxWidth: "150px",
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "0 auto 13px",
        "@media(max-width:767px)": {
          maxWidth: "75px",
        },
      },
      "& .editprofile": {
        position: "absolute",
        bottom: "-40px",
        right: "-10px",
      },
      "& .user": {
        position: "absolute",
        marginLeft: "15px",
        "& img": {
          width: "100%",
        },
      },
    },
    "& .username": {
      marginTop: "75px",
      marginLeft: "25px",
      "@media(max-width:767px)": {
        marginTop: "45px",
      },
      "& p": {
        padding: "5px 0px",
        overflow: "hidden",
        maxWidth: "150px",
        textOverflow: "ellipsis",
      },
    },
    "& .buttonbox": {
      "& Button": {
        margin: "0px 15px",
      },
    },
    "& .detail": {
      margin: "15px",
      padding: "15px",
      backgroundColor: "#101010",
    },
  },
  main: {
    padding: "15px",
    "& .content": {
      backgroundColor: "#101010",
      // width: "100%",
      padding: "15px",
      "& .heading": {
        paddingBottom: "15px",
      },
    },
  },
  cell: {
    fontSize: "18px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },
  },
}));
const BlockUserPage = ({
  page,
  setPage,
  callbackFun,
  noOfPages,
  isLoading,
  blockUserList,
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [idds, setIdd] = useState("");
  const [isBlock, setBlock] = React.useState(false);
  const [loader2, setloader2] = React.useState(false);
  const closeBlock = () => {
    setBlock(false);
  };
  const handleBlock = (id) => {
    setIdd(id?.userId?._id);
    setBlock(true);

    //   openBlock();
  };
  const blockuser = async () => {
    setloader2(true);
    Axios({
      method: "POST",
      url: Apiconfigs.userBlockUnblockAdmin,
      data: {
        _id: idds,
      },
      headers: {
        token: localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setloader2(false);
        if (res.data.responseCode === 200) {
          if (callbackFun) {
            callbackFun();
          }
          toast.success(res.data.responseMessage);
          setBlock(false);
          setloader2(false);

          if (res.data.result.docs) {
            toast.success(res.response_message);
            setloader2(false);
          }
        }
      })
      .catch(() => {
        setloader2(false);
      });
  };
  return (
    <div>
      <Box className="content">
        {isLoading ? (
          <DataLoading />
        ) : (
          <TableContainer>
            <Table>
              <TableHead component={Paper} className="headingcell">
                <TableRow>
                  <TableCell align="Center" className={classes.cell}>
                    S.No.
                  </TableCell>
                  <TableCell align="Center" className={classes.cell}>
                    User Name
                  </TableCell>

                  {/* <TableCell align="Center" className={classes.cell}>
                        Order Count
                      </TableCell>

                      <TableCell align="Center" className={classes.cell}>
                        Total Earning
                      </TableCell> */}
                  <TableCell align="Center" className={classes.cell}>
                    Status
                  </TableCell>
                  <TableCell align="Center" className={classes.cell}>
                    Message
                  </TableCell>
                  <TableCell align="Center" className={classes.cell}>
                    Registration Date
                  </TableCell>

                  <TableCell align="Center" className={classes.cell}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              {blockUserList?.map((data, i) => {
                return (
                  <TableBody key={i}>
                    <TableRow className={classes.tbody}>
                      <TableCell align="Center" component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell align="Center">
                        {data?.userId?.userName
                          ? data?.userId?.userName
                          : data?.userId?.name}
                      </TableCell>

                      {/* <TableCell align="Center">0 </TableCell>
                          <TableCell align="Center">0 </TableCell> */}
                      <TableCell align="Center">{data?.status} </TableCell>
                      <TableCell align="Center">{data?.message} </TableCell>

                      <TableCell align="Center">
                        {moment(data?.createdAt).local().fromNow()}
                      </TableCell>
                      <TableCell align="Center">
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            cursor: "pointer",
                          }}
                        >
                          <Button
                            // variant="contained"
                            onClick={() =>
                              history.push({
                                pathname: "/about-creators",
                                search: data?.userId?._id,
                              })
                            }
                            color="primary"
                          >
                            <VisibilityIcon />
                          </Button>

                          <Button
                            // variant="contained"
                            color="primary"
                            // className={classes.button}
                            onClick={() => handleBlock(data)}
                          >
                            <BlockIcon
                              //   fontSize="small"
                              style={
                                data?.status === "BLOCK"
                                  ? { fontSize: "15px", color: "green" }
                                  : { fontSize: "15px", color: "red" }
                              }
                            />
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </TableContainer>
        )}
      </Box>
      <Dialog
        open={isBlock}
        onClose={closeBlock}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* {row.status} */}
            {`Are you sure want to  Unblock this user?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="contained"
            disabled={loader2}
            onClick={blockuser}
          >
            Yes {loader2 && <ButtonCircularProgress />}
          </Button>
          <Button
            color="primary"
            onClick={closeBlock}
            variant="contained"
            autoFocus
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BlockUserPage;
