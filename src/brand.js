export const parse = ($) => {
  const brandEl = $('a#bylineInfo');
  return {
    text: brandEl.text().trim(),
    href: brandEl.attr('href'),
  };
};
