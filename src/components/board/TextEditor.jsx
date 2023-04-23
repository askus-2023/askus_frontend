import React, { useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize';
Quill.register('modules/ImageResize', ImageResize);
import styled from 'styled-components';

const Size = Quill.import('attributors/style/size');
Size.whitelist = ['16px', '24px', '32px', '48px', '64px']
Quill.register(Size, true);

const Image = Quill.import ('formats/image');
Image.sanitize = function (url) {return url }
Quill.register(Image, true);


const TextEditor = ({ content, setContent }) => {
  const quillRef = useRef();

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      let quillObj = quillRef.current.getEditor();
      const file = input.files[0]
      const fileURL = URL.createObjectURL(file)
      const range = quillObj.getSelection()
      quillObj.editor.insertEmbed(range.index, 'image', fileURL)
    }
  }

  const modules = useMemo(() => ({
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
      image: imageHandler
    }},
    ImageResize: {
      parchment: Quill.import('parchment'),
    },
  }), []);

  const formats = [
    'header',
    'font',
    'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'indent',
    'align', 'color', 'background',
    'link', 'image', 'video',
  ];

  return (
    <Wrapper>
      <ReactQuill
        ref={quillRef}
        theme='snow'
        value={content}
        onChange={setContent}
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
