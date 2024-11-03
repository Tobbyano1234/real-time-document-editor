import { Request, Response, Router } from "express";
import { config } from "../../config";

import authRoute from "../../../max-auth/api/routes/index";
import documentRoute from "../../../max-document/api/routes/index";

const router = Router();

/** GET /health-check - Check service health */
router.get("/health-check", (_req: Request, res: Response) =>
  res.send({ check: "Max-NG server is live!. 📦 🧧 💪🏾" })
);

// api docs route
router
  .route("/docs")
  .get((_req: Request, res: Response) => res.redirect(config.apiDocs));

//  route
router.use("/auth", authRoute);
router.use("/documents", documentRoute);

export default router;
