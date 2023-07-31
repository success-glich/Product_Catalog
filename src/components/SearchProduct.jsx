import React, { useContext, useState } from "react";
import { Input, Button, Col, Row } from "reactstrap";
import { useBrand } from "../contexts/BrandContext";
import { useProduct } from "../contexts/ProductContext";
import { toast } from "react-toastify";

const SearchProduct = () => {
  const { brands } = useBrand();
  const { searchProduct, clearSearch } = useProduct();
  const [inputBrand, setInputBrand] = useState("");

  const handleBrandChange = (e) => {
    setInputBrand(e.target.value);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearch = () => {
    if (inputBrand !== "") {
      searchProduct(searchTerm, inputBrand);
      setSearchTerm("");
      setInputBrand("");
    } else {
      toast.info("Brand should be selected");
    }
  };
  const resetProduct = () => {
    clearSearch();
    setSearchTerm("");
    setInputBrand("");
  };

  return (
    <Row>
      <Col lg="6" className="my-2">
        <Input
          type="text"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={handleInputChange}
        />
      </Col>
      <Col lg="3" className="my-2">
        <Input
          type="select"
          name="brand"
          id="brand"
          value={inputBrand}
          onChange={handleBrandChange}
        >
          <option value="">Select a brand...</option>
          {brands &&
            brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
        </Input>
      </Col>
      <Col md="3" className="">
        <Button onClick={handleSearch} className="ms-2 my-2 text-center">
          Search
        </Button>
        <Button
          onClick={resetProduct}
          className="ms-2 my-2 text-center btn btn-danger "
        >
          Reset Product
        </Button>
      </Col>
    </Row>
  );
};

export default SearchProduct;
