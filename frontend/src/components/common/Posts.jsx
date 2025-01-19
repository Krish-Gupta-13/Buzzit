import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import fetchPosts from "../../queries/usequery/fetchPosts";

const Posts = ({feedType, username, userId}) => {
	// const isLoading = false;
	const getPostEndpoint = () => {
		switch(feedType){
            case "forYou":
                return "/api/post/allposts";
            case "following":
                return "/api/post/followingposts";
			case "posts":
				return `/api/post/userposts/${username}`;
			case "likes":
				return `/api/post/likedposts/${userId}`;
            default:
                return "/api/post/allposts";
        }
	};

	const POST_ENDPOINT = getPostEndpoint();
	
	const {posts, isLoading, refetch, isRefetching} = fetchPosts({POST_ENDPOINT});

	useEffect(() => {
		refetch();
	}, [feedType, refetch, username]);
	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;