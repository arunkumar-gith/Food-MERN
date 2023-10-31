import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch(
      "https://food-back-dv44.onrender.com/api/foodData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    response = await response.json();

    setFoodItems(response[0]);
    setFoodCategory(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <div>
          <Navbar />
        </div>
        <div>
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade "
            data-bs-ride="carousel"
          >
            <div className="carousel-inner " id="carousel">
              <div class=" carousel-caption  " style={{ zIndex: "9" }}>
                <div className="d-flex justify-content-center">
                  <input
                    className="form-control me-2 w-75 bg-white text-dark"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                  {/* <button
                    class="btn btn-outline-success text-white bg-success"
                    type="submit"
                  >
                    Search
                  </button> */}
                </div>
              </div>
              <div className="carousel-item active">
                <img
                  src="https://source.unsplash.com/random/900x700/?burger"
                  className="d-block w-100  "
                  style={{ filter: "brightness(30%)" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900x700/?pastry"
                  className="d-block w-100 "
                  style={{ filter: "brightness(30%)" }}
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://source.unsplash.com/random/900x700/?barbeque"
                  className="d-block w-100 "
                  style={{ filter: "brightness(30%)" }}
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="container">
          {foodCategory != []
            ? foodCategory.map((data) => {
                return (
                  <div className="row mb-3">
                    <div key={data._id} className="fs-3 m-3">
                      {data.CategoryName}
                    </div>
                    <hr />

                    {foodItems != [] ? (
                      foodItems
                        .filter((item, i) => {
                          return (
                            item.CategoryName === data.CategoryName &&
                            item.name
                              .toLowerCase()
                              .includes(search.toLowerCase())
                          );
                        })
                        .map((filteredItem) => {
                          return (
                            <div
                              key={filteredItem._id}
                              className="col-12 col-md-6 col-lg-3 "
                            >
                              <Card
                                foodItem={filteredItem}
                                options={filteredItem.options[0]}
                              />
                            </div>
                          );
                        })
                    ) : (
                      <div>"No such Category"</div>
                    )}
                  </div>
                );
              })
            : " "}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
