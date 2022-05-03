import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
	const router = useRouter();
	const [error, setError] = useState(false);

    async function handleLogin(event) {
        event.preventDefault();
		const res = await signIn("credentials", {
			redirect: false,
			email: event.target.email.value,
			password: event.target.password.value,
			callbackUrl: "/"
		});
		if (res.status === 401) {
			console.log(res.error)
			setError(true);
		}
		if (res.url) router.push(res.url);
    }
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <div>
                <img src="/relu.png" className="min-w-[100%] p-2"/>
                <div className="border border-black p-5 rounded-md">
                    <form
                        onSubmit={handleLogin}
                        className="flex flex-col items-center"
                    >
                        <label>
                            Email:
                            <input
                                id="email"
                                name="email"
                                type="text"
                                className="m-3 border-b-2"
                            />
                        </label>
                        <label>
                            Password:
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="m-3 border-b-2"
                            />
                        </label>
						{ error ? <div className='text-red-600'>Wrong email or password!</div> : null}
                        <input
                            type="submit"
                            value="Login"
                            className="border border-black p-2 m-2 w-20 rounded-full"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}
