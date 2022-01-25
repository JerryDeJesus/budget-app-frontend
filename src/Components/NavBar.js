import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <span>
        <Link to="/">Home</Link>
      </span>
      <span>
      <Link to="/transactions">Budget App</Link>
      </span>
      <span>
      <button>
        <Link to="/transactions/new">New Transaction</Link>
      </button>
      </span>
    </nav>
  );
}
