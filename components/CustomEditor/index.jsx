import React, { useEffect, useState, useRef } from 'react'
import _ from 'lodash/debounce'
import { isJsonParsable } from '../../utils/utils'
import { Tools } from './editor_tools'
import EditorJS from '@editorjs/editorjs'

// const EditorJS = dynamic(() => import('@editorjs/editorjs'), { ssr: false })

export default function CustomEditor({
  className,
  data,
  onChange = () => {},
  usingFor = 'add',
}) {
  const editorRef = useRef(null)

  useEffect(() => {
    if (usingFor === 'edit') {
      data?.length > 0 && initEditor()
    } else {
      initEditor()
    }
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy()
        editorRef.current = null
      }
    }
  }, [data, usingFor])

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editor_js',
      onReady: () => {
        editorRef.current = editor
      },
      onChange: _(function () {
        try {
          handleContents()
        } catch (err) {
          console.log(err)
        }
      }, 500),
      data: isJsonParsable(data) && JSON.parse(data),
      autofocus: true,
      placeholder: 'Start writing from here !',
      tools: Tools,
    })
    async function handleContents() {
      const output = await editor.save()
      const content = JSON.stringify(output)
      onChange(content)
    }
  }

  return (
    <>
      <div id='editor_js' className={` p-5 ${className}`} />
    </>
  )
}

