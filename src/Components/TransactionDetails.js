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
      <h5>
        <span>
          {transaction.title} - By {transaction.captainName}
        </span>
      </h5>
      <h6>{transaction.post}</h6>
      <p>Days since last crisis: {transaction.daysSinceLastCrisis}</p>
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
