import { Avatar, Button, Typography, Box, Dialog, DialogContent, DialogTitle, FormHelperText, IconButton, makeStyles, MenuItem, TextField } from '@material-ui/core';
import React, { useState, useContext, useRef, useEffect } from 'react'
import ReactHashtag from 'react-hashtag';
import { MdCancel } from 'react-icons/md';
import { AuthContext } from "src/context/Auth";
import { MdPhoto, MdAddToPhotos } from "react-icons/md";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { toast } from "react-toastify";
import axios from "axios";


import ButtonCircularProgress from "src/component/ButtonCircularProgress";
const currencies = [
    {
        value: "PUBLIC",
        label: "PUBLIC",
    },
    {
        value: "PRIVATE",
        label: "PRIVATE",
    },
];
const useStyles = makeStyles((theme) => ({
    cancelBtn: {
        position: "absolute",
        top: 0,
        right: 0,
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
    UserBox: {
        display: "flex",
        alignItems: "center",
        "& h6": {
            fontWeight: "600",
        },
        "& select": {
            backgroundColor: "#595a5a",
            color: "#cac7c7",
            padding: "5px 10px",
            borderRadius: "3px",
            border: "none",
            "&:focus-visible": {
                outline: "none",
            },
        },
        "& figure": {
            margin: "0",
            marginRight: "15px",
            height: "60px",
            width: "60px",
            borderRadius: "50%",
            overflow: "hidden",
            backgroundColor: "#101010",
            "& img": {
                width: "100%",
                height: "100%",
                maxWidth: "100%",
                maxHeight: "60px",
            },
        },
    },
}))
export default function EditPostModal({ updateData, open, setOpen, listPublicExclusiveHandler }) {

    const classes = useStyles()
    const auth = useContext(AuthContext);
    const { userData } = auth;
    const [loader, setLoader] = useState(false);
    const [activities, setActivities] = useState();
    const [isSubmit, setIsSubmit] = useState(false);
    const [royality, setRoyality] = useState();
    const [description, setDescription] = useState();
    const [collectionlistAll, setCollectionlist] = useState([]);
    const [amount, setAmount] = useState();
    const [isDurationLess, setIsDurationLess] = useState(false);
    const [hashtagData, setHashtagData] = useState([]);
    const [image, setimage] = useState();

    const [titlePost, setTitlePost] = useState();
    const [imageurl, setimageurl] = useState();

    const [list, setlist] = useState("");
    const [selectedTeam, setSelectedTeam] = useState();
    const [isValidRoyalty, setIsValidRoyalty] = useState(false);
    const [searchUserList, setSearchUserList] = useState([]);
    const [coverPost, setcoverPost] = useState("");
    const [isValidTitle, setIsValidTitle] = useState(true)
    const [textImage, setTextImage] = useState();
    const [selectedHashTagName, setSelectedHashTagName] = useState("");


    useEffect(() => {
        if (updateData) {


            setAmount(updateData?.amount ? updateData?.amount : "")
            setRoyality(updateData?.royality ? updateData?.royality : "")
            setDescription(updateData?.details ? updateData?.details : "")
            setTitlePost(updateData?.postTitle ? updateData?.postTitle : "")
            setActivities(updateData?.postType ? updateData?.postType : "")
            setlist(updateData?.collectionId ? updateData?.collectionId : "")
            setimage(updateData?.mediaUrl ? updateData?.mediaUrl : "")
            setimageurl(updateData?.mediaUrl ? updateData?.mediaUrl : "")
            setcoverPost(updateData?.mediaUrl ? updateData?.mediaUrl : "")
        }

    }, [updateData])







    const videoEl = useRef(null);
    const checkVideoSize = () => {

        const video = videoEl.current;
        if (!video) return;
        console.log(`The video is ${video.duration} seconds long.`, video.duration);
        let durations = Number(video.duration) > 180
        setIsDurationLess(Number(video.duration) > 180)
    }
    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result);
        };
        reader.onerror = function (err) { };
    };
    const updateSelectedBundle = (data) => {
        setlist(data);
    };


    const createBundleHandle = async (event) => {
        event.preventDefault();
        setIsSubmit(true);
        const selectuser = selectedTeam?.map((data, i) => data._id);
        if (activities !== "" &&
            description !== "" &&
            titlePost !== "" &&
            list !== "" &&
            amount !== "" &&
            Number(amount) > 0 &&
            titlePost.length <= 280 &&
            Number(amount) <= 2000 &&

            collectionlistAll.length !== 0) {
            const hastag = description.match(/#[a-z\d]+/gi);

            try {
                setLoader(true);

                const response = await axios({
                    method: "PUT",
                    url: ApiConfig.updatePost,
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                    data: {
                        postId: updateData?._id,
                        postType: activities,
                        details: description,
                        mediaUrl: coverPost ? coverPost : textImage,
                        postTitle: titlePost,
                        collectionId: list,
                        amount: amount,
                        tag: selectuser,
                        royality: royality.toString(),
                        hashTagName: hastag ? hastag : [],
                        mediaType: updateData?.mediaType === "MEDIA" ? "mediaType" : "TEXT" || coverPost ? "MEDIA" : "TEXT",
                    },

                })
                if (response.data.responseCode) {
                    toast.success("Post updated successfully.")
                    listPublicExclusiveHandler()
                    setLoader(false)
                    setOpen(false)
                }
                setLoader(false)

            } catch (error) {
                console.log(error);
                setLoader(false)

            }
        }
    };
    const collectionList = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: ApiConfig.myCollectionList,
                headers: {
                    token: window.localStorage.getItem("token"),
                }
            });
            if (response.data.responseCode === 200) {
                setCollectionlist(response.data.result.docs);
            }
        } catch (error) { }
    };
    useEffect(() => {
        collectionList();
    }, []);


    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth
            disabled={loader}
        >
            <DialogTitle id="alert-dialog-title">{"Update Post"}</DialogTitle>
            <DialogContent>
                <IconButton
                    className={classes.cancelBtn}
                    onClose={() => setOpen(false)}
                    disabled={loader}
                >
                    <MdCancel />
                </IconButton>
                <form onSubmit={(event) => createBundleHandle(event)}>
                    <Box className={classes.mainmodalBox}>
                        <Box mb={2}>
                            <Box className={classes.UserBox}>
                                <Avatar
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        marginRight: "10px",
                                    }}
                                    src={
                                        userData?.profilePic
                                            ? userData?.profilePic
                                            : "images/user.png"
                                    }
                                />
                                <Box>
                                    <Typography variant="h6">{userData?.userName}</Typography>

                                    <TextField
                                        className={classes.publicbox}
                                        style={{}}
                                        id="outlined-select-currency"
                                        select
                                        fullWidth
                                        onChange={(e) => setActivities(e.target.value)}
                                        value={activities}
                                        variant="outlined"
                                    >
                                        {currencies.map((option, i) => (
                                            <MenuItem
                                                style={{ maxHeight: "35px" }}
                                                key={i}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                            </Box>
                        </Box>

                        <textarea
                            disabled={loader}
                            spellCheck="true"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="formControl"
                            // rows={3}
                            placeholder="Write here..."
                            id="text-element"
                        ></textarea>
                        <FormHelperText error>
                            {(isSubmit && description === "" && (
                                <Box mt={1}>Description is required</Box>
                            ))

                            }
                        </FormHelperText>
                        {hashtagData?.length > 0 && (
                            <>
                                {hashtagData?.map((data, i) => {
                                    return (
                                        <li
                                            key={i}
                                            className="list-group-item"
                                            style={{ textAlign: "left", zIndex: 999 }}
                                        >
                                            <Box display={"flex"} justifyContent="space-between">
                                                <Box display={"flex"}>
                                                    <Box className={classes.hash}>
                                                        {" "}
                                                        <ReactHashtag
                                                            onHashtagClick={() => {
                                                                setSelectedHashTagName(data.hashTagName);
                                                            }}
                                                        >
                                                            {data?.hashTagName}
                                                        </ReactHashtag>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </li>
                                    );
                                })}
                            </>
                        )}
                        <Box mt={2}>
                            <TextField
                                id="titlePost"
                                variant="outlined"
                                name="Text Field"
                                placeholder="Title"
                                type="text"
                                multiline
                                rows={2}
                                fullWidth
                                value={titlePost}
                                disabled={loader}

                                onChange={(e) => {
                                    let temp = e.target.value
                                    setTitlePost(temp);
                                    if (temp.length > 280) {
                                        setIsValidTitle(false)
                                    } else {
                                        setIsValidTitle(true)
                                    }
                                }}

                            />
                            {isSubmit && titlePost === "" && (
                                <FormHelperText error>Please enter title.</FormHelperText>
                            )}
                            {!isValidTitle && titlePost !== "" && (
                                <FormHelperText error>You can not enter more than 280 charachters.</FormHelperText>
                            )}
                        </Box>



                        <Box mt={2}>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                name="Text Field"
                                placeholder="Price"
                                disabled={loader}
                                type="number"
                                onKeyPress={(event) => {
                                    if (event?.key === "-" || event?.key === "+") {
                                        event.preventDefault();
                                    }
                                }}
                                fullWidth
                                value={amount}
                                error={
                                    (isSubmit && amount === "") ||
                                    (amount !== "" && Number(amount) == 0) ||
                                    (amount !== "" && Number(amount) > 2000)
                                }
                                onChange={(e) => setAmount(e.target.value)}
                            />
                            <FormHelperText error>
                                {(isSubmit && amount === "" && (
                                    <Box ml={1}>Amount is required</Box>
                                )) ||
                                    (amount !== "" && Number(amount) <= 0 && (
                                        <Box ml={1}>Enter valid amount</Box>
                                    )) ||
                                    (amount !== "" && Number(amount) > 2000 && (
                                        <Box ml={1}>
                                            Post amount should be less than or equal to 2000
                                        </Box>
                                    ))}
                            </FormHelperText>
                        </Box>
                        <Box mt={2}>
                            <TextField
                                variant="outlined"
                                name="Text Field"
                                placeholder="Royality between 0 to 10%"
                                type="number"
                                disabled={loader}
                                onKeyPress={(event) => {
                                    if (event.key === "-" || event.key === "+") {
                                        event.preventDefault();
                                    }
                                }}
                                fullWidth
                                value={royality}
                                onChange={(e) => {
                                    if (e.target.value > 10 || e.target.value < 0) {
                                        setIsValidRoyalty(false);
                                    } else {
                                        setIsValidRoyalty(true);
                                    }
                                    setRoyality(e.target.value);
                                }}
                            />
                            {!isValidRoyalty && royality === "" && (
                                <FormHelperText error>
                                    Please enter royalty between 0 to 10
                                </FormHelperText>
                            )}
                        </Box>



                        <Box mt={2}>
                            {/* {searchUserList && searchUserList?.map()} */}
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={searchUserList}
                                value={selectedTeam}
                                onChange={(_event, newTeam) => {
                                    setSelectedTeam(newTeam);
                                }}
                                getOptionLabel={(option) => option?.userName}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Tag users"
                                        placeholder="Users"
                                    />
                                )}
                            />
                        </Box>
                        <Box mt={2} className="addphotos">
                            <input
                                // accept="video/*"
                                accept=".jpg,.gif,.png,.svg,.jpeg,.mp4"
                                // accept="image/*"
                                type="file"
                                error={Boolean(isSubmit && image === "")}
                                onChange={(e) => {
                                    setimage(e.target.files[0]);
                                    setimageurl(URL.createObjectURL(e.target.files[0]));
                                    getBase64(e.target.files[0], (result) => {
                                        setcoverPost(result);
                                    });
                                }}
                            />

                            {imageurl ? (
                                <>
                                    <Box style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                        <img src={imageurl} width="200px" />
                                        <Box mt={1}>
                                            <Button disabled={loader}
                                                variant="contained"
                                                size="large"
                                                color="secondary"
                                                type="submit"
                                                onClick={() => {
                                                    setimageurl("");
                                                    setimage("");
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </Box>
                                    </Box>
                                </>

                            ) : (

                                <Box>
                                    {image?.type === "video/mp4" ||
                                        image?.type == "image/jpeg" ||
                                        image?.type == "image/png" ||
                                        image?.type == "image/gif" ||
                                        image?.type == "image/jpg" ||
                                        image?.type == "image/svg" ? (
                                        <>
                                            {image?.type === "video/mp4" ? (
                                                <>
                                                    <video
                                                        ref={videoEl}
                                                        onLoadedMetadata={checkVideoSize}
                                                        style={{ width: "100%", maxHeight: "213px" }}
                                                        controls
                                                    >
                                                        <source src={imageurl} type="video/mp4" />
                                                    </video>
                                                    <Box>
                                                        {isDurationLess ? (<Typography

                                                            style={{ color: "red" }}
                                                        >
                                                            Video duration does not exceed more than 3 min
                                                        </Typography>) : (
                                                            <Button
                                                                variant="outined"
                                                                color="primary"
                                                                component="span"
                                                            >
                                                                Uploaded Successfully
                                                            </Button>)}
                                                    </Box>
                                                    <Button disabled={loader}
                                                        variant="contained"
                                                        size="large"
                                                        color="secondary"
                                                        type="submit"
                                                        onClick={() => {
                                                            setimageurl("");
                                                            setimage("");
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <img src={imageurl} alt="" width="200px" />
                                                    <Box>

                                                        <Button
                                                            variant="outined"
                                                            color="primary"
                                                            component="span"
                                                        >
                                                            Uploaded Successfully
                                                        </Button>

                                                    </Box>
                                                    <Button disabled={loader}
                                                        variant="contained"
                                                        size="large"
                                                        color="secondary"
                                                        type="submit"
                                                        onClick={() => {
                                                            setimageurl("");
                                                            setimage("");
                                                        }}
                                                    >
                                                        Remove
                                                    </Button>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {" "}
                                            <MdAddToPhotos />
                                            <Typography variant="h5">Add photos/videos</Typography>
                                            {/* <small>or drag and drop</small> */}
                                        </>
                                    )}
                                </Box>
                            )}


                        </Box>
                        <Box mt={1}></Box>



                        <Box
                            style={{
                                display: "flex",
                                overflowY: "hidden",
                                overflowX: "auto",
                                direction: "ltr",
                            }}
                        >
                            {/* <Slider {...Settings} style={{ width: "100%" }}> */}
                            {collectionlistAll.map((data, i) => {
                                const statusData = data._id === list;
                                // const status = list.includes(data._id);
                                const isVideo = data.image.includes(".mp4");
                                return (
                                    <Box
                                        key={i}
                                        mr={2}
                                        style={
                                            list
                                                ? {
                                                    width: "200px",
                                                    minWidth: "200px",
                                                    height: "179px",
                                                    background: "#710d44",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    flexDirection: "column",
                                                    corsor: "pointer !important",
                                                    borderRadius: "10px",
                                                }
                                                : {
                                                    width: "200px",
                                                    minWidth: "200px",
                                                    height: "179px",
                                                    background: "#710d44",
                                                    corsor: "pointer",
                                                    // display: "flex",
                                                    // justifyContent: "center",
                                                    // alignItems: "center",
                                                    borderRadius: "10px",
                                                }
                                        }
                                        onClick={() => {
                                            updateSelectedBundle(data._id);
                                        }}
                                    >
                                        {!statusData ? (
                                            <>
                                                <figure
                                                    style={{ height: "147px", margin: "0 auto" }}
                                                >
                                                    {isVideo ? (
                                                        <video
                                                            width="100%"
                                                            style={{
                                                                width: "100%",
                                                                maxHeight: "140px",
                                                                borderRadius: "11px",
                                                            }}
                                                            controls
                                                        // onClick={handleClickOpen2}
                                                        >
                                                            <source src={data.image} type="video/mp4" />
                                                        </video>
                                                    ) : (
                                                        <img
                                                            style={{
                                                                width: "100%",
                                                                maxHeight: "140px",
                                                                borderRadius: "11px",
                                                            }}
                                                            src={data?.image}
                                                            alt=""
                                                        />
                                                    )}
                                                </figure>
                                                <Typography
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                    variant="h6"
                                                >
                                                    {data?.title}
                                                </Typography>
                                            </>
                                        ) : (
                                            <Box
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <span>selected</span>
                                            </Box>
                                        )}
                                    </Box>
                                );
                            })}

                        </Box>
                        <FormHelperText error>
                            {isSubmit && collectionlistAll?.length > 0 && list === "" && (
                                <Box ml={1}>Please select collection name</Box>
                            )}
                        </FormHelperText>

                        <Box mt={3} mb={2}>


                            <Button
                                variant="contained"
                                fullWidth
                                disabled={
                                    loader ||
                                    description === "" ||
                                    royality < 0 ||
                                    royality > 10 || isDurationLess ||
                                    amount <= 0
                                }
                                color="secondary"
                                type="submit"

                            >
                                Post {loader && <ButtonCircularProgress />}
                            </Button>


                        </Box>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    )
}
