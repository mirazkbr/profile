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

  useEffect(() => {
    // Retrieve cover and profile URLs from Firebase on component mount
    const coverRef = dbRef(db, 'cover/img');
    get(coverRef).then((snapshot) => {
      if (snapshot.exists()) {
        setCoverUrl(snapshot.val());
      }
    });

    const profileRef = dbRef(db, 'profile/img');
    get(profileRef).then((snapshot) => {
      if (snapshot.exists()) {
        setProfileUrl(snapshot.val());
      }
    });
  }, [db]);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleModalToggle = () => {
    setShow(!show);
    document.body.style.overflow = show ? 'auto' : 'hidden';
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    const storageRefCover = sref(storageRef, 'cover/');

    uploadBytes(storageRefCover, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        set(dbRef(db, 'cover/img'), downloadURL);
        setCoverUrl(downloadURL);
      });
    });
  };

  const handleCoverUpload = () => {
    handleModalToggle();
  };

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    const storageRefPro = sref(storageRef, 'profile/');

    uploadBytes(storageRefPro, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        set(dbRef(db, 'profile/img'), downloadURL);
        setProfileUrl(downloadURL);
      });
    });
  };

  const handleProfileUpload = () => {
    handleModalToggle();
  };

  return (
    <div>
      <div className="w-full h-full flex justify-center bg-slate-100">
        <div className="w-[600px] h-full">
          <div className="relative">
            <div className="w-full h-[200px] relative">
              <img src={coverUrl || cover} alt="" className="w-full h-full object-cover" />
              <button onMouseUp={handleEdit}>
                <MdEdit className="absolute top-[12px] right-[12px] z-10 text-black text-[25px] bg-white rounded-full" />
              </button>
              {edit && (
                <button onMouseUp={handleModalToggle}>
                  <MdAddPhotoAlternate className="absolute bottom-[12px] right-[12px] z-10 text-black text-[25px]" />
                </button>
              )}
              {show && (
                <div>
                  <div className="modal fixed top-0 left-0 w-full h-screen bg-[#00000080] z-20 flex justify-center items-center">
                    <div className="modal-content w-[500px] h-[500px] bg-white">
                      <label htmlFor="cover"></label>
                      <input type="file" id="cover" onChange={handleCoverChange} />
                      <button onMouseUp={handleCoverUpload}>Upload Cover</button>
                      <button onMouseUp={handleModalToggle}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="w-[100px] h-[100px] absolute bottom-[-25%] left-[42%] z-10">
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-white border-4 relative">
                <img src={profileUrl || pro} alt="" className="w-full h-full object-cover object-center" />
              </div>
              {edit && (
                <button onMouseUp={handleModalToggle} className="w-auto h-auto">
                  <MdAddPhotoAlternate className="absolute bottom-[14px] right-[-1px] z-10 text-black text-[25px] cursor-pointer" />
                </button>
              )}
              {show && (
                <div>
                  <div className="modal fixed top-0 left-0 w-full h-screen bg-[#00000080] z-20 flex justify-center items-center">
                    <div className="modal-content w-[500px] h-[500px] bg-white">
                      <label htmlFor="profile"></label>
                      <input type="file" id="profile" onChange={handleProfileChange} />
                      <button onMouseUp={handleProfileUpload}>Upload Profile</button>
                      <button onMouseUp={handleModalToggle}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-center">
            <div className="pt-[50px]">
              <h1 className="text-3xl font-bold">John Doe</h1>
              <p>Email</p>
            </div>
          </div>
          <div className="Feeds-wrapper">
            <div className="head-wrapper py-4 flex justify-between">
              <h3 className="text-[20px] font-bold uppercase text-left">My Feeds</h3>
              <div className="flex">
                <p className="text-[20px] font-bold capitalize">Create a post</p>
                <button className="text-[25px] font-black px-3">
                  <AiOutlinePlus className="font-black" />
                </button>
              </div>
            </div>
            <div className="feeds">
              <div className="feed-card w-auto h-[600px] bg-white mb-4">
                <img
                  className="w-full h-full object-contain"
                  src="https://images.pexels.com/photos/1787235/pexels-photo-1787235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

