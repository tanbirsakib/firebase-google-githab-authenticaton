import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, GithubAuthProvider, signInWithPopup, signOut } from "@firebase/auth";
import './App.css';
import initFirebaseAuth from "./Firebase/firebase.initialize";
import { useState } from "react";
initFirebaseAuth();
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
function App() {
  // state declare for displaying logged in user info 
  const [user, setUser] = useState({})
  const auth = getAuth();
  // onclick handler for google sign in
  const handleGoogleSignIn = () =>{
    
    signInWithPopup(auth, googleProvider)
    .then(result =>{
    const {displayName, email, photoURL} = result.user;
    const loggedInUser = {
      name : displayName,
      email: email,
      photo: photoURL
    }
    setUser(loggedInUser);
    // console.log(result.user)

    })
    .catch( error => {
      console.log(error.message);
    })
  }
  // github sign in handler 
  const handleGithubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
    .then(result => {
      const user = result.user;
      const { displayName,email, photoURL} = user;
      const loggedInUser = {
        name : displayName,
        email : email,
        photo : photoURL
      }
      setUser(loggedInUser);
      console.log(user)
    })
  }
  // sign out button handler 
  const handleSignOut = () => {
    signOut(auth)
    .then(() =>{
      setUser({});
    })
  }
  return (
    <div className="App">
      {/*---------- condional rendering---------------  */}
     { !user.name ? <div>
      <button onClick={handleGoogleSignIn}>Google Sign in</button>
      <button onClick={handleGithubSignIn}>GitHub Sign In</button>
     </div>
      :
      <button onClick={handleSignOut}>Sign Out</button>}
      {
        user.name && <div>
          <h1>{user.name}</h1>
          <h2>Your email is : {user.email}</h2>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;
