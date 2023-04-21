import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import useScroll from '../../hooks/useScroll';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { theme } from '../../styles/Theme';
import ContainedButton from '../../components/common/button/ContainedButton';
import SelectButton from '../../components/common/button/SelectButton';
import profile from '../../assets/images/default-profile.png';
import icCancel from '../../assets/icons/cancel.svg';
import SearchInput from '../../components/common/input/SearchInput';

const BoardWritePage = () => {
  const fileInputRef = useRef(null);
  const ref = useRef(null);
  const [selectedfilter, setSelectedFilter] = useState('한식');
  const [image, setImage] = useState({});
  const [tag, setTag] = useState('');
  const [allTag, setAllTag] = useState([]);

  useScroll(ref);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const uploadImage = () => {
    const file = fileInputRef.current?.files;
    if (file && file[0]) {
      setImage({ image: file[0], url: URL.createObjectURL(file[0]) });
    }
  };

  const onEditorStateChange = (editorState) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  const hashtagHandler = (e) => {
    e.preventDefault();
    setAllTag([...allTag, tag]);
    setTag('');
  };

  const filterHandler = (e) => {
    setSelectedFilter(e.target.value);
  };

  const filterOption = ['한식', '양식', '일식', '중식', '기타'];

  return (
    <Wrapper ref={ref}>
      <div>
        <Main>
          <div>
            <div className='menuSection'>
              <SelectButton
                onChange={filterHandler}
                option={filterOption}
                selected={selectedfilter}
              />
              <Menu>
                <input placeholder='메뉴명' />
              </Menu>
            </div>
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
          </div>
          <div className='main-right'>
            <ThumbnailSection>
              <label htmlFor='Thumbnail-image'>
                {image.url ? (
                  <img
                    className='image image-Thumbnail'
                    src={image?.url ?? profile}
                    alt='프로필 이미지'
                  />
                ) : (
                  <div className='default-upload'>썸네일을 등록해주세요.</div>
                )}
              </label>
              <input
                ref={fileInputRef}
                id='Thumbnail-image'
                type='file'
                onChange={uploadImage}
              />
              {image.url && (
                <button onClick={() => setImage({})}>
                  <img className='ic ic-cancel' src={icCancel} alt='취소' />
                </button>
              )}
            </ThumbnailSection>
            <HashtagSection>
              <SearchInput
                className='hashtag'
                placeholder='#해시태그'
                value={tag}
                alwaysVisible={true}
                onSubmit={hashtagHandler}
                onChange={(e) => setTag(e.target.value)}
              />
              <div className='hashtagword'>
                {allTag.map((tag, idx) => (
                  <>
                    <Hashtag key={idx}>#{tag}</Hashtag>
                  </>
                ))}
              </div>
            </HashtagSection>
            <ContainedButton className='button'>등록</ContainedButton>
          </div>
        </Main>
      </div>
    </Wrapper>
  );
};

export default BoardWritePage;

const Wrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  .button {
    width: max-content;
  }
`;
const Main = styled.main`
  padding: 13.2rem 16.2rem;
  display: flex;
  justify-content: space-between;
  article {
    position: relative;
    padding: 0 5.2rem;
  }
  .menuSection {
    display: flex;
  }

  .main-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 38rem;
  }
`;
const MainRight = styled.main``;
const Title = styled.h3`
  input {
    width: -webkit-fill-available;
    font-size: 3.6rem;
    line-height: 2.4;
  }
`;
const Menu = styled.h4`
  input {
    width: -webkit-fill-available;
    font-size: 1.6rem;
    line-height: 2.8;
    margin-left: 2rem;
  }
`;

const ThumbnailSection = styled.div`
  position: relative;
  label {
    cursor: pointer;
  }
  .image-Thumbnail {
    width: 23rem;
    height: 13rem;
    border-radius: 0.5rem;
    object-fit: cover;
  }
  .ic-cancel {
    position: absolute;
    top: -1rem;
    right: -1rem;
  }
  .default-upload {
    background: ${theme.colors.grey20};
    color: ${theme.colors.grey70};
    font-size: 1.5rem;
    border-radius: 0.5rem;
    width: 30rem;
    height: 18rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Hashtag = styled.div`
  box-shadow: 1px 1px 2px ${theme.colors.green30};
  width: fit-content;
  padding: 1rem;
  border: 2px solid ${theme.colors.green50};
  border-radius: 2rem;
  color: ${theme.colors.grey70};
  margin: 0px 1rem 1.5rem 0px;
  font-size: 1.4rem;
  &:hover {
    cursor: pointer;
  }
`;

const HashtagSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  .hashtag {
    margin-top: 2rem;
    form {
      input {
        padding-right: 4.5rem;
      }
      &:hover input {
        width: 100%;
      }
    }
  }
  .hashtagword {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 1.5rem;
  }
`;
