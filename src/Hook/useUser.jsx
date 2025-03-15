import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUser = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: users = [], isLoadign, refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async()=> {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    })
    return [users, isLoadign, refetch];
};

export default useUser;