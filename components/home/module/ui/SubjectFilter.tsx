"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { subjectOptions } from "@/constants";

const SubjectFilter = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const query = searchParams.get("subject") || "";

	const [subject, setSubject] = useState(query);

	useEffect(() => {
		let newUrl = "";
		if (subject === "all") {
			newUrl = removeKeysFromUrlQuery({
				params: searchParams.toString(),
				keysToRemove: ["subject"],
			});
		} else {
			newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: "subject",
				value: subject,
			});
		}
		router.push(newUrl, { scroll: false });
	}, [subject]);

	return (
		<Select onValueChange={setSubject} value={subject}>
  <SelectTrigger className="w-full md:w-52 capitalize rounded-xl border border-input bg-background px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1">
    <SelectValue placeholder="Subject" />
  </SelectTrigger>
  <SelectContent className="rounded-xl border border-border bg-popover text-sm shadow-lg">
    <SelectItem value="all" className="capitalize">All Subjects</SelectItem>
    {subjectOptions.map(({ value, label }) => (
      <SelectItem key={value} value={value} className="capitalize">
        {label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

	);
};

export default SubjectFilter;
