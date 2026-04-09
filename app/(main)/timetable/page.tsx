import TimeTable from "@/components/TimeTable";
import React from "react";

const timeTableData = [
  {
    id: 1,
    sunday: "Advanced Databases",
    monday: "Computer Security and Networking",
    tuesday: "Human Computer Interactions",
    wednesday: "Software Requirements Engineering",
    thursday: "Advanced Databases",
    friday: "Computer Security and Networking",
    saturday: "Human Computer Interactions",
  },
  {
    id: 2,
    sunday: "Software Requirements Engineering",
    monday: "Advanced Databases",
    tuesday: "Computer Security and Networking",
    wednesday: "Human Computer Interactions",
    thursday: "Software Requirements Engineering",
    friday: "Advanced Databases",
    saturday: "Computer Security and Networking",
  },
];

const TimetablePage = () => {
  return (
    <div className="relative min-h-0 flex-1 overflow-x-hidden bg-[#0a0a0a] px-6 py-12 sm:px-12 lg:px-20 lg:py-16 selection:bg-[#c8a96e]/30">
      {/* Ambient Background Effects */}
      <div className="pointer-events-none absolute -left-[10%] -top-[20%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#c8a96e]/[0.035] to-transparent blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-[20%] -right-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-tl from-[#5b8fc9]/[0.035] to-transparent blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1300px]">
        {/* Header Section */}
        <div className="mb-14 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-[#c8a96e]" />
              <p className="text-[10px] font-bold tracking-[0.25em] text-[#8a857a] uppercase">
                Academic Schedule
              </p>
            </div>
            <h1 className="text-4xl font-light tracking-tight text-[#f4f2ec] sm:text-5xl">
              Study Timetable
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-[#7a756b]">
              Your structured weekly plan for mastering core subjects. Stick to the 
              routine to build consistency and easily track your study goals.
            </p>
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap gap-3 xl:max-w-[450px] xl:justify-end">
            {[
              { label: "Advanced Databases", color: "bg-[#c8a96e]" },
              { label: "Computer Security", color: "bg-[#1d9e75]" },
              { label: "Human Computer Interactions", color: "bg-[#5b8fc9]" },
              { label: "Software Eng", color: "bg-[#b07cc6]" },
            ].map((item) => (
              <div
                key={item.label}
                className="group flex cursor-default items-center gap-2.5 rounded-full border border-white/[0.04] bg-white/[0.015] px-3.5 py-1.5 backdrop-blur-md transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.03] hover:shadow-lg hover:shadow-black/20"
              >
                <div className="relative flex h-2 w-2 items-center justify-center">
                  <span className={`absolute h-full w-full rounded-full ${item.color} opacity-40 blur-[2px] transition-all group-hover:opacity-80 group-hover:scale-150`} />
                  <span className={`relative h-1.5 w-1.5 rounded-full ${item.color}`} />
                </div>
                <span className="text-[11px] font-medium tracking-wider text-[#8a857a] transition-colors group-hover:text-[#d4d0c6]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Table Container Glow Wrap */}
        <div className="relative rounded-2xl border border-white/[0.04] bg-[#0d0c0b]/80 p-2 shadow-2xl backdrop-blur-xl">
          {/* Top highlight glare */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
          
          <TimeTable data={timeTableData} />
        </div>

        {/* Footer actions */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/[0.03] pt-6">
          <p className="flex items-center gap-2.5 text-xs text-[#6a655c]">
            <svg className="h-4 w-4 text-[#c8a96e]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Schedule repeats weekly. Today's column is automatically highlighted.
          </p>
          <button className="group flex items-center gap-2 text-[11px] font-bold tracking-widest text-[#8a857a] uppercase transition-colors hover:text-[#c8a96e]">
            Export Calendar
            <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimetablePage;