import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../../api/movies";
import { message, Input, Divider, Row, Col } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { getAllTheatresByMovie } from "../../api/shows";

import moment from "moment";

function SingleMovie() {

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getAllTheatres();
  }, [date]);

  const [movie, setMovie] = useState([]);
  const [theatres, setTheatres] = useState([]);

  const navigate = useNavigate();
  const params = useParams();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const handleDate = (e) => {
    setDate(moment(e.target.value).format("YYYY-MM-DD"));
    navigate(`/movie/${params.id}?date=${e.target.value}`);
  };

  const getData = async () => {
    try {
      const response = await getMovieById(params.id);
      if (response.success) {
        setMovie(response.data);
        console.log(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const getAllTheatres = async () => {
    try {
      const response = await getAllTheatresByMovie({ movie: params.id, date });
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.err(err.message);
    }
  };

  return (
    <div >
      {movie && (
        <div>
          <div>
            <img src={movie.poster} width={150} alt="Movie Poster" />
          </div>
          <div>
            <h1>{movie.title}</h1>
            <p>
              Language: <span>{movie.language}</span>
            </p>
            <p>
              Genre: <span>{movie.genre}</span>
            </p>
            <p>
              Release Date:{" "}
              <span>{moment(movie.date).format("MMM Do YYYY")}</span>
            </p>
            <p>
              Duration: <span>{movie.duration} Minutes</span>
            </p>
            <hr />

            <div >
              <label>Choose the date:</label>
              <Input
                onChange={handleDate}
                type="date"
                value={date}
                placeholder="default size"
                prefix={<CalendarOutlined />}
              />
            </div>
          </div>
        </div>
      )}

      {theatres.length > 0 && (
        <div >
          <h2>Theatres</h2>
          {theatres.map((theatre) => {
            return (
              <div key={theatre._id}>
                <Row gutter={24} key={theatre._id}>
                  <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                    <h3>{theatre.name}</h3>
                    <p>{theatre.address}</p>
                  </Col>
                  <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                    <ul >
                      {theatre.shows
                        .sort(
                          (a, b) =>
                            moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                        )
                        .map((singleShow) => {
                          return (
                            <li
                              key={singleShow._id}
                              onClick={() =>
                                navigate(`/book-show/${singleShow._id}`)
                              }
                            >
                              {moment(singleShow.time, "HH:mm").format(
                                "hh:mm A"
                              )}
                            </li>
                          );
                        })}
                    </ul>
                  </Col>
                </Row>
                <Divider />
              </div>
            );
          })}
        </div>
      )}

    </div>
  )
}

export default SingleMovie;