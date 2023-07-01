import ImageGallery from "react-image-gallery";
import React from "react";

type IndividualImageType = {
  original: string;
  thumbnail: string;
};

type ImageViewerType = {
  images: IndividualImageType[];
};

const ImageViewer: React.FC<ImageViewerType> = ({ images }) => {
  return <ImageGallery items={images} />;
};

export default ImageViewer;
