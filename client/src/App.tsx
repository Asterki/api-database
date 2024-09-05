import axios from 'axios';
import React from 'react';

function App() {
    const [apiKey, setApiKey] = React.useState('ewewqeqweqwq');

    const usernameRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);

    const handleApiKey = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        if (!usernameRef.current?.value || !passwordRef.current?.value) {
            return alert('Por favor, llena todos los campos');
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth', {
                username: usernameRef.current?.value,
                password: passwordRef.current?.value,
            });

            setApiKey(response.data.apiKey);
        } catch (error: unknown) {
            alert('Error al obtener la llave de acceso');
            console.log(error)
        }
    };

    return (
        <div className="text-gray-800">
            <div className="flex items-center justify-center lg:flex-row flex-col">
                <div className="w-full h-screen flex items-center justify-center flex-col lg:w-3/12 w-11/12 lg:px-8">
                    <h1 className="text-2xl font-bold">Base de datos a base de API</h1>

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
                            <h2 className="text-lg font-bold">Tu llave de acceso es:</h2>
                            <p className="text-sm">{apiKey}</p>
                        </div>
                    )}
                </div>

                <div className="lg:w-9/12 w-11/12">
                    <h1>Guía de uso</h1>
                </div>
            </div>

            <footer className="absolute bottom-2 left-2">
                Desarrollado por{' '}
                <a
                    href="https://github.com/Asterki"
                    target="_blank"
                    className="text-blue-500 underline"
                >
                    Fernando Rivera
                </a>
            </footer>
        </div>
    );
}

export default App;
