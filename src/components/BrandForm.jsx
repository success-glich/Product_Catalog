import React, { useContext, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { ADD_BRAND } from "../constants/brandConstants";
import { useBrand } from "../contexts/BrandContext";
import { toast } from "react-toastify";

const BrandForm = () => {
  const { brands, addBrand, selectBrand, selectedBrand } = useBrand();
  const [inputBrand, setInputBrand] = useState("");
  const handleInputChange = (e) => {
    // setBrand(e.target.value);
    setInputBrand(e.target.value);
  };
  const handleBrandChange = (e) => {
    selectBrand(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addBrand(inputBrand);
    setInputBrand("");
    toast.success("Brand Added successfully!");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="brand">Brand Name:</Label>
        <Input
          type="select"
          name="brand"
          id="brand"
          value={selectedBrand}
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
      </FormGroup>
      <FormGroup>
        <Label for="productName">New Brand Name:</Label>
        <Input
          type="text"
          name="productName"
          id="productName"
          value={inputBrand}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button color="primary" type="submit">
        Add Brand
      </Button>
    </Form>
  );
};

export default BrandForm;
