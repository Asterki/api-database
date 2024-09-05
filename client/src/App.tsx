import axios, { AxiosError } from "axios";
import React from "react";

function App() {
	const [apiKey, setApiKey] = React.useState("");

	const usernameRef = React.useRef<HTMLInputElement>(null);
	const passwordRef = React.useRef<HTMLInputElement>(null);

	const handleApiKey = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		if (!usernameRef.current?.value || !passwordRef.current?.value) {
			return alert("Por favor, llena todos los campos");
		}

		try {
            const url = import.meta.env.DEV ? import.meta.env.VITE_SERVER_URL : ""

			const response = await axios.post(
				`${url}/api/getkey`,
				{
					username: usernameRef.current?.value,
					password: passwordRef.current?.value,
				}
			);

			setApiKey(response.data.apiKey);
		} catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    alert("Credenciales inválidas");
                } else {
                    alert("Error al obtener la llave de acceso");
                }
            } else {
                alert("Error al obtener la llave de acceso");
            }
        }
	};

	return (
		<div className="text-gray-800">
			<div className="flex items-start justify-center lg:flex-row flex-col">
				<div className="h-screen flex items-center justify-center flex-col lg:w-4/12 w-11/12 lg:px-8">
					<h1 className="text-2xl font-bold">
						Base de datos a base de API
					</h1>

					<form className="">
						<input
							type="text"
							ref={usernameRef}
							className="rounded-md border-2 border-neutral-200 hover:border-neutral-400 p-2 w-full my-2 transition-all focus:border-blue-400 outline-none"
							placeholder="Nombre de usuario"
						/>
						<input
							type="password"
							ref={passwordRef}
							className="rounded-md border-2 border-neutral-200 hover:border-neutral-400 p-2 w-full my-2 transition-all focus:border-blue-400 outline-none"
							placeholder="Contraseña"
						/>

						<button
							type="button"
							onClick={handleApiKey}
							className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 w-full my-2 transition-all"
						>
							Conseguir llave de acceso
						</button>
					</form>

					{apiKey && (
						<div className="mt-4 text-left w-full">
							<h2 className="text-lg font-bold">
								Tu llave de acceso es:
							</h2>
							<p className="text-sm">{apiKey}</p>
						</div>
					)}
				</div>

				<div className="lg:w-8/12 w-11/12">
					<div className="container mx-auto px-4 py-8">
						<h1 className="text-3xl font-bold mb-6">
							Documentación de API - Sistema de Base de Datos
						</h1>


						<section className="mb-8">
							<h2 className="text-2xl font-semibold mb-4">
								Rutas
							</h2>

							{/* Ruta 1 */}
							<div className="mb-6">
								<h3 className="text-xl font-semibold mb-2">
									1. Obtener valor de la base de datos
								</h3>
								<p>
									<strong>Ruta:</strong>{" "}
									<code>/api/db/get</code>
								</p>
								<p>
									<strong>Método HTTP:</strong> POST
								</p>
								<p>
									<strong>Descripción:</strong> Permite
									obtener un valor almacenado en la base de
									datos basado en una clave (<code>key</code>
									).
								</p>

								<div className="my-4">
									<h4 className="font-semibold">
										Cuerpo de la solicitud:
									</h4>
									<pre className="bg-gray-100 p-4 rounded-md">
										{`{
  "apiKey": "string",
  "key": "string"
}`}
									</pre>
								</div>

								<div className="my-4">
									<h4 className="font-semibold">
										Respuestas:
									</h4>
									<ul className="list-disc pl-5">
										<li>
											<strong>200 - OK:</strong>
											<p>
												Descripción: Retorna el valor
												asociado con la clave.
											</p>
											<pre className="bg-gray-100 p-4 rounded-md">{`{
  "value": {}
}`}</pre>
										</li>
										<li>
											<strong>
												400 - Invalid Parameters:
											</strong>{" "}
											Los parámetros de la solicitud no
											son válidos.
										</li>
										<li>
											<strong>
												401 - Invalid API Key:
											</strong>{" "}
											La clave API proporcionada no es
											válida.
										</li>
										<li>
											<strong>
												404 - Key Not Found:
											</strong>{" "}
											La clave proporcionada no existe en
											la base de datos.
										</li>
										<li>
											<strong>
												500 - Internal Error:
											</strong>{" "}
											Error interno en el servidor.
										</li>
									</ul>
								</div>
							</div>

                            <hr className="w-full border border-neutral-200" />

							{/* Ruta 2 */}
							<div className="mb-6">
								<h3 className="text-xl font-semibold mb-2">
									2. Establecer valor en la base de datos
								</h3>
								<p>
									<strong>Ruta:</strong>{" "}
									<code>/api/db/set</code>
								</p>
								<p>
									<strong>Método HTTP:</strong> POST
								</p>
								<p>
									<strong>Descripción:</strong> Permite
									establecer un valor en la base de datos
									utilizando una clave (<code>key</code>).
								</p>

								<div className="my-4">
									<h4 className="font-semibold">
										Cuerpo de la solicitud:
									</h4>
									<pre className="bg-gray-100 p-4 rounded-md">
										{`{
  "apiKey": "string",
  "key": "string",
  "value": {}
}`}
									</pre>
								</div>

								<div className="my-4">
									<h4 className="font-semibold">
										Respuestas:
									</h4>
									<ul className="list-disc pl-5">
										<li>
											<strong>200 - Success:</strong>
											<p>
												Descripción: El valor fue
												almacenado exitosamente.
											</p>
											<pre className="bg-gray-100 p-4 rounded-md">{`{
  "status": "success"
}`}</pre>
										</li>
										<li>
											<strong>
												400 - Invalid Parameters:
											</strong>{" "}
											Los parámetros de la solicitud no
											son válidos.
										</li>
										<li>
											<strong>
												401 - Invalid API Key:
											</strong>{" "}
											La clave API proporcionada no es
											válida.
										</li>
										<li>
											<strong>
												500 - Internal Error:
											</strong>{" "}
											Error interno en el servidor.
										</li>
									</ul>
								</div>
							</div>

                            <hr className="w-full border border-neutral-200" />
							{/* Ruta 3 */}
							<div className="mb-6">
								<h3 className="text-xl font-semibold mb-2">
									3. Eliminar valor de la base de datos
								</h3>
								<p>
									<strong>Ruta:</strong>{" "}
									<code>/api/db/delete</code>
								</p>
								<p>
									<strong>Método HTTP:</strong> POST
								</p>
								<p>
									<strong>Descripción:</strong> Elimina un
									valor almacenado en la base de datos basado
									en una clave (<code>key</code>).
								</p>

								<div className="my-4">
									<h4 className="font-semibold">
										Cuerpo de la solicitud:
									</h4>
									<pre className="bg-gray-100 p-4 rounded-md">
										{`{
  "apiKey": "string",
  "key": "string"
}`}
									</pre>
								</div>

								<div className="my-4">
									<h4 className="font-semibold">
										Respuestas:
									</h4>
									<ul className="list-disc pl-5">
										<li>
											<strong>200 - Success:</strong>
											<p>
												Descripción: El valor fue
												eliminado exitosamente.
											</p>
											<pre className="bg-gray-100 p-4 rounded-md">{`{
  "status": "success"
}`}</pre>
										</li>
										<li>
											<strong>
												400 - Invalid Parameters:
											</strong>{" "}
											Los parámetros de la solicitud no
											son válidos.
										</li>
										<li>
											<strong>
												401 - Invalid API Key:
											</strong>{" "}
											La clave API proporcionada no es
											válida.
										</li>
										<li>
											<strong>
												500 - Internal Error:
											</strong>{" "}
											Error interno en el servidor.
										</li>
									</ul>
								</div>
							</div>
						</section>

                        <hr className="w-full border border-neutral-200" />
						<section>
							<h2 className="text-2xl font-semibold mb-4">
								Manejo de errores
							</h2>
							<ul className="list-disc pl-5">
								<li>
									<strong>400 - Invalid Parameters:</strong>{" "}
									Los parámetros de la solicitud no cumplen
									con los requisitos de validación.
								</li>
								<li>
									<strong>401 - Invalid API Key:</strong> La
									clave API no es válida.
								</li>
								<li>
									<strong>404 - Key Not Found:</strong> La
									clave proporcionada no existe en la base de
									datos.
								</li>
								<li>
									<strong>500 - Internal Error:</strong>{" "}
									Ocurre cuando hay un error en el servidor.
								</li>
							</ul>
						</section>
					</div>
				</div>
			</div>

			<footer className="bg-neutral-200 mt-16 lg:px-32 py-32">
				<p> 
                    Desarrollador por <a href="https://github.com/Asterki" className="text-blue-400 underline">Fernando Rivera</a>
                </p>
			</footer>
		</div>
	);
}

export default App;
