import React from 'react';
import { useQuery } from "@tanstack/react-query";
import {toast} from "react-hot-toast";

const fetchPosts = ({POST_ENDPOINT}) => {
    const {data: posts, isLoading, refetch, isRefetching} = useQuery({
		queryKey: ["posts"],
        queryFn: async () => {
            try{
                const res = await fetch(POST_ENDPOINT);
                const data = await res.json();
                if(!res.ok){
                    throw new Error(data.error || "Something went wrong");
				}
                return data;
            }
			catch(error){
                console.error(error);
                throw new Error(error);
            }
        }
	});
  return {posts, isLoading, refetch, isRefetching};
}

export default fetchPosts
