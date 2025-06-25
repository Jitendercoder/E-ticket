
import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import TicketRoute from "./routes/TicketRoutes.js"

const app = express();
app.use(cors());
app.use(express.json());


app.use('/', TicketRoute)

const PORT =  5000;

mongoose.connect("mongodb://localhost:27017/etickets")
  .then(() => {
    console.log("database connected successfully!")
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(err)
});
