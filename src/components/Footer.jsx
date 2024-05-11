

const Footer = () => {
  return (
    <div className="bg-[#34344a] text-[#e1effd] flex justify-center py-10 items-center  xs:text-sm">
      <div className="rights">
        <span className="circleC">&#169;</span> {new Date().getFullYear()}{" "}
        Oluwakemi Oluwadahunsi | All rights reserved.
      </div>
    </div>
  );
}

export default Footer