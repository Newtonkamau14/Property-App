import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <form
        action="/auth/admin/signup"
        method="post"
        className="border rounded p-3 col-4"
      >
        <h3 className="text-center text-primary">Create Account</h3>
        <div className="form-group my-4">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Enter username"
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
          Sign Up
        </button>
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
