import { useMutation } from "@tanstack/react-query";
import { logIn } from "../../services/apiAuthEmail";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const { isLoading: isLoadingLogIn, mutate: mutateLogIn } = useMutation({
    mutationFn: ({ email, password }) => logIn({ email, password }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("User logged in successfully", { duration: 3000 });
    },
    onError: () => {
      toast.error("Email or Password is incorrect");
    },
  });

  return { isLoadingLogIn, mutateLogIn };
}
