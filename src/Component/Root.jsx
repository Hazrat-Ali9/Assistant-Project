import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";


const Root = () => {
    return (
        <div className="text-black">
            <div>
                <div className="max-w-6xl mx-auto">
                    <Navbar></Navbar>
                </div>
            </div>
            <div className="max-w-6xl mx-auto overflow-x-hidden">
                <Outlet></Outlet>
            </div>
            {/* <div>
                <div className="max-w-6xl mx-auto">
                   <Footer></Footer>
                </div>
            </div> */}
        </div>
    );
};

export default Root;