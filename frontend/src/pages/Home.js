import logo2 from "../assets/logo2.png";
import { Link } from "react-router-dom";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { IoMdTime } from "react-icons/io";
import { LiaHandsSolid } from "react-icons/lia";
import { GiReceiveMoney } from "react-icons/gi";
import { FiTruck, FiBarChart2, FiPrinter, FiArrowRight } from "react-icons/fi";
import "./HomeCss.css";
const Home = () => {
  return (
    <>
      <main className="home-page">
        <div className="home-container">
          <div className="main-content">
            <h1>
              More than logistics.
              <br />A partner for your business
            </h1>

            <p className="business-description">
              We provide in-house courier, consulting, and printing solutions,
              while partnering with trusted providers to arrange road, air, and
              sea freight.
            </p>

            <div className="hero-actions">
              <Link to="/RoadFormOne" className="home-secondary-button">
                Get a quote{" "}
              </Link>
            </div>
          </div>
          <div className="main-image">
            <img src={logo2} alt="truck-image" className="truck-image" />
          </div>
        </div>

        {/*Going into depth on hybrid operations*/}
        <section className="home-intro">
          <div className="section-label">
            <span>01</span>
            <p> WHAT WE DO </p>
          </div>
          <div className="home-intro-content">
            <h2>
              {" "}
              One business. <br />
              Multiple solutions.{" "}
            </h2>
            <div>
              <p>
                Unbroken Solutions brings together logistics, supply chain
                expertise, and business support to help organisations operate
                more efficiently.
              </p>

              <p>
                From moving goods and improving supply chain operations to
                keeping your printing environment running, we provide practical
                solutions through one trusted partner.
              </p>
            </div>
          </div>
        </section>

        {/* Services section */}
        <section className="home-services">
          <div className="section-label">
            <span>02</span>
            <p> OUR SERVICES </p>
          </div>
          <div className="home-services-heading">
            <h2>
              {" "}
              Solutions that keep <br /> your business moving.{" "}
            </h2>
            <p>
              From reliable courier and freight solutions to supply chain
              consulting and printing support, we bring together the services
              businesses need to operate efficiently, backed by practical
              solutions and trusted partnerships.
            </p>
          </div>
          <div className="home-service-grid">
            {/* SHIPPING */}
            <article className="home-service-card">
              <div className="home-service-icon">
                <FiTruck />
              </div>
              <span className="home-service-number"> 01 </span>
              <h3> Shipping & Logistics </h3>
              <p>
                Reliable in-house courier services alongside trusted road, air,
                and sea freight solutions for businesses of all sizes.
              </p>

              <Link to="/ShippingServices" className="home-service-link">
                {" "}
                Explore shipping
                <FiArrowRight />
              </Link>
            </article>

            {/* CONSULTING */}
            <article className="home-service-card">
              <div className="home-service-icon">
                <FiBarChart2 />
              </div>
              <span className="home-service-number"> 02 </span>
              <h3> Supply Chain & Consulting </h3>
              <p>
                {" "}
                Practical consulting solutions covering supply chains,
                warehousing, inventory, procurement, transport and
                distribution.{" "}
              </p>
              <Link to="/Consulting" className="home-service-link">
                {" "}
                Explore consulting
                <FiArrowRight />
              </Link>{" "}
            </article>

            {/* PRINTING */}
            <article className="home-service-card">
              <div className="home-service-icon">
                <FiPrinter />{" "}
              </div>
              <span className="home-service-number"> 03 </span>
              <h3> Ink & Printing </h3>
              <p>
                {" "}
                Quality printer ink and consumables, convenient delivery and
                printer repairs and support for businesses.{" "}
              </p>
              <Link to="/InkAndPrinting" className="home-service-link">
                {" "}
                Explore printing
                <FiArrowRight />
              </Link>
            </article>
          </div>
        </section>

        {/* why section*/}
        <section className="home-why">
          <div className="section-label">
            <span>03</span>
            <p> WHY UNBROKEN </p>
          </div>
          <div className="home-why-content">
            <div>
              <h2>
                {" "}
                Reliable solutions. <br /> Built around you.{" "}
              </h2>
            </div>{" "}
            <div className="home-why-description">
              <p>
                {" "}
                Businesses need partners they can depend on. We focus on
                understanding what you need and providing practical solutions
                that deliver real value.{" "}
              </p>{" "}
              <p>
                {" "}
                Whether we're moving your goods, improving your operations or
                keeping your printers running, reliability remains at the centre
                of everything we do.{" "}
              </p>
            </div>
          </div>
          <div className="home-values">
            <div className="home-value">
              <VscWorkspaceTrusted />
              <div>
                <h3> Reliability </h3>
                <p> We deliver on our promises. </p>
              </div>
            </div>
            <div className="home-value">
              <IoMdTime />{" "}
              <div>
                <h3> Punctuality </h3>
                <p> Service you can count on. </p>
              </div>
            </div>
            <div className="home-value">
              <LiaHandsSolid />
              <div>
                <h3> Care </h3>
                <p> Your goods and business matter to us. </p>
              </div>
            </div>
            <div className="home-value">
              <GiReceiveMoney />
              <div>
                <h3> Value </h3>
                <p> Competitive rates backed by quality. </p>
              </div>
            </div>
          </div>
        </section>

        <section className="home-cta">
          <div className="home-cta-content">
            <p className="eyebrow">
              {" "}
              LET'S FIND THE RIGHT SOLUTION FOR YOUR BUSINESS{" "}
            </p>
            <h2>
              {" "}
              Have a business <br /> challenge?{" "}
            </h2>{" "}
            <p>
              {" "}
              Whether you need to move a shipment, improve your supply chain or
              find a reliable printing solution, we're ready to help.{" "}
            </p>
            <div className="home-cta-actions">
              <Link to="/RoadFormOne" className="home-cta-primary">
                {" "}
                Get a quote
                <FiArrowRight />{" "}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
