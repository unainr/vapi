import { PointerHighlight } from '@/components/ui/pointer-highlight'
import { CompanionCardProps } from '@/types'
import Link from 'next/link'
import React from 'react'

const CompanionCard = ({id, name, subject, teaching_subject, duration, color}: CompanionCardProps) => {
  return (
 <div className="w-full h-full">
  <div
    className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800/60 dark:bg-gray-900"
    style={{ 
      backgroundColor: color,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 2px 8px -3px rgba(0, 0, 0, 0.05)'
    }}
  >
    {/* Card Header with Gradient Overlay */}
    <div className="relative overflow-hidden rounded-t-2xl">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent opacity-50"></div>
      <div className="relative px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center text-white rounded-full border border-gray-600/30 bg-black/75 px-3 py-1 text-xs font-medium  backdrop-blur-sm sm:text-sm">
              {subject}
            </span>
          </div>
          <div className="flex h-9 w-9 items-center text-white justify-center rounded-full border border-gray-600/30 bg-black/60 backdrop-blur-sm transition-transform duration-300 hover:rotate-12 sm:h-10 sm:w-10">
            <svg className="h-4.5 w-4.5  sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    {/* Content Section */}
    <div className="flex flex-grow flex-col px-5 pb-5 sm:px-6 sm:pb-6">
      <div className="mb-5 flex-grow sm:mb-6">
        <h3 className="mb-3 text-lg font-bold leading-tight  sm:text-xl">
          <PointerHighlight
          rectangleClassName="bg-blue-100 dark:bg-blue-500//40 border-blue-300 dark:border-blue-700 leading-loose"
            pointerClassName="text-blue-500 h-3 w-3"
            containerClassName="inline-block mx-1"
          >
            <span className="relative z-10 dark:text-black line-clamp-2">{name}</span>
          </PointerHighlight>
        </h3>
        <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-relaxed  dark:text-gray-600 sm:text-base font-semibold
        ">
          {teaching_subject}
        </p>
      </div>

      {/* Stats Row */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:mb-6">
        {/* Duration */}
        <div className="flex items-center justify-between rounded-xl border border-white/20 bg-white/50 p-3 backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-800/50">
          <div className="mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
            <svg className="h-4 w-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{duration} minutes</span>
          </div>
        </div>
        
       
      </div>

      {/* Launch Button */}
      <div className="mt-auto">
        <Link href={`/learning-ai/${id}`} className="block w-full">
          <button className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-3.5 font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 active:scale-[0.98] dark:from-indigo-600 dark:to-purple-600 dark:hover:from-indigo-500 dark:hover:to-purple-500 dark:focus:ring-indigo-500 sm:py-4">
            <span className="relative z-10 flex items-center justify-center">
              <span className="mr-2">Launch Lesson</span>
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
          </button>
        </Link>
      </div>
    </div>
  </div>
</div>


  )
}

export default CompanionCard