import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnimeDetails } from '../actions/animeAction';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import {
  Card,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  Paper,
  Rating,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import { PlayArrow, Star } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer } from 'react-toastify';

function Details() {
  const { id } = useParams();
  const anime = useSelector((state) => state.anime);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    loading: true,
    details: {},
  });

  useEffect(() => {
    dispatch(fetchAnimeDetails(id));
  }, []);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      loading: anime?.loading ?? {},
      details: anime?.animeDetails ?? {},
    }));
  }, [anime]);

  return (
    <div className="Details">
      <ToastContainer />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => window.history.back()}
            >
              <ArrowBackIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="container mt-5">
        {state?.loading ?
          <>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </>
          :
          <>
            <div className="row">
              <div className="col-md-4">
                <Card elevation={3}>
                  <CardMedia
                    component="img"
                    image={state.details?.images?.jpg.large_image_url}
                    alt={state.details?.title}
                    sx={{ width: '100%', height: 'auto' }}
                  />
                </Card>
              </div>
              <div className="col-md-8 d-flex flex-column" style={{ minHeight: '100%' }}>
                <div className="flex-grow-1">
                  <div className="row mt-3">
                    <div className="col-12">
                      <Typography variant="h4" >
                        {state.details?.title_english}
                      </Typography>
                      <Typography variant="h5" color="text.secondary" gutterBottom>
                        {state.details?.title_japanese}
                      </Typography>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12 rating-div">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Star sx={{ color: 'gold' }} />
                        <Typography variant="h6" fontWeight="bold">
                          {state.details?.score}
                        </Typography>
                        <Rating
                          value={state.details?.score / 2}
                          precision={0.25}
                          readOnly
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">Rank</Typography>
                        <Typography variant="h6" fontWeight="bold">#{state.details?.rank}</Typography>
                      </Paper>
                    </div>
                    <div className="col-md-4">
                      <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">Popularity</Typography>
                        <Typography variant="h6" fontWeight="bold">#{state.details?.popularity}</Typography>
                      </Paper>
                    </div>
                    <div className="col-md-4">
                      <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">Type</Typography>
                        <Typography variant="h6" fontWeight="bold">{state.details?.type}</Typography>
                      </Paper>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12">
                      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                        Genres
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                        {!_.isEmpty(state.details?.genres) && state.details?.genres?.map((genre, index) => (
                          <Chip
                            key={index}
                            label={genre.name}
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                        {!_.isEmpty(state.details?.themes) &&state.details?.themes?.map((theme, index) => (
                          <Chip
                            key={index}
                            label={theme.name}
                            color="secondary"
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-12">
                      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                        Rating
                      </Typography>
                      <Chip
                        label={state.details?.rating}
                        color="error"
                        variant="filled"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      onClick={() => window.open(state.details?.url, '_blank')}
                      startIcon={<PlayArrow />}
                      sx={{ py: 1.5 }}
                    >
                      Watch Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row mt-3">
              <div className="col-12">
                <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                  Synopsis
                </Typography>
                <Typography variant="body1" paragraph style={{ whiteSpace: 'pre-line' }}>
                  {state.details?.synopsis}
                </Typography>
              </div>
            </div>
          </>
        }
      </div>
    </div>
  );
}

export default Details;
