import Hero from "./Hero/hero";
import PrivilegeSection from "./PrivilegeSection/PrivilegeSection";
import WhatWeOffer from "./WhatWeOffer/WhatWeOffer";
import Steps from "./Steps/Steps";
import Testimonials from "./Testimonials/Testimonials";
import Pricing from "./Pricing/Pricing";
import PopularVendors from "./PopularVendors/PopularVendors";
import LastSection from "./LastSection/LastSection";
function MainLanding() {
  return (
    <>
      <Hero />
      <PrivilegeSection />
      <WhatWeOffer />
      <Steps />
      <Testimonials />
      <Pricing />
      <PopularVendors />
      <LastSection />
    </>
  );
}

export default MainLanding;
