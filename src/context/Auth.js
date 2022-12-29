import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import ApiConfig, { socketURL } from "src/ApiConfig/ApiConfig";
import {
  createSignalProtocolManager,
  SignalServerStore,
} from "src/signal/SignalGateway";
import { useHistory } from "react-router-dom";

export const AuthContext = createContext();

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("token", accessToken);
    sessionStorage.setItem("token", accessToken);
    axios.defaults.headers.common.Authorization = `${accessToken}`;
  } else {
    // sessionStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

function checkLogin() {
  const accessToken = window.localStorage.getItem("token");
  return accessToken ? true : false;
}

export default function AuthProvider(props) {
  const [isLogin, setIsLogin] = useState(checkLogin());
  const [userData, setUserData] = useState({});
  const [chatMessageData, setChatMessageData] = useState();
  const [userBalance, setUserBalnce] = useState();
  const [unreadChats, setUnreadChats] = useState(0);
  const [notificationList, setNotificationList] = useState([]);

  const [unReadNotification, setUnReadNotification] = useState(0);
  const history = useHistory();
  const [signalProtocolManagerUser, setSignalProtocolManagerUser] =
    useState(undefined);
  const [dummySignalServer, setDummySignalServer] = useState(
    new SignalServerStore()
  );

  const setLoggedinUser = () => {
    try {
      createSignalProtocolManager(
        userData?._id,
        userData?.userName,
        dummySignalServer
      ).then((signalProtocolManagerUser) => {
        setSignalProtocolManagerUser(signalProtocolManagerUser);
      });
    } catch (error) { }
  };
  useEffect(() => {
    if (userData) {
      setLoggedinUser();
    }
  }, [userData]);
  const status = localStorage.getItem("status");

  const getoffLineUserApi = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: ApiConfig.offLineUser,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {

      }
    } catch (error) { }
  };

  useEffect(() => {
    return () => {
      getoffLineUserApi();
    };
  }, []);

  const handleUserProfileApi = () => {
    axios
      .get(ApiConfig.profile, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.responseCode === 403) {
          setIsLogin(true);
        } else if (response.data.responseCode === 500) {
          history.push("/");
          getoffLineUserApi();
          setIsLogin(false);
        } else if (response.data.responseCode === 401) {
          setIsLogin(false);
        } else if (response.data.responseCode === 200) {
          setUserData(response.data.result);
          setIsLogin(true);
        }
      })
      .catch((error) => {
        console.log("erooor", error?.response?.data?.responseCode);
        if (error?.response?.data?.responseCode === 403) {
          setIsLogin(true);
        } else if (error?.response?.data?.responseCode === 500) {
          getoffLineUserApi();
          setIsLogin(false);
        } else {
          setIsLogin(false);
        }
      });
  };

  const getDepositApi = async () => {
    try {
      const res = await axios({
        method: "POST",
        url: ApiConfig.deposit,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });
      if (res.data.responseCode === 200) {
        // toast.success(res.data.responseMessage);
        //   toast.succes
        // setDataList(res.data.result);
      }
    } catch (error) {
      // toast.success(error?.response?.data?.responseMessage);
    }
  };

  const handleUserBalanceApi = () => {
    axios
      .get(ApiConfig.getBalance, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.responseCode === 401) {
          //
        } else if (response.data.responseCode === 200) {
          // localStorage.removeItem("token");
          // history.push("/");
          setUserBalnce(response.data.result);
          // setIsLogin(true);
        }
      })
      .catch((response) => {
        // setIsLogin(false);
        // if (response?.response?.data?.responseCode === 401) {
        //   setIsLogin(false)
        //   // history.push("/")
        //   // sessionStorage.removeItem("token");
        // } else {
        //   setIsLogin(false)
        // }
      });
  };
  useEffect(() => {
    handleUserProfileApi();
    if (userData?._id && userData?.userType === "User") {
      handleUserBalanceApi();
      // getDepositApi();
    }
  }, [userData?._id, userData?.userType === "User"]);

  //CHAT COUNT
  useEffect(() => {
    const web = new WebSocket(socketURL);
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      try {
        web.onopen = () => {
          const dataToSend = {
            user_token: accessToken,
          };
          web.send(JSON.stringify(dataToSend));
          web.onmessage = async (event) => {
            if (event.data !== "[object Promise]" && event.data !== "null") {
              let obj = JSON.parse(event.data);

              setUnreadChats(obj);
              // let encryptedMessage = await this.props.signalProtocolManagerUser.encryptMessageAsync(this.state.messageToUser._id, newMsgObj.message);
              // msgToSend.message = encryptedMessage
            }
          };
        };
        return () => {
          web.close();
          setUnreadChats(0);
        };
      } catch (err) {
        setUnreadChats(0);
      }
    }
  }, [userData]);

  //CHAT ChatHistory
  useEffect(() => {
    const web = new WebSocket(socketURL);

    const accessToken = localStorage.getItem("token");

    if (accessToken && userData && userData._id) {
      try {
        web.onopen = () => {
          const dataToSend = {
            type: "ChatHistory",
            senderId: userData._id
          };

          // let encryptedMessage = signalProtocolManagerUser.encryptMessageAsync(
          //   userData._id
          // );
          // dataToSend.message = encryptedMessage;
          web.send(JSON.stringify(dataToSend));
          web.onmessage = async (event) => {
            if (event.data !== "[object Promise]" && event.data !== "null") {
              let obj = JSON.parse(event.data);
              console.log("ChatHistory-new", obj);
              // let decrytedMessage =
              //   await signalProtocolManagerUser.decryptMessageAsync(
              //     obj.senderid,
              //     obj.message
              //   );
              // obj.message = decrytedMessage;
              setChatMessageData(obj.result);

            }
          };
        };
        return () => {
          web.close();
          setChatMessageData();
        };
      } catch (err) {
        setChatMessageData();
      }
    }
  }, [userData]);

  // NOTIFICATION
  const accessToken = window.localStorage.getItem("token");

  useEffect(() => {
    const web = new WebSocket(socketURL);
    if (userData?._id && accessToken) {
      try {
        web.onopen = () => {
          const dataToSend = {
            option: "notification",
            token: accessToken,
          };
          web.send(JSON.stringify(dataToSend));
          web.onmessage = async (event) => {
            if (event.data !== "[object Promise]" && event.data !== "null") {
              let obj = JSON.parse(event.data);
              if (obj.data && obj.data.length > 0) {
                setNotificationList(obj.data);
                setUnReadNotification(obj.unReadCount);
              } else {
                setNotificationList([]);
                setUnReadNotification(0);
              }
            }
          };
        };
        return () => {
          setNotificationList([]);
          setUnReadNotification(0);
          web.close();
        };
      } catch (err) {
        console.log("err---------------------", err);
      }
    }
  }, [userData, accessToken]);

  let data = {
    userLoggedIn: isLogin,
    userData,
    chatMessageData,
    unreadChats,
    notificationList,
    unReadNotification,
    signalProtocolManagerUser,
    setNotificationList,
    setSignalProtocolManagerUser,
    dummySignalServer,
    setIsLogin,
    setDummySignalServer,
    getoffLineUserApi: () => getoffLineUserApi(),
    setLoggedinUser: () => setLoggedinUser(),
    handleUserProfileApi: () => handleUserProfileApi(),
    userLogIn: (type, data) => {
      setSession(data);
      setIsLogin(type);
    },
    logout: () => {
      setSession(null);
      setIsLogin(false);
      setUserData({});
      window.localStorage.removeItem("token");
    },
  };

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
}
