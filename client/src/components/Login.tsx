import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <form
        action="/auth/admin/login"
        method="post"
        className="border rounded p-3 col-4"
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
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Login
        </button>
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
