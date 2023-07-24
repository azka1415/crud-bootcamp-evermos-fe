export type Material = {
	id: number;
	title: string;
	teacher_id: number;
	createdAt: Date;
	updatedAt: Date;
};

export type Teacher = {
	id: number;
	name: string;
	position: string;
	createdAt: Date;
	updatedAt: Date;
};

export type APIResponse<T> = {
	message: string;
	data: T;
};

export type Pagination = {
	limit: number;
	page: number;
};

export type GetMaterials = APIResponse<Material[]> & Pagination;

export type MaterialPayload = {
	title: string;
	teacher_id: number;
	matID: number;
};

export type UpdateMaterial = APIResponse<Material>;

export type NewMaterial = APIResponse<Material>;

export type TeacherPayload = {
	name: string;
	position: string;
};

export type GetTeachers = APIResponse<Teacher[]> & Pagination;
