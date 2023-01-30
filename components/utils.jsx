export const titleToUrl = (title) =>
  title?.trim().toLowerCase().replaceAll(' ', '-').replaceAll('/', '-or-')
export const urlToTitle = (title) =>
  capitalizeFirstLetter(title).replaceAll('-', ' ')

export const hasMin8 = (value) => value.length >= 8
export const hasUppercase = (value) => /[A-Z]/.test(value)
export const hasSpecialChar = (value) =>
  // eslint-disable-next-line no-useless-escape
  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
export const hasNumber = (value) => /[0-9]/.test(value)

export const isEmptyObj = (obj) => Object?.keys(obj)?.length === 0

export const phoneNumberToNumber = (phoneNumber) =>
  parseInt(phoneNumber.replace(/\s/g, ''))

export const capitalizeFirstLetter = (
  [first, ...rest],
  locale = navigator?.language
) => first?.toLocaleUpperCase(locale) + rest.join('');

export const capitalizeFirst  = str => str.replace(/(^\w|\s\w)(\S*)/g, (_,m1,m2) => m1.toUpperCase()+m2.toLowerCase());

export const appHost =
  typeof window !== 'undefined' &&
  typeof window !== 'undefined' &&
  window.location.origin
    ? typeof window !== 'undefined' && window.location.origin
    : ''

export const headers = {
  'Access-Control-Allow-Origin': '*',
  Authorization: `Bearer ${
    typeof window !== 'undefined' &&
    typeof window !== 'undefined' &&
    window.localStorage.getItem('ACCESS_TOKEN')
  }`,
}

export const isEmpty = (value) => {
  if (typeof value === 'number' && value !== 0) {
    return false
  }
  return (
    value === null ||
    value === '' ||
    value === undefined ||
    value === 0 ||
    value?.length === 0 ||
    isEmptyObj(value)
  )
}

export const FilterImagesAndVideos = ({ filesArray, setImages, setVideos }) => {
  Object.values(filesArray).forEach((item) => {
    if (item.type.toLowerCase().includes('video')) {
      console.log('Its a video')
      setVideos((prev) => (!isEmpty(prev) ? [...prev, item] : [item]))
    }
    if (item.type.toLowerCase().includes('image')) {
      console.log('its an image')
      setImages((prev) => (!isEmpty(prev) ? [...prev, item] : [item]))
    }
  })
}

export const extractISOString = (string) => {
  const d = new Date(string?.slice(0, -1))
  const [day, month, date, year, time] = [
    d.getDay(),
    d.getMonth(),
    d.getDate(),
    d.getFullYear(),
    d.getTime(),
  ]
  return {
    day,
    month,
    date,
    year,
    time,
    formatted: d,
  }
}
