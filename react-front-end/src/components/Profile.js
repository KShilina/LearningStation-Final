// import React, {useState} from "react";

// import StudentRegister from "./StudentRegister";
// import TutorRegister from "./TutorRegister";
// import { useAuth0 } from "@auth0/auth0-react";

// const Profile = (props) =>{
//   const [userType, setUserType] = useState(null);
//   const {user} = useAuth0()
//   console.log(user, "user")

//   const handleSelectChange = (event) => {
//     setUserType(event.target.value);
//   };

//   if (userType === "tutor"){
//     return <TutorRegister />
//   }
//   if (userType === "student"){
//     return <StudentRegister />
//   }
// // if (userType === null){
//   return (<div className="signup-dropdown">
//   <select
//     id="signup-dropdown"
//     onChange={handleSelectChange}
//     value={userType}
//   >
//     <option value="">Choose from</option>
//     <option value="student">Become a Student</option>
//     <option value="tutor">Become a Tutor</option>
    
//   </select>
//   </div>  )
// // }
 
// }


  

// export default Profile

//KATYA code snippet

import React, {useState} from "react";

import StudentRegister from "./StudentRegister";
import TutorRegister from "./TutorRegister";

import { useAuth0 } from "@auth0/auth0-react";





const Profile = (props) =>{
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);
  const [userType, setUserType] = useState(null);

  const handleSelectChange = (event) => {
    setUserType(event.target.value);
  };

  if (userType === "tutor"){
    return <TutorRegister />
  }
  if (userType === "student"){
    return <StudentRegister />
  }
// if (userType === null){
  return (<div className="signup-dropdown">
  <select
    id="signup-dropdown"
    onChange={handleSelectChange}
    value={userType}
  >
    <option value="">Choose from</option>
    <option value="student">Become a Student</option>
    <option value="tutor">Become a Tutor</option>

  </select>
  </div>  )
// }
 
}




export default Profile
