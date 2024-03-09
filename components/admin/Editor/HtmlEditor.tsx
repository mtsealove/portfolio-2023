// eslint-disable-next-line import/no-extraneous-dependencies
import ReactQuill, { Quill } from 'react-quill';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'react-quill/dist/quill.snow.css';
// @ts-ignore
import ImageResize from 'quill-image-resize';
import { useEffect, useMemo, useRef } from 'react';
import UploadApi from '@/API/UploadApi';

Quill.register('modules/ImageResize', ImageResize);

const Video = Quill.import('formats/video');
const Link = Quill.import('formats/link');

// @ts-ignore
class CustomVideo extends Video {
  static create(value:string) {
    // @ts-ignore
    const node = super.create(value);
    const video = document.createElement('video');
    video.setAttribute('controls', 'true');
    video.setAttribute('type', 'video/mp4');
    video.setAttribute('style', 'width: 100%');
    video.setAttribute('src', this.sanitize(value));
    node.appendChild(video);
    return node;
  }

  static sanitize(url:string) {
    return Link.sanitize(url);
  }
}

// @ts-ignore
CustomVideo.blotName = 'video';
// @ts-ignore
CustomVideo.className = 'ql-video';
// @ts-ignore
CustomVideo.tagName = 'DIV';

Quill.register('formats/video', CustomVideo);

type Editor = {
    content: string;
    setContent: (c: string) => void;
    minHeight?: number;
}

const HtmlEditor = ({ content, setContent, minHeight }:Editor) => {
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.multiple = true;
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      // const file = input.files![0];
      const { files } = input;
      if (files) {
        for (let i = 0; i < files?.length; i += 1) {
          const file = files![i];
          try {
            // eslint-disable-next-line no-await-in-loop
            const result = (await UploadApi.uploadFile(file)).data;
            const IMG_URL = result;
            const editor = quillRef.current?.getEditor(); // 에디터 객체 가져오기
            if (editor) {
              editor.setSelection(editor.getLength(), editor.getLength());
              const range = editor.getSelection();
              editor.insertEmbed(range!.index, 'image', IMG_URL);
            }
          } catch (error) {
            window.alert('2MB 이하의 이미지만 업로드할 수 있습니다');
          }
        }
      }
    });
  };
  const videoHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'video/*');
    input.click();
    input.addEventListener('change', async (e) => {
      const file = input.files![0];
      try {
        const result = (await UploadApi.uploadFile(file)).data;
        const VIDEO_URL = result;
        const editor = quillRef.current?.getEditor(); // 에디터 객체 가져오기
        if (editor) {
          const range = editor.getSelection();
          editor.insertEmbed(range!.index, 'video', VIDEO_URL);
        }
      } catch (error) {
        window.alert('30MB 이하의 동영상만 업로드할 수 있습니다');
      }
    });
  };
  const quillRef = useRef<ReactQuill|null>(null);
  const toolbarOptions = [
    ['link', 'image', 'video'],
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    // [{ color: [] }, { background: [] }],
    // [{ align: [] }],
  ];
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'background',
    'color',
    'link',
    'image',
    'video',
    'width',
  ];
  const modules = useMemo(() => (
    {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: imageHandler,
          video: videoHandler,
        },
      },
      ImageResize: {
        parchment: Quill.import('parchment'),
      },
    }
  ), []);
  useEffect(() => {
    const container = document.querySelector<HTMLDivElement>('.ql-editor');
    if (container) {
      // container.style.minHeight = `${minHeight}px`;
    }
  }, [minHeight]);
  return (
        <ReactQuill theme='snow'
                    ref={quillRef}
                    modules={modules}
                    value={content}
                    formats={formats}
                    onChange={(c) => {
                      setContent(c);
                    }}
        />
  );
};

export default HtmlEditor;
