import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { updateMaterial } from "../api";
import SelectTeacher from "./SelectTeacher";
import DeleteMaterial from "./DeleteMaterial";
import { Material } from "../types/material";

interface Props {
	open: boolean;
	setOpen: (v: boolean) => void;
	mat: Material;
}

function UpdateMaterial({ setOpen, mat }: Props) {
	const [title, setTitle] = useState(mat.title);
	const [teacher_id, setTeacher_id] = useState(mat.teacher_id);
	const client = useQueryClient();
	const mutate = useMutation({
		mutationKey: ["put"],
		mutationFn: updateMaterial,
	});

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutate.mutate(
			{ teacher_id, title, matID: mat.id },
			{
				onSuccess() {
					client.invalidateQueries("materials");
					setOpen(false);
				},
			}
		);
	};

	return (
		<div className="bg-yellow-400 p-2 flex flex-col gap-2">
			<form
				onSubmit={handleSubmit}
				className="flex space-x-2 justify-center items-center"
			>
				<label htmlFor="">Change title</label>
				<input
					type="text"
					className="text-black px-2"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<label htmlFor="">Teachers: </label>
				<SelectTeacher
					setTeacher_id={setTeacher_id}
					currTeach={mat.teacher_id}
				/>
				<button
					type="submit"
					className="p-2 bg-green-400"
				>
					Submit
				</button>
			</form>
			<div className="flex space-x-4">
				<button
					type="button"
					className="bg-gray-400 text-black p-2 w-10"
					onClick={() => setOpen(false)}
				>
					Exit
				</button>
				<DeleteMaterial
					id={mat.id}
					client={client}
					setOpen={setOpen}
				/>
			</div>
		</div>
	);
}

export default UpdateMaterial;
