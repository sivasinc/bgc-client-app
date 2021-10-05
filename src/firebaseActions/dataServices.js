import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  orderBy,
  updateDoc,
  setDoc,
  deleteDoc
} from "firebase/firestore";
import Fuse from 'fuse.js';

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db, storage } from "../firebase";
import { checkInterestMatch } from "../util/validators";

const getAllRecommenededCommunities = async (user) => {
  let communityData = [];
  const { interests, email } = user;
  const communityCollection = [];
  const querySnapshot = await getDocs(collection(db, "community"));
  querySnapshot.forEach((item) => {
    if (
      !item.data().members.filter(item => item.email === email).length > 0
    ) {
    communityCollection.push({
      communityId: item.id,
      name: item.data().name,
      description: item.data().description,
      members: item.data().members,
      image: item.data().imageUrl,
      tags : item.data().tags
    })
  }
  });
  interests.forEach((interest) => {
    const community = filterRecommendedCommunity(interest, communityCollection);
    console.log('test', communityData.filter((item => item.communityId === community.communityId)));
      if (community && communityData.length < 3 && (communityData.filter((item => item.communityId === community.communityId)).length === 0)) {
        communityData.push(community);
      }
  });
  return communityData;
};

const filterRecommendedCommunity = (interest, communityCollection) => {
  const fuse = new Fuse(communityCollection, { 
    keys: ["name", "tags"],
    includeScore: true   
});    
const result = fuse.search(interest);
const finalResult = [];
if (result.length) {
  return result[0].item;
}
}
const getAllUserMemberCommunityPost = async (user) => {
  let communityData = [];
  let usersPost = [];
  const { email } = user;
  const communityRef = collection(db, "community");
  const postRef = collection(db, "posts");
  const q = query(
    communityRef,
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  let selectedCommunityIds = [];
  querySnapshot.forEach((doc) => {
    if(doc.data().members.filter(item => item.email === email).length > 0) {
      communityData.push({ ...doc.data(), communityId: doc.id, posts: [] });
      selectedCommunityIds.push(doc.id);
    }
  });
  if (selectedCommunityIds.length > 0) {
    const q = query(
      postRef,
      where("communityId", "in", selectedCommunityIds),
      orderBy("createdAt", "desc")
    );
    const postsSnapshot = await getDocs(q);
    postsSnapshot.forEach((item) => {
      const index = communityData.findIndex(
        (dataItem) => dataItem.communityId === item.data().communityId
      );
      if (index >= 0) {
        usersPost.push({
          body: item.data().body,
          createdAt: item.data().createdAt,
          userHandle: item.data().userHandle,
          userImage: item.data().userImage,
          userName: item.data().userName,
          sharedImg: item.data().sharedImg,
          sharedVideo: item.data().sharedVideo,
          likeCount: item.data().likeCount,
          commentCount: item.data().commentCount,
          postId: item.id,
          communityId: item.data().communityId,
          communityName: communityData[index].name,
          usersLiked: item.data().usersLiked
        });
      }
    });
  }
  return usersPost;
};
const myCommunity = async (user) => {
  let communties = [];
  const { email } = user;
  const communityRef = collection(db, "community");
  const q = query(
    communityRef,
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    if(doc.data().members.filter((item) => item.email === email).length > 0) {
      communties.push({
        communityId: doc.id,
        name: doc.data().name,
        description: doc.data().description,
        members: doc.data().members,
        image: doc.data().imageUrl,
      });
    }
  });
  return communties;
};

const joinACommunity = async (user, communityId) => {
  const { email, firstName, imageUrl } = user;
  let membersArray = [];
  const docRef = doc(db, "community", communityId);
  const postRef = collection(db, "posts");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    membersArray = [...docSnap.data().members];
    membersArray.push({
      firstName,
      email,
      imageUrl
    });
    const result = await updateDoc(docRef, { members: [...membersArray] });
    return result;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};
const getAllCommunityPosts = async (communityId) => {
  let communityData = {};
  const docRef = doc(db, "community", communityId);
  const postRef = collection(db, "posts");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    communityData.community = { ...docSnap.data(), communityId: communityId };
    const q = query(
      postRef,
      where("communityId", "==", communityId),
      orderBy("createdAt", "desc")
    );
    const postsSnapshot = await getDocs(q);
    communityData.posts = [];
    postsSnapshot.forEach((doc) => {
      communityData.posts.push({
        body: doc.data().body,
        createdAt: doc.data().createdAt,
        userHandle: doc.data().userHandle,
        userImage: doc.data().userImage,
        userName: doc.data().userName,
        sharedImg: doc.data().sharedImg,
        sharedVideo: doc.data().sharedVideo,
        likeCount: doc.data().likeCount,
        commentCount: doc.data().commentCount,
        postId: doc.id,
        communityId: doc.data().communityId,
        usersLiked: doc.data().usersLiked
      });
    });
    console.log("communityData", communityData);
    return communityData;
  }
};
const commentOnAPost = async (newComment) => {
  try {
    const docRef = doc(db, "posts", newComment.postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const result = await updateDoc(docRef, {
        commentCount: docSnap.data().commentCount + 1,
      });
      const newCommentRef = doc(collection(db, "comments"));
      const results = await setDoc(newCommentRef, newComment);
      return results;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such post!");
    }
  } catch (error) {
    console.log(error);
  }
};

