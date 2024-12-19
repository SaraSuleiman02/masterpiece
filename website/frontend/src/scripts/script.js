import { useEffect } from "react";
import $ from "jquery"; // Import jQuery for usage
// import Swiper from "swiper";
// import "swiper/swiper-bundle.min.css"; // Import Swiper CSS

const useStickyHeader = () => {
  useEffect(() => {
    const header = document.querySelector("#header");
    if (!header) return;

    const trigHeight = 1;
    const handleScroll = () => {
      let tj = window.scrollY;
      if (tj > trigHeight) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
};

// const useJarallax = () => {
//   useEffect(() => {
//     // Assuming `jarallax` is globally available or imported
//     if (window.jarallax) {
//       jarallax(document.querySelectorAll(".jarallax"));
//       jarallax(document.querySelectorAll(".jarallax-img"), {
//         keepImg: true,
//       });
//     }
//   }, []);
// };

const useProductQty = () => {
  useEffect(() => {
    $(".product-qty").each(function () {
      const $el_product = $(this);
      $el_product.find(".quantity-right-plus").click(function (e) {
        e.preventDefault();
        let quantity = parseInt($el_product.find("#quantity").val());
        $el_product.find("#quantity").val(quantity + 1);
      });

      $el_product.find(".quantity-left-minus").click(function (e) {
        e.preventDefault();
        let quantity = parseInt($el_product.find("#quantity").val());
        if (quantity > 0) {
          $el_product.find("#quantity").val(quantity - 1);
        }
      });
    });
  }, []);
};

// const useSwiper = () => {
//   useEffect(() => {
//     new Swiper(".main-swiper", {
//       loop: true,
//       speed: 800,
//       autoplay: {
//         delay: 6000,
//       },
//       effect: "creative",
//       creativeEffect: {
//         prev: {
//           shadow: true,
//           translate: ["-20%", 0, -1],
//         },
//         next: {
//           translate: ["100%", 0, 0],
//         },
//       },
//       pagination: {
//         el: ".main-slider-pagination",
//         clickable: true,
//       },
//     });

//     new Swiper(".product-swiper", {
//       speed: 1000,
//       spaceBetween: 20,
//       navigation: {
//         nextEl: ".product-carousel-next",
//         prevEl: ".product-carousel-prev",
//       },
//       breakpoints: {
//         0: {
//           slidesPerView: 1,
//         },
//         480: {
//           slidesPerView: 2,
//         },
//         900: {
//           slidesPerView: 3,
//           spaceBetween: 20,
//         },
//         1200: {
//           slidesPerView: 5,
//           spaceBetween: 20,
//         },
//       },
//     });

//     new Swiper(".testimonial-swiper", {
//       speed: 1000,
//       navigation: {
//         nextEl: ".testimonial-arrow-next",
//         prevEl: ".testimonial-arrow-prev",
//       },
//     });

//     const thumb_slider = new Swiper(".thumb-swiper", {
//       slidesPerView: 1,
//     });
//     new Swiper(".large-swiper", {
//       spaceBetween: 10,
//       effect: "fade",
//       thumbs: {
//         swiper: thumb_slider,
//       },
//     });
//   }, []);
// };

const useModalVideo = () => {
  useEffect(() => {
    let $videoSrc;
    $(".play-btn").click(function () {
      $videoSrc = $(this).data("src");
    });

    $("#myModal").on("shown.bs.modal", function () {
      $("#video").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
      );
    });

    $("#myModal").on("hide.bs.modal", function () {
      $("#video").attr("src", $videoSrc);
    });
  }, []);
};

const usePreloader = () => {
  useEffect(() => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("hide-preloader");
    }
  }, []);
};

const App = () => {
  useStickyHeader();
  // useJarallax();
  useProductQty();
  // useSwiper();
  useModalVideo();
  usePreloader();

  return (
    <div>
      <h1>Welcome to My React App</h1>
    </div>
  );
};

export default App;