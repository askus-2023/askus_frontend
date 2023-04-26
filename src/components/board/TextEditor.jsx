import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize';
Quill.register('modules/ImageResize', ImageResize);
import styled from 'styled-components';

const Size = Quill.import('attributors/style/size');
Size.whitelist = ['16px', '24px', '32px', '48px', '64px'];
Quill.register(Size, true);

const Image = Quill.import('formats/image');
Image.sanitize = (url) => url;
Quill.register(Image, true);

const TextEditor = ({ content, setContent, images, setImages }) => {
  const wrapperRef = useRef();
  const [targetNode, setTargetNode] = useState();
  const quillRef = useRef();
  const [imageCounter, setImageCounter] = useState(0);

  const callback = useCallback(
    (mutationList) => {
      const mutation = mutationList[0];
      if (mutation.type === 'childList') {
        if (mutation.addedNodes.length) {
          if (mutation.addedNodes[0].tagName === 'IMG') {
            mutation.addedNodes[0].setAttribute(
              'class',
              `img-${imageCounter - 1}`
            );
            const img = images.find(
              (value) => value.class === `img-${imageCounter - 1}`
            );
            img && mutation.addedNodes[0].setAttribute('src', img.url);
          }
        }

        if (mutation.removedNodes.length) {
          if (mutation.removedNodes[0].className?.includes('img')) {
            let index = images.findIndex(
              (value) => value.class === mutation.removedNodes[0].className
            );
            const imgList = [...images];
            index !== -1 && imgList.splice(index, 1);
            setImages(imgList);
          }
        }
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [images, imageCounter, setImages]
  );

  const observer = useMemo(() => new MutationObserver(callback), [callback]);

  useEffect(() => {
    if (wrapperRef) {
      setTargetNode(wrapperRef.current.querySelector('.ql-editor'));
    }
  }, [wrapperRef]);

  useEffect(() => {
    if (targetNode) {
      observer.observe(targetNode, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }
  }, [observer, targetNode]);

  const fileEvent = useCallback(
    (e) => {
      const newImage = {
        file: e.target.files[0],
        class: `img-${imageCounter}`,
        url: URL.createObjectURL(e.target.files[0]),
      };
      setImages((prev) => [...prev, newImage]);
      setImageCounter((prev) => prev + 1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [imageCounter, setImages]
  );

  useEffect(() => {
    if (wrapperRef) {
      const wrapper = wrapperRef.current;
      wrapper.querySelector('.quill').addEventListener('change', fileEvent);

      return () => {
        wrapper
          .querySelector('.quill')
          .removeEventListener('change', fileEvent);
      };
    }
  });

  useEffect(() => {
    console.log(images);
  }, [images]);

  // const imageHandler = useCallback(() => {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();
  //   input.onchange = () => {
  //     let quillObj = quillRef.current.getEditor();
  //     const file = input.files[0]
  //     const fileURL = URL.createObjectURL(file)
  //     const range = quillObj.getSelection()
  //     setImages((prev) => [...prev, file])
  //     quillObj.editor.insertEmbed(range.index, 'image', fileURL)
  //     quillObj.setSelection(range.index + 1)
  //   }
  // }, [quillRef])

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          [{ font: [] }],
          [{ size: Size.whitelist }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          [{ align: [] }, { color: [] }, { background: [] }],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        handlers: {
          // image: imageHandler
        },
      },
      ImageResize: {
        parchment: Quill.import('parchment'),
      },
    }),
    []
  );

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'indent',
    'align',
    'color',
    'background',
    'link',
    'image',
    'video',
  ];

  return (
    <Wrapper ref={wrapperRef}>
      <ReactQuill
        ref={quillRef}
        theme='snow'
        value={content}
        onChange={(content, delta, source, editor) =>
          setContent(editor.getHTML())
        }
        className='text-editor'
        modules={modules}
        formats={formats}
      />
    </Wrapper>
  );
};

export default TextEditor;

const Wrapper = styled.div`
  .text-editor {
    width: 100%;
  }
  .ql-container {
    min-height: 30rem;
    max-height: 60rem;
    overflow-y: auto;
  }
`;
