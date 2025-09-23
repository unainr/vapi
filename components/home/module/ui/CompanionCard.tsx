import { Button } from '@/components/ui/button'
import { PointerHighlight } from '@/components/ui/pointer-highlight'
import { CompanionCardProps } from '@/types'
import Link from 'next/link'
import React from 'react'

const CompanionCard = ({id, name, subject, teaching_subject, duration, color}: CompanionCardProps) => {
  return (
    <div className="w-full h-full">
      <div
        className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg  transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        style={{ 
          backgroundColor: color,
          backgroundImage: `linear-gradient(135deg, ${color || '#3b82f6'} 0%, ${color ? color + 'dd' : '#2563eb'} 100%)`
        }}
      >
        {/* Floating Badge */}
        <div className="absolute -top-2 -right-2 z-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md">
            <svg className="h-4 w-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        {/* Header Section */}
        <div className="p-6 pb-4">
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-black/15 px-3 py-1 text-xs font-medium text-black">
              {subject}
            </span>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-black leading-tight">
              <PointerHighlight
                rectangleClassName="bg-black/10 border-black/20"
                pointerClassName="text-black h-3 w-3"
                containerClassName="inline-block"
              >
                <span className="relative z-10 text-black">{name}</span>
              </PointerHighlight>
            </h3>
            
            <p className="text-black/70 text-sm leading-relaxed line-clamp-2">
              {teaching_subject}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 px-6 pb-6 flex flex-col">
          {/* Duration Stats */}
          <div className="mb-4 flex-1">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-black/10">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/15">
                <svg className="h-4 w-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <span className="text-lg font-bold text-black">{duration}</span>
                <span className="text-black/60 text-sm ml-1">minutes duration</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-auto">
            <Link href={`/learning-ai/${id}`} className="block w-full ">
              <Button className="w-full hover:bg-violet-500 hover:text-white transition-all duration-100 ease-in-out  rounded-xl bg-black/5 px-6 py-3 font-medium text-black">
                <span className="flex items-center justify-center">
                  <span className="mr-2">Start Learning</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanionCard