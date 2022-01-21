import { useEffect, useState } from "react";
import Transaction from "./Transaction";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(()=>{
    axios.get(`${API_URL}/transactions`)
    .then((res)=>{
      console.log(res.data);
      setTransactions(res.data);
    })
    .catch((err)=>{
      throw err;
    })
  }, [])

  const transactionSum = () => {
    let sum = 0;
    transactions.forEach((item) => {
      sum += item.amount;
    })
    return sum;
  };

  return (
    <div className="Transactions">
      <section>
        <table>
          <thead>
            <tr>
              <th>Total: {transactionSum()}</th>
              <th>Transaction Name</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return <Transaction key={index} transaction={transaction} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Transactions;
