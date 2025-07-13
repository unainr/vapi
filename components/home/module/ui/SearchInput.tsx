"use client";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
const SearchInput = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const query = searchParams.get("teaching_subject") || "";

	useEffect(() => {
        const delayDebounce = setTimeout(() => {
          if (searchQuery) {
			const newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: "teaching_subject",
				value: searchQuery,
			});
			router.push(newUrl, { scroll: false });
		}
        else{
            if(pathname === '/learning-ai'){
                const newUrl = removeKeysFromUrlQuery({
                    params: searchParams.toString(),
                    keysToRemove:['teaching_subject']
                })
                router.push(newUrl, { scroll: false });
            }
        }
        }, 500);
		
	}, [searchQuery,router,searchParams,pathname]);

	return (
		<div className="relative  rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
			<Input
				placeholder="Search"
				className="outline-none  focus:ring-0 focus:ring-offset-0"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
			/>
		</div>
	);
};

export default SearchInput;
