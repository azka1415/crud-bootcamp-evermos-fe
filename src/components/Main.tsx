import { useState } from "react";
import { useMaterials } from "../hooks";
import CreateMaterial from "./CreateMaterial";
import Material from "./Material";

function Main() {
	const [limit] = useState(10);
	const [page, setPage] = useState(1);
	const { query, result } = useMaterials({ page, limit });
	if (query.isLoading)
		return (
			<div>
				<h2>Loading materials...</h2>
			</div>
		);

	if (!result) {
		return (
			<div>
				<h2>Something went wrong.</h2>
			</div>
		);
	}

	const nextPage = () => {
		setPage((prev) => prev + 1);
	};
	const prevPage = () => {
		setPage((prev) => prev - 1);
	};
	return (
		<div className="container p-2 h-48">
			<h1 className="font-bold text-2xl flex flex-col space-y-4">Materials</h1>
			{result.data.map((mat) => (
				<Material
					key={mat.id}
					mat={mat}
				/>
			))}
			<div>
				<div className="flex">
					<div>
						<button
							onClick={() => nextPage()}
							className="p-2 border bg-red-400"
							disabled={query.isFetching || result.data.length !== 10}
						>
							next page
						</button>
						<button
							onClick={() => prevPage()}
							className="p-2 border bg-red-400"
							disabled={page === 1 || query.isFetching}
						>
							prev page
						</button>
					</div>
					{query.isFetching && <div>Loading...</div>}
				</div>
				<div className="bg-slate-600 p-2 text-white">
					<CreateMaterial />
				</div>
			</div>
		</div>
	);
}

export default Main;
