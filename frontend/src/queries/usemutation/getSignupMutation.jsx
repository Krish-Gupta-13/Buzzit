import React from 'react'
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const getSignupMutation = () => {
    const queryClient = useQueryClient();
    const {mutate, isError, isPending, error} = useMutation({
		mutationFn: async ({ email, username, fullname, password }) => {
			try{
				const res = await fetch("/api/auth/signup", {
                    method: "POST", 
					headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, username, fullname, password }),
				});
				const data = await res.json();
                if(!res.ok){
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
			}
			catch(error){
                throw new Error(error);
			}
		},
		onSuccess: () => {
			toast.success("User created successfully!");
            queryClient.invalidateQueries({ queryKey: ["authUser"]});
		}
	});
  return {mutate, isPending, isError, error};
}

export default getSignupMutation
