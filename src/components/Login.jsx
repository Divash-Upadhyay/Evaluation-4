import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
export const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [token, setToken] = useState({});
  console.log(inputs.username)
  console.log(token);
const nav = useNavigate()



  const handleChange = (e) => {
    setInputs(values => ({ ...values, [e.target.name]: e.target.value }))
  }
  function handleSubmit() {
    // console.log("yes");
    axios.get("http://localhost:8080/users").then((res) => {

    var nw=res.data.filter((e) => {
        if (e.username == inputs.username && e.pass == inputs.password) {
          return true;
        }
    })
    if(nw[0].role == "client"){
      nav("/neworder")
    }
    else if(nw[0].role == "admin"){
      nav("/orders")
    }     
    })
  }


  return (
    <div>
      <input
        className="username"
        type="text"
        name="username"
        placeholder="Enter Username"
        onChange={handleChange}
      />
      <input
        className="password"
        type="password"
        name="password"
        placeholder="Enter password"
        onChange={handleChange}
      />
      {/* On this button click make network req to find user with same username and password */}
      {/* get his role, if role is `admin` take him to `/orders` page otherwise take him to `/neworder` */}
      <button className="submit" onClick={handleSubmit}>Login</button>
    </div>
  );
};
