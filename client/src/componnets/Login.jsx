import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navi, setNavi] = useState(false);
  const denem = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    // yenileme beliirtencine ihtizacimiy var oni[unu icn withcre true yapariy] buna kimlik bilgi;eri diyebilieriz
    //data yazmadan once response paramtezsiy
    const {data} = await axios.post(
      "http://localhost:8000/api/login",
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );
    //console.log(response.data) zapariy apllication cobnolda orda refresh tokeni goruruy
    //console.log(response.data);
    axios.defaults.headers.common['Authorization'] =`Bearer  ${data['token']}`

     setNavi(true)
  };
  // yukaridan true gelirse logine gider
  if (navi) {
    return denem("/");
  }

  return (
    <div>
      <main className="form-signin w-100 m-auto">
        <form onSubmit={submit}>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label for="floatingInput"> Email</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label for="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            {" "}
            signip
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
