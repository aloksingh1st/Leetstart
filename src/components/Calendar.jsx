import React from 'react'
import "cally";

const Calendar = () => {
    return (
        <>
            <ul className="list bg-base-100 rounded-box shadow-md h-[90vh] mt-2 mr-2">

                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li>

                <calendar-date class="cally bg-base-100 border-base-300 rounded-box">
                    <svg aria-label="Previous" className="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path></svg>
                    <svg aria-label="Next" className="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path></svg>
                    <calendar-month></calendar-month>
                </calendar-date>


            </ul>

        </>
    )
}

export default Calendar