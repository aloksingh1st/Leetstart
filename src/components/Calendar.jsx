import React, { useEffect, useState } from 'react';
import 'cally'; // Assumes <calendar-date> is defined via this import
import { axiosInstance } from '../libs/axios';

const Calendar = () => {
  const [activeDates, setActiveDates] = useState([]);

  // Fetch active dates on mount
  useEffect(() => {
    axiosInstance('/streaks/getCurrentMonthSubmissionDates')
      .then((res) => {
        setActiveDates(res.data.data || []);
      })
      .catch((err) => {
        console.error('Error fetching submission dates:', err);
      });
  }, []);

  // Watch for changes in calendar and apply 'data-active'
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const calendar = document.querySelector('calendar-date');
      if (!calendar) return;

      const days = calendar.querySelectorAll('calendar-day');
      days.forEach((day) => {
        const dateAttr = day.getAttribute('datetime');
        if (dateAttr && activeDates.includes(dateAttr)) {
          day.setAttribute('data-active', 'true');
        }
      });
    });

    const waitForCalendar = () => {
      const calendarElement = document.querySelector('calendar-date');
      if (calendarElement) {
        observer.observe(calendarElement, { childList: true, subtree: true });
      } else {
        // Retry in case it's not rendered yet
        setTimeout(waitForCalendar, 100);
      }
    };

    waitForCalendar();

    return () => observer.disconnect();
  }, [activeDates]);

  return (
    <ul className="list bg-base-100 rounded-box shadow-md h-[90vh] mt-2 mr-2">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Coding activity calendar</li>
      <calendar-date className="cally bg-base-100 border-base-300 rounded-box">
        <svg
          aria-label="Previous"
          className="fill-current size-4"
          slot="previous"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <svg
          aria-label="Next"
          className="fill-current size-4"
          slot="next"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
        <calendar-month></calendar-month>
      </calendar-date>
    </ul>
  );
};

export default Calendar;
