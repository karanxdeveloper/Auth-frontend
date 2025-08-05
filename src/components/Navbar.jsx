import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"


function Navbar() {

  const navigate = useNavigate()
  const [menuToggle, setMenuToggle] = useState(false)
  const { userData, backendUrl, setUserData, setIsLoggedIn, logout } = useContext(AppContext)

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">

      <img onClick={() => logout()} src={assets.person_icon} alt="" className="w-15 sm:w-12 " />
      {userData ?

        <div onClick={() => setMenuToggle(!menuToggle)} className="w-8  h-8 flex justify-center items-center rounded-full bg-black 
              text-white relative">
          {userData.name[0].toUpperCase()}
          <div className={`absolute ${menuToggle ? "block" : "hidden"}  top-0 right-0 z-10 text-black
          rounded pt-10`}>
            <ul className="list-none w-[15vw] m-0 p-4 bg-gray-100 rounded-xl text-sm">
              {!userData.isAccountVerified &&
                <li className="py-2 px-2 text-[18px] rounded-xl  hover:bg-gray-200 cursor-pointer">Verify Email</li>
              }
              <li onClick={() => logout()} className="py-2 px-2 text-[18px] rounded-xl hover:bg-gray-200 cursor-pointer pr-10">Logout</li>
            </ul>
          </div>
        </div>
        :
        <button onClick={() => navigate("/login")} className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2
        text-gray-800 hover:bg-gray-100 transition-all">Login <img src={assets.arrow_icon} alt="" /></button>}


    </div>
  )
}

export default Navbar