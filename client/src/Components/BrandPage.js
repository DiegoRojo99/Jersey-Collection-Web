import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import Jersey from "./Jersey";

function BrandPage() {
  const { brandId } = useParams();
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    fetchBrand();
  }, [brandId]);

  async function fetchBrand() {
    try {
      const response = await fetch(`http://localhost:2222/brands/${brandId}`); // Replace '/api/brands/${brandId}' with your actual API endpoint for fetching a specific brand
      const data = await response.json();
      setBrand(data);
    } catch (error) {
      console.error("Error fetching brand:", error);
    }
  }

  if (!brand) {
    return (
        <div className="col-9">
          <h2 style={{textAlign:"center", margin:"32px"}}>Brand not found</h2>
        </div>);
  }
  if (brand.length!==0) {
    return (
      <div className="col-9">
        <div className="club-info">
          <div className="row">
            <img
              className="club-logo"
              src={brand[0].BrandLogo}
            ></img>
          </div>
          <div className="row">
            <h4>{brand[0].BrandName}</h4>
          </div>
        </div>
        <div className="jerseys row">
          {brand.map((jersey) => (
            <Jersey jerseyData={jersey}/>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-9">
        <h2 style={{textAlign:"center", margin:"32px"}}>This brand has no jerseys</h2>
      </div>
    );
  }
}

export default BrandPage;