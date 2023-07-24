import { useState } from "react";
import { Material } from "../types/material";
import UpdateMaterial from "./UpdateMaterial";

interface Props {
	mat: Material;
}

function Material({ mat }: Props) {
	const [open, setOpen] = useState(false);
	return (
		<div>
			<div
				key={mat.id}
				className="flex space-x-4 p-2"
			>
				<div>
					<h2 className="text-xl">{mat.title}</h2>
					<h3>Created at: {new Date(mat.createdAt).toDateString()}</h3>
				</div>
				<button
					className="border p-2 bg-green-300"
					onClick={() => setOpen(!open)}
				>
					Edit
				</button>

				{open && (
					<UpdateMaterial
						open={open}
						setOpen={setOpen}
						mat={mat}
					/>
				)}
			</div>
		</div>
	);
}

export default Material;
