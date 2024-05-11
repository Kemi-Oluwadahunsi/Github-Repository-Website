import outline from "../assets/search-outline.svg"

const SeachInput = ({ onChange }) => {

    const handleInputChange = (event) => {
      onChange(event.target.value);
    };
  return (
    <div>
      <div className=" border border-tertiary px-7 sm:px-3 xs:px-2 py-2 xs:py-1 sm:py-1 outline outline-[#82c7f7] bg-primary rounded-[2.5rem]">
        <div className="flex items-center justify-between ">
          <input
            type="search"
            placeholder="Search"
            className=" bg-transparent w-[90%] outline-none"
            onChange={handleInputChange}
          />
          <button type="submit">
            <img src={outline} alt="outline" className="cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeachInput