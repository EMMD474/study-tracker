import React from "react";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

type DayKey =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

interface TimetableRow {
  id: number;
  sunday: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
}

// Assign a consistent color class per subject name
const SUBJECT_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "Advanced Databases": {
    bg: "bg-[#c8a96e]/10",
    text: "text-[#c8a96e]",
    dot: "bg-[#c8a96e]",
  },
  "Computer Security and Networking": {
    bg: "bg-[#1d9e75]/10",
    text: "text-[#1d9e75]",
    dot: "bg-[#1d9e75]",
  },
  "Human Computer Interactions": {
    bg: "bg-[#5b8fc9]/10",
    text: "text-[#5b8fc9]",
    dot: "bg-[#5b8fc9]",
  },
  "Software Requirements Engineering": {
    bg: "bg-[#b07cc6]/10",
    text: "text-[#b07cc6]",
    dot: "bg-[#b07cc6]",
  },
};

const DEFAULT_COLOR = {
  bg: "bg-[#e8e6e0]/6",
  text: "text-[#e8e6e0]",
  dot: "bg-[#e8e6e0]",
};

function SubjectCell({ subject }: { subject: string }) {
  const color = SUBJECT_COLORS[subject] ?? DEFAULT_COLOR;
  return (
    <div
      className={`inline-flex items-start gap-2 rounded-md px-3 py-2 ${color.bg} w-full`}
    >
      <span
        className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full ${color.dot}`}
      />
      <span className={`text-xs font-medium leading-snug ${color.text}`}>
        {subject}
      </span>
    </div>
  );
}

const TimeTable = ({ data }: { data: TimetableRow[] }) => {
  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[#c8a96e]/10 bg-[#0f0e0c]">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        {/* Header */}
        <thead>
          <tr className="border-b border-[#c8a96e]/10">
            {DAYS.map((day) => {
              const isToday = day.toLowerCase() === today;
              return (
                <th
                  key={day}
                  className={`px-4 py-4 text-center font-medium tracking-widest uppercase text-xs transition-colors ${
                    isToday
                      ? "text-[#c8a96e]"
                      : "text-[#5e5a52]"
                  }`}
                >
                  <div className="flex flex-col items-center gap-1.5">
                    {isToday && (
                      <span className="h-1 w-1 rounded-full bg-[#c8a96e] animate-pulse" />
                    )}
                    {day}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.id}
              className={`border-b border-[#c8a96e]/6 transition-colors hover:bg-[#c8a96e]/3 ${
                index === data.length - 1 ? "border-b-0" : ""
              }`}
            >
              {DAYS.map((day) => {
                const key = day.toLowerCase() as DayKey;
                const isToday = day.toLowerCase() === today;
                return (
                  <td
                    key={day}
                    className={`px-3 py-3 align-top ${
                      isToday ? "bg-[#c8a96e]/4" : ""
                    }`}
                  >
                    <SubjectCell subject={row[key]} />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;