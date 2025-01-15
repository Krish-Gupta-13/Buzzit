import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from "react-hot-toast";

const useFollow = () => {
    const queryClient = useQueryClient();
    const { mutate: follow, isPending } = useMutation({
        mutationFn: async (userId) => {
            try {
                const res = await fetch(`/api/user/follow/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return data;
                
            } catch (error) {
                toast.error('Failed to follow user!')
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            Promise.all([
                queryClient.invalidateQueries({queryKey: ["suggestedUsers"]}),
                queryClient.invalidateQueries({queryKey: ["authUser"]}),
            ]);
        },
        onError: () => {
            toast.error(error.message);
        },
    });
    return {follow, isPending};
}

export default useFollow
