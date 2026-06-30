import { CiDeliveryTruck, CiBoxes } from "react-icons/ci";
import { PiBoatLight, PiWarehouseDuotone, PiNotepadLight, PiPackage, PiStrategy, PiTruckTrailer
 } from "react-icons/pi";
import { IoAirplaneOutline } from "react-icons/io5";
import { GiBreakingChain } from "react-icons/gi";
import { MdOutlineWarehouse, MdOutlineInventory2 } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosGlobe } from "react-icons/io";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { VscTools } from "react-icons/vsc";
const Cards = () => {


    return(
        <>
        <h1 className="logistics-services">Logistics Services</h1>
       
    <div className="card-components">
            <div className="card">
            <CiDeliveryTruck className="icons"/>
            <h2>Road Freight</h2>
            <p>Reliable and cost-effective transport solutions across
                South Africa and beyond.
            </p>
            </div>
            
            <div className="card">
            <PiBoatLight className="icons" />
            <h2>Sea Freight</h2>
            <p>Effecient ocean freight solutions for import and export cargo worldwide.
            </p>

            </div>
            <div className="card">
            <IoAirplaneOutline className="icons" />
            <h2>Air Freight</h2>
            <p>Fast and secure air cargo services for time-sensitive deliveries.
            </p>

            </div>
            <div className="card">
            <PiWarehouseDuotone className="icons" />
            <h2>Warehousing</h2>
            <p>Safe and secure storage solutions with inventory management 
                and distribution.
            </p>

            </div>
            <div className="card">
            <PiNotepadLight className="icons" />
            <h2>Supply Chain Solutions</h2>
            <p>End-to-end supply chain management tailored to your business needs.
            </p>

            </div>
            <div className="card">
            <PiPackage className="icons" />
            <h2>Courier & Express</h2>
            <p>Door-to-door delivery with speed, care and real-time tracking.
            </p>
            </div>
    </div>


        <h1 className="consulting-services">Consulting</h1>
        
        <div className="card2-components">
            <div className="card2">
            <GiBreakingChain className="icons" />
            <h2>Supply Chain Consulting</h2>
            <p>We analyze and optimize your entire supply 
                chain to improve flow, reduce costs and increase value.
            </p>
            </div>
            
            <div className="card2">
            <PiStrategy className="icons" />
            <h2>Logistics Strategy & Planning</h2>
            <p>We develop tailored logistics strategies and plans 
                aligned with your business goals and market demands.
            </p>

            </div>
            <div className="card2">
            <MdOutlineWarehouse className="icons" />
            <h2>Warehouse Optimization</h2>
            <p>Improve warehouse layout, 
                processes and technology to maximize effeciency and capacity.
            </p>

            </div>
            <div className="card2">
            <MdOutlineInventory2 className="icons" />
            <h2>Inventory Management</h2>
            <p>Implement best practices to optimize inventory levels, 
                improve accuracy and reducing holding costs.
            </p>

            </div>

            <div className="card2">
            <PiTruckTrailer className="icons" />
            <h2>Transport & Fleet Optimization</h2>
            <p>Optimize routes, modes and fleet performance 
                to lower transporation costs and improve service.
            </p>

            </div>

            <div className="card2">
            <FiShoppingCart className="icons" />
            <h2>Procurement & Sourcing Support</h2>
            <p>Source the right products and services at
                 the best value to strengthen your supply chain.
            </p>

            </div>

            <div className="card2">
            <IoIosGlobe className="icons" />
            <h2>Distribution Network Design</h2>
            <p>Design effecient distribution networks that  improve coverage, reduce lead times and cut costs.
            </p>

            </div>

            <div className="card2">
            <CiBoxes className="icons" />
            <h2>Reverse Logistics Solutions</h2>
            <p>Develop sustainable reverse logistics processes to manage returns, 
                recover value and reduce waste.
            </p>

            </div>
            </div>


            <h1 className="ink-services">Ink & Printing</h1>
            <div className="card3-components">
            <div className="card3">
            <HiOutlinePaintBrush className="icons" />
            <h2>Ink Supplies</h2>
            <p>High quality inks for all major printer brands.
            </p>
            </div>
            
            <div className="card3">
            <VscTools className="icons" />
            <h2>Printer Repairs</h2>
            <p>Fast, reliable and professional repair services.
            </p>

            </div>
            </div>
            
            <h1 className="benefits-h1">Benefits To Your Business</h1>
            <div className="benefits">
            
            <p>Lower Operating Costs</p>
            <p>Improved Service Levels</p>
            <p>Better Visibility & Control</p>
            <p>Increased Agility & Resilience</p>
            <p>Sustainable Growth</p>
            </div>
     </>)

}

export default Cards