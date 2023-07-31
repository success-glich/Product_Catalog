import React from "react";
import { useProduct } from "../contexts/ProductContext";
import { useBrand } from "../contexts/BrandContext";

const Test = () => {
  const { products } = useProduct();
  //   const { tests } = useBrand();
  //   console.log({ products, tests });
  return <div>Test</div>;
};

export default Test;
