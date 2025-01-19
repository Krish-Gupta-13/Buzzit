import React from 'react'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const getLogoutMutation = () => {
    
    const queryClient = useQueryClient();
    const {mutate: logout} = useMutation({
		mutationFn: async () => {
            try {
				const res = await fetch("/api/auth/logout", {
					method: "POST",
				});
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}
			} catch (error) {
				throw new Error(error);
			}
        },
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: () => {
			toast.error("Logout failed");
		},
	})
  return {logout};
}

export default getLogoutMutation
