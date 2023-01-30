import { Breadcrumb } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Container from './layout/Container'
import { capitalizeFirstLetter } from './utils'

const PageBreadcrumb = () => {
  const router = useRouter()
  const { category, query } = router.query
  let breadcrumbNameMap = {
    '/': 'Home',
    '/search': 'Search',
  }
  breadcrumbNameMap[`/search/${category}`] =
    category && capitalizeFirstLetter(category)
  // breadcrumbNameMap[`/search/${category}/${query}`] =
  //   query && capitalizeFirstLetter(query)

  const pathSnippets = router.pathname.split('/').filter((i) => i)

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`

    return (
      <Breadcrumb.Item key={url}>
        <Link prefetch={false} className='text-gray' href={url}>
          {breadcrumbNameMap[url]}
        </Link>
      </Breadcrumb.Item>
    )
  })
  const breadcrumbItems = [
    <Breadcrumb.Item key='home'>
      <Link prefetch={false} className='text-solid' href='/'>
        Home
      </Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems)

  return (
    <div className='p-2 px-10'>
      <Breadcrumb>{breadcrumbItems}</Breadcrumb>
    </div>
  )
}

export default PageBreadcrumb
