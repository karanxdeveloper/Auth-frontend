import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"


function Navbar() {

  const navigate = useNavigate()

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">

      <img src={assets.person_icon} alt="" className="w-28 sm:w-18 " />

      <button onClick={()=>navigate("/login")} className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2
        text-gray-800 hover:bg-gray-100 transition-all">Login <img src={assets.arrow_icon} alt="" /></button>
    </div>
  )
}

export default Navbar