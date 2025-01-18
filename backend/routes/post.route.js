import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { createPost, deletePost, commentOnPost, LikeUnlikePost, getAllPosts, getLikedPosts, getFollowingPosts, getUserPosts } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.post("/like/:id", protectRoute, LikeUnlikePost);
router.get("/allposts", protectRoute, getAllPosts);
router.get("/likedposts/:id", protectRoute, getLikedPosts);
router.get("/followingposts", protectRoute, getFollowingPosts);
router.get("/userposts/:username", protectRoute, getUserPosts);

export default router;