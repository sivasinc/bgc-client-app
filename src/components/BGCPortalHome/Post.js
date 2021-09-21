import React, { useState } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import './Post.css';
import dayjs from "dayjs";
import ReactPlayer from 'react-player';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import CommentsSection from '../BGCComments/CommentsSection';
import {getPostDetails} from '../../redux/actions/postActions';


const Post =({ key, article, getCommentOfAPost}) => {
    const [updatedComment, setUpdatedComment] = useState(false);
    const [likeActionState, setLikeActionState] = useState("action")
    const [openDialog, setOpenDialog] = useState(false);
    const [currentSelectedPost, setCurrentSelectedPost] = useState("");

    const likeHandler = () => {
        switch(likeActionState) {
            case "action":
                setLikeActionState("primary");
                break;
            case "primary":
                setLikeActionState("action");
                break;
            default:
                setLikeActionState("action");
                break;
        }
    }  
    const handleCommentDialoge = (postId) => {
        setOpenDialog(!openDialog);
        getCommentOfAPost(postId);
        setCurrentSelectedPost(postId);
    } 
    const updateComment = (value) => {
        setUpdatedComment(value);
      };

    return (
        <Article key = {key}>
            <SharedActor>
                                    <a>
                                        <img src={article.userImage} alt="" />
                                        <div>
                                            <span className="sharedActor__userLabel">{article.userName} <span className="sharedActor__userLabel_sub">posted on </span> {article.communityName}</span>
                                            <span>{dayjs(article.createdAt).format("h:mm a, MMMM DD YYYY")}</span>
                                        </div>
                                    </a>

                                    {/* <button>
                                        <img src="images/ellipsis.png" alt="" />
                                    </button> */}
                                </SharedActor>
                                <Description>{article.body}</Description>
                                { (article.sharedImg || article.sharedVideo) && <SharedImage>
                                        {
                                            !article.sharedImg && article.sharedVideo ? 
                                                (<ReactPlayer width = {'100%'} url={article.sharedVideo} />)
                                            :
                                            (
                                                article.sharedImg && <img src={article.sharedImg} />
                                            )
                                        }
                                </SharedImage>
}
                                <SocialActions>
                                    <button>
                                    <ThumbUpIcon color={likeActionState} onClick={likeHandler}/>
                                        <span>Like</span>
                                    </button>
                                    <button onClick={() =>handleCommentDialoge(article.postId)}>
                                        <CommentIcon color="primary" />
                                        <span>Post a comment</span>
                                    </button>
                                   
                                        <p>{article.commentCount} comments</p>
                                        <p>{article.commentCount} Likes</p>
                                </SocialActions>
                                {console.log('state', openDialog && currentSelectedPost=== article.postId)}
                                {openDialog && currentSelectedPost=== article.postId && <div className="portalHome__comments">
                                    <CommentsSection 
                                     updatedComment={updatedComment}
                                     postId={article.postId}
                                     key={article.postId}
                                     refreshFunction={updateComment}
                                     setOpenDialog={setOpenDialog}
                                     openDialog={openDialog}/>
                                </div>}
                        
        </Article>
    )
}
const CommonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    border-radius: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
    display: flex;
    flex-direction: column;
    color: #958b7b;
    margin: 0 0 8px 0;
    background: #fff;

    div {
        button {
            outline: none;
            color: rgba(0,0,0,0.6);
            font-size: 14px;
            line-height: 1.5;
            min-height: 48px;
            background: transparent;
            border: none;
            display: flex;
            curosr: pointer;
            align-items: center;
            font-weight: 600;

            &:hover {
                background-color: rgba(0,0,0,0.07);
                border-radius: 6px;
            }
        }

        .post-space {
            box-shadow: 1px 1px 2px 1px rgba(159,156,156,0.75);
        }

        .post-icon {
            width: 27px;
        }

        &:first-child {
            display: flex;
            align-items: center;
            padding: 8px 16px;

            img {
                width: 48px;
                margin-right: 8px;
                border-radius: 50%;
            }

            button {
                margin: 4px 0;
                flex-grow: 1;
                border-radius: 35px;
                padding-left: 16px;
                border: 1px solid rgba(0,0,0,0,15);
                border-radius: 10px;
                background-color: #fff;
                text-align: left;
            }
        }

        &:nth-child(2) {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding-bottom: 4px;

            button {
                img {
                    margin: 0 4px 0 -2px;
                }

                span {
                    color: #70b5f9;
                }
            }
        }
    }
`;

const Article = styled(CommonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow: visible;
`;

const SharedActor = styled.div`
    padding-right: 40px;
    flex-wrap: nowrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items: center;
    display: flex;

    a {
        margin-right: 12px;
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        text-decoration: none;

        img {
            width: 48px;
            height: 48px;
            border-radius: 100px;
        }

        & > div {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow: hidden;

            span {
                text-align: left;

                &:first-child {
                    font-weight: 700;
                    color: rgba(0, 0, 0, 1);
                    color: rgba(0,0,0,0.87); font-family: Roboto; font-size: 20px; font-weight: 500; letter-spacing: 0.15px; line-height: 24px;
                }

                &:nth-child(n+1) {
                    // font-size: 14px;
                    // color: rgba(0,0,0,0.6);
                    
                }
            }
        }
    }

    button {
        position: absolute;
        right: 12px;
        outline: none;
        border: none;
        top: 0;
        background: transparent;
    }
`;

const Description = styled.div`
    padding: 0 16px;
    overflow: hidden;
    color: rgba(0,0,0,0.9);
    font-size: 14px;
    text-align: left;
    color: rgba(0,0,0,0.87); font-family: Roboto; font-size: 16px; letter-spacing: 0.5px; line-height: 24px;
`;

const SharedImage = styled.div`
    margin-top: 8px;
    width: 100%;
    // max-height: 250px;
    display: block;
    position: relative;
    background-color: #f9fafb;

    img {
        object-fit: fill;
        width: 100%;
        height: 200px;
    }
`;

const SocialCounts = styled.ul`
    line-height: 100%;
    display: flex;
    align-items: flex-start;
    overflow: auto;
    list-style: none;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 1px solid #e9e5df;

    li {
        margin-right: 5px;
        font-size: 12px;

        button {
            display: flex;
            border: none;
            background: #fff;
        }
    }

    img {
        width: 18px;
    }
`;

const SocialActions = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    margin: 0;
    min-height: 40px;
    padding: 4px 8px;

    button {
        display: inline-flex;
        align-items: center;
        padding: 8px;
        color: #0a66c2;
        border: none;
        cursor: pointer;
        background-color: #fff;

        @media (min-width: 768px) {
            span {
                margin-left: 8px;
            }
        }
    }
    p {
        color: #0a66c2;
        margin: 0 10px 0 10px;
    }
`;
Post.propTypes = {

}

const mapStateToProps = (state) => {
    return {
        loading: state.UI.loading,
        user: state.user,
        usersPosts: state.data.usersPosts,
        communities : state.data.communities
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCommentOfAPost: (postId) => dispatch(getPostDetails(postId))
})

export default connect(mapStateToProps, mapDispatchToProps) (Post);
