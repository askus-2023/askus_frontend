import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ContentEditable from 'react-contenteditable';

const WriteTxt = () => {
  const [txt, setTxt] = useState({ html: '...' });
  const [isDrag, setIsDrag] = useState(false);

  const contentEditable = useRef();
  const writeRef = useRef(null);

  const selection = window.getSelection();

  useEffect(() => {
    function handleOutside(e) {
      // current.contains(e.target) : 컴포넌트 특정 영역 외 클릭 감지를 위해 사용
      if (
        selection.toString().length === 0 ||
        !writeRef.current.contains(e.target)
      ) {
        setIsDrag(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [selection, writeRef]);

  const handleSelect = () => {
    selection.toString().length > 0 && setIsDrag(true);
  };

  const handleChange = (e) => {
    setTxt({ html: e.target.value });
  };

  return (
    <DefaultTxt ref={writeRef}>
      <ContentEditable
        className='editTxt'
        innerRef={contentEditable}
        html={txt.html} // innerHTML of the editable
        disabled={false} // 활성화/비활성화
        tagName='article' // Use a custom HTML tag (uses a div by default)
        onChange={handleChange} // handle innerHTML change
        onSelect={handleSelect}
      />
      {isDrag && (
        <div className='bubbleMenu'>
          <div className='bubbleMenu-inner'></div>
          <div className='bubbleMenu-arrowClip'>
            <span className='bubbleMenu-arrow'></span>
          </div>
        </div>
      )}
    </DefaultTxt>
  );
};

export default WriteTxt;

const DefaultTxt = styled.div`
  font-size: 2rem;
  margin-top: 3rem;
  /* margin-left: 2rem; */
  resize: none;
  border: 0rem;
  .editTxt {
    padding-left: 5rem;
    outline: 0px solid transparent;
  }
  .bubbleMenu {
    left: 20px;
    top: 81px;
    width: 14rem;
    height: 3rem;
  }
  .bubbleMenu-inner {
    position: relative;
    width: 14rem;
    height: 3rem;
    background-image: linear-gradient(
      to bottom,
      rgba(49, 49, 47, 0.99),
      #262625
    );
    background-repeat: repeat-x;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    padding: 0 10px;
  }
  .bubbleMenu-arrowClip {
    position: absolute;
    /* bottom: -10px; */
    top: 9.8%;
    left: 11%;
    clip: rect(10px 20px 20px 0);
    margin-left: -10px;
  }
  .bubbleMenu-arrow {
    display: block;
    width: 20px;
    height: 20px;
    background-color: #262625;
    -webkit-transform: rotate(45deg) scale(0.5);
    transform: rotate(45deg) scale(0.5);
  }
`;
