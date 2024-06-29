import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="w-full bg-blue-500 text-white p-2 text-xl h-12 top-0 fixed">
            <nav className="flex justify-between items-center">
                <h1>ADMIN PORTAL</h1>
                <ul className="flex justify-around gap-4 items-center">
                    <li>
                        <Link to="/examiner" className="hover:text-gray-300">Examiners</Link>
                    </li>
                    <li>
                        <Link to="/invigilator" className="hover:text-gray-300">Invigilator</Link>
                    </li>
                    <li>
                        <button className="bg-transparent hover:bg-blue-700 text-white font-semibold p-1 border border-white hover:border-transparent rounded">
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );

};

export default Navbar;