import React from "react";
import { useState, useEffect } from "react";
import Header from "../../common/header/Header";
import "./Details.css";
import Typography from "@material-ui/core/Typography";
import YouTube from "react-youtube";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Link } from "react-router-dom";

export default function Details(props) {
  const [movie, setMovie] = useState(null);
  const getMovieDetail = async (queryParams = "") => {
    const rawResponse = await fetch(
      `http://localhost:8085/api/v1/movies/${props.match.params.id}`
    );
    const data = await rawResponse.json();
    setMovie(data);
  };
  useEffect(() => {
    getMovieDetail();
  }, []);
  const opts = {
    height: "300",
    width: "700",
    playerVars: {
      autoplay: 1,
    },
  };

  const [starIcons, setStar] = useState([
    {
      id: 1,
      stateId: "star1",
      color: "black",
    },
    {
      id: 2,
      stateId: "star2",
      color: "black",
    },
    {
      id: 3,
      stateId: "star3",
      color: "black",
    },
    {
      id: 4,
      stateId: "star4",
      color: "black",
    },
    {
      id: 5,
      stateId: "star5",
      color: "black",
    },
  ]);
  const starClickHandler = (e, id) => {
    let selectedStars = [...starIcons];
    selectedStars.map((star) => {
      if (star.id <= id) {
        star.color = "yellow";
      } else {
        star.color = "black";
      }
    });
    setStar(selectedStars);
  };

  const bookShowHandler =()=>{
    props.history.push(`/bookshow/${props.match.params.id}`)
  }
  return (
    <div>
      <Header isMoviePage={true} bookShowHandler={bookShowHandler}/>
      <div>
        <Typography>
          <Link to='/'> &#60; Back to Home</Link>
        </Typography>
      </div>
      {movie && (
        <section className='details-container'>
          <aside className='leftDetails'>
            <img src={movie.poster_url} alt={movie.title} />
          </aside>
          <article className='middleDetails'>
            <div>
              <Typography variant='headline' component='h2'>
                {movie.title}{" "}
              </Typography>
            </div>
            <br />
            <div>
              <Typography>
                <span className='bold'>Genres: </span> {movie.genres.join(", ")}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className='bold'>Duration:</span> {movie.duration}{" "}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className='bold'>Release Date:</span>{" "}
                {new Date(movie.release_date).toDateString()}{" "}
              </Typography>
            </div>
            <div>
              <Typography>
                <span className='bold'> Rating:</span> {movie.critics_rating}{" "}
              </Typography>
            </div>
            <div className='marginTop16'>
              <Typography>
                <span className='bold'>Plot:</span>{" "}
                <a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline}{" "}
              </Typography>
            </div>
            <div className='trailerContainer'>
              <Typography>
                <span className='bold'>Trailer:</span>
              </Typography>
              <YouTube
                videoId={movie.trailer_url.split("?v=")[1]}
                opts={opts}
              />
            </div>
          </article>
          <aside className='rightDetails'>
            <Typography>
              <span className='bold'>Rate this movie: </span>
            </Typography>
            <div className='review-wrap'>
              {starIcons.map((star) => (
                <StarBorderIcon
                  className={star.color}
                  key={"star" + star.id}
                  onClick={(e) => starClickHandler(e, star.id)}
                />
              ))}
            </div>

            <div className='bold marginBottom16 marginTop16'>
              <Typography>
                <span className='bold'>Artists:</span>
              </Typography>
            </div>
            <div className='paddingRight'>
              <GridList cellHeight={160} cols={2}>
                {movie.artists != null &&
                  movie.artists.map((artist) => (
                    <GridListTile
                      className='gridTile'
                      onClick={() => this.artistClickHandler(artist.wiki_url)}
                      key={artist.id}
                    >
                      <img
                        src={artist.profile_url}
                        alt={artist.first_name + " " + artist.last_name}
                      />
                      <GridListTileBar
                        title={artist.first_name + " " + artist.last_name}
                      />
                    </GridListTile>
                  ))}
              </GridList>
            </div>
          </aside>
        </section>
      )}
    </div>
  );
}
