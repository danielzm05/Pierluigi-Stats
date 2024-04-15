import { useEffect, useRef, forwardRef, useImperativeHandle, useContext } from "react";
import { FiltersContext } from "../context/filter";
import "cally";

export function Calendar (){
  const { updateDate } = useContext(FiltersContext)

  const handleDateChange = (event) => {
    let date = event.target.value.replaceAll('-', '')
    updateDate(date)
  }

  return(
    <CalendarDate onChange={handleDateChange}>
    <svg slot="previous" xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="#eeeeee" d="m9.55 12l7.35 7.35q.375.375.363.875t-.388.875q-.375.375-.875.375t-.875-.375l-7.7-7.675q-.3-.3-.45-.675t-.15-.75q0-.375.15-.75t.45-.675l7.7-7.7q.375-.375.888-.363t.887.388q.375.375.375.875t-.375.875z"/></svg>
    <svg slot="next" xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="#eeeeee" d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887q.375-.375.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75q0 .375-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1q-.375-.375-.375-.888t.375-.887z"/></svg>
      <CalendarMonth />
    </CalendarDate>
  )
}

const CalendarDate = forwardRef(function CalendarDate(
  { onChange, showOutsideDays, firstDayOfWeek, isDateDisallowed, ...props },
  forwardedRef
) {
  const ref = useRef();
  useImperativeHandle(forwardedRef, () => ref.current, []);
  useListener(ref, "change", onChange);
  useProperty(ref, "isDateDisallowed", isDateDisallowed);

  return (
    <calendar-date
      ref={ref}
      show-outside-days={showOutsideDays || undefined}
      first-day-of-week={firstDayOfWeek}
      {...props}
    />
    
  );
});

const CalendarMonth = forwardRef(function CalendarMonth(props, forwardedRef) {
  return <calendar-month offset={props.offset} ref={forwardedRef} />;
});


function useListener(ref, event, listener) {
  useEffect(() => {
    const current = ref.current;

    if (current && listener) {
      current.addEventListener(event, listener);
      return () => current.removeEventListener(event, listener);
    }
  }, [ref, event, listener]);
}

function useProperty(ref, prop, value) {
  useEffect(() => {
    if (ref.current) {
      ref.current[prop] = value;
    }
  }, [ref, prop, value]);
}




