import React from 'react'
import dynamic from 'next/dynamic'

const Output = dynamic(
  async () => await (await import('editorjs-react-renderer')).default,
  {
    ssr: false,
  }
)

// All valid JSX inline styles are allowed
const classNames = {
  paragraph: 'text-gray  md:text-lg mt-2',
  header: {
    h1: 'text-blue-500',
  },
  image: {
    img: 'w-full mx-auto ',
    figure: ' w-full mx-auto',
    figcaption: 'text-gray py-2',
  },
  video: {
    video: 'aspect-video',
    figure: '',
    figcaption: '',
  },
  embed: {
    video: '',
    figure: '',
    figcaption: '',
  },
  list: {
    container: 'pl-6 my-4',

    listItem: '',
  },
  checklist: {
    container: '',
    item: '',
    checkbox: '',
    label: '',
  },
  table: {
    table: '',
    tr: '',
    th: '',
    td: '',
  },
  quote: {
    container:
      ' border py-2 border-primary  border-l-4 border-r-0 border-t-0 border-b-0  mt-4  block ',
    content: 'flex item-start  ml-4',
    author:
      "mt-5 text-gray md:text-lg content-['-'] before:w-2  before:h-[1px] before:inline-block before:bg-gray before:mb-1 before:mr-1 text-base",
    message: 'font-bold italic max-w-lg md:text-lg',
  },
  codeBox: {
    container: '',
    code: '',
  },
  warning: {
    container: '',
    icon: '',
    title: '',
    message: '',
  },
  delimiter: {
    container:
      'border-2 border-l-0 border-r-0 border-b-0 block w-full max-w-3xl mx-auto border-gray/10 ',
    svg: '',
    path: '',
  },
  personality: {
    container: '',
    textHolder: '',
    name: '',
    description: '',
    photo: '',
    link: '',
  },
  linkTool: {
    container: '',
    textHolder: '',
    title: '',
    description: '',
    image: '',
    siteName: '',
  },
}

const style = {
  header: {
    h1: {
      padding: '15px 0 ',
    },
  },
}
const config = {
  header: {
    disableDefaultStyle: true,
  },
  image: {
    disableDefaultStyle: true,
  },
  quote: {
    disableDefaultStyle: true,
  },
  paragraph: {
    disableDefaultStyle: true,
  },
}

export default function RenderEditorJS({ data }) {
  return (
    <>
      <section>
        <Output
          data={JSON.parse(data)}
          classNames={classNames}
          config={config}
          style={style}
        />
      </section>
    </>
  )
}
