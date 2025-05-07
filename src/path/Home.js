import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnimeList } from '../actions/animeAction';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import _ from 'lodash';
import { ToastContainer } from 'react-toastify';
import { Link, useSearchParams } from 'react-router-dom';

const { debounce } = _;

function Home() {
    const anime = useSelector((state) => state.anime);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        loading: true,
        searchInput: searchParams.get('searchInput') ?? null,
        animeData: {},
        animePagination: {},
        limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 10,
        page: searchParams.get('page') ? Number(searchParams.get('page')) : 0,
    });

    const debounced = useRef(debounce((value) => setOutput(value), 600))

    useEffect(() => {
        dispatch(fetchAnimeList({
            searchValue: state.searchInput,
            limit: state.limit,
            page: state.page + 1,
        }));
    }, []);

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            loading: anime?.loading,
            animeData: anime?.animeList ?? {},
            animePagination: anime?.animePagination ?? {},
        }));
    }, [anime]);

    useEffect(() => {
        setSearchParams({
            searchInput: state.searchInput,
            limit: state.limit,
            page: state.page
        }, { replace: true });
    }, [state.searchInput, state.limit, state.page]);

    const updateSearchValue = useCallback(({ target: { value } }) => {
        setState((prevState) => ({
            ...prevState,
            searchInput: value,
            page: 0,
        }));
        debounced.current(value);
    }, []);

    const setOutput = (value) => {
        if (value) {
            dispatch(fetchAnimeList({
                searchValue: value,
                limit: state.limit,
                page: state.page + 1,
            }));
        } else {
            dispatch(fetchAnimeList({
                limit: state.limit,
                page: state.page + 1,
            }));
        }
    }

    const handlePageChange = (event, newPage) => {
        let searchPage = newPage + 1;
        dispatch(fetchAnimeList({
            searchValue: state.searchInput,
            limit: state.limit,
            page: searchPage,
        }));
        setState((prevState) => ({
            ...prevState,
            page: newPage,
        }));
    };

    const handleLimitChange = (event) => {
        let limit = parseInt(event.target.value, 10);
        dispatch(fetchAnimeList({
            searchValue: state.searchInput,
            limit,
            page: 1,
        }));
        setState((prevState) => ({
            ...prevState,
            limit,
            page: 0,
        }));
    };

    return (
        <div className="App">
            <ToastContainer />
            <div className="container">
                <div className="row">
                    <div className="col-12 search-bar mt-5">
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100vh' }}
                            onSubmit={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search"
                                onChange={updateSearchValue}
                                value={state.searchInput}
                            />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </div>
                    <div className="col-12 mt-3">
                        {state?.loading ?
                            <>
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                                <Skeleton animation="wave" />
                            </> :
                            <div className="row ">
                                <div className="col-12 mt-3">
                                    {!_.isEmpty(state.animePagination) ? <TablePagination
                                        component="div"
                                        count={state.animePagination?.items?.total}
                                        page={state.page}
                                        onPageChange={handlePageChange}
                                        rowsPerPage={state.limit}
                                        onRowsPerPageChange={handleLimitChange}
                                        rowsPerPageOptions={[5, 10, 15, 20, 25]}
                                    /> : null}
                                </div>
                                {!_.isEmpty(state.animeData) ?
                                    Object.values(state.animeData).map((anime) => {
                                        return <div className="col-3 mb-3 d-flex">
                                            <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                                <Box sx={{ position: 'relative' }}>
                                                    <CardMedia
                                                        component="img"
                                                        alt={anime.title}
                                                        height="300"
                                                        image={anime?.images?.jpg?.image_url}
                                                    />
                                                    {anime?.score ? <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 8,
                                                            right: 8,
                                                            backgroundColor: 'rgba(0,0,0,0.7)',
                                                            color: '#fff',
                                                            borderRadius: '8px',
                                                            padding: '2px 8px',
                                                            fontSize: '1rem',
                                                        }}
                                                    >
                                                        {anime?.score}
                                                    </Box> : null}
                                                    {anime?.type ? <Box
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 8,
                                                            left: 8,
                                                            backgroundColor: 'rgba(0,0,0,0.7)',
                                                            color: '#fff',
                                                            borderRadius: '8px',
                                                            padding: '2px 8px',
                                                            fontSize: '1rem',
                                                        }}
                                                    >
                                                        {anime?.type}
                                                    </Box> : null}
                                                </Box>
                                                <CardContent sx={{ flexGrow: 1 }}>
                                                    {!_.isEmpty(anime?.genres) ?
                                                        <div>
                                                            {Object.values(anime?.genres).map((genre) => {
                                                                return <Chip label={genre?.name} />
                                                            })}
                                                        </div> : null}

                                                    <Typography gutterBottom variant="body1" component="div">
                                                        {anime?.title_japanese}
                                                    </Typography>
                                                    <Typography gutterBottom variant="body1" component="div">
                                                        {anime?.title_english ?? anime?.title}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Link to={`/details/${anime?.mal_id}`}><Button size="small">Learn More</Button></Link>
                                                </CardActions>
                                            </Card>
                                        </div>
                                    })
                                    :
                                    <div className="col-12 text-center">
                                        <img src="https://cdn.dribbble.com/userupload/41743791/file/original-d026ae16cb5f4fbbab99524ad8706ba6.png?resize=800x600" />
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Home;
