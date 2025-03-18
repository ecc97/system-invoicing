'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface IRegisterData {
    name: string;
    email: string;
    password: string;
}

export default function RegisterPage() {
    const [formData, setFormData] = useState<IRegisterData>({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
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
        setSuccess("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Error en el registro");
            } else {
                setSuccess("Usuario registrado correctamente");
                router.push("/login");
            }
        } catch (error: unknown) {
            const err = error as Error;
            setError(err.message || "Error en el registro");
        }
    };
    return (
        <div className="min-h-screen flex flex-col justify-center bg-gradient-to-r from-blue-500 to-sky-500">
            <div className="container mx-auto p-4">
                <div className="max-w-md mx-auto p-8 bg-white text-black rounded-3xl shadow-2xs">
                    <h1 className="text-2xl font-bold mb-4 text-center">Registro</h1>
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    {success && <p className="text-green-500 mb-2">{success}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border p-2"
                            />
                        </div>
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
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full cursor-pointer">
                            Registrarse
                        </button>
                    </form>
                    <p className="mt-4 text-center">
                        ¿Ya tienes una cuenta?{" "}
                        <Link href="/login" className="text-blue-500">Inicia sesión</Link>
                    </p>
                    <p className="mt-1 text-center">
                        <Link href="/" className="text-gray-500">
                            Volver a la página principal
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
