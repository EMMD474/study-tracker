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
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-12 sm:px-12">
      {/* Header */}
      <div className="mb-10">
        <p className="mb-2 text-xs font-medium tracking-widest text-[#5e5a52] uppercase">
          Academic Schedule
        </p>
        <h1 className="text-3xl font-light tracking-[-0.025em] text-[#e8e6e0]">
          Study Timetable
        </h1>
        <div className="mt-4 h-px w-12 bg-[#c8a96e]/40" />
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap gap-3">
        {[
          { label: "Advanced Databases", color: "bg-[#c8a96e]" },
          { label: "Computer Security and Networking", color: "bg-[#1d9e75]" },
          { label: "Human Computer Interactions", color: "bg-[#5b8fc9]" },
          { label: "Software Requirements Engineering", color: "bg-[#b07cc6]" },
        ].map((item) => (
          <div
            key={item.label}
            className="inline-flex items-center gap-2 rounded-full border border-[#c8a96e]/10 bg-[#0f0e0c] px-3 py-1.5"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
            <span className="text-xs text-[#7a7060]">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <TimeTable data={timeTableData} />

      {/* Footer note */}
      <p className="mt-5 text-xs text-[#3a3830]">
        Today&apos;s column is highlighted. Schedule repeats weekly.
      </p>
    </div>
  );
};

export default TimetablePage;