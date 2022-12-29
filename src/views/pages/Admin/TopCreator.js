import {
    makeStyles,
    Paper,
    Box,
    Typography,
    Grid,
    Container,
    Button,
    TextField,

    FormControl,
    Select,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import { FiSearch } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { KeyboardDatePicker } from "@material-ui/pickers";
import { AiOutlineDownload } from "react-icons/ai";
import NoDataFound from "src/component/NoDataFound";
import * as XLSX from "xlsx";
import DataLoading from "src/component/DataLoading";
import { Pagination } from "@material-ui/lab";
import moment from "moment";
import { toast } from "react-toastify";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { FiCopy } from "react-icons/fi";
import { sortAddress } from "src/utils";
import CopyToClipboard from "react-copy-to-clipboard";
import Apiconfigs from "src/ApiConfig/ApiConfig";
import Axios from "axios";

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
        marginTop: "40px",
        backgroundColor: "#242526",
        padding: "15px",
        borderRadius: "10px",
        "& .content": {
            backgroundColor: "#101010",
            // width: "100%",
            padding: "15px",
            color: "#e6e5e8",
            "& .heading": {
                paddingBottom: "15px",

                "& h3": {},
            },
        },
    },
    cell: {
        fontSize: "14px",
        [theme.breakpoints.down("xs")]: {
            fontSize: "14px",
        },
    },
    heading: {
        display: "flex",
        justifyContent: "space-between",
    },
    TabButtonsBox: {
        borderTop: "0.5px solid gray",
        marginBottom: "29px",
        textAlign: "center",
        "& button": {
            color: "#9E9E9E",
            fontSize: "16px",
            borderBottom: "2px solid transparent",
            borderRadius: 0,
            "&.active": {
                color: "#fff",
                borderTop: "1px solid #fff",
                marginTop: "-1px",
            },
        },
    },

}));
const currenciesUser = [
    {
        value: "ACTIVE",
        label: "ACTIVE",
    },
    {
        value: "BLOCK",
        label: "BLOCK",
    },
];

