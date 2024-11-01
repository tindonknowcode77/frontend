import { useEffect } from 'react';
import { useState } from 'react';
import jwt_decode from "jwt-decode"; // Import jwt-decode

function App() {
  const [user, setUser] = useState({}) // Create state for user

  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    var decoded = jwt_decode(response.credential); // Decode the JWT token
    setUser(decoded); // Store user information in state
    document.getElementById('buttonDiv').hidden = true; // Hide button after login
  }

  const handleLogOut = (e) => {
    setUser({}); // Clear user state on logout
    document.getElementById('buttonDiv').hidden = false; // Show button again
  }

  useEffect(() => {
    /* global google*/ 
    window.onload = function () {
      google.accounts.id.initialize({
        client_id: "298460787097-5dreslc86ufp2fj6t2suda5n2be0l1k7.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    }
  }, []);

  return (
   <>
   <div id='buttonDiv'></div>
   {Object.keys(user).length !== 0 && // Check if user is logged in
    <button onClick={handleLogOut}>logout</button>
   }
   {user && 
   <div>
   <h5>{user.name}</h5> // Display user name
   </div>
   }
   </>
  );
}

export default App;
