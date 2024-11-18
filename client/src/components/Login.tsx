import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await login(email, password);
  };
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 ">
      <form
        action="/auth/admin/login"
        method="post"
        className="border rounded p-3 col-4"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center text-primary">Login</h3>
        <div className="form-group my-4">
          <label htmlFor="emailaddress">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary my-2"
          disabled={isLoading}
        >
          Login
        </button>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div>
          <p>
            Don't have an account.
            <Link to="/auth/admin/signup" className="primary">
              Click here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
