import React from 'react'

const AiLearning =  async({params}:{params:Promise<{id:string}>}) => {
const {id} = await params
    return (
    <div>{id}</div>
  )
}

export default AiLearning