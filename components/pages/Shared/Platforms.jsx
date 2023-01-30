import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  selectSearch,
  setCategory,
  setClass,
  setExam,
  setSkill,
} from '../../redux/slices/SearchSlice'

export default function Platforms() {
  const platforms = [
    {
      name: 'School',
      categories: [
        {
          title: 'Class 5',
          url: '/search',
        },
        {
          title: 'Class 6',
          url: '/search',
        },
        {
          title: 'Class 7',
          url: '/search',
        },
        {
          title: 'Class 8',
          url: '/search',
        },
        {
          title: 'Class 9',
          url: '/search',
        },
        {
          title: 'Class 10',
          url: '/search',
        },
        {
          title: 'Class 11',
          url: '/search',
        },
        {
          title: 'Class 12',
          url: '/search',
        },
      ],
    },
    {
      name: 'Engineering',
      categories: [
        {
          title: 'JEE Main',
          url: '/search',
        },
        {
          title: 'JEE Advanced',
          url: '/search',
        },
        {
          title: 'GATE',
          url: '/search',
        },
        {
          title: 'NATA',
          url: '/search',
        },
        {
          title: 'DUET',
          url: '/search',
        },
        {
          title: 'AMET',
          url: '/search',
        },
        {
          title: 'CIPET JEE',
          url: '/search',
        },
        {
          title: 'IMU CET',
          url: '/search',
        },
      ],
    },
    {
      name: 'Medical',
      categories: [
        {
          title: 'NEET',
          url: '/search',
        },
        {
          title: 'NEET PG',
          url: '/search',
        },
        {
          title: 'AIIMS',
          url: '/search',
        },
        {
          title: 'AIIMS PG',
          url: '/search',
        },
        {
          title: 'PGIMER',
          url: '/search',
        },
        {
          title: 'CMSE',
          url: '/search',
        },
        {
          title: 'NBE FET',
          url: '/search',
        },
      ],
    },
    {
      name: 'Skill Based',
      categories: [
        {
          title: 'Photography',
          url: '/search',
        },
        {
          title: 'Business ',
          url: '/search',
        },
        {
          title: 'IT & Software',
          url: '/search',
        },
        {
          title: 'Design',
          url: '/search',
        },
        {
          title: 'Marketing',
          url: '/search',
        },
        {
          title: 'Development',
          url: '/search',
        },
        {
          title: 'Other Skills',
          url: '/search',
        },
      ],
    },
  ]

  const dispatch = useDispatch()
  const { filters } = useSelector(selectSearch)
  const { classes, exam, skill } = filters
  console.log(classes, 'classes')

  const router = useRouter()

  return (
    <>
      <div className='lg:flex space-x-5 justify-around py-20 px-10 bg-[#F3F5F7] hidden border-[#7178D3]/20 border-l-0 border-r-0 border-2 '>
        {platforms.map((item, i) => (
          <div key={i}>
            <p className='font-bold md:text-2xl text-xl my-5'>{item.name}</p>
            <div className='flex flex-col text-xl'>
              {item.categories.map((category, idx) => (
                <Link prefetch={false}
                  onClick={(e) => {
                    e.preventDefault()
                    let activePlatform = platforms[i].name
                    if (activePlatform === 'School') {
                      dispatch(setCategory('academics'))
                      dispatch(setClass(classes.concat(category.title)))
                    }
                    if (activePlatform === 'Engineering') {
                      dispatch(setCategory('engineering'))
                      dispatch(setExam(exam.concat(category.title)))
                    }
                    if (activePlatform === 'Medical') {
                      dispatch(setCategory('medical'))
                      dispatch(setExam(exam.concat(category.title)))
                    }
                    if (activePlatform === 'Skill Based') {
                      dispatch(setCategory('skill based'))
                      dispatch(setSkill(skill.concat(category.title)))
                    }
                    router.push(category.url)
                  }}
                  to={category.url}
                  className='text-current hover:text-primaryyyyyyyy'
                  key={idx}
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
