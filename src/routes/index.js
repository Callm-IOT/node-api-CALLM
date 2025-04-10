import { Router } from "express"

import { routerUser } from "./v1/user.js";
import { authRouter } from "./v1/auth.js";
import { notificationsRouter } from "./v1/notifications.js";
import { recordsRouter } from "./v1/records.js";

const routerAPI = ( app ) => {
    const router = Router();

    app.use("/api/v1", router);
    router.use("/users", routerUser);
    router.use("/auth", authRouter);
    router.use("/notifications", notificationsRouter);
    router.use("/records", recordsRouter);
    
}

export {
    routerAPI
}