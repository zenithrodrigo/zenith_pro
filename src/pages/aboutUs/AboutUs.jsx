import React from "react";

import aboutUsImage from "../../assets/we-print-front-1920w.jpg";

export default function AboutUs() {
  return (
    <div id="about" className="relative bg-white overflow-hidden mt-16">
        <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                    fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <polygon points="50,0 100,0 50,100 0,100"></polygon>
                </svg>

                <div className="pt-1"></div>

                <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                    <div className="sm:text-center lg:text-left">
                        <h2 className="my-6 text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                            Our Story
                        </h2>
                        <p className="section-description">
                          Welcome to WePrint247, where creativity meets craftsmanship. Our
                          journey began with a simple idea – to provide a one-of-a-kind
                          printing experience for every customer.
                        </p>
                        <p className="section-description">
                          At WePrint247, we believe in the power of self-expression. Whether
                          it's personalized apparel, unique accessories, or custom gifts,
                          we're here to bring your ideas to life. Our commitment goes beyond
                          printing; it's about creating a platform where your imagination
                          knows no bounds.
                        </p>
                        <p className="section-description">
                          We take pride in delivering high-quality products with a touch of
                          personalization. Our team is dedicated to ensuring that every item
                          you receive reflects the passion and creativity you put into it.
                        </p>
                    </div>
                </main>
            </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img className="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full" src={aboutUsImage} alt=""/>
        </div>
    </div>
  );
}
