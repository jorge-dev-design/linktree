import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth";

export function Header() {
    async function handleLogout(){
       await signOut(auth);
    }

    return (
        <header className="w-full max-w-2xl mt-4 px-1">
            <nav className="w-full h-12 flex items-center justify-between">
                <div className="flex gap-4 font-medium text-white">
                    <Link to="/" className="cursor-pointer transition-transform duration-200 hover:scale-110">
                        Home
                    </Link>
                    <Link to="/admin" className="cursor-pointer transition-transform duration-200 hover:scale-110">
                        Links
                    </Link>
                        <Link to="/admin/social" className="cursor-pointer transition-transform duration-200 hover:scale-110">
                        Redes sociais
                    </Link>
                </div>

                <button onClick={handleLogout} className="cursor-pointer transition-transform duration-200 hover:scale-110">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} color="#fff" className="text-xl"/>
                </button>
            </nav>
        </header>
    )
}