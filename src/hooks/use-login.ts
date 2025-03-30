import { useMutation } from "@tanstack/react-query";
import { graphqlClient, LOGIN_MUTATION } from "@/lib/api";
import { useAuth, User } from "@/contexts/auth-context";

interface LoginVariables {
  email: string;
  password: string;
}

interface LoginResponse {
  login: {
    success: boolean;
    message?: string;
    token?: string;
    type?: string;
    unlockAccountPath?: string;
    user?: User;
  };
}

export function useLogin() {
  const { saveUserAndToken } = useAuth();

  return useMutation<LoginResponse, Error, LoginVariables>({
    mutationFn: async (variables: LoginVariables) => {
      const response = await graphqlClient.request<LoginResponse>(
        LOGIN_MUTATION,
        variables
      );
      return response;
    },
    onSuccess: (data) => {
      const { login } = data;

      if (login.success && login.token && login.user) {
        saveUserAndToken(login.user, login.token);
      }
    },
  });
}
