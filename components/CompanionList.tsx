import Image from "next/image";
import { getSubjectColor } from "@/lib/utils"; // You already use this for subject color
import React from "react";

interface CompanionListProps {
  name?: string | null;
  subject?: string | null;
  teaching_subject?: string | null;
  voice_type?: string | null;
  speaking_style?: string | null;
  duration?: number | null;
  author?: string | null;
}

const CompanionList = ({
  name,
  subject,
  teaching_subject,
  duration,
}: CompanionListProps) => {
  const bgColor = getSubjectColor(subject || "default");

  return (
    <div className="flex items-center justify-between w-full p-4 rounded-xl border bg-muted/40">
      {/* Left side: Icon + text */}
      <div className="flex items-center gap-4">
        {/* Icon container */}
        <div
          className="w-14 h-14 flex items-center justify-center rounded-lg"
          style={{ backgroundColor: bgColor }}
        >
          {name?.charAt(0) || "?"}
        </div>

        {/* Name and teaching subject */}
        <div className="flex flex-col">
          <p className="font-semibold text-lg leading-tight">{name}</p>
          <p className="text-muted-foreground text-sm leading-tight">
            {teaching_subject}
          </p>
        </div>
      </div>

      {/* Right side: subject badge + duration */}
      <div className="flex items-center gap-4">
        <div className="text-xs bg-black text-white px-3 py-1 rounded-full">
          {subject}
        </div>
        <p className="text-sm font-medium text-right">{duration} mins</p>
      </div>
    </div>
  );
};

export default CompanionList;
