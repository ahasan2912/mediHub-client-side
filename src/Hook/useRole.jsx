import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useRole = () => {
    const axiosPublic = useAxiosPublic();
    const { user, loading } = useAuth();
    const { data: role, isLoading, refetch } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !!user?.email && !loading, // Query only runs when email exists
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/role/${user?.email}`);
            return res?.data?.role;
        }
    });
    return [role, isLoading, refetch];
};

export default useRole;


