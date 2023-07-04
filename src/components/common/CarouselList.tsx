import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 3000, min: 1281 },
    items: 4,
    partialVisibilityGutter: 20,
  },
  desktop: {
    breakpoint: { max: 1280, min: 768 },
    items: 2,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 767, min: 481 },
    items: 2,
    partialVisibilityGutter: 20,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
    partialVisibilityGutter: 30,
  },
};

export default function CarouselList({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      containerClass="w-full h-48 overflow-x-scroll"
      transitionDuration={500}
      // containerClass="overflow-x-scroll"
      // centerMode={true}
      responsive={responsive}
      // itemClass="rounded-lg border border-gray-200 shadow-lg mr-3 p-1"
      partialVisible={true}
      // sliderClass="w-full"
      // additionalTransfrom={-50}
    >
      {children}
    </Carousel>
  );
}
