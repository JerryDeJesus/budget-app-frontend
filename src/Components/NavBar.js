import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <span>
        <Link className="NavLink" to="/">Home</Link>
      </span>
      <span>
      <Link className="NavLink" to="/transactions">Budget App</Link>
      </span>
      <span>
      <button>
        <Link className="NavLink" to="/transactions/new">New Transaction</Link>
      </button>
      </span>
    </nav>
  );
}
