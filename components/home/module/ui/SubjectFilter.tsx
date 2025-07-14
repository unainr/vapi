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
			<SelectTrigger className="input capitalize">
				<SelectValue placeholder="Subject" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="all">All subjects</SelectItem>
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
