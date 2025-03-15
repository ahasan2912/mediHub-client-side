import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useOrder = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: orders = [], refetch, isLoading: loading } = useQuery({
        queryKey: ['orders', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/orders?email=${user?.email}`)
            return res.data;
        }
    })
    return [orders, refetch, loading]
};

export default useOrder;