const DATA = {
  time: 1660737970039,
  blocks: [
    { id: 'QNc_-xrTBj', type: 'header', data: { text: 'Intro', level: 1 } },
    {
      id: 'LZA14A2sVq',
      type: 'paragraph',
      data: { text: 'I am showing how to write blog with elementor' },
    },
    {
      id: '2OHsJiGSwI',
      type: 'list',
      data: {
        style: 'ordered',
        items: [
          'Firstly you have to press <b>TAB </b>from your keyboard and you will see the element. Those are the tools you have to use.',
        ],
      },
    },
    {
      id: 'XKm6SYK7JT',
      type: 'image',
      data: {
        file: {
          url: 'https://ostellomedias3.s3.ap-south-1.amazonaws.com/1660735960187.webp',
          key: '1660735960187.webp',
        },
        caption: 'Toolbar for pressing TAB',
        withBorder: false,
        stretched: false,
        withBackground: false,
      },
    },
    { id: 'treKOr6sha', type: 'list', data: { style: 'ordered', items: [] } },
    {
      id: 'SbGWBPNGJG',
      type: 'image',
      data: {
        file: {
          url: 'https://ostellomedias3.s3.ap-south-1.amazonaws.com/1660736136218.webp',
          key: '1660736136218.webp',
        },
        caption: 'tools',
        withBorder: false,
        stretched: false,
        withBackground: false,
      },
    },
    { id: 'plTrhw2gGd', type: 'header', data: { text: 'Text', level: 1 } },
    {
      id: 'c5PsarWXoW',
      type: 'paragraph',
      data: {
        text: "Text for writing paragraph. It doesn't required to select any tool for that",
      },
    },
    { id: 'hm-EzR62Ja', type: 'paragraph', data: { text: 'Example:' } },
    {
      id: 'b9ycL5XtU-',
      type: 'paragraph',
      data: { text: 'This is a paragraph' },
    },
    { id: 'FgTWOA7t4J', type: 'header', data: { text: 'Heading', level: 1 } },
    {
      id: 'B481n_ANc4',
      type: 'paragraph',
      data: { text: 'Heading for writting title of section&nbsp;' },
    },
    { id: 'vB3D4d5SL_', type: 'paragraph', data: { text: 'Example:' } },
    {
      id: 'F4nPeGC4AB',
      type: 'header',
      data: { text: 'This is a Heading', level: 1 },
    },
    { id: 'rkEqoWd95q', type: 'header', data: { text: 'Breakline', level: 1 } },
    {
      id: 'Bi8yDbQNxV',
      type: 'paragraph',
      data: { text: 'To give linebreak' },
    },
    { id: 'PrmHhyZu0v', type: 'paragraph', data: { text: 'Example:' } },
    { id: 'BkhSs60EOH', type: 'breakLine', data: { divider: false } },
    { id: 'XlasTzzkDv', type: 'header', data: { text: 'Image', level: 1 } },
    {
      id: '4LmMpaIKnq',
      type: 'paragraph',
      data: {
        text: 'Image tools are used for adding images. Click on it and upload an image and you can adjust the size using inline tools, just press the <b>TAB </b>button.',
      },
    },
    { id: 'hbHXwqRRBl', type: 'paragraph', data: { text: 'Example:' } },
    {
      id: 'oDie0CE6xQ',
      type: 'image',
      data: {
        file: {
          url: 'https://ostellomedias3.s3.ap-south-1.amazonaws.com/1660736577916.webp',
          key: '1660736577916.webp',
        },
        caption: 'This is the caption of this image.',
        withBorder: false,
        stretched: false,
        withBackground: false,
      },
    },
    { id: '-CW0NFVEie', type: 'header', data: { text: 'List', level: 1 } },
    {
      id: 'he8C1tC-WC',
      type: 'paragraph',
      data: {
        text: 'The list is used for the list item, here available on both ordered and unordered lists.',
      },
    },
    { id: 'Bj_FZd-veX', type: 'paragraph', data: { text: '<b>Example :</b>' } },
    { id: '-9G6YzhNlF', type: 'paragraph', data: { text: '1. Ordered List' } },
    {
      id: '3PgJeguypy',
      type: 'list',
      data: { style: 'ordered', items: ['Albi', 'Ummid', 'Tanvir'] },
    },
    {
      id: '3kJsAhE1kN',
      type: 'paragraph',
      data: { text: '2. Unordered List&nbsp;' },
    },
    {
      id: 'PkmnlCSwHp',
      type: 'list',
      data: { style: 'unordered', items: ['Ostello', 'India', 'Bangladesh'] },
    },
    { id: 'r0pR5pQLYr', type: 'breakLine', data: { divider: false } },
    { id: 'W8hKE52bya', type: 'header', data: { text: 'Quote', level: 1 } },
    {
      id: 'g7-S658yPi',
      type: 'paragraph',
      data: {
        text: 'The quote is a tool to write quote and it will render a beautiful design',
      },
    },
    { id: '49SDxNqCy1', type: 'paragraph', data: { text: '<b>Example</b>' } },
    {
      id: 'OO8lsC-QK1',
      type: 'quote',
      data: {
        text: "This is a quote and it will render a quote with the author's name",
        caption: 'Author Name',
        alignment: 'left',
      },
    },
    {
      id: 'xZDXMgy21A',
      type: 'header',
      data: { text: 'Some Inline Style', level: 1 },
    },
    { id: '3fUsfuHcIG', type: 'paragraph', data: { text: '1. <b>Bold</b>' } },
    { id: '-o1cj_nqq9', type: 'paragraph', data: { text: '2.<i>Italic</i>' } },
    {
      id: 'gfDU8TMx8H',
      type: 'paragraph',
      data: { text: '3. <a href="https://albi.netlify.app">Link</a>' },
    },
    {
      id: '4vGE-Gczg_',
      type: 'paragraph',
      data: {
        text: '4.<editorjs-style style="" class="text-[#FF0000]-500 px-2 border ">style</editorjs-style>',
      },
    },
    {
      id: 'Lc6ZZPCm_w',
      type: 'paragraph',
      data: {
        text: '5.<mark class="cdx-marker"><span class="cdx-tooltip" data-tooltip="This is a little tooltip to show little information">Tooltip</span></mark>',
      },
    },
    {
      id: '3SdzgEj02y',
      type: 'paragraph',
      data: { text: '6.<mark class="cdx-marker">Marker</mark>' },
    },
    {
      id: '-jinbxdCn7',
      type: 'paragraph',
      data: {
        text: '7.InlineCode - <code class="inline-code">&lt;h1&gt; This is me ! &lt;h1&gt;</code>',
      },
    },
    {
      id: 'DtuTwGOX6L',
      type: 'header',
      data: { text: 'Conclusion', level: 1 },
    },
    {
      id: 'AYXpLxRwFE',
      type: 'paragraph',
      data: {
        text: 'This is nothing but a text editor . You have to follow some rules then you&nbsp; will be used to on in.',
      },
    },
  ],
  version: '2.25.0',
}
