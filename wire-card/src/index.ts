import { app } from "./App";
import { clientRouter } from "./Router/client";
import { paymentRouter } from "./Router/payment";

app.use("/client", clientRouter)
app.use("/payment", paymentRouter)
