import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { getTour } from '../../services/tour';
import { bookTour } from '../../services/stripe';
import { displayMap } from '../../services/mapbox';
import users from '../../dev-data/data/users.json';
import tours from '../../dev-data/data/tours.json';
import reviews from '../../dev-data/data/reviews.json';

// 评论卡片组件（对应 mixin reviewCard）
function ReviewCard({ review }) {
  const cur_review = review;
  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img
          className="reviews__avatar-img"
          src={`/img/users/${cur_review.user.photo}`}
          alt={cur_review.user.name}
        />
        <h6 className="reviews__user">{cur_review.user.name}</h6>
      </div>
      <p className="reviews__text">{cur_review.review}</p>
      <div className="reviews__rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`reviews__star reviews__star--${
              cur_review.rating >= star ? 'active' : 'inactive'
            }`}
          >
            <use xlinkHref="/img/icons.svg#icon-star" />
          </svg>
        ))}
      </div>
    </div>
  );
}

// 概览信息组件（对应 mixin overviewBox）
function OverviewBox({ label, text, icon }) {
  return (
    <div className="overview-box__detail">
      <svg className="overview-box__icon">
        <use xlinkHref={`/img/icons.svg#icon-${icon}`} />
      </svg>
      <span className="overview-box__label">{label}</span>
      <span className="overview-box__text">{text}</span>
    </div>
  );
}

// 主组件
function Tour() {
  const tour = useLoaderData();
  const user = useSelector((state) => state.userTour);

  useEffect(() => {
    console.log('loading map....');

    // loading map....
    displayMap(tour.locations);
  }, [tour]);

  // 处理日期格式化
  const date = new Date(tour.startDates[0]).toLocaleString('en-us', {
    month: 'long',
    year: 'numeric',
  });

  async function handleBookTour(e) {
    e.target.textContent = 'Processing...';

    if (!tour.id) return;

    bookTour(tour.id);
  }

  // 分割描述文本为段落
  const paragraphs = tour.description.split('\n');

  return (
    <>
      {/* 头部区域 */}
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img
            className="header__hero-img"
            src={`/img/tours/${tour.imageCover}`}
            alt={tour.name}
          />
        </div>

        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{`${tour.name} tour`}</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-clock" />
              </svg>
              <span className="heading-box__text">{`${tour.duration} days`}</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons.svg#icon-map-pin" />
              </svg>
              <span className="heading-box__text">
                {tour.startLocation.description}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 描述区域 */}
      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>

              <OverviewBox label="Next date" text={date} icon="calendar" />
              <OverviewBox
                label="Difficulty"
                text={tour.difficulty}
                icon="trending-up"
              />
              <OverviewBox
                label="Participants"
                text={`${tour.maxGroupSize} people`}
                icon="user"
              />
              <OverviewBox
                label="Rating"
                text={`${tour.ratingsAverage} / 5`}
                icon="star"
              />
            </div>

            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>

              {tour.guides.map((guide, index) => (
                <div key={index} className="overview-box__detail">
                  <img
                    className="overview-box__img"
                    src={`/img/users/${guide.photo}`}
                    alt={guide.name}
                  />
                  <span className="overview-box__label">
                    {guide.role === 'lead-guide' ? 'Lead guide' : 'Tour guide'}
                  </span>
                  <span className="overview-box__text">{guide.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">{`About ${tour.name} tour`}</h2>
          {paragraphs.map((p, index) => (
            <p key={index} className="description__text">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* 图片展示区域 */}
      <section className="section-pictures">
        {tour.images.map((img, i) => (
          <div key={i} className="picture-box">
            <img
              className={`picture-box__img picture-box__img--${i + 1}`}
              src={`/img/tours/${img}`}
              alt={`The Park Camper Tour ${i + 1}`}
            />
          </div>
        ))}
      </section>

      {/* 地图区域 */}
      <section className="section-map">
        <div id="map" />
      </section>

      {/* 评论区域 */}
      <section className="section-reviews">
        <div className="reviews">
          {tour.reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </section>

      {/* 行动召唤区域 */}
      <section className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo">
            <img src="/img/logo-white.png" alt="Natours logo" />
          </div>
          <img
            className="cta__img cta__img--1"
            src={`/img/tours/${tour.images[1]}`}
            alt="Tour picture1"
          />
          <img
            className="cta__img cta__img--2"
            src={`/img/tours/${tour.images[2]}`}
            alt="Tour picture2"
          />
          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">
              {`${tour.duration} days. 1 adventure. Infinite memories. Make it yours today!`}
            </p>

            {user.name !== '' && user.email !== '' ? (
              <button
                className="btn btn--green span-all-rows"
                id="book-tour"
                onClick={(e) => handleBookTour(e)}
              >
                Book tour now!
              </button>
            ) : (
              <a className="btn btn--green span-all-rows" href="/login">
                Log in to book tour
              </a>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export async function loader({ params }) {
  const tour = await getTour(params.slug);
  return tour;
}

export default Tour;
