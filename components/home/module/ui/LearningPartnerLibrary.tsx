// import { fetchLearningPartner } from '@/lib/actions/create.learning';
// import { SearchParams } from '@/types';
// import React from 'react'
// import CompanionCard from './CompanionCard';

// const LearningPartnerLibrary = async ({searchParams}:SearchParams) => {
//   const filters = await searchParams;
//   const subject = filters.subject? filters.subject:'';
//   const teaching_subject = filters.teaching_subject? filters.teaching_subject:'';
//   const companions = await fetchLearningPartner({subject, teaching_subject})
//   console.log(companions);
//   return (
//     <main>
//       <section className='flex justify-between gap-4 max-sm:flex-col'>
//         <h1>Companion Library</h1>
//         <div className='flex gap-4 '>
//           Filters
//         </div>

//         <section>
//           {companions.map((companion)=>(
//             <CompanionCard key={companion.id} {...companion}  />
//           ))}
//         </section>

//       </section>
      
//     </main>
//   )
// }

// export default LearningPartnerLibrary