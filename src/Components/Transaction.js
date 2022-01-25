import { Link } from "react-router-dom";

function Transaction({ transaction, index }) {
  let amount = transaction.amount;
  let color = "";
    if(amount > 1000){
      color = "green"
    }else if(amount < 0){
      color = "red"
    }else{
      color = "neutral"
    }

  return (
      <tr>
        <td>
            {transaction.date}
        </td>
        <td>
          <Link to={`/transactions/${index}`}>{transaction.name}💰</Link>
        </td>
        <td className={color}>
          {transaction.amount}
        </td>
      </tr>
  );
}

export default Transaction;