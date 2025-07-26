import CompanionList from "@/components/CompanionList";
import { getSessionHistory } from "@/lib/actions/create.learning";
import Image from "next/image";
import React from "react";

const RecentSession = async () => {
  const recentSesionCompanions = await getSessionHistory();

  return (
   <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 my-16">
  <h2 className="text-4xl md:text-5xl max-sm:text-3xl text-center font-bold tracking-tight text-foreground mb-10">
    Your Learning  <span className="text-[#845fff]"> Journey</span>
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start py-16">
    {/* Left: Illustration */}
    <div className="flex flex-col gap-6 ">
      <Image
        src="/wise.jpg"
        alt="AI Learning"
        width={600}
        height={400}
        className="rounded-xl object-cover w-full h-auto shadow-md"
      />

      {/* Optional: Motivational Text */}
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-1">
          Keep Learning, Keep Growing
        </h3>
        <p className="text-muted-foreground text-sm">
          Your journey into knowledge continues here. Explore your past sessions or start a new one.
        </p>
      </div>
    </div>

    {/* Right: Session List */}
    <div className="space-y-4">
      <h3 className="text-lg sm:text-xl font-semibold text-foreground">
       Recently Explored Sessions
      </h3>

      {recentSesionCompanions.data?.length === 0 && (
        <p className="text-muted-foreground text-sm">No sessions found.</p>
      )}

      {recentSesionCompanions.data?.slice(0,7).map((companions) =>
        companions && (
          <CompanionList key={companions.session_id} {...companions} />
        )
      )}
    </div>
  </div>
</section>

  );
};

export default RecentSession;
// export const revalidate = 60; 