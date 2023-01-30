import React from 'react'
import Card from './card'

function SearchList({ filteredItems }) {
  console.log(filteredItems, 'items...')
  return (
    <div>
      {filteredItems.map((item, index) => (
        <Card key={index} currentValue={item} />
      ))}
    </div>
  )
}

export default SearchList
