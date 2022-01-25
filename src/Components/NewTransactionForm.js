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
    category: ""
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
    <div className="NewForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          value={transaction.date}
          type="text"
          onChange={handleTextChange}
          placeholder="Date"
          required
        />
        <label htmlFor="name">Transaction Name:</label>
        <input
          id="name"
          type="text"
          required
          value={transaction.name}
          onChange={handleTextChange}
        />
        <label htmlFor="amount">Amount:</label>
        <textarea
          id="amount"
          type="number"
          name="amount"
          value={transaction.amount}
          placeholder="Enter a number"
          onChange={handleTextChange}
        />
        <label htmlFor="from">From:</label>
        <input
          id="from"
          type="text"
          value={transaction.from}
          onChange={handleTextChange}
        />
        <label htmlFor="category">Category:</label>
        <input
          id="category"
          type="text"
          value={transaction.category}
          onChange={handleTextChange}
        />
        <br />
        <input type="submit" className="Submit"/>
      </form>
      <Link to={`/transactions`}>
        <button>Head Back</button>
      </Link>
    </div>
  );
}

export default NewTransactionForm;
