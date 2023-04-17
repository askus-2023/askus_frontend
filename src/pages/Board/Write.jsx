import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import useScroll from '../../hooks/useScroll';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const BoardWritePage = () => {
  const ref = useRef(null);
  useScroll(ref);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  return (
    <Wrapper ref={ref}>
      <Main>
        <Title>
          <input placeholder='제목' />
        </Title>
        <Editor
          // 에디터와 툴바 모두에 적용되는 클래스
          wrapperClassName='wrapper-class'
          // 에디터 주변에 적용된 클래스
          editorClassName='editor'
          // 툴바 주위에 적용된 클래스
          toolbarClassName='toolbar-class'
          // 툴바 설정
          toolbar={{
            // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: false },
          }}
          placeholder='내용을 작성해주세요.'
          // 한국어 설정
          localization={{
            locale: 'ko',
          }}
          // 초기값 설정
          editorState={editorState}
          // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
          onEditorStateChange={onEditorStateChange}
        />
      </Main>
    </Wrapper>
  );
};

export default BoardWritePage;

const Wrapper = styled.div`
  height: 100%;
  overflow-y: auto;
`;
const Main = styled.main`
  padding: 13.2rem 12.2rem;
  article {
    position: relative;
    padding: 0 5.2rem;
  }
`;
const Title = styled.h3`
  input {
    font-size: 3.6rem;
    line-height: 2.4;
    padding: 0 5.2rem;
  }
`;
const ArticleContent = styled.div`
  font-size: 2rem;
  line-height: 1.6;
  -webkit-user-modify: read-write;
  overflow-wrap: break-word;
  -webkit-line-break: after-white-space;
  &:focus {
    outline: none;
  }
`;
