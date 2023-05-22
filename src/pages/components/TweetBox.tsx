import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const handleFavo = () => {
    setFavo(!favo);
  };



  return (
    <Box sx={{ backgroundColor: '#f1f1f1', padding: '1rem' }}>
      <Card sx={{ maxWidth: 800, minWidth: 700 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'lightblue' }} aria-label='recipe'>
              K
            </Avatar>
          }
          action={
            <IconButton aria-label='settings'>
              <DeleteIcon sx={{color:red[500]}} />
            </IconButton>
          }
          title='UserName'
          subheader='September 14, 2023'
        />
        <CardContent>
          <Typography variant='subtitle1' color='.MuiTab-labelIcon'sx={{px:3}}>
            つみあげったーの投稿です。
          </Typography>
        </CardContent>
        <CardMedia
          component='img'
          height='100%'
          width="100%"
          image=' https://source.unsplash.com/random'
          alt='Paella dish'
        />
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
  );
}
