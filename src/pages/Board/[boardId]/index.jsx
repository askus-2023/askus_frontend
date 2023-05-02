import React, { useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import CommentBox from '../../../components/comment/CommentBox';
import Tag from '../../../components/tag/Tag';
import defaultProfile from '../../../assets/images/default-profile.png';
import { deleteBoard, getBoardDetail } from '../../../apis/board';
import Spinner from '../../../components/common/spinner/Spinner';
import { categoryMap } from '../../../infra/Category';
import thumbnail from '../../../assets/images/thumbnail.png';
import { theme } from '../../../styles/Theme';
import OutlinedButton from '../../../components/common/button/OutlinedButton';
import icHeart from '../../../assets/icons/heart-empty.svg';
import icHeartFill from '../../../assets/icons/heart-fill.svg';
import { addLike, removeLike } from '../../../apis/like';
import ContainedButton from '../../../components/common/button/ContainedButton';

export const updateImageUrl = (ref, images) => {
  const article = ref?.current;
  if (article) {
    const imgTags = article.querySelectorAll('img');
    for (let i = 0; i < imgTags.length; i++) {
      if (images.length) {
        imgTags[i].setAttribute('src', images[i]);
      }
    }
  }
};

const BoardDetailPage = () => {
  const articleRef = useRef();
  const location = useLocation();
  const { boardId } = useParams();
  const navigate = useNavigate();
  const addLikeMutation = useMutation(addLike);
  const removeLikeMutation = useMutation(removeLike);
  const deleteBoardMutation = useMutation(deleteBoard)
  const queryClient = useQueryClient();
  const { data, isLoading, isSuccess } = useQuery(
    [`boards/${boardId}`],
    () =>
      getBoardDetail({
        boardId
      }), {
      staleTime: 30,
    }
  );

  const deleteBoardHandler = () => {
    if (confirm('정말 게시글을 삭제하시겠습니까?')) {
      deleteBoardMutation.mutate({ boardId }, {
        onSuccess: () => {
          queryClient.invalidateQueries(['boards'])
          navigate('/board')
        }
      })
    }
  }

  const tags = useMemo(
    () => isSuccess && data.tag.length && data?.tag.split(','),
    [isSuccess, data]
  );

  const likeHandler = () => {
    if (data?.myLike) {
      removeLikeMutation.mutate({
        boardId
      }, {
        onSuccess: () => Promise.all([
          queryClient.invalidateQueries([`boards/${boardId}`]),
          queryClient.invalidateQueries(['boards'])
        ])
      })
    } else {
      addLikeMutation.mutate({
        boardId
      }, {
        onSuccess: () => Promise.all([
          queryClient.invalidateQueries([`boards/${boardId}`]),
          queryClient.invalidateQueries(['boards'])
        ])
      })
    }
  }

  useEffect(() => {
    isSuccess && updateImageUrl(articleRef, data.representativeImageUrls);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className='wrapper'>
      {isLoading && <Spinner />}
      {isSuccess && (
        <>
          <Thumbnail
            url={data.thumbnailImageUrl ?? thumbnail}
            className='thumbnail thumbnail-container'
          >
            <div className='thumbnail__info thumbnail__info-left'>
              <Name>
                [{categoryMap[data.category]}] {data.foodName}
              </Name>
              <Title>{data.title}</Title>
            </div>
            <div className='thumbnail__info thumbnail__info-right'>
              <p>
                {new Intl.DateTimeFormat('ko-KR', { dateStyle: 'full' }).format(
                  new Date(data.createdAt)
                )}
              </p>
            </div>
          </Thumbnail>
          <Content className='content'>
            <div className='content-left'>
              <div className='keywords'>
                {tags ? 
                  tags.map((value, idx) => (
                    <Tag key={idx} type='outline' hash={true}>
                      {value}
                    </Tag>
                  )) : 
                  null}
              </div>
              <MainContent>
                <div
                  ref={articleRef}
                  className='article'
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
              </MainContent>
              <LikeIt>
                <div className='like-it'>
                  <span className='if-you-like-it'>
                    이 콘텐츠가 마음에 드신다면
                  </span>
                </div>
                <OutlinedButton className='btn-like-it' onClick={likeHandler}>
                  <div>좋아요 {data.likeCount && <span className='like-count'>{data.likeCount}</span>}</div>
                  <img
                    className='ic-heart ic-heart-empty'
                    src={data.myLike ? icHeartFill : icHeart}
                    alt='heartEmpty'
                  />
                </OutlinedButton>
              </LikeIt>
            </div>
            <div className='content-right'>
              <Author>
                <div className='author-profile'>
                  <div className='author-profile__image'>
                    <img
                      src={location.state?.authorProfile ?? defaultProfile}
                      alt='프로필 이미지'
                    />
                  </div>
                <div className='author-profile__nickname'>{data.author}</div>
                </div>
                {data.myBoard && 
                <div className='author-action'>
                  <OutlinedButton className='btn-board btn-edit-board' onClick={() => navigate('edit')}>게시글 수정</OutlinedButton>
                  <ContainedButton className='btn-board btn-delete-board' onClick={deleteBoardHandler}>삭제</ContainedButton>
                </div>}
              </Author>
              <CommentBox boardId={boardId} />
            </div>
          </Content>
        </>
      )}
    </div>
  );
};

export default BoardDetailPage;

const Thumbnail = styled.div`
  position: relative;
  padding: 4rem;
  height: 40rem;
  display: flex;
  align-items: flex-end;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url(${({ url }) => url}) no-repeat;
  background-size: cover;
  background-position: center center;
  .thumbnail__info {
    color: white;
    font-weight: bold;
  }
  .thumbnail__info-left {
    padding: 0 2rem 0 1.2rem;
    flex: 0 1 60%;
    gap: 1.6rem;
    font-size: 2.2rem;
    line-height: 2.8rem;
  }
  .thumbnail__info-right {
    padding: 0 1.2rem 0 2rem;
    flex: 0 1 40%;
    display: flex;
    font-size: 1.6rem;
    justify-content: flex-end;
  }
`;
const Name = styled.p`
  margin-bottom: 1.6rem;
`;
const Title = styled.p`
  font-size: 3.2rem;
  line-height: 4rem;
`;

const Content = styled.div`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  .content-left {
    padding: 0 1.2rem;
    flex: 0 0 60%;
    .keywords {
      min-height: 3.6rem;
    }
  }
  .content-right {
    padding: 0 1.2rem;
    flex: 0 1 40%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
`;
const MainContent = styled.div`
  min-width: 40rem;
  margin-top: 2rem;
  padding-top: 1.8rem;
  .article {
    padding: 0 0.6rem;
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
`;
const LikeIt = styled.div`
  .like-it {
    position: relative;
    margin-top: 8rem;
    margin-bottom: 3rem;
    ::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      height: 1px;
      margin-top: -1px;
      background-color: ${theme.colors.grey40};
    }
  }
  .if-you-like-it {
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 1.2rem;
    font-size: 1.4rem;
    letter-spacing: -0.01em;
    background-color: white;
  }
  .btn-like-it {
    width: fit-content;
    margin: 0 auto;
    border: 0.1rem solid ${theme.colors.red};
    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: ${theme.colors.red};
      font-size: 1.4rem;
      padding: 0.8rem 1.5rem;
    }
    .ic-heart {
      display: block;
      width: 4rem;
      height: 4rem;
    }
    &:hover {
      background-color: ${theme.colors.grey10};
    }
  }
  .like-count {
    font-size: 1.4rem;
    color: ${theme.colors.red};
  }
`;
const Author = styled.div`
  min-width: 28rem;
  max-width: 45rem;
  display: flex;
  justify-content: space-between;
  .author-profile {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    img {
      width: 4.2rem;
      height: 4.2rem;
      border-radius: 50%;
    }
    .author-profile__nickname {
      font-size: 1.6rem;
    }
  }
  .author-action {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    .btn-board {
      button {
        padding: 0.6rem 0.8rem;
        font-size: 1.4rem;
      }
    }
  }
`;
