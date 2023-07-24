import { FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { postNewMaterial } from "../api";
import SelectTeacher from "./SelectTeacher";

function CreateMaterial() {
	const [title, setTitle] = useState("");
	const [teacher_id, setTeacher_id] = useState(1);
	const client = useQueryClient();
	const mutate = useMutation({
		mutationKey: ["new_materials"],
		mutationFn: postNewMaterial,
	});
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		mutate.mutate(
			{ teacher_id, title, matID: 0 },
			{
				onSuccess() {
					client.invalidateQueries("materials");
				},
			}
		);
	};
	return (
		<>
			<h2>Create New Material</h2>
			<form
				onSubmit={handleSubmit}
				className="space-x-2"
			>
				<label htmlFor="">Title</label>
				<input
					type="text"
					name=""
					id=""
					className="text-black px-2"
					onChange={(e) => setTitle(e.target.value)}
				/>
				<label htmlFor="">Teachers: </label>
				<SelectTeacher
					setTeacher_id={setTeacher_id}
					currTeach={1}
				/>

				<button
					type="submit"
					className="border p-2"
				>
					Submit
				</button>
				{mutate.isLoading && <div>loading...</div>}
			</form>
		</>
	);
}

export default CreateMaterial;
