import React, { useEffect, useState } from 'react';
import Bottombar from '@/components/organisms/Bottombar';
import TopHeader from '@/components/organisms/TopHeader';
import { TextField, Avatar, Box, Alert, CircularProgress } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { auth, db, storage } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import MediButton from '@/components/atoms/MediButton';
import MediTextArea from '@/components/atoms/MediTextArea';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

const Settings = () => {
  const user: any = auth.currentUser;
  const [userName, setUserName] = useState(user?.displayName || '');

  const [photoUrl, setPhotoUrl] = useState(user?.photoURL || '');
  const [users, setUsers] = useState<any>(null);
  const [userLoaded, setUserLoaded] = useState(false); // ユーザーが読み込まれたかどうかのフラグ
  const [completed, setCompleted] = useState<string | null>(null);
  const [errorName, setErrorName] = useState<string | null>(null);
  const [userNoname, setUserNoname] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(true);
      setUsers(user);
      setUserLoaded(true);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // プロフィール画像の選択
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setSelectedImage(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  const updateAllPost = async () => {
    // postsコレクションのドキュメントの中でuidがログインユーザーのuidと一致するものを取得
    const q = query(collection(db, "posts"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        updateDoc(doc.ref, {
          userName: user.displayName,
          avatar: user.photoURL,
        });
      }
    });
  };

  // ユーザー更新
  const handleUpdateProfile = async () :Promise<void> => {
    if (!userName) {
setUserName(user.displayName)
      return;
    }
    if (userName && selectedImage) {
      const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
      await uploadBytes(storageRef, selectedImage);
      const url = await getDownloadURL(storageRef);
      await updateProfile(user, {
        displayName: userName,
        photoURL: url,
      });
      await updateAllPost();
      setCompleted("プロフィールを更新しました");
    } else if (userName && !selectedImage) {
      await updateProfile(user, {
        displayName: userName,
      });
      await updateAllPost();

      setCompleted("プロフィールを更新しました");
    } else if (!userName && selectedImage) {
      const storageRef = ref(storage, `users/${user.uid}/profile.jpg`);
      await uploadBytes(storageRef, selectedImage);
      const url = await getDownloadURL(storageRef);
      await updateProfile(user, {
        photoURL: url,
      });
      await updateAllPost();
      setCompleted("プロフィールを更新しました");
    }
  };
  return (
    <>
        <TopHeader />
    {isLoading?
      (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <CircularProgress />
        </div>
      )
    :
    (
      <>

      <Box
        sx={{
          marginTop: '64px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <label htmlFor='file'>
            <input
              type='file'
              name='file'
              id='file'
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <Avatar
              src={previewImage || photoUrl}
              sx={{
                width: '100px',
                height: '100px',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: '0.3s',
                },
                mt: 2,
                ml: 2,
                mb: 1,
              }}
            >
              <AddPhotoAlternateIcon />
            </Avatar>
          </label>
  
          <div>
            <MediTextArea
              type='text'
              sx={{ width: '300px', my: 2 }}
              label={user?.displayName || 'No Name'}
              onChange={(e) => setUserName(e.target.value)}
            ></MediTextArea>
          </div>
          {completed && (
            <Box sx={{ display: 'flex', flexDirection: 'column', my: 2 }}>
              {completed.split('\n').map((message, index) => (
                <Alert key={index} severity='success' sx={{ my: 1 }}>
                  {message}
                </Alert>
              ))}
            </Box>
          )}
          {errorName && <Alert severity='error'>{errorName}</Alert>}
          <div>
            <MediButton onClick={handleUpdateProfile}>更新</MediButton>
          </div>
        </Box>
      </Box>
</>
    )
  }
  <Bottombar />
    </>
  );
};

export default Settings;
