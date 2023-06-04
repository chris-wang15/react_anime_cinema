import LogoUri from "../assets/logo.jpeg"
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {BiVideoPlus} from "react-icons/bi";
import {RxAvatar} from "react-icons/rx";
import {useLoginContext} from "../context/MainContextHook.tsx";
import {useState} from "react";
import {FaUserCircle} from "react-icons/fa";

const Header = () => {
    const menuItemTextClass
        = "text-sm md:text-base text-textColor duration-100 transition-all ease-in-out cursor-pointer"

    const {user, login, logout, createUser} = useLoginContext()

    const showCollection = () => {
        // show personal collection
    }

    const [loginPageShown, setLoginPageShown] = useState(false)
    const [email, setEmail] = useState<string | null>(user?.mail ?? null)
    const [password, setPassword] = useState<string | null>(user?.password ?? null)

    return (
        <header className="fixed z-50 w-screen p-3 px-4 bg-primary">
            <div className="flex w-full h-full">
                {/* icon & title; link to home page */}
                <Link to={"/"} className="flex items-center gap-2">
                    <img src={LogoUri} className="w-10 object-cover" alt="logo"/>
                    <p className="text-headingColor text-sm md:text-xl font-bold white">Anime Cinema</p>
                </Link>
                {/*menu items*/}
                <ul className="flex items-center gap-3 lg:gap-16 md:gap-8 ml-auto">
                    <li className={menuItemTextClass}>
                        <Link to={"/"}>
                            Home
                        </Link>
                    </li>
                    <li className={menuItemTextClass}>
                        <Link to={"/videos"}>
                            Anime
                        </Link>
                    </li>
                    <li className={menuItemTextClass}>
                        <Link to={"/about_us"}>
                            About Us
                        </Link>
                    </li>
                    <li className={menuItemTextClass}>
                        <Link to={"/upload"}>
                            Upload
                        </Link>
                    </li>
                </ul>
                {/* video collection */}
                <div
                    onClick={showCollection}
                    className="relative flex items-center justify-center">
                    <BiVideoPlus className="text-textColor text-2xl ml-2 md:ml-8"/>
                </div>
                {/* User avatar */}
                <div className="relative">
                    <motion.div
                        // whileTap doesn't register click events on the edges, not scale too small
                        whileTap={{scale: 0.95}}
                        onClick={() => setLoginPageShown(!loginPageShown)}
                        className="w-7 md:w-10 h-7 md:h-10 ml-2 md:ml-8 drop-shadow-xl cursor-pointer"
                    >
                        {user ? <FaUserCircle className="w-full h-full"/> : <RxAvatar className="w-full h-full"/>}
                    </motion.div>
                    {loginPageShown && (
                        <div className="w-64 bg-gray-100 shadow-xl rounded-lg flex flex-col absolute right-1">
                            {!user ? (
                                <div>
                                    <p className="text-sm text-textColor ml-2">Email:</p>
                                    <input
                                        className="w-60 m-2"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email ?? ""}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <p className="text-sm text-textColor ml-2">Password:</p>
                                    <input
                                        className="w-60 m-2"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password ?? ""}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="w-56 bg-gray-500 text-xl cursor-pointer m-4 rounded-full"
                                        onClick={() => {
                                            if (email && password) {
                                                login({
                                                    id: "",
                                                    name: "",
                                                    mail: email,
                                                    password: password,
                                                })
                                            }
                                            setLoginPageShown(false)
                                        }}>
                                        Login
                                    </button>
                                    <button
                                        type="button"
                                        className="w-56 bg-gray-500 text-xl cursor-pointer m-4 rounded-full"
                                        onClick={() => {
                                            if (email && password) {
                                                createUser({
                                                    id: "",
                                                    name: "",
                                                    mail: email,
                                                    password: password,
                                                })
                                            }
                                            setLoginPageShown(false)
                                        }}>
                                        Create An Account
                                    </button>
                                </div>
                            ) : (
                                <div >
                                    <button
                                        type="button"
                                        className="w-56 bg-gray-500 text-xl cursor-pointer m-4 rounded-full"
                                        onClick={() => {
                                            logout()
                                            setLoginPageShown(false)
                                        }}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </header>
    );
}

export default Header;