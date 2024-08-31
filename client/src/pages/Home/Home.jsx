import { useNavigate } from "react-router-dom";
import { message, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { getAllMovies } from "../../api/movies";
import moment from "moment";

function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await getAllMovies();
      if (response.success) {
        setMovies(response?.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, [])


  return (
    <div>
      <h1>Movies</h1>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {movies &&
          movies.map((movie) => {
            return (
              <Col
                key={movie._id}
                span={{
                  xs: 24,
                  sm: 24,
                  md: 12,
                  lg: 10,
                }}
              >
                <div>
                  <img
                    src={movie.poster}
                    alt="Movie Poster"
                    width={200}
                    style={{ borderRadius: "8px" }}
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                  />
                  <h3>
                    {movie.title}
                  </h3>

                </div>
              </Col>
            )
          })
        }
      </Row>
    </div>
  )
}

export default Home;