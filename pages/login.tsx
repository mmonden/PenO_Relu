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
      callbackUrl: "/",
    });
    if (res.status === 401) {
      setError(true);
    }
    if (res.url) router.push(res.url);
  }
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div>
        <img src="/relu.png" width={400} height={180} alt="logo" />
        <div className="border border-black p-5 rounded-md">
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center space-y-2"
          >
            <div className="flex flex-row">
              <input
                id="email"
                name="email"
                type="text"
                className="border-b-2 flex right-0"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex flex-row">
              <input
                id="password"
                name="password"
                type="password"
                className="border-b-2"
                placeholder="Password"
                required
              />
            </div>
            {error ? (
              <div className="text-red-600">Wrong email or password!</div>
            ) : null}
            <div className="min-w-full flex justify-center">
              <input
                type="submit"
                value="Login"
                className="border border-black p-2 m-2 w-20 rounded-full flex justify-center"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
