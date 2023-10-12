import express from "express";
import config from "./config";
import router from "./routes";

const app = express();
const port = config.server.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

// Sample route
app.get("/", (req, res) => {
  res.json({ message: "Hello, Express API!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
