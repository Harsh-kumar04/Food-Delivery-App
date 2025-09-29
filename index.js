import express from "express";
import dotenv from "dotenv";
import router from "./modules/v1/auth/routes/authroutes.js";
import userrouter from "./modules/v1/users/Routes/userroutes.js";
import restrouter from "./modules/v1/restaurant/routes/rest_routes.js";
import menurouter from "./modules/v1/menu/router/menu_routes.js";
import cartrouter from "./modules/v1/cart/routes/cart_routes.js";
import orderRouter from "./modules/v1/order/routes/order_routes.js";
dotenv.config();

const app = express();
app.use(express.json());

// routes use karo
app.use("/auth", router);
app.use("/users", userrouter);
app.use("/rest", restrouter);
app.use("/menu", menurouter);
app.use("/cart", cartrouter);
app.use("/order", orderRouter);

app.get("/", (req, res) => res.send("server is running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
