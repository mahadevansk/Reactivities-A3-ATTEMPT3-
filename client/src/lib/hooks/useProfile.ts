import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import agent from "../api/agent"
import { Photo, Profile, User } from "../types"
import { useMemo } from "react"


export const useProfile = (id?: string) => {
    const queryClient = useQueryClient();
    const { data: profile , isLoading : isLoadingProfile } = useQuery<Profile>({
        queryKey: ['profile', id],
        queryFn: async () => {
            const responce = await agent.get<Profile>(`/profiles/${id}`)
            return responce.data;
        },
        enabled:!!id
    })

    const { data: photos, isLoading: loadingPhotos } = useQuery<Photo[]>({
        queryKey: ['photo', id],
        queryFn: async () => {
            const responce = await agent.get<Photo[]>(`/profiles/${id}/photos`);
            return responce.data;
        },
        enabled:!!id
        
    });

    const uploadPhoto = useMutation({
        mutationFn: async (file: Blob) => {
            const formData = new FormData();
            formData.append('file', file);
            const responce = await agent.post('/profiles/add-photo', formData, {
                headers: { 'Content-Type': 'multipart/form=data' }
            });
            return responce.data;
            
        }, 
        onSuccess: async (photo: Photo) => {
            await queryClient.invalidateQueries({
                queryKey: ['photo', id]
            });
            queryClient.setQueryData(['user'], (data: User) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url
                }
            });

            queryClient.setQueryData(['profile'], (data: Profile) => {
                if (!data) return data;
                return {
                    ...data,
                    imageUrl: data.imageUrl ?? photo.url
                }
            });

        }
    })
    

    const setMainPhoto = useMutation({
        mutationFn: async (photo: Photo) => {
            await agent.put(`/profiles/${photo.id}/SetMain`)
        }, 
        onSuccess: (_, photo) => {
            queryClient.setQueryData(['user'], (userData: User) => {
                if (!userData) return userData;
                return {
                    ...userData,
                    imageUrl: photo.url
                }
            });

            queryClient.setQueryData(['profile'], (profile: Profile) => {
                if (!profile) return profile;
                return {
                    ...profile,
                    imageUrl: photo.url
                }
            })
        }

    })



    const deletePhoto = useMutation({
        mutationFn: async (photoId: string) => 
        {
            await agent.delete(`/profiles/${photoId}/photos`)
        }, 
        onSuccess: (_, photoId) => {
            queryClient.setQueryData(['photo', id], (photos: Photo[]) => {
                return photos?.filter(x=> x.id !== photoId)
            } )

        }
    })

    const isCurrentUser = useMemo(() => {
        return id === queryClient.getQueryData<User>(['user'])?.id
    }, [id, queryClient]
    )




    return {
        profile,
        isLoadingProfile, 
        photos,
        loadingPhotos, 
        isCurrentUser,
        uploadPhoto,
        setMainPhoto,
        deletePhoto
    }
}