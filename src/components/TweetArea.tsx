import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { Box, FormControl, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';

const TweetArea = () => {
  const MAX_CHARACTERS = 500; // 最大文字数の設定

  const handleInputChange = (event: any) => {
    // 入力されたテキストの文字数をチェック
    if (event.target.value.length <= MAX_CHARACTERS) {
      // 最大文字数以下なら入力を許可
      // ここで必要な処理を追加する
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f1f1f1", padding: "1rem" }}>
      <Card sx={{ minWidth: 600, maxWidth: "100%" }}>
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
              placeholder="お前今日なにしたんだよ"
              variant="outlined"
              fullWidth
              multiline
              InputProps={{
                sx: { paddingTop: 0.5, paddingBottom: 0.5 }, // 上下の余白を調整
                endAdornment: (
                  <IconButton aria-label="送信">
                    <SendIcon sx={{ color: "skyblue" }} />
                  </IconButton>
                ),
              }}
              
              inputProps={{ maxLength: MAX_CHARACTERS }} // 最大文字数
              onChange={handleInputChange} // 入力値の変更を監視
            />
            <IconButton aria-label="画像" sx={{mt:1}}>
                <PhotoSizeSelectActualIcon sx={{color:"skyblue"}}/>
            </IconButton>
          </Box>
        </FormControl>
      </Card>
    </Box>
  );
};

export default TweetArea;