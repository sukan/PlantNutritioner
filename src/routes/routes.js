// @flow
import { lazy } from "react";
import { USER_ROLES } from "constants/user";
import authRoutes from "modules/auth/routes";

export default [
  {
    path: "/",
    exact: true,
    auth: true,
    roles: [USER_ROLES.RESEARCHER, USER_ROLES.VENDOR],
    component: lazy(() => import("modules/dashboard")),
  },
  {
    path: "/view-researches",
    exact: true,
    auth: true,
    roles: [USER_ROLES.RESEARCHER],
    component: lazy(() =>
      import("modules/researchManagement/Research/viewResearch")
    ),
  },
  {
    path: "/add-researches",
    exact: true,
    auth: true,
    roles: [USER_ROLES.RESEARCHER],
    component: lazy(() =>
      import("modules/researchManagement/Research/addResearch")
    ),
  },
  {
    path: "/view-deficiency",
    exact: true,
    auth: true,
    roles: [USER_ROLES.RESEARCHER],
    component: lazy(() =>
      import("modules/researchManagement/Deficiencies/viewDeficiencies")
    ),
  },
  {
    path: "/add-products",
    exact: true,
    auth: true,
    roles: [USER_ROLES.VENDOR],
    component: lazy(() =>
      import("modules/researchManagement/Products/addProducts")
    ),
  },
  {
    path: "/view-products",
    exact: true,
    auth: true,
    roles: [USER_ROLES.VENDOR],
    component: lazy(() =>
      import("modules/researchManagement/Products/viewProducts")
    ),
  },
  {
    path: "/view-verifications",
    exact: true,
    auth: true,
    roles: [USER_ROLES.RESEARCHER],
    component: lazy(() =>
      import("modules/researchManagement/Verification/viewVerifications")
    ),
  },
  {
    path: "/update-verifications/:verificationId",
    exact: true,
    auth: true,
    roles: [USER_ROLES.RESEARCHER],
    component: lazy(() =>
      import("modules/researchManagement/Verification/addVerification")
    ),
  },
  ...authRoutes,
];
