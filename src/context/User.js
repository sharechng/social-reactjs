import React, { createContext, useEffect, useState } from "react";
import { injected } from "src/connectors";
import { useWeb3React } from "@web3-react/core";
import { SUPPORTED_WALLETS } from "src/connectors";
import { toast } from "react-toastify";
import axios from "axios";
import apiConfig, { socketURL } from "src/connectors/config/ApiConfig";
import Web3 from "web3";
import { useHistory, Link as RouterComponent } from "react-router-dom";

export const UserContext = createContext();

const setSession = (userAddress) => {
  if (userAddress) {
    sessionStorage.setItem("userAddress", userAddress);
  } else {
    sessionStorage.removeItem("userAddress");
  }
};

const setTokenSession = (token) => {
  if (token) {
    sessionStorage.setItem("token", token);
  } else {
    sessionStorage.removeItem("token");
  }
};

export default function AuthProvider(props) {
  const { activate, account, chainId, library, deactivate } = useWeb3React();
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();

  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [yourWalletBalance, setYourWalletBalance] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationList, setNotificationList] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const [walletData, setWalletData] = useState([]);
  const [kycStatusRes, setKycStatusRes] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  let data = {
    userData,
    isAdmin,
    isLogin,
    collectionList,
    isLoading,
    notificationList,
    unreadCount,
    yourWalletBalance,
    kycStatusRes,
    walletData,
    setIsLogin,
    updateUser: (account) => {
      setSession(account);
    },
    connectWallet: (data) => connectWalletHandler(data),
    getProfileHandler: (token) => getProfileHandler(token),
    getCollectionList: () => getCollectionList(),
    logoutHandler: () => {
      deactivate();
      setIsLogin(false);
      setUserData();
      setIsAdmin(false);
    },
  };

  const getCollectionList = async (cancelTokenSource) => {
    try {
      const res = await axios.get(apiConfig.myCollectionList, {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        if (res.data.result.docs) {
          setCollectionList(res.data.result.docs);
        } else {
          setCollectionList(res.data.result.docs);
        }
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  };

  useEffect(() => {
    if (userData && userData._id) {
      getCollectionList();
    }
  }, [userData]);

  useEffect(() => {
    const web = new WebSocket(socketURL);
    const accessToken = localStorage.getItem("token");
    if (accessToken && account) {
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
                setUnreadCount(obj.unReadCount);
              } else {
                setNotificationList([]);
                setUnreadCount(0);
              }
            }
          };
        };
        return () => {
          setNotificationList();
          setUnreadCount(0);
          web.close();
        };
      } catch (err) {}
    }
  }, [isLogin]);

  const getUserbalce = async () => {
    var web3 = new Web3(library.provider);
    const balance = await web3.eth.getBalance(account);
    const balanceImETH = await web3.utils.fromWei(balance);
    setYourWalletBalance(parseFloat(balanceImETH).toFixed(2));
  };

  useEffect(() => {
    if (account) {
      getUserbalce();
    }
  }, [account, library]);
  const connectWalletHandler = (data) => {
    try {
      const connector = data.connector;

      if (connector && connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined;
      }

      activate(connector, undefined, true).catch((error) => {
        if (error) {
          window.sessionStorage.removeItem("walletName");
          toast.error(JSON.stringify(error.message));
          window.sessionStorage.removeItem("walletName");
          activate(connector);
        }
      });
    } catch (error) {
      toast.error(JSON.stringify(error.message));
    }
  };

  const connectWalletAPIHandler = async (walletAddress) => {
    try {
      const res = await axios.post(apiConfig.connectWallet, {
        walletAddress,
      });
      if (res.data.statusCode === 200) {
        getProfileHandler(res.data.result.token);
        setIsLogin(true);

        setWalletData(res.data.result);
        setTokenSession(res.data.result.token);
      } else {
        deactivate();
        setIsLogin(false);
        setUserData();
        setIsAdmin(false);
        setIsLoading(false);
      }
    } catch (error) {
      deactivate();
      setIsLogin(false);
      setIsLoading(false);
    }
  };

  const getProfileHandler = async (token) => {
    try {
      const res = await axios.get(apiConfig.profile, {
        headers: {
          token,
        },
      });
      if (res.data.statusCode === 200) {
        setUserData(res.data.result.userResult);
        // setIsLogin(true);
        setIsAdmin(
          res.data.result.userResult.userType == "Admin" ||
            res.data.result.userResult.userType == "SubAdmin"
        );
        if (res.data.result.kycStatusRes) {
          setKycStatusRes(res.data.result.kycStatusRes);
        } else {
          setKycStatusRes();
        }

        // setIsLogin(true);
      } else if (res.data.statusCode === 404) {
        history.push("/");
        // setIsLogin(false);
      } else {
        // setIsLogin(false);
      }
      setIsLoading(false);
    } catch (error) {
      // setIsLogin(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (account) {
      connectWalletAPIHandler(account);
    } else {
      setIsLogin(false);
      setUserData();
      setIsAdmin(false);
    }
  }, [account]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!account) {
        setIsLoading(false);
      }
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [account]);

  useEffect(() => {
    if (window.localStorage.getItem("walletName")) {
      const selectectWalletDetails = SUPPORTED_WALLETS.filter(
        (data) => data.name === window.localStorage.getItem("walletName")
      );
      if (selectectWalletDetails && selectectWalletDetails[0].data) {
        connectWalletHandler(selectectWalletDetails[0].data);
      }
    }
  }, []);

  // useEffect(() => {
  //   const userAddress = window.localStorage.getItem("userAddress");
  //   if (userAddress) {
  //     data.connectWallet();
  //   }
  // }, []); //eslint-disable-line

  useEffect(() => {
    data.updateUser(account);
  }, [account]); //eslint-disable-line

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
}
