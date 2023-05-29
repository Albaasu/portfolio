import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';

import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';

// IconButtonの拡張コンポーネント
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TweetBox() {
  const [favo, setFavo] = React.useState(false);
  const [posts, setPosts] = React.useState<any[]>([]);
  const [user] = useAuthState(auth);

  // いいね色
  const handleFavo = () => {
    setFavo(!favo);
  };

  React.useEffect(() => {
    if (!user) return;

    const postsRef = collection(db, 'users', user.uid, 'posts');
    const unsubscribe = onSnapshot(postsRef, (snapshot) => {
      const listPosts: any[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const post = {
          id: doc.id,
          ...data,
        };
        listPosts.push(post);
      });
      setPosts(listPosts);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const formatText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <Typography
        variant='subtitle1'
        color='.MuiTab-labelIcon'
        sx={{ px: 3 }}
        key={index}
      >
        {line}
        <br />
      </Typography>
    ));
  };

  return (
    <>
      {posts.map((post: any) => (
        <Box
          sx={{
            backgroundColor: '#f1f1f1',
            padding: '1rem',
            maxWidth: 733,
            minWidth: 733,
          }}
          key={post.id}
        >
          <Card>
            <CardHeader
              sx={{ marginBottom: -2 }}
              avatar={
                <Avatar sx={{ bgcolor: 'lightblue' }} aria-label='recipe'>
                  K
                </Avatar>
              }
              action={
                <IconButton aria-label='settings'>
                  <DeleteIcon sx={{ color: red[500] }} />
                </IconButton>
              }
              title='ユーザー名'
              subheader='2023年9月14日'
            />
            <CardContent>{formatText(post.detail)}</CardContent>
            {post.imageUrl && (
              <CardMedia
                sx={{
                  p: 1,
                  borderRadius: 3,
                  objectFit: 'contain',
                  maxWidth: 600,
                  maxHeight: 500, // 画像の最大高さを700に
                }}
                component='img'
                image={post.imageUrl}
                alt='Paella dish'
              />
            )}
            <CardActions disableSpacing>
              <IconButton aria-label='コメント' sx={{ mx: 2 }}>
                <ChatBubbleIcon />
              </IconButton>
              <IconButton
                aria-label='いいね'
                onClick={handleFavo}
                color={favo ? 'secondary' : 'default'}
              >
                {favo ? (
                  <FavoriteIcon sx={{ color: red[500] }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </CardActions>
          </Card>
        </Box>
      ))}
    </>
  );
}
