import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignUp } from "../hooks/useSignUp";

function Signup() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signUp, error, isLoading } = useSignUp();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await signUp(username, email, password);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <form onSubmit={handleSubmit} className="border rounded p-3 col-4">
        <h3 className="text-center text-primary">Create Account</h3>
        <div className="form-group my-4">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="form-group my-4">
          <label htmlFor="emailaddress">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            required
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
          Sign Up
        </button>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div>
          <p>
            Already have an account.
            <Link to="/auth/admin/login" className="primary">
              Click here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
