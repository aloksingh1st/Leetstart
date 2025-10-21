import React from 'react'

const PlaylistCard = () => {
    return (
        <>

            <ul className="list bg-gradient-to-br from-[#56595f] via-[#acb4c2] to-[#a2cfff] dark:from-[#1e3a8a] dark:via-[#0f172a] dark:to-[#0a0a0a] rounded-box shadow-md h-[30vh] mt-2 mr-2">

                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li>

                <li className="list-row">
                    <div>
                        <div>Ellie Beilish</div>
                        <div className="text-xs uppercase font-semibold opacity-60">Bears of a fever</div>
                    </div>
                    <button className="btn btn-square btn-ghost">
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                    </button>
                    <button className="btn btn-square btn-ghost">
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                    </button>
                </li>

            </ul>


        </>
    )
}

export default PlaylistCard