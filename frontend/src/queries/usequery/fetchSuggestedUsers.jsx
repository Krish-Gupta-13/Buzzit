import React from 'react'
import { useQuery, useQueryClient} from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const getSuggestedUsers = () => {
    const {data: suggestedUsers, isLoading} = useQuery({
		queryKey: ["suggestedUsers"],
        queryFn: async () => {
            try{
                const response = await fetch("/api/user/suggested");
                if(!response.ok){
                    throw new Error(data.message ||"Failed to fetch suggested users");
                }
                return await response.json();
            }catch(error){
                console.error(error);
                throw new Error(error.message);
            }
        },
	});
  return {suggestedUsers, isLoading};
}

export default getSuggestedUsers
