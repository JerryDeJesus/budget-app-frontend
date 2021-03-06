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
      sum += Number(item.amount);
    })
    return sum;
  };
  
  const colorPicker = () => {
    let sum = 0;
    transactions.forEach((item) => {
      sum += Number(item.amount);
    })
  let color = "";
    if(sum > 1000){
      color = "green"
    }else if(sum < 0){
      color = "red"
    }else{
      color = "neutral"
    }
    return color
  }

  return (
    <div className="Transactions">
      <section className="IndexTable">
        <table>
          <thead>
            <tr>
              <th>Dates</th>
              <th>| Transactions |</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              return(
              <Transaction 
                key={index} 
                transaction={transaction} 
                index={index} 
              />
              );
            })}
          </tbody>
        </table>
          <span className={colorPicker()}><b>Total: ${transactionSum()}</b></span>
      </section>
    </div>
  );
}

export default Transactions;
