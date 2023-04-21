import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize';
Quill.register('modules/ImageResize', ImageResize);
import styled from 'styled-components';

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: [] }],
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
  ImageResize: {
    parchment: Quill.import('parchment'),
  },
};

const TextEditor = ({ content, setContent }) => {
  return (
    <Wrapper>
      <ReactQuill
        theme='snow'
        value={content}
        onChange={setContent}
        className='text-editor'
        modules={modules}
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
