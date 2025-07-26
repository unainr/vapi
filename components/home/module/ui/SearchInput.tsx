"use client";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { Search } from "lucide-react";
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
		<div className="relative flex items-center gap-2 w-full rounded-xl border border-input bg-background px-4 py-2 shadow-sm">
  <Search className="h-4 w-4 text-muted-foreground" />
  <Input
    placeholder="Search companions..."
    className="border-none bg-transparent p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>

	);
};

export default SearchInput;
