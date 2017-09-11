export const parse = $ => {
  const ratingContainer = $('#acrPopover').attr('title');
  const hasAnyReviews = ratingContainer && typeof ratingContainer.replace === 'function';

  if (hasAnyReviews) {
    const rating = ratingContainer;
    const ratingAverage = parseFloat(rating.replace(/,/g, ''));
    // for some reason this is duplicated.
    const textRaw = $('#acrCustomerReviewLink #acrCustomerReviewText')
      .text()
      .trim();

    // "675 customer reviews"
    const text = textRaw.slice(0, textRaw.length / 2);
    const count = parseInt(text.replace(/,/g, ''));
    return {
      text,
      count,
      rating,
      ratingAverage,
    };
  } else {
    return {
      text: 'Zero Customer Reviews',
      count: 0,
      rating: 'Not Applicable',
      ratingAverage: 0.0,
    };
  }
};

export const expectation = {
  count: 0,
  rating: 'Not Applicable',
  ratingAverage: 0,
  text: 'Zero Customer Reviews',
};
