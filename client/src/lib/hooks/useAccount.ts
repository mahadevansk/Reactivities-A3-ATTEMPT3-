import { useMutation } from "@tanstack/react-query"
import { LoginSchema } from "../schemas/loginSchema"
import agent from "../api/agent"

export const useAccount = () => {
    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            const res = await agent.post('/login?useCookies=true', creds);
            return res;
        }
    });

    return {
        loginUser
    }
}