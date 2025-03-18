'use client'
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ILoginData {
    email: string;
    password: string;
}

function LoginPage() {
    const [formData, setFormData] = useState<ILoginData>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const result = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });

        if (result?.error) {
            setError(result.error);
        } else {
            router.push("/invoices");
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center bg-gradient-to-r from-blue-500 to-sky-500">
            <div className="container mx-auto p-4">
                <div className="max-w-md mx-auto bg-white text-black p-8 rounded-3xl shadow-2xs">
                    <h1 className="text-2xl text-center font-bold mb-4">Iniciar Sesión</h1>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block">Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border p-2"
                            />
                        </div>
                        <div>
                            <label className="block">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full border p-2"
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 w-full text-white px-4 py-2 rounded cursor-pointer">
                            Ingresar
                        </button>
                    </form>
                    <p className="mt-4 text-center">
                        ¿No tienes una cuenta?{" "}
                        <Link href="/register" className="text-blue-500 hover:underline">
                            Registrarse
                        </Link>
                    </p>
                    <p className="mt-1 text-center">
                        <Link href="/forgot-password" className="text-blue-500 hover:underline">
                            Volver a la página principal
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
