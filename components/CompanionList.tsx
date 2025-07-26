"use client";

import { getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface CompanionListProps {
  id?: string;
  name?: string | null;
  subject?: string | null;
  teaching_subject?: string | null;
  voice_type?: string | null;
  speaking_style?: string | null;
  duration?: number | null;
  author?: string | null;
}

const CompanionList = ({
  id,
  name,
  subject,
  teaching_subject,
  duration,
}: CompanionListProps) => {
  const bgColor = getSubjectColor(subject || "default");

  return (
    <Link href={`/learning-ai/${id}`} className="block">
      <div className="group w-full rounded-2xl border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-start justify-between gap-4">
          {/* Left: Avatar and Info */}
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className="w-14 h-14 flex items-center justify-center rounded-full font-semibold text-lg text-white shadow-md ring-2 ring-muted/20"
              style={{ backgroundColor: bgColor }}
            >
              {name?.charAt(0).toUpperCase() || "?"}
            </div>

            {/* Name and teaching subject */}
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {name}
              </p>
              <p className="text-sm text-muted-foreground leading-snug">
                {teaching_subject}
              </p>
            </div>
          </div>

          {/* Right: Badge + Duration */}
          <div className="flex flex-col items-end gap-1 min-w-[80px]">
            <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full">
              {subject}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {duration} mins
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CompanionList;
