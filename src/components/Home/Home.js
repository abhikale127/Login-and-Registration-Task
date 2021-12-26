import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME, API_BASE_URL } from "../../constants/apiConstants";
import axios from "axios";
function Home(props) {
  // useEffect(() => {
  //     axios.get(API_BASE_URL+'/user/me', { headers: { 'access': localStorage.getItem(ACCESS_TOKEN_NAME) }})
  //     .then(function (response) {
  //         if(response.status !== 200){
  //           redirectToLogin()
  //         }
  //     })
  //     .catch(function (error) {
  //       redirectToLogin()
  //     });
  //   })
  // function redirectToLogin() {
  // props.history.push('/login');
  // }
  const [auther, setAuther] = useState([]);
  useEffect(() => {
    axios
      .get("https://glomm.herokuapp.com/api/brands/")
      .then((response) => {
        // handle success
        setAuther(response.data.results);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

  let admin = "admin";

  return (
    <div>
      <h1>HELLO{localStorage.name} </h1>
      {localStorage.role === admin ? (
        <div className="">
          <h2>list of user for admin</h2>
          {auther.map((brand) => {
            return <div>{brand.name}</div>;
          })}
        </div>
      ) : (
        <div>
          <h2>Hello user</h2>
          {auther.map((brand) => {
            return <div>{brand.name}</div>;
          })}
        </div>
      )}
    </div>
  );
}

export default withRouter(Home);
