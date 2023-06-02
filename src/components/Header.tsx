import LogoUri from "../assets/logo.jpeg"
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {app} from "../firebase.config.tsx"
import {BiVideoPlus} from "react-icons/bi";
import {RxAvatar} from "react-icons/rx";

const Header = () => {
    const menuItemTextClass
        = "text-sm md:text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"

    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider()



    const login = async () => {
        // const {user : {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider)
        console.log(firebaseAuth)
        console.log(provider)
    }

    const showCollection = () => {
        // show personal collection
    }

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
                <motion.div
                    whileTap={{scale: 0.6}}
                    onClick={login}
                    className="w-7 md:w-10 h-7 md:h-10 ml-2 md:ml-8 drop-shadow-xl cursor-pointer"
                >
                    <RxAvatar className="w-full h-full"/>
                </motion.div>

            </div>
        </header>
    );
}

export default Header;