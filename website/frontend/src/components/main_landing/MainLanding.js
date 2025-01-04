import Hero from "./Hero/hero";
import PrivilegeSection from "./PrivilegeSection/PrivilegeSection";
import WhatWeOffer from "./WhatWeOffer/WhatWeOffer";
import StepsSec from "./Steps/StepsSec";
import Testimonials from "./Testimonials/Testimonials";
import PopularVendors from "./PopularVendors/PopularVendors";
import LastSection from "./LastSection/LastSection";
function MainLanding() {
  return (
    <>
      <Hero />
      <PrivilegeSection />
      <WhatWeOffer />
      <StepsSec />
      <Testimonials />
      <PopularVendors />
      <LastSection />
    </>
  );
}

export default MainLanding;
