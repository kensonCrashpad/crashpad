import React from "react";
// import { Calendar, DateLocalizer, View } from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import moment from "moment";
// import NavigationView from "./CalNavView";

// const localizer = Calendar.momentLocalizer(moment);

// const customViews = {
//   navigationView: NavigationView,
// };

// interface CalendarProps {
//   events: any[]; // Replace with the appropriate type for events
//   startAccessor: string;
//   endAccessor: string;
//   selectable?: boolean;
//   style?: React.CSSProperties;
// }

// const CalendarComponent: React.FC<CalendarProps> = ({
//   events,
//   startAccessor,
//   endAccessor,
//   selectable,
//   style,
// }) => {
//   const handleNavigate = (action: View) => {
//     console.log(`Navigating ${action}`);
//   };

//   return (
//     <div>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor={startAccessor}
//         endAccessor={endAccessor}
//         selectable={selectable}
//         style={{ height: "500px", ...style }}
//         views={["month", "week", "day"]}
//         components={{
//           event: () => null, // Replace with your custom event component if needed
//         }}
//         step={60}
//       />
//     </div>
//   );
// };

// export default CalendarComponent;
