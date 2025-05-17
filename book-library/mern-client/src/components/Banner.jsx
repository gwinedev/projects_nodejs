import React from "react";

const Banner = () => {
  return (
    <div className="px-4 lg:px-24 bg-teal-100 flex items-center">
      <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40">
        {/* left hand side */}
        <div className="md:w-1/2 space-y-8 h-full">
          <h2 className="text-5xl font-bold leading-snug text-black">
            Buy and Sell Your Book <span className="text-blue-700">for the best prices</span>
          </h2>
          <p className="md:w-4/5 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum iure
            recusandae officiis deleniti placeat nisi atque fugiat, in impedit
            eos architecto ex maiores! Tempore molestiae, odio illo voluptatum
            facilis beatae?
          </p>
          <div>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search a Book"
              className=" bg-white py-2 px-2 rounded-s-m outline-none"
            />
            <button className="bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200">
              Search
            </button>
          </div>
        </div>
        <div>{/* right hand side */}</div>
      </div>
    </div>
  );
};

export default Banner;
