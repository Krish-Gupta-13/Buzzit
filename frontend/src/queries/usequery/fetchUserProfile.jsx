import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'react-router-dom';

const fetchUserProfile = () => {
	const {username} = useParams();

    const {data:user, isLoading, refetch, isRefetching} = useQuery({
		queryKey: ["userProfile", username],
		queryFn: async () => {
			try{
				const res = await fetch(`/api/user/profile/${username}`);
				const data = await res.json();
				console.error("API Error:", data);

				if(!res.ok){
					throw new Error(data.error || "Failed to fetch user");
				}
				return data;
			} catch(error){
				throw new Error(error);
			}
		},
	});
  return {user, isLoading, refetch, isRefetching}
}

export default fetchUserProfile;
