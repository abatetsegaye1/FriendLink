import  express  from "express";
import {getUser, getUserFriend,addRemoveFriend} from "../controllers/users.js"
import { verifyToken } from "../middleware/auth.js";

const router=express.Router();

router.get("/:id",verifyToken,getUser);
router.get("/:id/friend",verifyToken,getUserFriend);
router.patch("/:id/:friendId",verifyToken,addRemoveFriend);

export default router;