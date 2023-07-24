import { useQuery, useQueryClient } from "react-query";
import { getMaterials } from "../api";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { getTeachers } from "../api/teachers";
import { Pagination } from "../types/material";

export const useMaterials = (pagination: Pagination) => {
	const queryClient = useQueryClient();
	const query = useQuery({
		queryKey: ["materials"],
		queryFn: () => getMaterials(pagination),
	});
	const [currPage, setCurrPage] = useState(1);
	const [result, setResult] = useState(query.data);
	const [error, setError] = useState<AxiosError | undefined>(undefined);
	useEffect(() => {
		if ((query.isSuccess && !query.isLoading) || !query.isRefetching) {
			setResult(query.data);
		}
		if (query.isError && !query.isLoading) {
			setResult(undefined);
			setError(query.error as AxiosError);
		}
		// if (query.isSuccess && !query.isPreviousData && query.data.page !== 1000) {
		// 	queryClient.prefetchQuery({
		// 		queryKey: ["materials", pagination.page + 1],
		// 		queryFn: () =>
		// 			getMaterials({ page: pagination.page + 1, limit: pagination.limit }),
		// 	});
		// }
		if (pagination.page !== currPage) {
			query.refetch();
			setCurrPage(pagination.page);
		}
	}, [query, pagination, currPage]);

	return { query, client: queryClient, error, result };
};

export const useTeachers = () => {
	const queryClient = useQueryClient();
	const query = useQuery({
		queryKey: ["teachers"],
		queryFn: getTeachers,
	});
	const [result, setResult] = useState(query.data);
	const [error, setError] = useState<AxiosError | undefined>(undefined);
	useEffect(() => {
		if ((query.isSuccess && !query.isLoading) || !query.isRefetching) {
			setResult(query.data);
		}
		if (query.isError && !query.isLoading) {
			setResult(undefined);
			setError(query.error as AxiosError);
		}
	}, [query]);

	return { query, client: queryClient, error, result };
};
