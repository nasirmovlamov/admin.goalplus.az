import React from "react";

type Props = {
  dateWeekDays: any;
  setDateWeekDays: any;
  selectDateRangeItem: any;
};

const WeekComponent = ({
  dateWeekDays,
  setDateWeekDays,
  selectDateRangeItem,
}: Props) => {
  return (
    <>
      <div className="flex gap-2 mt-2">
        {[0, 1, 2, 3, 4, 5, 6].map((weekDay: any) => (
          <button
            type="button"
            key={weekDay}
            className={`
            ${
              dateWeekDays
                ?.find((day: any, index: any) => day?.id == selectDateRangeItem)
                ?.weekDays?.filter((day: any) => day === weekDay).length > 0
                ? "bg-blue-500"
                : "bg-[#5b5b5c]"
            }
            text-white p-2 rounded-md`}
            onClick={() => {
              console.log("selectDateRangeItem", selectDateRangeItem);
              console.log("dateWeekDays", dateWeekDays);
              console.log(
                "selected dateWeekDays",
                dateWeekDays?.find((day: any) => day?.id == selectDateRangeItem)
              );
              console.log(
                "filter",
                dateWeekDays
                  .find(
                    (day: any, index: any) => day?.id == selectDateRangeItem
                  )
                  ?.weekDays?.filter((day: any) => day === weekDay)
              );
              if (
                dateWeekDays
                  .find(
                    (day: any, index: any) => day?.id == selectDateRangeItem
                  )
                  ?.weekDays?.filter((day: any) => day === weekDay).length > 0
              ) {
                // remove 0 from weekDays array
                setDateWeekDays(
                  dateWeekDays.map((day: any) => {
                    if (day.id == selectDateRangeItem) {
                      return {
                        ...day,
                        weekDays: day.weekDays?.filter(
                          (day: any) => day !== weekDay
                        ),
                      };
                    }
                    return day;
                  })
                );
              } else {
                // add 0 to weekDays array
                setDateWeekDays(
                  dateWeekDays.map((day: any) => {
                    if (day.id == selectDateRangeItem) {
                      day.weekDays = [...day.weekDays, weekDay];
                      return day;
                    }
                    return day;
                  })
                );
              }
            }}
          >
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][weekDay]}
          </button>
        ))}
      </div>
      {/* {JSON.stringify(dateWeekDays)}
      {JSON.stringify(
        dateWeekDays
          .find((day: any, index: any) => index === selectDateRangeItem)
          ?.weekDays?.filter((day: any) => day === 0)
      )}
      {JSON.stringify(
        dateWeekDays
          ?.find((day: any, index: any) => day?.id == selectDateRangeItem)
          ?.weekDays?.find((day: any) => day == 0)
      )} */}
    </>
  );
};

export default WeekComponent;
