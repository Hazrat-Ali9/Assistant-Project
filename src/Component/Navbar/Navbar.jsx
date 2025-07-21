import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <NavLink to='/' className="btn btn-ghost text-xl">Home</NavLink>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal flex gap-3 px-1">
                        <NavLink to='/' className="btn bg-white normal-case btn-ghost text-xl"><h1 className="">Question</h1></NavLink>
                        <NavLink to='/answer' className="btn bg-white normal-case btn-ghost text-xl"><h1 className="">Answer</h1></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    );
}; 

export default Navbar;