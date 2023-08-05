// import React from 'react';
// import { useState } from 'react';
// import "./Navbar.scss"
// import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
// import useUser from '../../../hooks/useUser';

//     const Navbar = () => {
//     const navigate = useNavigate();
//     const currentUser = useUser();
//     const handleLogout = () => {
//       localStorage.setItem("token",false)
//       navigate('/login');
//     };
//     const loggedInUser = JSON.parse(localStorage.getItem('loginUser'));
//     const token = localStorage.getItem("token")
//     const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {

//         setIsOpen(!isOpen);

//   };

//     return (
//            <div>
//              {token === 'true' 
//                 ?
//                 <div id='Navbar'>
//                     <ul>
//                         <div style={{width:'100px',height:'100%',position:"absolute",left:'0px',display:'flex',flexDirection:'row',alignItems:'center'}}>
//                             <li onClick={()=>{navigate('/home')}} style={{cursor:'pointer'}}>Home</li>
//                             <li onClick={()=>{navigate('/table')}} style={{cursor:'pointer'}}>Table</li>
//                         </div>

//                         <div className="avatar-dropdown" onClick={toggleDropdown}>
//                             <img className='avatar' src={loggedInUser.image}/>
//                             {isOpen && (
//                                 <div className="dropdown-content">
//                                     <a href="#">Profile</a>
//                                     <a href="#">Settings</a>
//                                     <a href="#">Logout</a>
//                                 </div>
//                             )}
//                         </div>
//                         <li>
//                             Hello {currentUser.name}
//                         </li>
//                         <li style={{cursor:'pointer'}} onClick={handleLogout}>
//                             Logout
//                         </li>
                        
//                     </ul>
//                 </div>
//                 :
//                 <div></div>
//              }
//            </div>
            
//     );
// };

// export default Navbar;