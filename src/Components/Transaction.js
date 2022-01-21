import { Link } from "react-router-dom";

function Transaction({ transaction, index }) {
  return (
      <tr className="warning">
        <td>
            {transaction.date}
        </td>
        <td>
          <Link to={`/transactions/${index}`}>{transaction.name}💰</Link>
        </td>
        <td>
          {transaction.amount}
        </td>
      </tr>
  );
}

export default Transaction;