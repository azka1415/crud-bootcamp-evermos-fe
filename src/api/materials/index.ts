import axios from "axios";
import {
	GetMaterials,
	NewMaterial,
	MaterialPayload,
	UpdateMaterial,
	Pagination,
} from "../../types/material";

export async function getMaterials(pagination: Pagination) {
	return await axios
		.get(
			`http://localhost:8080/materials?limit=${pagination.limit}&page=${pagination.page}&sort=asc&field=id`
		)
		.then((res) => res.data as GetMaterials);
}

export async function updateMaterial(data: MaterialPayload) {
	return await axios
		.put(`http://localhost:8080/materials/${data.matID}`, data)
		.then((res) => res.data as UpdateMaterial);
}

export async function postNewMaterial(data: MaterialPayload) {
	return await axios
		.post("http://localhost:8080/materials", data)
		.then((res) => res.data as NewMaterial);
}

export async function deleteMaterial(matID: number) {
	return await axios
		.delete(`http://localhost:8080/materials/${matID}`)
		.then((res) => res.data);
}
