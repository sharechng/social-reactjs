import { default_RPC_URL } from "../constants/";
import Web3 from "web3";
export function sortAddress(add) {
  if (add) {
    const sortAdd = `${add.slice(0, 6)}...${add.slice(add.length - 4)}`;
    return sortAdd;
  } else {
    return add;
  }
}
export function sortAddressForPrice(add) {
  if (add) {
    const sortAdd = `${add.slice(0, 5)}...${add.slice(add.length - 0)}`;
    return sortAdd;
  } else {
    return add;
  }
}
export const getWeb3Obj = async (RPC_URL = default_RPC_URL) => {
  const httpProvider = new Web3.providers.HttpProvider(RPC_URL);
  const web3 = await new Web3(httpProvider);
  return web3;
};
export function sortAddressPostTitle(add) {
  if (add) {
    const sortAdd = `${add.slice(0, 150)}...${add.slice(add.length - 150)}`;
    return sortAdd;
  } else {
    return add;
  }
}

export function sortAddressDescription(add) {
  if (add) {
    const sortAdd = `${add.slice(0, 30)}...${add.slice(add.length - 30)}`;
    return sortAdd;
  } else {
    return add;
  }
}

export const calculateTimeLeft = (endDate) => {
  if (endDate) {
    let difference = endDate * 1000 - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  } else {
    return false;
  }
};
export const calculateTimeLeftAuction = (endDate) => {
  if (endDate) {
    let difference = +new Date(endDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60  *60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  } else {
    return false;
  }
};
export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (err) {};
};
export const tokenName = "Share";
