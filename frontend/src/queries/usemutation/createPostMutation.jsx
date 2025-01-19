import React from 'react'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from "react-hot-toast";
import { useState } from 'react';

const createPostMutation = () => {
    const queryClient = useQueryClient();
    // const [text, setText] = useState("");
    // const [img, setImg] = useState(null);
    
    const {mutate: createPost, isPending, isError, error} = useMutation({
		mutationFn: async ({ text, img }) => {
            try{
                const res = await fetch("/api/post/create", {
                    method: "POST", 
                    headers: { 
                        "Content-Type": "application/json", 
                    },
                    body: JSON.stringify({ text, img }),
                });
                const data = await res.json();
                if(!res.ok){
                    throw new Error(data.error || "Failed to create post");
                }
                return data;
            } catch(error){
                console.error(error);
                throw new Error(error);
            }
        },
		onSuccess: () => {
            // setText("");
			// setImg(null);
            queryClient.invalidateQueries({queryKey: ["posts"]});
			toast.success("Post created successfully")
		}
	})
  return {createPost, isPending, isError, error}
}

export default createPostMutation;
