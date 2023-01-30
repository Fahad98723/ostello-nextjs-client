import ImageTool from '@editorjs/image'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Checklist from '@editorjs/checklist'
import Quote from '@editorjs/quote'
import CodeTool from '@editorjs/code'
import Table from '@editorjs/table'
import LinkTool from '@editorjs/link'
import Delimiter from '@editorjs/delimiter'
import RawTool from '@editorjs/raw'
import Warning from '@editorjs/warning'
import { StyleInlineTool } from 'editorjs-style'
import Tooltip from 'editorjs-tooltip'
import Marker from '@editorjs/marker'
import InlineCode from '@editorjs/inline-code'
import Embed from '@editorjs/embed'
import { SocketFileUploader } from '../../utils/utils'
import BreakLine from 'editorjs-break-line'

export const Tools = {
  style: StyleInlineTool,
  tooltip: {
    class: Tooltip,
    config: {
      location: 'right',
      highlightColor: '#FFEFD5',
      underline: true,
      backgroundColor: '#154360',
      textColor: '#FDFEFE',
      holder: 'editor_js',
    },
  },

  header: {
    class: Header,
    shortcut: 'CMD+SHIFT+H',
    inlineToolbar: true,
    config: {
      placeholder: 'Enter a header',
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 1,
    },
  },
  breakLine: {
    class: BreakLine,
    inlineToolbar: true,
    shortcut: 'ENTER',
  },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        async uploadByFile(file) {
          return await SocketFileUploader([file])
            .then((res) => {
              return {
                success: 1,
                file: {
                  url: res[0].url,
                  key: res[0].key,
                },
              }
            })
            .catch((err) => console.log(err))
        },
      },
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: 'unordered',
    },
  },
  // checklist: {
  //   class: Checklist,
  //   inlineToolbar: true,
  // },

  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: 'CMD+SHIFT+O',
    config: {
      quotePlaceholder: 'Enter a quote',
      captionPlaceholder: "Quote's author",
    },
  },

  Marker: {
    class: Marker,
    shortcut: 'CMD+SHIFT+M',
  },
  // code: CodeTool,

  // warning: Warning,
  // delimiter: Delimiter,
  inlineCode: InlineCode,
  // linkTool: LinkTool,
  // raw: RawTool,
  // embed: {
  //   class: Embed,
  //   config: {
  //     services: {
  //       youtube: true,
  //       coub: true,
  //       codepen: true,
  //     },
  //   },
  // },
  // table: Table,
}
