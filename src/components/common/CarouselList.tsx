import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default function CarouselList({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Carousel
      containerClass="w-full flex gap-2 h-48"
      responsive={responsive}
      itemClass="rounded-lg border border-gray-200 shadow-lg mr-3  w-60 h-36 p-1"
    >
      {children}
    </Carousel>
  );
}
