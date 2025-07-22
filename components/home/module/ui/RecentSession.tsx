import CompanionList from '@/components/CompanionList'
import { getSessionHistory } from '@/lib/actions/create.learning'
import React from 'react'

const RecentSession = async () => {
        const recentSesionCompanions = await getSessionHistory()
        
  return (
    <div>
        {recentSesionCompanions.data?.map((companions => (
 companions&& <CompanionList key={companions.id} {...companions} />
)))}

    </div>
    
  )
}

export default RecentSession