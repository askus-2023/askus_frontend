import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { theme } from '../../styles/Theme';
import ContainedButton from '../../components/common/button/ContainedButton';
import SelectButton from '../../components/common/button/SelectButton';
import icCancel from '../../assets/icons/cancel.svg';
import SearchInput from '../../components/common/input/SearchInput';
import icAdd from '../../assets/icons/add.svg';
import TextEditor from '../../components/board/TextEditor';
import { createBoard } from '../../apis/board';
import Spinner from '../../components/common/spinner/Spinner';

export const filterOption = [
  {
    text: '한식',
    value: 'KOREAN',
  },
  {
    text: '양식',
    value: 'WESTERN',
  },
  {
    text: '일식',
    value: 'JAPANESE',
  },
  {
    text: '중식',
    value: 'CHINESE',
  },
  {
    text: '기타',
    value: 'ETC',
  },
];

const BoardWritePage = () => {
  const fileInputRef = useRef(null);
  const [selectedfilter, setSelectedFilter] = useState('KOREAN');
  const [title, setTitle] = useState('');
  const [menu, setMenu] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState({});
  const [tag, setTag] = useState('');
  const [allTag, setAllTag] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const createMutation = useMutation(createBoard);
  const queryClient = useQueryClient();

  const uploadThumbnail = () => {
    const file = fileInputRef.current?.files;
    if (file && file[0]) {
      setThumbnail({ image: file[0], url: URL.createObjectURL(file[0]) });
    }
  };

  const hashtagHandler = (e) => {
    e.preventDefault();
    if (tag) {
      setAllTag([...allTag, tag]);
      setTag('');
    }
  };

  const filterHandler = (e) => {
    setSelectedFilter(e.target.value);
  };

  const deleteHashTag = (index) => {
    const tagList = [...allTag];
    tagList.splice(index, 1);
    setAllTag(tagList);
  };

  const uploadHandler = () => {
    setIsLoading(true);
    const imageList = images.map((value) => value.file);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('foodName', menu);
    formData.append('category', selectedfilter);
    formData.append('ingredients', ingredients);
    formData.append('content', content);
    formData.append('tag', allTag.toString());
    thumbnail.image && formData.append('thumbnailImage', thumbnail.image);
    if (imageList.length) {
      for (const image of imageList) {
        formData.append('representativeImages', image);
      }
    }
    formData.append('thumbnailImageUpdate', false)
    formData.append('representativeImageUpdate', false)
    createMutation.mutate({
      data: formData,
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries(['/boards']);
        navigate('/board');
      },
      onError: (err) => console.log(err),
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <Wrapper>
      <Main>
        <div className='main-left'>
          <div className='menuSection'>
            <SelectButton
              onChange={filterHandler}
              option={filterOption}
              selected={selectedfilter}
            />
            <Menu>
              <label htmlFor='menu'>
                <span>메뉴: </span>
                <input
                  id='menu'
                  className='input-menu'
                  value={menu}
                  onChange={(e) => setMenu(e.target.value)}
                />
              </label>
              <div className='partition' />
              <label htmlFor='ingredients'>
                <span>재료:</span>
                <input
                  className='input-ingredients'
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </label>
            </Menu>
          </div>
          <Title>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='제목'
            />
          </Title>
          <TextEditor
            content={content}
            setContent={setContent}
            images={images}
            setImages={setImages}
          />
        </div>
        <div className='main-right'>
          <ThumbnailSection>
            <label htmlFor='Thumbnail-image'>
              {thumbnail.url ? (
                <img
                  className='image image-Thumbnail'
                  src={thumbnail.url}
                  alt='썸네일 이미지'
                />
              ) : (
                <div className='default-upload'>썸네일을 등록해주세요.</div>
              )}
            </label>
            <input
              ref={fileInputRef}
              id='Thumbnail-image'
              type='file'
              onChange={uploadThumbnail}
            />
            {thumbnail.url && (
              <button onClick={() => setThumbnail({})}>
                <img className='ic ic-cancel' src={icCancel} alt='취소' />
              </button>
            )}
          </ThumbnailSection>
          <HashtagSection>
            <SearchInput
              className='hashtag'
              placeholder='# 해시태그'
              value={tag}
              alwaysVisible={true}
              onSubmit={hashtagHandler}
              onChange={(e) => setTag(e.target.value)}
            />
            <div className='hashtagword'>
              {allTag.map((tag, idx) => (
                <div className='hashtag' key={idx}>
                  <Hashtag>
                    <span># {tag}</span>
                    <button
                      className='btn-delete'
                      onClick={() => deleteHashTag(idx)}
                    >
                      <img className='ic ic-delete' src={icAdd} alt='삭제' />
                    </button>
                  </Hashtag>
                </div>
              ))}
            </div>
          </HashtagSection>
          <ContainedButton onClick={uploadHandler} className='button'>
            등록
          </ContainedButton>
        </div>
      </Main>
      {isLoading && (
        <Background>
          <Spinner />
        </Background>
      )}
    </Wrapper>
  );
};

export default BoardWritePage;

const Wrapper = styled.div`
  .button {
    width: max-content;
  }
`;
const Main = styled.main`
  padding: 13.2rem 16.2rem;
  display: flex;
  gap: 1.6rem;
  justify-content: space-between;
  article {
    position: relative;
    padding: 0 5.2rem;
  }
  .menuSection {
    display: flex;
  }
  .main-left {
    flex: 1 1 auto;
  }
  .main-right {
    margin-top: 12em;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 38rem;
    gap: 2rem;
  }
`;

const Title = styled.h3`
  input {
    width: -webkit-fill-available;
    font-size: 3.6rem;
    line-height: 2.4;
  }
`;
const Menu = styled.h4`
  padding: 0.4rem 0;
  display: flex;
  flex-grow: 1;
  .partition {
    width: 1px;
    height: 100%;
    background-color: ${theme.colors.grey40};
  }
  label {
    display: flex;
    margin: 0 1.6rem;
    span {
      flex-shrink: 0;
      font-size: 1.6rem;
      line-height: 1.6;
    }
    :last-child {
      flex-grow: 1;
      margin-right: 0;
    }
    input {
      flex-grow: 1;
      font-size: 1.6rem;
      line-height: 1.6;
      display: inline;
      margin-left: 0.8rem;
      border-bottom: 1px solid ${theme.colors.grey50};
    }
  }
`;

const ThumbnailSection = styled.div`
  position: relative;
  width: 30rem;
  height: 18rem;
  label {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  .image-Thumbnail {
    width: 100%;
    height: 100%;
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
  padding: 0.4rem 1rem;
  border: 2px solid ${theme.colors.green50};
  border-radius: 2rem;
  color: ${theme.colors.grey70};
  margin: 0 1rem 1.2rem 0;
  display: flex;
  gap: 0.8rem;
  span {
    font-size: 1.4rem;
    line-height: 1.6;
  }
  &:hover {
    cursor: pointer;
  }
  .btn-delete {
    align-self: center;
    transform: rotateZ(45deg);
  }
  .ic-delete {
    display: block;
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const HashtagSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  .hashtag {
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
    padding: 1.5rem 0;
  }
`;
const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
`;
