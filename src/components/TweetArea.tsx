import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { Box, FormControl, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import { useRecoilState } from "recoil";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase";

const TweetArea = () => {
  const MAX_CHARACTERS = 500; // 最大文字数の設定
  const [detail, setDetail] = useState("");
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const user = auth.currentUser;

  //firebaseにdetail追加
  const addPosts = async (e: any) => {
    e.preventDefault();
    if (detail === "") return;
    try {
      await addDoc(collection(db, "users", user!.uid, "posts"), {
        detail: detail,
        userName: userName,
        avatar: avatar,
      });
      setDetail("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f1f1f1", padding: "1rem" }}>
      <Card sx={{ minWidth: 700, maxWidth: 700, width: "100%" }}>
        <CardHeader
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: -3, // アバターアイコンとの間隔
          }}
          title={
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "lightblue" }} aria-label="recipe">
                  K
                </Avatar>
              }
              title="UserName"
            />
          }
        />
        <FormControl fullWidth>
          <Box sx={{ marginX: 2, my: 1 }}>
            <TextField
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder="お前今日なにしたんだよ"
              variant="outlined"
              fullWidth
              multiline
              InputProps={{
                sx: { paddingTop: 0.5, paddingBottom: 0.5 }, // 上下の余白を調整
                endAdornment: (
                  <IconButton aria-label="送信" onClick={addPosts}>
                    <SendIcon sx={{ color: "skyblue" }} />
                  </IconButton>
                ),
              }}
              inputProps={{ maxLength: MAX_CHARACTERS }} // 最大文字数
            />

            <IconButton aria-label="画像" sx={{ mt: 1 }}>
              <PhotoSizeSelectActualIcon sx={{ color: "skyblue" }} />
            </IconButton>
          </Box>
        </FormControl>
      </Card>
    </Box>
  );
};

export default TweetArea;