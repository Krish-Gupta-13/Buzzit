import React from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const getLoginMutation = () => {
    const queryClient = useQueryClient();
    const { mutate: loginMutation, isPending, isError, error} = useMutation({
		mutationFn: async ({username, password}) => {
			try{
				const res = await fetch("/api/auth/login", {
					method: "POST", 
                    headers: { 
						"Content-Type": "application/json" 
					},
                    body: JSON.stringify({ username, password }),
				});
				const data = await res.json();
				console.log(data);
				if(!res.ok){
					throw new Error(data.error || "Something went wrong");
				}
			}
			catch(error){
				throw new Error(error);
			}	
		},
		onSuccess: () => { 
			toast.success("User Logged in successfully");
			queryClient.invalidateQueries({ queryKey: ["authUser"]});
		},
	})
  return {loginMutation, isPending, isError, error};
}

export default getLoginMutation;
