import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { format } from "date-fns";
import { validateLoginData, validateSignupData } from "../util/validators";

const signIn = async (user) => {
  try {
    const { valid, errors } = validateLoginData(user);
    if (!valid) {
      return errors;
    }
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    const { email, accessToken, emailVerified } = userCredentials.user;
    if(emailVerified) {
      setAuthorizationHeader(accessToken);
      const docRef = doc(db, "users", email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const user = docSnap.data()
        if(user.status !=='active'){
          throw Error('User does not enough privillege to login, contact Admin')
        }
        const updateData = {
          lastLogin: format(new Date(), 'MMM dd, yyyy hh:mm a '),
          emailVerified: true
        }
        await updateDoc(docRef, updateData)
        return {...docSnap.data(), ...updateData}
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } else {
      throw Error("user email not verified");
    }
   
  } catch (error) {
    console.log('error-catch', error);
    throw(error);
  }
};

const signUpUserWithEmail = async (newUser) => {
  try {
  const { valid, errors } = validateSignupData(newUser);
  const noImg = "no-img.png";
  if (!valid) {
    return errors;
  }
    const userCred = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
    const result = await sendEmailVerification(auth.currentUser, {
      url: "https://bgc-functions.web.app/login",
    });
    console.log("email", result);
    const { email, uid } = userCred.user;
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      const userCredentials = {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        profileInfo: newUser.profileInfo,
        createdAt: new Date().toISOString(),
        //TODO Append token to imageUrl. Work around just add token from image in storage.
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/${noImg}?alt=media`,
        userId: uid,
        myNetworks: [],
        userRole: newUser.userRole,
        emailVerified: false,
        status: 'active'
      };
      const results = await setDoc(doc(db, "users", email), userCredentials);
      return results;
        } else {
          return {
            user: userCred.user,
          };
        }
      } catch (e) {
        console.log('error', e);
        throw (e.message);
      }
    }

const signUpAdminWithEmail = async (newUser) => {
  try {
    const { valid, errors } = validateSignupData(newUser);
    const noImg = "no-img.png";
    if (!valid) {
      return errors;
    }
    const userCred = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
    const result = await sendEmailVerification(auth.currentUser, {
      url: "https://bgc-functions.web.app/login",
    });
    // console.log("email", result);
    const { email, uid } = userCred.user;
    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      const userCredentials = {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/${noImg}?alt=media`,
        userId: uid,
        userRole: 'admin-pending'
      };
      const results = await setDoc(doc(db, "users", email), userCredentials);
      return results;
    } else {
      return {
        user: userCred.user,
      };
    }
  } catch (e) {
    console.log('error', e);
    throw (e.message);
  }
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
  };
export { signIn, signUpUserWithEmail, signUpAdminWithEmail };
