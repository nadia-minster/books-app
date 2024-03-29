import { Link } from "react-router-dom"
import { useAppContext } from "../context/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
    const { isLoggedIn } = useAppContext()
    return (
        <div className="bg-green-900 py-6">
            <div className="container mx-auto flex justify-between ">
                <span className="text-3xl text-white font-bold tracking-tight  ">
                    <Link to="/">Book Store</Link>
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn ? <>
                        <Link className="flex items-center text-white px-3 font-bold hover:bg-green-600" to="/my-account">My Account</Link>
                        <Link className="flex items-center text-white px-3 font-bold hover:bg-green-600" to="/my-books">My Books</Link>
                        <Link className="flex items-center text-white px-3 font-bold hover:bg-green-600" to="/my-books">My Orders</Link>
                        <SignOutButton />
                    </> : <Link className="flex items-center text-white px-5 font-bold rounded-md hover:bg-green-600" to="/sign-in">Sign In</Link>}

                </span>
            </div>
        </div>
    )
}

export default Header;