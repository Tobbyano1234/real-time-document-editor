import { Request, Response, Router } from "express";
import { config } from "../../config";

import authRoute from "../../../max-auth/api/routes/index";
import onboardingRoute from "../../../entrova-onboarding/api/routes/index";
import billingRoute from "../../../entrova-pay/pay-in/api/routes/paymentMethod";
import depositRoute from "../../../entrova-pay/pay-in/api/routes/deposit";
import payoutRoute from "../../../entrova-pay/pay-out/api/routes/payout";
import bankRoute from "../../../entrova-pay/pay-out/api/routes/banks";
import bankAccountRoute from "../../../entrova-pay/pay-out/api/routes/bankAccounts";
import planRoute from "../../../entrova-product/api/routes/index";
import subscriptionRoute from "../../../entrova-subscription/api/routes/index";
import webhookRoute from "../../../entrova-webhooks/webhooks.routes";
import clientRoute from "../../../entrova-client/api/routes/index";
import employeeRoute from "../../../entrova-employee/api/routes/index";
import verificationRoute from "../../../entrova-verification/api/routes/index";
import projectRoute from "../../../entrova-project/api/routes/index";
import contractRoute from "../../../entrova-contract/api/routes/index";
import timeOffRoute from "../../../entrova-time-tool/api/routes/timeOff";
import timeTrackingRoute from "../../../entrova-time-tool/api/routes/timeTracking";
import timeSheetRoute from "../../../entrova-time-tool/api/routes/timeSheet";
import orgProjectRoute from "../../../entrova-organization-project/api/routes/index";
import orgTaskRoute from "../../../entrova-organization-task/api/routes/index";
import departmentRoute from "../../../max-document/api/routes";
import teamRoute from "../../../max-document/api/routes/team";
import roleRoute from "../../../entrova-role/api/routes/role";
import permissionRoute from "../../../entrova-role/api/routes/permission";
import dashboardRoute from "../../../entrova-dashboard/api/routes/index";
import companyRoute from "../../../max-accounts/company/api/routes/index";
import walletRoute from "../../../entrova-wallets/api/routes/index";
import transactionRoute from "../../../entrova-transactions/api/routes/index";
import templateRoute from "../../../entrova-document/api/routes/template";
import settingsRoute from "../../../max-setting/api/routes/index";
// import documentRoute from '../../../entrova-document/api/routes/index';

const router = Router();

/** GET /health-check - Check service health */
router.get("/health-check", (_req: Request, res: Response) =>
  res.send({ check: `Entrova ${config.env} server is live!. 📦 🧧 💪🏾` })
);

// api docs route
router
  .route("/docs")
  .get((_req: Request, res: Response) => res.redirect(config.apiDocs));

// mount other routes
router.use("/auth", authRoute);
router.use("/onboarding", onboardingRoute);
router.use("/billing", billingRoute);
router.use("/plans", planRoute);
router.use("/subscription", subscriptionRoute);
router.use("/client", clientRoute);
router.use("/webhooks", webhookRoute);
router.use("/employee", employeeRoute);
router.use("/verification", verificationRoute);
router.use("/project", projectRoute);
router.use("/contract", contractRoute);
router.use("/time-off", timeOffRoute);
router.use("/time-tracking", timeTrackingRoute);
router.use("/org-project", orgProjectRoute);
router.use("/org-task", orgTaskRoute);
router.use("/department", departmentRoute);
router.use("/team", teamRoute);
router.use("/role", roleRoute);
router.use("/permission", permissionRoute);
router.use("/dashboard", dashboardRoute);
router.use("/company", companyRoute);
router.use("/wallet", walletRoute);
router.use("/time-sheet", timeSheetRoute);
router.use("/deposit", depositRoute);
router.use("/transaction", transactionRoute);
router.use("/payout", payoutRoute);
router.use("/banks", bankRoute);
router.use("/bank-account", bankAccountRoute);
router.use("/templates", templateRoute);
router.use("/settings", settingsRoute);

export default router;
