import { useNavigate } from "react-router-dom";
import { useState } from "react";

const app_name = '142.93.241.208'; // change later

function buildPath(route:string) : string
{
    if (import.meta.env.MODE != 'development') 
    {
        return 'http://' + app_name + ':5000/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}

function Login() {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function doLogin() {
  const obj = { login: loginName, password: password };

  const js = JSON.stringify(obj);

  try {
    const response = await fetch(buildPath('api/login'), {
      method: "POST",
      body: js,
      headers: { "Content-Type": "application/json" },
    });

    const res = await response.json();

    console.log(res);

    navigate("/cards");
  } catch (e: any) {
    alert(e.toString());
  }
}

  return (
    <div>
      <input
        placeholder="Login"
        value={loginName}
        onChange={(e) => setLoginName(e.target.value)}
      />
      <br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={doLogin}>Login</button>
    </div>
  );
}

export default Login;