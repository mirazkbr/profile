import React, { useState, useEffect } from 'react';
import cover from '../src/assets/cover.jpg';
import pro from '../src/assets/profile.jpg';
import { MdEdit, MdAddPhotoAlternate } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  getStorage,
  ref as sref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { getDatabase, set, ref as dbRef, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Replace with your Firebase configuration
import storage from '../src/config/firebaseConfig';

const App = () => {
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [coverUrl, setCoverUrl] = useState('');
  const [profileUrl, setProfileUrl] = useState('');

  const storageRef = getStorage();
  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    // Fetch user's profile data from Firebase Authentication
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setProfileUrl(user.photoURL || pro);
        // You can also fetch other profile details if needed
      }
    });

    return () => {
      // Unsubscribe the auth state observer when the component unmounts
      unsubscribe();
    }
  }, [auth]);

  useEffect(() => {
    // Retrieve cover URL from Firebase Realtime Database on component mount
    const coverRef = dbRef(db, 'cover/img');
    get(coverRef).then((snapshot) => {
      const coverImgUrl = snapshot.val();
      setCoverUrl(coverImgUrl || cover);
    });
  }, [db]);

  const handleEdit = () => {
    setEdit(!edit);
  };

  // ... (rest of the code)

  return (
    <div>
      {/* ... (rest of the code) */}
    </div>
  );
};

export default App;
