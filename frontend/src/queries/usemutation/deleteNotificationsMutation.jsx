import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from "react-hot-toast";

const deleteNotificationsMutation = () => {
    const queryClient = useQueryClient();
    const {mutate: deleteNotifications} = useMutation({
            mutationFn: async () => {
                try{
                    const res = await fetch("/api/notification", {
                        method: "DELETE",
                    });
                    const data = await res.json();
                    if(!res.ok){
                        throw new Error(data.error || "Failed to delete notifications");
                    }
                    return data;
                } catch(error){
                    return new Error(error);
                }
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: ["notifications"]});
                toast.success("Notifications deleted successfully");
            },
            onError: (error) => {
                toast.error(error.message);
            }
        })
  return {deleteNotifications}
}

export default deleteNotificationsMutation;
