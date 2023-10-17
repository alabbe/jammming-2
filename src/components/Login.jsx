import React from "react";

function Login(props) {


  let button = "";
  if (props.isExpired === null || !props.isAuthorized) {
    button = <button onClick={props.onClick} className="bg-red-500 h-6 px-1 text-sm rounded hover:bg-sky-300 active:bg-violet-400">Authorize spotify</button>
  }

  return (
    <div className=" bg-black">
      {button}
    </div>
  );

}

export default Login;