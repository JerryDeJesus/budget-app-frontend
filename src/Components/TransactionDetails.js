import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function TransactionDetails() {
  const [transaction, setTransaction] = useState([]);
  let { index } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/transactions/${index}`)
    .then((res)=>{
      setTransaction(res.data);
    })
    .catch(()=>{
      navigate("/not-found");
    })
  }, [index, navigate]);

  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/transactions/${index}`)
    .then((res)=>{
      navigate("/transactions");
    }).catch((err)=>{
      console.log(err);
    })
  };
  return (
    <article>
      <h2>
        <span>
          {transaction.date} - {transaction.name}
        </span>
      </h2>
      <h2 className="warning">Amount: {transaction.amount}</h2>
      <h2>From: {transaction.from}</h2>
      <h2>Category: {transaction.category}</h2>
      <p></p>
      <div className="showNavigation">
        <div>
          <Link to={`/transactions`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          <Link to={`/transactions/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default TransactionDetails;
