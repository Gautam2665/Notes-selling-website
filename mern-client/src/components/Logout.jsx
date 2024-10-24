import React,{useContext} from 'react'
import { AuthContext } from '../contects/AuthProvider';
import { useLocation,useNavigate } from 'react-router-dom';

const Logout = () => {
    const {logOut}=useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || '/';  // redirect to the previous page if available, otherwise to the home page.

    const handleLogout = () => {
        logOut().then(()=>{
            alert('signed out successfully')
            navigate(from,{replace:true})
        }).catch((error)=>{

        });
    }

  return (
    <div className='h-screen bg-teal-100 flex items-center justify-center'>
        <button className='bg-red-700 px-8 py-2 text-white rounded' onClick={handleLogout}>Logout</button>     
    </div>
  )
}

export default Logout
