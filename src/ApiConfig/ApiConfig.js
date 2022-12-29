export const baseURL = "https://node.bitfuxi.co.uk";
export const socketURL = "wss://node.bitfuxi.co.uk";
// export const baseURL = "https://node-social.mobiloitte.org";
// export const baseURL = "http://172.16.1.132:1909";


const url = `${baseURL}/api/v1`;
export const websiteName =
  window.location.protocol + "//" + window.location.host;
const Apiconfigs = {
  register: `${url}/user/register`,
  listUser: `${url}/admin/listUser`,
  AllUser: `${url}/admin/AllUser`,
  feeList: `${url}/admin/feeList`,
  blockpost: `${url}/admin/blockpost`,
  postIngore: `${url}/admin/postIngore`,
  reportsList: `${url}/admin/reportsList?type=`,
  addSubamin: `${url}/admin/addSubamin`,
  subAdminList: `${url}/admin/subAdminList`,
  deleteUser: `${url}/admin/deleteUser`,
  dashboard: `${url}/admin/dashboard`,

  userlogin: `${url}/user/login`,
  verifyOtp: `${url}/user/verifyOtp`,
  resendOtp: `${url}/user/resendOtp`,
  resetPassword: `${url}/user/resetPassword`,
  updateprofile: `${url}/user/updateProfile`,
  getBalance: `${url}/user/getBalance`,
  requestAdminByuser: `${url}/user/requestAdminByuser`,
  createPostPromotion: `${url}/user/createPostPromotion`,
  myPostPromotionList: `${url}/user/myPostPromotionList`,
  postPromotionDelete: `${url}/user/postPromotionDelete?_id=`,
  postListByHashTag: `${url}/user/postListByHashTag`,

  deleteCommentReplyOnPost: `${url}/user/deleteCommentReplyOnPost`,
  deleteCommentOnPostPromotion: `${url}/user/deleteCommentOnPostPromotion`,

  deleteCommentReplyOnPostPromotion: `${url}/user/deleteCommentReplyOnPostPromotion`,

  collectionSubscriptionList: `${url}/user/collectionSubscriptionList`,
  collectionSubscriptionView: `${url}/user/collectionSubscriptionView`,
  trendingUserlist: `${url}/user/trendingUserlist`,



  // donationTransactionlist: `${url}/user/donationTransactionlist`,
  // emailOtp: `${url}/user/emailOtp`,
  profile: `${url}/user/userprofile`,
  forgotPassword: `${url}/user/forgotPassword`,
  createPost: `${url}/user/createPost`,
  updatePost: `${url}/user/updatePost`,
  userBlockUnblock: `${url}/user/userBlockUnblock/`,
  userBlockUnblockAdmin: `${url}/admin/userBlockUnblock/`,
  postListAdmin: `${url}/admin/postList/`,
  feeList: `${url}/admin/feeList`,
  feeUpdate: `${url}/admin/feeUpdate`,
  requestList: `${url}/admin/requestList`,
  subAdminBlockUnblock: `${url}/admin/subAdminBlockUnblock`,
  postListWithUser: `${url}/admin/postListWithUser`,
  ignoreUnignorUser: `${url}/user/userIgnore_Unignore`,
  socialLogin: `${url}/user/socialLogin`,
  listBlockedUser: `${url}/user/listBlockedUser`,
  changePassword: `${url}/user/changePassword`,
  getWalletDetails: `${url}/user/walletDetails`,
  getOtheruserprofile: `${url}/user/getOtheruserprofile/`,
  userActivity: `${url}/user/userActivity`,
  likeDislikeCollection: `${url}/user/likeDislikeCollection/`,
  shareWithAudience: `${url}/user/shareWithAudience/`,
  subscribeNow: `${url}/user/collectionSubscription`,
  listPostWithCollection: `${url}/user/listPostWithCollection`,
  createReport: `${url}/user/createReport`,
  listFollowerUser: `${url}/user/listFollowerUser`,
  listFollowingUser: `${url}/user/listFollowingUser`,
  migthtList: `${url}/user/migthtList`,
  tagPostlist: `${url}/user/tagPostlist`,

  addAuction: `${url}/user/addAuction`,
  likeDislikeAuction: `${url}/user/likeDislikeAuction/`,
  deleteAuction: `${url}/user/deleteAuction`,
  buyAuctionList: `${url}/user/buyAuctionList`,

  // story
  storyListWithFollowing: `${url}/user/storyListWithFollowing`,

  addNft: `${url}/nft/collection`,
  viewCollection: `${url}/nft/viewCollection/`,

  myCollectionList: `${url}/nft/myCollectionList`,
  myAuctionList: `${url}/user/mylistAuction`,

  createAuctionNft: `${url}/nft/createAuctionNft`,
  allAuctionList: `${url}/nft/allAuctionList`,
  viewAuctionNFT: `${url}/nft/viewAuctionNFT/`,
  createAuctionNft: `${url}/nft/createAuctionNft`,
  viewAuctionNFT: `${url}/nft/viewAuctionNFT/`,
  getOtheruserCollection: `${url}/user/getOtheruserCollection`,
  editAuctionNft: `${url}/nft/editAuctionNft`,
  buypostList: `${url}/user/buypostList`,
  trendingUserlist: `${url}/user/trendingUserlist`,
  offLineUser: `${url}/user/offLineUser`,

  // auctions api

  listAuction: `${url}/user/listAuction`,
  expiredAuction: `${url}/user/expiredAuction`,
  viewAuction: `${url}/user/viewAuction`,
  updateAuction: `${url}/user/updateAuction`,

  // updateAuction: `${url}/user/updateAuction`,
  buyAuction: `${url}/user/buyAuction`,
  createBid: `${url}/bid/createBid`,
  deleteBid: `${url}/bid/deleteBid`,
  acceptBid: `${url}/bid/acceptBid`,
  rejectBid: `${url}/bid/rejectBid`,

  //addStory
  uploadFile: `${url}/user/uploadFile`,
  viewStory: `${url}/user/viewStory`,
  storyList: `${url}/user/storyList`,
  expiredStory: `${url}/user/expiredStory`,
  listFollowingUserStoryVisible: `${url}/user/listFollowingUserStoryVisible`,

  // creator
  listAllcreator: `${url}/user/listAllcreator`,
  searchUserNameForsignUpTime: `${url}/user/searchUserNameForsignUpTime`,

  viewOtheruserprofile: `${url}/user/viewOtheruserprofile/`,
  followUnfollowUser: `${url}/user/followUnfollowUser/`,
  // exclusive public list
  listExclusivePublicpost: `${url}/user/allPostList`,
  postList: `${url}/user/postList`,
  commentOnpost: `${url}/user/commentOnpost`,
  commentReplyOnPost: `${url}/user/commentReplyOnPost`,
  hideUnHidePost: `${url}/user/hide_unhidePost`,
  deletePost: `${url}/user/deletePost`,

  likeDislikePostPromotion: `${url}/user/likeDislikePostPromotion/`,
  commentReplyOnPostPromotion: `${url}/user/commentReplyOnPostPromotion`,

  postLikeDislike: `${url}/user/likeDislikePost/`,
  reactOnPost: `${url}/user/reactOnPost/`,
  reactOnPostPromoted: `${url}/user/reactOnPostPromoted/`,
  myPostPromotionView: `${url}/user/myPostPromotionView/`,

  transactionList: `${url}/user/transactionList`,
  adminTransactionList: `${url}/admin/adminTransactionList`,

  walletTransactionList: `${url}/user/walletTransactionList`,

  viewExclusivepost: `${url}/user/postView?postId=`,
  listCollection: `${url}/nft/listCollection`,
  listCollectionNft: `${url}/nft/listCollectionNft`,
  likeDislikeCommentOnPost: `${url}/user/likeDislikeCommentOnPost/`,
  commentOnPostPromotion: `${url}/user/commentOnPostPromotion`,
  likeDislikeCommentOnPostPromotion: `${url}/user/likeDislikeCommentOnPostPromotion`,
  commentOnPost: `${url}/user/deleteCommentOnPost`,
  readChat: `${url}/socket/readChat/`,
  listOrder: `${url}/order/listOrder`,
  orderDetails: `${url}/order/order/`,
  disappearUpdate: `${url}/user/disappearUpdate/`,
  disappearView: `${url}/user/disappearView`,

  readNotification: `${url}/notification/readNotification`,
  deleteAllNotification: `${url}/notification/deleteAllNotification`,

  buyPost: `${url}/user/buyPost`,
  notificationUpdate: `${url}/user/notificationUpdate`,
  listUserWithpost: `${url}/user/listUserWithpost`,
  globalSearch: `${url}/user/globalSearch`,

  // Intrest

  addInterest: `${url}/user/addInterest`,
  createInterest: `${url}/user/createInterest`,
  listInterest: `${url}/user/listInterest`,
  // listInterest: `${url}/user/listInterest`,
  deleteInterest: `${url}/user/deleteInterest`,
  refferralAfterSocialLogin: `${url}/user/refferralAfterSocialLogin`,

  // Duration

  listDuration: `${url}/admin/listDuration`,
  addDuration: `${url}/admin/addDuration`,
  deleteDuration: `${url}/admin/deleteDuration`,
  transactionListWithUser: `${url}/admin/transactionListWithUser`,
  feeList: `${url}/admin/feeList`,
  activeUserDailyList: `${url}/admin/activeUserDailyList`,
  topCreatorList: `${url}/admin/topCreatorList`,
  engagingUserList: `${url}/admin/engagingUserList`,
  analysisForTrends: `${url}/admin/analysisForTrends`,






  // Deposit and withdrawl
  deposit: `${url}/user/deposit`,
  withdraw: `${url}/user/withdraw`,
  userDashboard: `${url}/user/userDashboard`,

  HashTagSearchWithList: `${url}/user/HashTagSearchWithList`,

  // static Content
  addStaticContent: `${url}/static/staticContent`,
  staticContentList: `${url}/static/staticContentList`,
  viewStatic: `${url}/static/staticContent`,
  editStatics: `${url}/static/staticContent`,

  // socket

  oneToOneChatApi: `${url}/socket/oneToOneChatApi`,
  // nft
  exportOnMarketPlace: `${url}/nft/exportOnMarketPlace`,

};

export default Apiconfigs;
