import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

function EditTransactionForm() {
  let { index } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: 0,
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
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Captain's Name:</label>
        <input
          id="captainName"
          value={transaction.captainName}
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
          placeholder="Title"
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
        <label htmlFor="daysSinceLastCrisis">Days Since Last Crisis:</label>
        <input
          id="daysSinceLastCrisis"
          type="number"
          value={transaction.daysSinceLastCrisis}
          onChange={handleCheckboxChange}
          checked={transaction.daysSinceLastCrisis}
        />
        <br />
        <input type="submit" />
      </form>
      <Link to={`/transactions/${index}`}>
        <button>Head Back</button>
      </Link>
    </div>
  );
}

export default EditTransactionForm;
