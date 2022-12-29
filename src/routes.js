import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import LoginLayout from "src/layouts/LoginLayout";
import HomeLayout from "src/layouts/HomeLayout";

export const routes = [
  {
    exact: true,
    path: "/",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/LogIn")),
  },
  {
    exact: true,
    path: "/signup",
    layout: LoginLayout,
    component: lazy(() => import("src/views/auth/signup/signup")),
  },
  {
    exact: true,
    path: "/forget-password",
    // guard:true,
    component: lazy(() => import("src/views/auth/forget-password/index")),
  },
  {
    exact: true,
    path: "/check-email",
    // guard:true,
    component: lazy(() => import("src/views/auth/signup/CheckEmail")),
  },
  {
    exact: true,
    path: "/verify-otp",
    component: lazy(() => import("src/views/auth/Verify-Otp/VerifyOtp")),
  },
  {
    exact: true,
    path: "/reset-password",
    // guard:true,
    component: lazy(() => import("src/views/auth/reset-password/index")),
  },
  {
    exact: true,
    path: "/explore",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard")),
  },
  {
    exact: true,
    path: "/stories",
    guard: true,
    // layout: DashboardLayout,
    component: lazy(() => import("src/component/StoriesPages")),
  },
  {
    exact: true,
    path: "/comment",
    guard: true,
    // layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Dashboard/Comment")),
  },
  {
    exact: true,
    path: "/profile",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Profile/Index")),
  },
  {
    exact: true,
    path: "/auction",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Auction/Auction")),
  },
  {
    exact: true,
    path: "/creators",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Creators/Creators")),
  },

  {
    exact: true,
    path: "/better",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Better/Better")),
  },

  {
    exact: true,
    path: "/about-creators",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Creators/AboutCreator")),
  },
  {
    exact: true,
    path: "/about-auction",
    layout: DashboardLayout,
    guard: true,
    component: lazy(() => import("src/views/pages/Auction/AboutAuction")),
  },
  {
    exact: true,
    path: "/collections",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Bundles/Bundles")),
  },
  {
    exact: true,
    path: "/wallet",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Wallet/Wallet")),
  },
  {
    exact: true,
    path: "/transactionData",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/component/TransactionData")),
  },
  {
    exact: true,
    path: "/bundles-details",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Bundles/BundlesDetail/BundlesDetail")
    ),
  },
  {
    exact: true,
    path: "/details",
    // layout: DashboardLayout,
    guard: true,
    component: lazy(() =>
      import("src/views/pages/Bundles/BundlesDetail/Detail")
    ),
  },
  {
    exact: true,
    path: "/bundles-share",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Bundles/BundlesShare")),
  },
  {
    exact: true,
    path: "/settings",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Settings/Index")),
  },
  {
    exact: true,
    path: "/admin",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/Admin")),
  },
  {
    exact: true,
    path: "/tranding",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/TrandingUser")),
  },
  {
    exact: true,
    path: "/active-user",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/ActiveUser")),
  },
  {
    exact: true,
    path: "/analaysis",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/AnlaysisUser")),
  },
  {
    exact: true,
    path: "/top-user",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/TopCreator")),
  },
  {
    exact: true,
    path: "/enaging-user",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/EngagingUser")),
  },
  {
    exact: true,
    path: "/dashboard",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/Dashboard")),
  },
  {
    exact: true,
    path: "/control",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Control/Control")),
  },
  {
    exact: true,
    path: "/static",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/StaticContent/Static")),
  },
  {
    exact: true,
    path: "/add-static-content",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/StaticContent/AddStatic")),
  },
  {
    exact: true,
    path: "/static-content-details",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/StaticContent/StaticContentDetail")
    ),
  },
  {
    exact: true,
    path: "/edit-static-content",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/StaticContent/EditContent")),
  },
  {
    exact: true,
    path: "/add-subadmin",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Control/AddSubadmin")),
  },

  {
    exact: true,
    path: "/promotion",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Promotion/Promotion")),
  },

  {
    exact: true,
    path: "/blocklist",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Blocklist/Blocklist")),
  },
  {
    exact: true,
    path: "/notification-list",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Notification/Index")),
  },
  {
    exact: true,
    path: "/subscriber-list",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/StaticPage/SubscriberList")),
  },
  {
    exact: true,
    path: "/hashtag",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/StaticPage/Hashtag")),
  },
  {
    exact: true,
    path: "/trending-list",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/StaticPage/TrendingList")),
  },
  {
    exact: true,
    path: "/transaction-history",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/StaticPage/TransactionHistory")
    ),
  },
  {
    exact: true,
    path: "/chat-history",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/StaticPage/ChatList")),
  },
  // {
  //   exact: true,
  //   path: "/Block",
  //   layout: DashboardLayout,
  //   component: lazy(() => import("src/views/pages/Settings/Blocking")),
  // },
  {
    exact: true,
    path: "/notification",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/StaticPage/Notification")),
  },
  {
    exact: true,
    path: "/activity",
    guard: true,
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Settings/Activity")),
  },
  {
    exact: true,
    path: "/privacy-policy",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/PrivacyPolicy")),
  },
  {
    exact: true,
    path: "/terms-conditions",
    // guard: true,
    layout: HomeLayout,
    component: lazy(() => import("src/views/pages/TermsAndCondition")),
  },
  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    component: () => <Redirect to='/404' />,
  },
];
