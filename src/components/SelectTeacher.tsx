import { useTeachers } from "../hooks";

interface Props {
	setTeacher_id: (id: number) => void;
	currTeach: number;
}

const SelectTeacher = ({ setTeacher_id }: Props) => {
	const { result } = useTeachers();
	return (
		<>
			<select
				name=""
				id=""
				className="text-black p-2"
			>
				{result &&
					result.data.map((teac) => (
						<option
							key={teac.id}
							onClick={() => setTeacher_id(teac.id)}
						>
							{teac.name}
						</option>
					))}
			</select>
		</>
	);
};

export default SelectTeacher;
