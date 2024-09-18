import { buildPath, extractdata } from "../api/feedback";
import { useState } from 'react'
const FeedBack = (props) => {
  const [detail, setDetails] = useState()
  function loadDetails(id) {
    console.log('id', id)
    fetch(`/api/feedback/${id}`).then(res => res.json()).then(data => setDetails(data.feedback))
  }
  return (
    <div>
      {detail && <p>{detail.email}</p>}
      <ul>
        {props.fetchedItems.map((item) => (
          <li key={item.email}>{item.text} <button onClick={loadDetails.bind(null, item.id)}> Show Details</button></li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const filePath = buildPath(); // This is server-side code
  const data = extractdata(filePath); // This is server-side code

  return {
    props: {
      fetchedItems: data,
    },
  };
}

export default FeedBack;
