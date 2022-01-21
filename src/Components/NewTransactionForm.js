import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function NewTransactionForm() {
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    date: "",
    name: "",
    amount: 0,
    from: "",
  });

  const handleTextChange = (event) => {
    setTransaction({ ...transaction, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/transactions`, transaction)
    .then((res)=>{
      navigate("/transactions");
    }).catch((err)=>{
      console.log(err);
    })
  };

  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Captain's Name:</label>
        <input
          id="captainName"
          value={transaction.date}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Captain"
          required
        />
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          required
          value={transaction.title}
          onChange={handleTextChange}
        />
        <label htmlFor="post">Post:</label>
        <textarea
          id="post"
          type="text"
          name="post"
          value={transaction.post}
          placeholder="Today I made a sandwich..."
          onChange={handleTextChange}
        />
        <label htmlFor="mistakesWereMadeToday">Mistakes were made today:</label>
        <input
          id="mistakesWereMadeToday"
          type="checkbox"
          value={transaction.mistakesWereMadeToday}
          onChange={handleTextChange}
          checked={transaction.mistakesWereMadeToday}
        />
        <br />
        <input type="submit" />
      </form>
      <Link to={`/transactions`}>
        <button>Head Back</button>
      </Link>
    </div>
  );
}

export default NewTransactionForm;
