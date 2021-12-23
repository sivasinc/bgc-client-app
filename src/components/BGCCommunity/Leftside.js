import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import './LeftSide.css';
import Avatar from "@material-ui/core/Avatar";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Members from './Members';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { uploadCommunityProfileImage } from '../../redux/actions/postActions';


const Leftside = ({ user: { userInfo },communityPosts : { community } = {},communityPosts: { community: { members } = [] } = {},
    currentCommunityId, uploadCommunityProfileImage }) => {
    const communityActionHandler = () => {

    }
   const {email} = userInfo;
    const generateActionLink = () => {
        if(members && Array.isArray(members) && members.filter((item) => item.email === userInfo.email).length > 0) {
            return (<React.Fragment>
<CheckIcon onClick={() => communityActionHandler(email)} /> <span onClick={() => communityActionHandler(email)} className="community_action_footer__label">JOINED</span>
            </React.Fragment>);
        } else {
            return (<React.Fragment>
                <AddIcon onClick={() => communityActionHandler(email)} /> <span onClick={() => communityActionHandler(email)} className="community_action_footer__label">JOIN COMMUNITY</span>
                            </React.Fragment>);
        }
    }

    const handleImageUploadClick = (e) => {
        const image = e.target.files[0];
      
        if (image === "" || image === undefined) {
          alert(`not an image, the file is a ${typeof image}`);
          return;
        }
        uploadCommunityProfileImage(image, currentCommunityId);
       }


    const communityTile = () => {
        let section = null;
        if(community) {
            section = (<div className="ArtCard">
                 <input
              accept="image/gif, image/jgp, image/png, image/jpeg"
              id="contained-button-file"
              style={{ display: "none" }}
              multiple
              type="file"
              onChange={handleImageUploadClick}
            />
            <label htmlFor="contained-button-file">
            <Avatar
                alt="Remy Sharp"
                className="portal__header__image"
                src={ community.imageUrl }
              />
              <AddAPhotoIcon style= {{ marginLeft: '60px' }}/>
              </label>
              <h4>{community.name} </h4>
              <p>{community.description}</p>
              <div className="community_action_footer">
              {generateActionLink()}
              </div>
              
            </div>);
        }
        return section;
    }
    return (
        <div className="Container">
           { communityTile() }
            <Members />
        </div>
    );
};


const UserInfo = styled.div`
    border-bottom: 1px solid rgba(0,0,0,0.15);
    padding: 12px 12px 16px;
    word-wrap: break-word;
    word-break: break-word;
`;

const CardBackground = styled.div`
    background: url('/images/card-bg.svg');
    background-position: center;
    background-size: 462px;
    height: 54px;
    margin: -12px -12px 0;
`;

const Photo = styled.div`
    box-shadow: none;
    background-image: url('/images/photo.svg');
    width: 72px;
    height: 72px;
    box-sizing: border-box;
    background-clip: content-box;
    background-color: #ffffff;
    background-position: center;
    background-size: 60%;
    background-repeat: no-repeat;
    border: 2px solid #ffffff;
    margin : -38px auto 12px;
    border-radius: 50%;
`;

const Link = styled.div`
    font-size: 16px;
    line-height: 16px;
    color: rgba(0,0,0,0.9);
    font-weight: 600;
`;

const AddPhotoText = styled.div`
    color: #0a66c2;
    margin-top: 4px;
    font-size: 12px;
    line-height: 1.33;
    font-weight: 400;
`;

const Widget = styled.div`
    border-bottom: 1px solid rgba(0,0,0,0.15);
    padding-top: 12px;
    padding-bottom: 12px;

    & > a {
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 12px;

        &:hover {
            background-color: rgba(0,0,0,0.08);
        }

        div {
            display: flex;
            flex-direction: column;
            text-align: left;

            span {
                font-size: 12px;
                line-height: 1.333;

                &:first-child {
                    color: rgba(0, 0, 0, 0.6);
                }

                &:nth-child(2) {
                    color: rgba(0, 0, 0, 1);
                }
            }
        }
    }

    svg {
        color: rgba(0, 0, 0, 1);
    }
`;

const Item = styled.a`
    border-color: rgba(0, 0, 0, 0.8);
    text-align: left;
    padding: 12px;
    font-size: 12px;
    display: block;

    span {
        display: flex;
        align-items: center;
        color: rgba(0, 0, 0, 1);

        svg {
            color: rgba(0, 0, 0, 0.6);
        }
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }
`;

// const CommunityCard = styled(ArtCard)`
//     padding: 8px 0 0;
//     text-align: left;
//     display: flex;
//     flex-direction: column;

//     a {
//         color: #000000;
//         padding: 4px 12px;
//         font-size: 12px;

//         &:hover {
//             color: #0a66c2;
//         }

//         span {
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//         }

//         &:last-child {
//             color: rgba(0,0,0,0.6);
//             text-decoration: none;
//             border-top: 1px solid #d6cec2;
//             padding: 12px;

//             &:hover {
//                 background-color: rgba(0,0,0,0.08);
//             }
//         }
//     }
// `;

const mapStateToProps = (state) => {
    return {
        user: state.user,
        communityPosts: state.data.communityPosts,
        currentCommunityId: state.data.currentCommunityId
    };
};

const mapDispatchToProps = { uploadCommunityProfileImage };

export default connect(mapStateToProps, mapDispatchToProps )(Leftside);