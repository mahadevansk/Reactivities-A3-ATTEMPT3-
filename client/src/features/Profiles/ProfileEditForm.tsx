import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProfile } from "../../lib/hooks/useProfile.ts";
import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import TextInput from "../../app/shared/components/TextInput.tsx";
import { useParams } from "react-router";
import { editProfileSchema, EditProfileSchema } from "../../lib/schemas/EditProfielSchema.ts";

type Props = {
    setEditMode: (editMode: boolean) => void;
}

export default function ProfileEdit({ setEditMode }: Props) {

    const { id } = useParams();

    const { editProfile, profile } = useProfile(id);

    const { control, handleSubmit, reset, formState: { isDirty, isValid } }
        = useForm<EditProfileSchema>({
            resolver: zodResolver(editProfileSchema),
            mode: 'onTouched'
        });
    
    const onSubmit = (data: EditProfileSchema) => {
        editProfile.mutate(data, {
            onSuccess: () => setEditMode(false)
        });
    }

    useEffect(() => {
        reset({
            displayName: profile?.displayName,
            bio: profile?.bio || ''
        });

    }, [profile, reset]);

    return (
        <Box component='form'
            onSubmit={handleSubmit(onSubmit)}
            display='flex'
            flexDirection='column'
            alignContent='center'
            gap={3}
            mt={3}
        >
            <TextInput label='Display Name' name='displayName' control={control} />
            <TextInput
                label='Add your bio'
                name='bio'
                control={control}
                multiline
                rows={4}
            />
            <Button
                type='submit'
                variant='contained'
                disabled={!isValid || !isDirty || editProfile.isPending}
            >
                Update profile
            </Button>
        </Box>
    );
}