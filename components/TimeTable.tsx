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

const SUBJECT_COLORS: Record<string, { bg: string; text: string; dot: string; hoverBorder: string; hoverShadow: string }> = {
  "Advanced Databases": {
    bg: "bg-[#c8a96e]/10",
    text: "text-[#c8a96e]",
    dot: "bg-[#c8a96e]",
    hoverBorder: "hover:border-[#c8a96e]/30",
    hoverShadow: "hover:shadow-[#c8a96e]/10",
  },
  "Computer Security and Networking": {
    bg: "bg-[#1d9e75]/10",
    text: "text-[#1d9e75]",
    dot: "bg-[#1d9e75]",
    hoverBorder: "hover:border-[#1d9e75]/30",
    hoverShadow: "hover:shadow-[#1d9e75]/10",
  },
  "Human Computer Interactions": {
    bg: "bg-[#5b8fc9]/10",
    text: "text-[#5b8fc9]",
    dot: "bg-[#5b8fc9]",
    hoverBorder: "hover:border-[#5b8fc9]/30",
    hoverShadow: "hover:shadow-[#5b8fc9]/10",
  },
  "Software Requirements Engineering": {
    bg: "bg-[#b07cc6]/10",
    text: "text-[#b07cc6]",
    dot: "bg-[#b07cc6]",
    hoverBorder: "hover:border-[#b07cc6]/30",
    hoverShadow: "hover:shadow-[#b07cc6]/10",
  },
};

const DEFAULT_COLOR = {
  bg: "bg-[#e8e6e0]/5",
  text: "text-[#e8e6e0]",
  dot: "bg-[#e8e6e0]",
  hoverBorder: "hover:border-[#e8e6e0]/30",
  hoverShadow: "hover:shadow-[#e8e6e0]/10",
};

function SubjectCell({ subject }: { subject: string }) {
  if (!subject) return <div className="min-h-[4rem]" />;
  const color = SUBJECT_COLORS[subject] ?? DEFAULT_COLOR;
  
  return (
    <div
      className={`group relative flex min-h-[4rem] w-full flex-col justify-center rounded-xl border border-transparent px-3 py-2.5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:z-10 bg-gradient-to-br from-transparent to-black/20 ${color.hoverBorder} ${color.hoverShadow} ${color.bg}`}
    >
      {/* Accent Line */}
      <div className={`absolute left-0 top-0 h-full w-1 ${color.dot} opacity-80 transition-transform duration-300 group-hover:scale-y-110`} />
      
      <div className="flex w-full items-start gap-2 pl-1">
        <span className={`text-[11px] lg:text-[13px] font-semibold leading-snug tracking-wide ${color.text} relative z-10 transition-colors duration-300 group-hover:brightness-125`}>
          {subject}
        </span>
      </div>
      
      {/* Ambient background glow on hover */}
      <div className={`pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full opacity-0 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-30 ${color.dot}`} />
    </div>
  );
}

const TimeTable = ({ data }: { data: TimetableRow[] }) => {
  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();

  return (
    <>
      {/* Mobile View (Cards) */}
      <div className="flex flex-col gap-5 lg:hidden p-1">
        {DAYS.map((day) => {
          const key = day.toLowerCase() as DayKey;
          const isToday = day.toLowerCase() === today;

          return (
            <div
              key={day}
              className={`flex flex-col overflow-hidden rounded-2xl border transition-all ${
                isToday
                  ? "border-[#c8a96e]/30 bg-[#c8a96e]/5 shadow-[0_0_20px_rgba(200,169,110,0.05)]"
                  : "border-white/[0.04] bg-[#121110]/50"
              }`}
            >
              {/* Day Header */}
              <div className={`relative flex items-center justify-between border-b border-white/[0.04] px-5 py-3.5 ${isToday ? "bg-[#c8a96e]/10" : ""}`}>
                {isToday && (
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8a96e]/50 to-transparent" />
                )}
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold uppercase tracking-[0.2em] ${
                      isToday ? "text-[#c8a96e]" : "text-[#8a857a]"
                    }`}
                  >
                    {day}
                  </span>
                  {isToday && (
                    <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-[#c8a96e]" />
                  )}
                </div>
                {isToday && (
                  <span className="rounded-full bg-[#c8a96e]/20 px-2.5 py-0.5 text-[9px] font-bold tracking-widest text-[#c8a96e]">
                    TODAY
                  </span>
                )}
              </div>

              {/* Day Entries */}
              <div className="flex flex-col gap-2.5 p-3.5">
                {data.map((row) => (
                  <SubjectCell key={row.id} subject={row[key]} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop View (Table) */}
      <div className="hidden w-full rounded-xl bg-[#0f0e0c]/50 lg:block">
        <table className="w-full min-w-[800px] xl:min-w-[1000px] border-collapse text-sm">
          {/* Header */}
          <thead>
            <tr>
              {DAYS.map((day) => {
                const isToday = day.toLowerCase() === today;
                return (
                  <th
                    key={day}
                    className={`relative border-b border-white/[0.04] px-2 lg:px-4 py-4 lg:py-5 text-center transition-colors ${
                      isToday ? "bg-white/[0.02]" : ""
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {isToday && (
                        <span className="absolute top-0 h-px w-16 bg-gradient-to-r from-transparent via-[#c8a96e] to-transparent" />
                      )}
                      <span className={`text-[11px] font-bold uppercase tracking-[0.15em] ${
                        isToday ? "text-[#c8a96e]" : "text-[#6a655c]"
                      }`}>
                        {day}
                      </span>
                      {isToday && (
                        <span className="mt-1 h-1 w-1 animate-pulse rounded-full bg-[#c8a96e]" />
                      )}
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
                className={`group/row transition-colors ${
                  index === data.length - 1 ? "" : "border-b border-white/[0.02]"
                }`}
              >
                {DAYS.map((day) => {
                  const key = day.toLowerCase() as DayKey;
                  const isToday = day.toLowerCase() === today;
                  return (
                    <td
                      key={day}
                      className={`relative p-2 lg:p-3 align-top transition-colors ${
                        isToday ? "bg-white/[0.015]" : "group-hover/row:bg-white/[0.005]"
                      }`}
                    >
                      {/* Today Column Highlight Line */}
                      {isToday && (
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-[#c8a96e]/10 via-[#c8a96e]/5 to-transparent" />
                      )}
                      {isToday && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-[#c8a96e]/10 via-[#c8a96e]/5 to-transparent" />
                      )}
                      <SubjectCell subject={row[key]} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TimeTable;