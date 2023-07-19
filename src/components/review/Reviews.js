import { useEffect, useRef } from "react"
import api from '../../api/axiosConfig';
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from './ReviewForm';
import './Review.css';

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {
  
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;

  useEffect(() => {
    getMovieData(movieId);
  },[])

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;
    console.log('rev: ', rev);

    try {
      const response = await api.post('/api/v1/reviews', {
        reviewBody: rev.value,
        imdbId: movieId
      });
  
      // update the state of the reviews array on the client side
      // not using data returned from the server
      const updatedReviews = [...reviews, {body: rev.value}];
      rev.value = "";
      setReviews(updatedReviews);
    } catch(err) {
      console.error(err);
    }
  }
  
  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col xs sm="12" md="auto">
          <img src={movie?.poster} alt="" className="review-image" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm 
                    handleSubmit={addReview}
                    revText={revText}
                    labelText="Wrtie a Review?"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {
            reviews?.map((r) => {
              return (
                <>
                  <Row>
                    <Col>{r.body}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <hr />
                    </Col>
                  </Row>
                </>
              )
            })
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Reviews