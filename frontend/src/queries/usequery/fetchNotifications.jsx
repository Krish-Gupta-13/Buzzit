import React from 'react'
import { useQuery } from '@tanstack/react-query'

const fetchNotifications = () => {
    const {data: notifications, isLoading} = useQuery({
        queryKey: ["notifications"],
        queryFn: async () => {
            try{
                const res = await fetch("/api/notification");
                const data = await res.json();
                if(!res.ok){
                    throw new Error(data.error || "Failed to fetch notifications");
                }
                return data;
            } catch(error){
                throw new Error(error);
            }
        },
    })
  return {notifications, isLoading}
}

export default fetchNotifications;
