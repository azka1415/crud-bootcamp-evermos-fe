import { QueryClient, useMutation } from "react-query";
import { deleteMaterial } from "../api";

interface Props {
	id: number;
	client: QueryClient;
	setOpen: (v: boolean) => void;
}

const DeleteMaterial = ({ id, client, setOpen }: Props) => {
	const mutate = useMutation({
		mutationKey: ["delete"],
		mutationFn: deleteMaterial,
	});

	const handleClick = () => {
		mutate.mutate(id, {
			onSuccess() {
				client.invalidateQueries("materials");
				setOpen(false);
			},
		});
	};
	return (
		<button
			className="bg-red-400 p-2"
			onClick={handleClick}
		>
			Delete
		</button>
	);
};

export default DeleteMaterial;
