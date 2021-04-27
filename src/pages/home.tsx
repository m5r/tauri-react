import type { FormEventHandler, FunctionComponent } from "react";
import React, { useState } from "react";
import { tauri } from "@tauri-apps/api";

type Response = {
	executablePath: string;
	permissionsMode: string;
}

const HomePage: FunctionComponent = () => {
	const [executable, setExecutable] = useState("");
	const [invocationResponse, setInvocationResponse] = useState<Response>();

	const onSubmit: FormEventHandler = async (event) => {
		event.preventDefault();
		const response = await tauri.invoke<Response>("which", { body: { executable }});
		console.log("response", response);
		setInvocationResponse(response);
	}

	return (
		<section className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="px-4 py-5 p-6">
				<h3 className="text-lg leading-6 font-medium text-gray-900">Executable program</h3>
				<div className="mt-2 max-w-xl text-sm text-gray-500">
					<p>Get informations about any program on your computer</p>
				</div>
				<form onSubmit={onSubmit} className="mt-5 flex items-center">
					<div className="w-full max-w-xs">
						<input
							type="text"
							name="exec"
							id="exec"
							className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-md"
							placeholder="firefox"
							value={executable}
							onChange={event => setExecutable(event.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3 w-auto text-sm"
					>
						Fetch
					</button>
				</form>
			</div>

			{invocationResponse ? (
				<div className="bg-white overflow-hidden">
					<div className="px-4 py-5 sm:px-6">
						<h3 className="text-lg leading-6 font-medium text-gray-900">Results</h3>
					</div>
					<div className="border-t border-gray-200 px-4 py-5 sm:p-0">
						<dl className="sm:divide-y sm:divide-gray-200">
							<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Full path</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{invocationResponse.executablePath}</dd>
							</div>
							<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Permissions mode</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{invocationResponse.permissionsMode}</dd>
							</div>
						</dl>
					</div>
				</div>
			) : null}
		</section>
	);
};

export default HomePage;
