'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
}

const Pagination = ({ currentPage, totalItems, itemsPerPage }: PaginationProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (newPage === 1) {
      // Remove page parameter when going to page 1
      params.delete('page')
    } else {
      params.set('page', newPage.toString())
    }
    
    const queryString = params.toString()
    router.push(queryString ? `?${queryString}` : window.location.pathname)
  }

  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }

    return pages
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-12 sm:flex-row sm:justify-center">
      {/* Mobile: Page Info at top */}
      <span className="text-sm text-gray-600 dark:text-gray-400 sm:hidden">
        Page {currentPage} of {totalPages}
      </span>

      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          className="h-9 w-9 p-0 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-50 dark:hover:bg-purple-900/20 sm:h-10 sm:w-10"
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>

        {/* Page Numbers - Hidden on small screens, show limited on medium */}
        <div className="hidden xs:flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-2 py-2 text-gray-400 text-sm hidden sm:inline">
                ...
              </span>
            ) : (
              <Button
                key={page}
                onClick={() => handlePageChange(page as number)}
                variant={currentPage === page ? "default" : "outline"}
                className={`h-9 w-9 p-0 rounded-lg text-sm sm:h-10 sm:w-10 ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                    : 'hover:bg-purple-50 dark:hover:bg-purple-900/20'
                } ${
                  // Hide some page numbers on smaller screens
                  page !== currentPage && page !== 1 && page !== totalPages && 'hidden sm:flex'
                }`}
              >
                {page}
              </Button>
            )
          ))}
        </div>

        {/* Mobile: Just show current page number */}
        <div className="flex xs:hidden items-center">
          <Button
            variant="default"
            className="h-9 w-9 p-0 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white pointer-events-none"
          >
            {currentPage}
          </Button>
        </div>

        {/* Next Button */}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          className="h-9 w-9 p-0 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-50 dark:hover:bg-purple-900/20 sm:h-10 sm:w-10"
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>

      {/* Desktop: Page Info on the right */}
      <span className="hidden sm:inline ml-4 text-sm text-gray-600 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  )
}

export default Pagination