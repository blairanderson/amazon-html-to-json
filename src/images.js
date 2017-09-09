;
export const parse = ($) => {
  const videoEls = $('#imageBlock li.item.videoThumbnail img');
  const imageEls = $('#imageBlock li.item.imageThumbnail img');
  return {
    images: { count: imageEls.length, thumbnails: [] },
    videos: { count: videoEls.length, thumbnails: [] }
  };
};

export const expectation = {
  images: { count: 4, thumbnails: [] },
  videos: { count: 1, thumbnails: [] }
};
