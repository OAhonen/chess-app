import React, { useState } from 'react';
import FetchPlayer from './FetchPlayer';

function Form() {
  const [name, setName] = useState("");
  const [months] = useState([
    {label: '01', value: '01'},
    {label: '02', value: '02'},
    {label: '03', value: '03'},
    {label: '04', value: '04'},
    {label: '05', value: '05'},
    {label: '06', value: '06'},
    {label: '07', value: '07'},
    {label: '08', value: '08'},
    {label: '09', value: '09'},
    {label: '10', value: '10'}
  ]);
  const [month, setMonth] = useState("01");
  const [datatypes] = useState([
    {label: 'Table', value: 'Table'},
    {label: 'Chessboard', value: 'Chessboard'}
  ]);
  const [datatype, setDatatype] = useState("Table");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      {submitted ? <FetchPlayer name={name} month={month} datatype={datatype}/> :
        <form onSubmit={handleSubmit}>

          <label>Name:<br/>
            <input
              pattern = "^[A-Za-z0-9]+$"
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
          </select><br/>
          
          Datatype: <br/>
          <select onChange = {(e) => setDatatype(e.target.value)}>
            {datatypes.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select><br/>
          <input type="submit"/>
        </form>
      }

    </div>
  );
}

export default Form;