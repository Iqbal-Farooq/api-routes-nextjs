import { useRef, useState } from "react";
function HomePage() {
  const [fetchedItems, setFetcheItems] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    let enteredEmail = emailInputRef.current.value;
    let enteredFeedback = feedbackInputRef.current.value;
    const reqBody = { email: enteredEmail, text: enteredFeedback };
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "applicaion/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };
  const loaddata = () => {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => setFetcheItems(data.feedback));
  };
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Your email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback </label>
          <textarea rows="5" id="feedback" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Form </button>
      </form>
      <hr />
      <button onClick={loaddata}>Get Data</button>
      <ul>
        {fetchedItems.map((item) => (
          <li key={item.email}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
