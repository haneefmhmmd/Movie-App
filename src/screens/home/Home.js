import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    flexWrap: "nowrap",
    overflowX: "auto",
  },
  gridListMain: {
    transform: "translateZ(0)",
    cursor: "pointer",
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240,
    maxWidth: 240,
  },
  title: {
    color: theme.palette.primary.light,
  },
});

function Home(props) {
  const { classes } = props;

  const [releasedMovies, setReleasedMovies] = useState([]);
  const [genresList, setGenresList] = useState([]);
  const [artistsList, setArtistsList] = useState([]);
  const [filter, setFilter] = useState({
      movie_name : '',
      genres : [],
      artists : [],
      release_date_start : '',
      release_date_end : '',
  });


  const upcomingMovies = [
    {
      id: "1",
      title: "Example Movie 1",
      poster_url: "https://via.placeholder.com/250",
    },
    {
      id: "2",
      title: "Example Movie 2",
      poster_url: "https://via.placeholder.com/250",
    },
    {
      id: "3",
      title: "Example Movie 3",
      poster_url: "https://via.placeholder.com/250",
    },
    {
      id: "4",
      title: "Example Movie 4",
      poster_url: "https://via.placeholder.com/250",
    },
    {
      id: "5",
      title: "Example Movie 5",
      poster_url: "https://via.placeholder.com/250",
    },
    {
      id: "6",
      title: "Example Movie 6",
      poster_url: "https://via.placeholder.com/250",
    },
  ];
  const getMovies = async (queryParams = '') => {
    const rawResponse = await fetch(`http://localhost:8085/api/v1/movies${queryParams}`);
    const data = await rawResponse.json();
    setReleasedMovies(data.movies);
  };
  const getGenres = async () => {
    const rawResponse = await fetch("http://localhost:8085/api/v1/genres");
    const data = await rawResponse.json();
    setGenresList(data.genres);
  };

  const getArtists = async () => {
    const rawResponse = await fetch("http://localhost:8085/api/v1/artists");
    const data = await rawResponse.json();
    setArtistsList(data.artists);
  };

  useEffect(() => {
    getMovies();
  }, []);
  useEffect(() => {
    getGenres();
  }, []);
  useEffect(() => {
    getArtists();
  }, []);

  const movieClickHandler = (id) => {
    props.history.push('/movie/' + id);
  };

  const filterHandler = (e)=>{
      const newFilterState = {...filter};
      newFilterState[e.target.name] = e.target.value;
      setFilter(newFilterState);
  }


  const filterBtnClickHandler = ()=>{

    let queryString = "?status=RELEASED";
    if (filter.movie_name !== "") {
        queryString += "&title=" + filter.movieName;
    }
    if (filter.genres.length > 0) {
        queryString += "&genres=" + filter.genres.toString();
    }
    if (filter.artists.length > 0) {
        queryString += "&artists=" + filter.artists.toString();
    }
    if (filter.release_date_start !== "") {
        queryString += "&start_date=" + filter.releaseDateStart;
    }
    if (filter.release_date_end !== "") {
        queryString += "&end_date=" + filter.releaseDateEnd;
    }
    getMovies(queryString);
  }

  

  return (
    <main>
      <Header />
      <section className='home-header'>Upcoming Movies</section>
      <GridList cols={5} className={classes.root}>
        {upcomingMovies.map((movie) => (
          <GridListTile key={"upcoming" + movie.id}>
            <img
              src={movie.poster_url}
              className='movie-poster'
              alt={movie.title}
            />
            <GridListTileBar title={movie.title} />
          </GridListTile>
        ))}
      </GridList>
      <section className='twoColoumnLayout'>
        <article>
          <GridList cellHeight={350} cols={4} className={classes.gridListMain}>
            {releasedMovies.map((movie) => (
              <GridListTile
                onClick={() => movieClickHandler(movie.id)}
                className='released-movie-grid-item'
                key={"grid" + movie.id}
              >
                <img
                  src={movie.poster_url}
                  className='movie-poster'
                  alt={movie.title}
                />
                <GridListTileBar
                  title={movie.title}
                  subtitle={
                    <span>
                      Release Date:{" "}
                      {new Date(movie.release_date).toDateString()}
                    </span>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </article>
        <aside>
          <Card>
            <CardContent>
              <FormControl className={classes.formControl}>
                <Typography className={classes.title} color='textSecondary'>
                  FIND MOVIES BY:
                </Typography>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor='movieName'>Movie Name</InputLabel>
                <Input id='movieName' name="movie_name" onChange={filterHandler} />
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor='select-multiple-checkbox'>
                  Genres
                </InputLabel>
                <Select
                  multiple
                  input={<Input id='select-multiple-checkbox-genre' />}
                  renderValue={(selected) => selected.join(",")}
                  value={filter.genres}
                  name="genres"
                  onChange={filterHandler}
                >
                  {genresList.map((genre) => (
                    <MenuItem key={genre.id} value={genre.genre}>
                      <Checkbox
                        checked={filter.genres.indexOf(genre.genre) > -1}
                      />
                      <ListItemText primary={genre.genre} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor='select-multiple-checkbox'>
                  Artists
                </InputLabel>
                <Select
                  multiple
                  input={<Input id='select-multiple-checkbox' />}
                  renderValue={(selected) => selected.join(",")}
                  value={filter.artists}
                  onChange={filterHandler}
                  name="artists"
                >
                  {artistsList.map((artist) => (
                    <MenuItem
                      key={artist.id}
                      value={artist.first_name + " " + artist.last_name}
                    >
                      <Checkbox
                        checked={
                          filter.artists.indexOf(
                            artist.first_name + " " + artist.last_name
                          ) > -1
                        }
                      />
                      <ListItemText
                        primary={artist.first_name + " " + artist.last_name}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  id='releaseDateStart'
                  label='Release Date Start'
                  type='date'
                  defaultValue=''
                  InputLabelProps={{ shrink: true }}
                  onChange={filterHandler}
                  name="release_date_start"
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <TextField
                  id='releaseDateEnd'
                  label='Release Date End'
                  type='date'
                  defaultValue=''
                  InputLabelProps={{ shrink: true }}
                  onChange={filterHandler}
                  name="release_date_end"
                />
              </FormControl>
              <br />
              <br />
              <FormControl className={classes.formControl}>
                <Button
                  onClick={filterBtnClickHandler}
                  variant='contained'
                  color='primary'
                >
                  APPLY
                </Button>
              </FormControl>
            </CardContent>
          </Card>
        </aside>
      </section>
    </main>
  );
}

export default withStyles(styles)(Home);
