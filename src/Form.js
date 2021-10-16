import React, { useState } from 'react';
import FetchPlayer from './FetchPlayer';

function Form() {
  const [name, setName] = useState("");
  const [months] = useState([
    {label: 1, value: 1},
    {label: 2, value: 2},
    {label: 3, value: 3}
  ]);
  const [month, setMonth] = useState("1");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name);
    console.log(month);
    setSubmitted(true);
  }

  /*
  if (submitted) {
    return <FetchPlayer></FetchPlayer>
  }
  */

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <label>Name:<br/>
          <input
            type = "text"
            value = {name}
            onChange = {(e) => setName(e.target.value)}
          />
        </label><br/>

        Month: <br/>
        <select onChange = {(e) => setMonth(e.target.value)}>
          {months.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <input type="submit"/>
      </form>

      {submitted ? <FetchPlayer></FetchPlayer> : <div></div>}
    </div>
  );
}

export default Form;