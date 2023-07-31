import React, { useContext, useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { useProduct } from "../contexts/ProductContext";
import { useBrand } from "../contexts/BrandContext";
import { toast } from "react-toastify";

const ProductForm = () => {
  const { selectedBrand, selectBrand } = useBrand();
  const { addProduct } = useProduct();

  const [productName, setProductName] = useState("");

  const handleInputChange = (e) => {
    setProductName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(selectedBrand, productName);
    setProductName("");
    selectBrand("");
    toast.success("Brand added successfully !");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="productName">Product Name:</Label>
        <Input
          type="text"
          name="productName"
          id="productName"
          value={productName}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button color="primary" type="submit">
        Add Product
      </Button>
    </Form>
  );
};

export default ProductForm;
