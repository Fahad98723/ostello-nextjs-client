import React from 'react'
import Dropdown from '../SearchPages/Dropdown'
import GroupCheckbox from '../SearchPages/GroupCheckbox'
import GroupRadio from '../SearchPages/GroupRadio'
import { GrFormClose } from 'react-icons/gr'

export default function CategorySelect({
  categories,
  className,
  placeholderText,
  isCheckbox,
  isRadio,
  groupTitle,
  dropdownEffect,
  onChange,
}) {
  return (
    <div>
      <Dropdown
        className={className}
        onChange={onChange}
        placeholderText={placeholderText}
      >
        {isCheckbox && (
          <GroupCheckbox
            groupTitle={groupTitle}
            dropdownEffect={dropdownEffect}
            options={categories}
            haveFilter={false}
            onChange={(list) => console.log(list)}
          />
        )}
        {isRadio && <GroupRadio onChange={onChange} options={categories} />}
      </Dropdown>
      {/* <div className='flex flex-wrap'>
        {selected.map((name) => (
          <CategoryTag categoryName={name} removeSelected={removeSelected} />
        ))}
      </div> */}
    </div>
  )
}
const CategoryTag = ({ categoryName, removeSelected }) => {
  return (
    <div className='mr-4 mb-2 w-fit px-4 py-2  font-dm-sans space-x-2 flex border border-light-gray rounded-xl shadow-md bg-primary/10'>
      <p className=''>{categoryName}</p>
      <button
        className='text-lg text-primary'
        onClick={() => removeSelected(categoryName)}
      >
        <GrFormClose color='#7D23E0' className='text-primary' />
      </button>
    </div>
  )
}