export default function TopCreator() {
    const classes = useStyles();
    const history = useHistory()
    const [isClear, setIsClear] = useState(false);
    const [timeFilter, setTimeFilter] = useState();
    const [toTimeFilter, setToTimeFilter] = useState();
    const [page, setPage] = useState(1);
    const [noOfPages, setNoOfPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [searchUserName, setSearchUserName] = useState("");
    const [typeactivty, setTypeactivty] = useState("All");
    const [transactionListDataAll, setTransactionListAll] = useState([]);
    const [transactionListData, setTransactionList] = useState([]);




    const clearHandler = () => {
        setTimeFilter();
        setToTimeFilter();
        setTypeactivty("All");
        setSearchUserName("");
        setIsClear(true);

    };


    const adminUserListHandler = async () => {
        // setIsLoading(true);
        try {
            const res = await Axios({
                method: "GET",
                url: Apiconfigs.topCreatorList,
                headers: {
                    token: window.localStorage.getItem("token"),
                },
                params: {
                    page: page,
                    limit: 15,

                },

            });

            if (res.data.responseCode === 200) {
                setIsClear(false);
                setTransactionList(res.data.result.docs);

                setNoOfPages(res.data.result.pages);
            } else {
                setIsClear(false);
                setTransactionList([]);
            }
            setIsLoading(false);
        } catch (error) {
            setIsClear(false);
            setTransactionList([]);
            setIsLoading(false);
        }
    };
    const adminUserListHandlerForCSV = async () => {

        try {
            const res = await Axios({
                method: "GET",
                url: Apiconfigs.trendingUserlist,
                headers: {
                    token: window.localStorage.getItem("token"),
                },

            });

            if (res.data.responseCode === 200) {
                setTransactionListAll(
                    res.data.result?.map((data, i) => {
                        return {
                            Username: data.userName ? data.userName : null,
                            Email: data.email ? data.email : null,
                            Mobilenumber: `${data.countryCode} ${data.mobileNumber}`,
                            Walletaddress: data.bnbAccount.address
                                ? data.bnbAccount.address
                                : null,
                            RegistrationDate: moment(data.createdAt).format("lll"),
                            Status: data.status ? data.status : null,
                            StoryStatus: data.isStory ? data.isStory : null,
                            SocialStory: data.isSocial ? data.isSocial : null,
                        };
                    })
                );
            } else {

            }

        } catch (error) {

        }
    };



    const downloadExcel = () => {
        const workSheet = XLSX.utils.json_to_sheet(transactionListDataAll);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "userList");
        let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workBook, "user_list.xlsx");
    };

    useEffect(() => {

        adminUserListHandler();
        adminUserListHandlerForCSV();


    }, [page, isClear]);


    const pageCheck = page === 1 ? 15 : 0


    return (
        <Box>
            <Container>
                <Box className={classes.main}>
                    <Box className={classes.heading}>
                        <Typography
                            variant="h3"
                            // color="primary.main"
                            style={{ color: "#e6e5e8" }}
                        >
                            Active Daily User
                        </Typography>
                        <Typography
                            variant="h3"
                            // color="primary.main"
                            style={{ color: "#e6e5e8" }}
                        >
                            {transactionListDataAll &&
                                transactionListDataAll?.length > 0 && (
                                    <AiOutlineDownload
                                        onClick={downloadExcel}
                                        style={{
                                            color: "#e31a89",
                                            marginRight: "10px",
                                            fontSize: "32px",
                                            cursor: "pointer",
                                        }}
                                    />
                                )}
                        </Typography>
                    </Box>

                    &nbsp;
                    <Box mt={3}
                        className="content"
                        style={{ background: "#000", padding: "15px" }}
                    >
                        {isLoading ? (
                            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <DataLoading />
                            </Box>

                        ) : (
                            <TableContainer>
                                <Table>
                                    <TableHead component={Paper} className="headingcell">
                                        <TableRow>
                                            <TableCell align="Center" className={classes.cell}>
                                                Sr.No
                                            </TableCell>
                                            <TableCell align="Center" className={classes.cell}>
                                                User Name
                                            </TableCell>
                                            <TableCell align="Center" className={classes.cell}>
                                                Wallet Address
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
                                                Date & Time
                                            </TableCell>

                                            <TableCell align="Center" className={classes.cell}>
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {transactionListData?.map((data, i) => {
                                        return (
                                            <TableBody key={i}>
                                                <TableRow className={classes.tbody}>
                                                    <TableCell
                                                        align="Center"
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {(page - 1) * 15 + i + 1}
                                                    </TableCell>
                                                    <TableCell align="Center">
                                                        {data?.creatorId?.userName ? data?.creatorId?.userName : data?.creatorId?.name}
                                                    </TableCell>
                                                    <TableCell align="Center">
                                                        {sortAddress(data?.creatorId?.bnbAccount?.address)}&nbsp;
                                                        <CopyToClipboard
                                                            text={data?.creatorId?.bnbAccount?.address}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            <FiCopy
                                                                onClick={() => toast.info("Copied")}
                                                            />
                                                        </CopyToClipboard>
                                                        {/* <IoMdCopy /> */}
                                                    </TableCell>
                                                    {/* <TableCell align="Center">0 </TableCell>
                          <TableCell align="Center">0 </TableCell> */}
                                                    <TableCell align="Center">
                                                        {data?.creatorId?.status}{" "}
                                                    </TableCell>
                                                    <TableCell align="Center">
                                                        {moment(data?.creatorId?.createdAt).format("lll")}
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
                                                                        search: data?.creatorId?._id,
                                                                    })
                                                                }
                                                                color="primary"
                                                            >
                                                                <VisibilityIcon />
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
                        {!isLoading &&
                            transactionListData &&
                            transactionListData.length === 0 && <NoDataFound />}

                        {transactionListData && transactionListData.length >= pageCheck && (
                            <Box mt={2} display="flex" justifyContent="center">
                                <Pagination
                                    count={noOfPages}
                                    page={page}
                                    onChange={(e, v) => setPage(v)}
                                />
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}
