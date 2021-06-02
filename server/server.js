import express from "express";
import cors from "cors";
import mailinglist from "./routes/mailinglist.js";
const app = express();
const PORT = process.env.PORT || 5000;


// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
// create mailing list

// post request
app.use("/", mailinglist);







app.listen(PORT, () => console.log(`Server started on port ${PORT}`));