const getAPost = async (postId) => {
  let postData = {};
  const docRef = doc(db, "posts", postId);
  const commentRef = collection(db, "comments");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    postData = docSnap.data();
    postData.postId = docSnap.id;
    const q = query(
      commentRef,
      where("postId", "==", postId),
      orderBy("createdAt", "desc")
    );
    const commentSnapshot = await getDocs(q);
    postData.comments = [];
    commentSnapshot.forEach((doc) => {
      postData.comments.push({
        commentId: doc.id,
        postId: doc.data().postId,
        body: doc.data().body,
        createdAt: doc.data().createdAt,
        userHandle: doc.data().userHandle,
        userName: doc.data().userName,
        responseTo: doc.data().responseTo,
      });
    });
    return postData;
  } else {
    console.log("No such post!");
  }
};

const addNewPost = async (newPost) => {
  const newCommentRef = doc(collection(db, "posts"));
  const results = await setDoc(newCommentRef, newPost);
  return results;
};

const addPostWithImageUpload = async (payload) => {
  if (payload.sharedImage != "") {
    try {
      const storageRef = ref(storage, `images/${payload.sharedImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, payload.sharedImage);
      uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    console.log('error', error);
  }, 
  async () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);
    } catch (error) {
      console.log("error", error);
    }
  }
  // const downloadURL = await upload.snapshot.ref.getDownloadURL();
  // return downloadURL;
};

const likeAPost = async (payload) => {
  const docRef = doc(db, "posts", payload.postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let usersArray = [...docSnap.data().usersLiked];
    usersArray.push(payload.email);
    const result = await updateDoc(docRef, {
      likeCount: docSnap.data().likeCount + 1,
      usersLiked : [...usersArray]
    });
    return result;
  } else {
    console.log("No such post!");
  }
}

const disLikeAPost = async (payload) => {
  try {
    const docRef = doc(db, "posts", payload.postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let usersArray = [...docSnap.data().usersLiked];
      const index = usersArray.findIndex(item => item === payload.email);
      usersArray.splice(index, 1);
      const result = await updateDoc(docRef, {
        likeCount: docSnap.data().likeCount - 1,
        usersLiked : [...usersArray]
      });
      return result;
    } else {
      console.log("No such post!");
    }
}
catch(error) {
  console.log(error);
}
}
const getAllMembers = async (user) => {
  try {
    let users = [];
    const { email } = user;
    const userRef = collection(db, "users");
    const q = query(
      userRef,
      orderBy("firstName", "asc")
    );
    const usersSnapshot = await getDocs(q);
    usersSnapshot.forEach((doc) => {
      if(doc.data().email !== email) {
        users.push({
          commentId: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          email: doc.data().email,
          createdAt: doc.data().createdAt,
          imageUrl: doc.data().imageUrl,
          headLine: doc.data().headLine,
        })
      }
    });
    return users;
  } catch (error) {
    console.log(error);
  }
}
const addMemberToMyNetwork = async (user, newMember) => {
  try {
    const { email, firstName, lastName, imageUrl, headLine } = newMember;
    const docRef = doc(db, "users", user.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let myNetwork = [...docSnap.data().myNetworks];
      myNetwork.push({
        firstName, lastName, email, imageUrl, headLine
      });
      const result = await updateDoc(docRef, { myNetworks: [...myNetwork] });
      return result;
    }
  }
  catch(error) {
    console.log('error', error);
  }
  
}
const getUserProfileInfo = async (email) => {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
 } else {
   // doc.data() will be undefined in this case
   console.log("No such document!");
 }
}

export {
  getAllRecommenededCommunities,
  getAllUserMemberCommunityPost,
  myCommunity,
  joinACommunity,
  getAllCommunityPosts,
  commentOnAPost,
  getAPost,
  addNewPost,
  addPostWithImageUpload,
  likeAPost,
  disLikeAPost,
  getAllMembers,
  addMemberToMyNetwork,
  getUserProfileInfo
};
