import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function EditTransactionForm() {
  let { index } = useParams();
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

  const handleCheckboxChange = () => {
    setTransaction({ ...transaction, mistakesWereMadeToday: !transaction.mistakesWereMadeToday });
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/transactions/${index}`)
    .then((res)=>{
      setTransaction(res.data);
    }).catch((err)=>{
      navigate("*");
    })
  }, [index, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/transactions/${index}`, transaction)
    .then((res)=>{
      navigate(`/transactions/${index}`);
    }).catch((err)=>{
      console.log(err);
    })
  };
  
  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Date:</label>
        <input
          id="date"
          value={transaction.date}
          type="text"
          onChange={handleTextChange}
          placeholder="Date"
          required
        />
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          required
          value={transaction.name}
          onChange={handleTextChange}
        />
        <label htmlFor="amount">amount:</label>
        <textarea
          id="amount"
          type="number"
          name="amount"
          value={transaction.amount}
          placeholder="sandwich..."
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
        <input type="submit" />
      </form>
      <Link to={`/transactions`}>
        <button>Head Back</button>
      </Link>
    </div>
  );
}

export default EditTransactionForm;
