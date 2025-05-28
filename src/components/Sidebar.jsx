import React from "react";

const Sidebar = () => {
    return (
        <ul className="list bg-base-100 rounded-box shadow-md lg:h-[90vh] mt-2 mr-2">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">My Lists</li>

            {/* List Item 1 */}
            <li className="list-row flex items-center justify-between p-4">
                <div className="flex items-center">
                    <img
                        className="w-10 h-10 rounded-full"
                        src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                        alt="Profile"
                    />
                    <div className="ml-4">
                        <div className="font-medium">Two Sum</div>
                        {/* <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div> */}
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button className="btn btn-square btn-ghost">Easy</button>
                    <button className="btn btn-square btn-ghost">...</button>
                </div>
            </li>

            {/* List Item 2 */}
            <li className="list-row flex items-center justify-between p-4">
                <div className="flex items-center">
                    <img
                        className="w-10 h-10 rounded-full"
                        src="https://img.daisyui.com/images/profile/demo/1@94.webp"
                        alt="Profile"
                    />
                    <div className="ml-4">
                        <div className="font-medium">Two Sum</div>
                        {/* <div className="text-xs uppercase font-semibold opacity-60">Remaining Reason</div> */}
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button className="btn btn-square btn-ghost">Easy</button>
                    <button className="btn btn-square btn-ghost">...</button>
                </div>
            </li>
        </ul>
    );
};

export default Sidebar;
