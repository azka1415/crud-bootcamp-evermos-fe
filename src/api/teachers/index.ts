import axios from "axios";
import { GetTeachers } from "../../types/material";

export async function getTeachers() {
	return axios
		.get("http://localhost:8080/teachers?limit=10&page=1&sort=asc&field=id")
		.then((res) => res.data as GetTeachers);
}
