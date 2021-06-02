import express from "express";
import { post, put, remove, listname, list, membersforname, updateEmail } from "../controller/mailinglist.js";
const router = express.Router();

// post request
router.post("/lists", post);

// update method
router.put("/lists/:name", put);

// delete method
router.delete("/lists/:name", remove);

router.get("/lists/:name", listname);
router.get("/lists", list);

// members for each name
router.get("/lists/:name/members", membersforname );


// update email

router.put("/lists/:name/members/:email", updateEmail);




export default router;

