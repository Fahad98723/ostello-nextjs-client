import { CloseOutlined, LeftCircleFilled } from '@ant-design/icons'
import { Divider } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import { Data, skills } from './Data'
import Dropdown from './Dropdown'
import GroupCheckbox from './GroupCheckbox'
import GroupRadio from './GroupRadio'
import PriceSlider from './PriceSlider'
import RatingSlider from './RatingSlider'
import SkillCard from './SkillCard'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearFilters,
  selectSearch,
  setBoard,
  setCategory,
  setClass,
  setClassType,
  setDuration,
  setExam,
  setSubjects,
  setFilteredCourses,
  setMode,
  setPrice,
  setRating,
  setSkill,
  setSortBy,
} from '../../../redux/slices/SearchSlice'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import { isEmpty, isJsonParsable } from '../../../utils/utils'
import {
  fetchInstitutes,
  institutesSelector,
} from '../../../redux/slices/instituteSlice'
import { fetchCourses, selectCourse } from '../../../redux/slices/courseSlice'
import SubjectGroupCheckbox from './SubjectGroupCheckBox'

export default function FilterBar() {
  const dispatch = useDispatch()

  const [subject1, setSubject1] = useState('')

  const [active, setActive] = useState('')
  const { selectedInstituteName, filters } = useSelector(selectSearch)
  const { courses } = useSelector(selectCourse)
  const { institutes } = useSelector(institutesSelector)
  const [courseData, setCourseData] = useState([])

  useEffect(() => {
    isEmpty(courses) && dispatch(fetchCourses())
    isEmpty(institutes) && dispatch(fetchInstitutes())
  }, [])

  console.log(selectedInstituteName)

  useEffect(() => {
    if (!isEmpty(courses)) {
      if (!selectedInstituteName) {
        let parsedCourses = courses?.map((item) => {
          return {
            ...item,
            category: item.category,
          }
        })
        setCourseData(parsedCourses)
        dispatch(setFilteredCourses(parsedCourses))
      }
      if (selectedInstituteName) {
        let parsedCourses = courses?.filter(
          (item) => item.institute.name === selectedInstituteName
        )
        courses.forEach((element) => {
          console.log(element)
        })
        setCourseData(parsedCourses)
        dispatch(setFilteredCourses(parsedCourses))
      }
    }
  }, [courses, selectedInstituteName])

  let {
    classType,
    category,
    duration,
    sortBy,
    rating,
    price,
    classes,
    subjects,
    board,
    exam,
    skill,
  } = filters

  const ApplyFilters = () => {
    if (isEmpty(courseData)) {
      return
    }

    let updatedData = courseData

    console.log(updatedData, category)
    // If category changed >>
    if (!isEmpty(category)) {
      updatedData = updatedData.filter((item) => {
        // console.log( ,  );
        return item.category.name.toLowerCase() === category.toLowerCase()
      })
    }
    // If rating changed
    if (!isEmpty(rating)) {
      updatedData = updatedData.filter((item) => item.rating <= rating)
    }

    if (!isEmpty(classType)) {
      let classTypeCode =
        classType === 'Online' ? 1 : classType === 'Offline' ? 2 : 3
      updatedData = updatedData.filter(
        (item) => item?.classtype === classTypeCode
      )
    }

    //if duration changed

    if (!isEmpty(duration)) {
      console.log(updatedData)
      updatedData = updatedData.filter(
        (item) => item.duration.split(',')[2] <= duration
      )
      // updatedData = updatedData.filter((item) => item.rating <= rating)
    }
    // If price changed
    if (!isEmpty(price)) {
      const minPrice = price[0]
      const maxPrice = price[1]

      console.log(price)
      updatedData = updatedData.filter(
        (item) =>
          item.effectiveprice >= minPrice && item.effectiveprice <= maxPrice
      )
    }

    // If class changed
    if (!isEmpty(classes)) {
      updatedData = updatedData.filter((item) => {
        return !isEmpty(
          item?.category?.classes?.find((innerItem) =>
            classes.find((innerItem1) => innerItem1.includes(innerItem))
          )
        )
      })

      console.log(updatedData, classes)
    }
    if (!isEmpty(exam)) {
      updatedData = updatedData.filter((item) => {
        return !isEmpty(
          item?.category?.exams?.find((innerItem) => exam?.includes(innerItem))
        )
      })
    }

    // if (!isEmpty(subjects)) {
    //   updatedData = updatedData.filter(
    //     (item) =>
    //       !isEmpty(
    //         item?.category?.subjects?.find((innerItem) =>
    //           subjects.find((innerItem1) => innerItem1.includes(innerItem))
    //         )
    //       )
    //   )
    //   console.log(subjects, updatedData);
    // }

    if (!isEmpty(subjects)) {
      updatedData = updatedData.filter(
        (item) =>
          !isEmpty(
            item?.category?.subjects?.find((innerItem) =>
              subjects.find((innerItem1) => innerItem1.includes(innerItem))
            )
          )
      )
    }

    if (!isEmpty(board)) {
      updatedData = updatedData?.filter(
        (item) =>
          !isEmpty(
            item?.category?.boards?.find((innerItem) =>
              board.includes(innerItem)
            )
          )
      )
    }
    if (!isEmpty(sortBy)) {
      if (sortBy === 'Newest') {
        updatedData = updatedData
          ?.map((item) => {
            console.log(item?.category)
            return {
              ...item,
              category: item.category,
            }
          })
          .reverse()
      }

      console.log(updatedData)
    }
    dispatch(setFilteredCourses(updatedData))
  }
  useEffect(() => {
    if (!isEmpty(courseData)) {
      ApplyFilters()
    }
  }, [filters, courseData])

  let activeCategory = filters.category || 'Category'

  console.log(activeCategory, 'activeCategory..')
  console.log(sortBy, 'filter category..')
  return (
    <div className='px-10'>
      <>
        <>
          <div className='flex items-center overflow-x-scroll no-scrollbar  select-none '>
            <>
              <Dropdown
                isSelectOption={true}
                className={''}
                onChange={(e) => {
                  dispatch(clearFilters(courseData))
                  dispatch(setCategory(e))
                }}
                placeholderText={filters?.category || 'Category'}
                primaryVariant={true}
                options={Data.categories}
              />
            </>

            <Divider type='vertical ' className=' bg-gray h-8' />

            {activeCategory === 'academics' && (
              <>
                <>
                  <Dropdown placeholderText={'Class'}>
                    <GroupCheckbox
                      checkedState={classes}
                      onChange={(v) => dispatch(setClass(v))}
                      options={Data.classNames}
                    />
                  </Dropdown>
                </>

                <>
                  <Dropdown placeholderText={'Subjects'}>
                    <div className=' p-4 rounded-md mb-5 '>
                      <div className='flex '>
                        {Data.subjects.slice(0, 2).map((item, i) => (
                          <SubjectGroupCheckbox
                            key={i}
                            groupTitle={item.subjectType}
                            dropdownEffect={false}
                            options={item.subjectList}
                            onChange={(v) => dispatch(setSubjects(v))}
                          />
                        ))}
                      </div>
                      <Divider type='horizontal' />
                      <div className='flex '>
                        {Data.subjects.slice(2, 4).map((item, i) => (
                          <SubjectGroupCheckbox
                            key={i}
                            groupTitle={item.subjectType}
                            dropdownEffect={false}
                            options={item.subjectList}
                            onChange={(v) => dispatch(setSubjects(v))}
                          />
                        ))}
                      </div>
                      <Divider type='horizontal' />
                      <div className='flex '>
                        {Data.subjects.slice(4, 6).map((item, i) => (
                          <SubjectGroupCheckbox
                            key={i}
                            groupTitle={item.subjectType}
                            dropdownEffect={false}
                            options={item.subjectList}
                            onChange={(v) => dispatch(setSubjects(v))}
                          />
                        ))}
                      </div>
                    </div>
                  </Dropdown>{' '}
                </>
                <>
                  <Dropdown placeholderText={'Board'}>
                    <GroupRadio
                      onChange={(e) => dispatch(setBoard(e))}
                      options={Data.board}
                    />
                  </Dropdown>
                </>
              </>
            )}
            {activeCategory === 'engineering' && (
              <>
                <>
                  <Dropdown placeholderText={'Exam'}>
                    <GroupCheckbox
                      checkedState={exam}
                      onChange={(v) => dispatch(setExam(v))}
                      options={Data.engineeringExam}
                    />
                  </Dropdown>
                </>
              </>
            )}
            {activeCategory === 'medical' && (
              <>
                <>
                  <Dropdown placeholderText={'Exam'}>
                    <GroupCheckbox
                      checkedState={exam}
                      onChange={(v) => dispatch(setExam(v))}
                      options={Data.medicalExam}
                    />
                  </Dropdown>
                </>
              </>
            )}
            <>
              <Dropdown placeholderText={'Class Type'}>
                <GroupRadio
                  onChange={(e) => dispatch(setClassType(e))}
                  options={Data.mode}
                />
              </Dropdown>
            </>
            <>
              <Dropdown placeholderText={'Duration'}>
                <GroupRadio
                  onChange={(e) => {
                    if (e === '1-3 months') {
                      dispatch(setDuration(90))
                    }
                    if (e === '3-6 months') {
                      dispatch(setDuration(180))
                    }
                    if (e === '6-12 months') {
                      dispatch(setDuration(360))
                    }
                    if (e === '1 year +') {
                      dispatch(setDuration(361))
                    }
                    if (e === null) {
                      dispatch(setDuration(null))
                    }
                  }}
                  options={Data.duration}
                />
              </Dropdown>
            </>

            <>
              <Dropdown placeholderText={'Sort By'}>
                <GroupRadio
                  onChange={(e) => dispatch(setSortBy(e))}
                  options={Data.sortBy}
                />
              </Dropdown>
            </>
            <>
              <Dropdown placeholderText={'Rating'}>
                <RatingSlider
                  onChange={(e) => {
                    dispatch(setRating(e))
                  }}
                />
              </Dropdown>
            </>
            <>
              <Dropdown placeholderText={'Price'}>
                <PriceSlider onChange={(e) => dispatch(setPrice(e))} />
              </Dropdown>
            </>
            <Dropdown placeholderText={'Offers'} />

            <CloseOutlined
              onClick={() => dispatch(clearFilters({ courses, institutes }))}
              className='flex sm:text-xl mx-5 text-primary cursor-pointer rounded-full ring-1 p-1 ring-primary hover:bg-primary hover:text-white '
            />
          </div>
        </>
      </>

      {activeCategory === 'other-skills' && (
        <Splide
          options={{
            arrows: false,
            pagination: false,
            perPage: 10,
            // perMove: 1,
            // type: 'loop',
            breakpoints: {
              550: {
                perPage: 3,
              },
              700: {
                perPage: 4,
              },
              900: {
                perPage: 5,
              },
              1200: {
                perPage: 7,
              },
              1400: {
                perPage: 6,
              },
            },
            // speed: 100,
            interval: 1000,
            pauseOnFocus: true,
            autoplay: false,
            pauseOnHover: false,
            resetProgress: false,
          }}
        >
          {skills.map((item, i) => (
            <SplideSlide key={i} className='mr-20'>
              <SkillCard
                onClick={() => {
                  setActive((prv) => (prv === item.title ? '' : item.title))
                  dispatch(setSkill(active))
                }}
                isActive={active === item.title}
                {...item}
              />
            </SplideSlide>
          ))}
        </Splide>
      )}
    </div>
  )
}
