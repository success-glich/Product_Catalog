import React, { useEffect, useRef, useState } from "react";
import { Table } from "reactstrap";
import { useBrand } from "../contexts/BrandContext";
import { useProduct } from "../contexts/ProductContext";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";
import { MdDownloadDone } from "react-icons/md";
import { toast } from "react-toastify";

const ProductList = () => {
  const { products, deleteProduct, updateProduct } = useProduct();
  const { brands } = useBrand();
  const [editIndexes, setEditIndexes] = useState({});
  const inputRef = useRef(null);

  const getProductsByBrand = (brand) => {
    if (products && products[brand]) {
      return products[brand].sort();
    }
    return [];
  };

  const getMaxProductsCount = () => {
    let maxProductsCount = 0;
    for (const brand of brands) {
      const productsCount = getProductsByBrand(brand).length;
      maxProductsCount = Math.max(maxProductsCount, productsCount);
    }
    return maxProductsCount;
  };

  const handleDeleteProduct = (brand, product) => {
    toast.info(
      <div>
        Are you sure you want to delete this product from the cart?
        <div className="d-flex justify-content-end mt-3">
          <button
            className="btn btn-danger mx-2"
            onClick={() => deleteProduct(brand, product)}
          >
            Yes
          </button>
          <button className="btn btn-secondary" onClick={toast.dismiss}>
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
      }
    );
  };

  const handleEditClick = (brand, index) => {
    setEditIndexes((prevEditIndexes) => ({
      ...prevEditIndexes,
      [brand]: index,
    }));
  };

  const handleEditDone = (brand) => {
    setEditIndexes((prevEditIndexes) => ({
      ...prevEditIndexes,
      [brand]: -1,
    }));
  };

  const isEditing = (brand, index) => {
    return editIndexes[brand] === index;
  };

  const handleEditInputChange = (brand, index, e) => {
    const newProductName = inputRef.current.value;
    updateProduct(brand, getProductsByBrand(brand)[index], newProductName);

    setEditIndexes({});
    toast.success("Product Updated Successfully !");
  };
  const renderProductCell = (brand, product, index, rowIndex) => {
    return (
      <td key={index}>
        {isEditing(brand, index) ? (
          <>
            {product ? (
              <>
                <input type="text" ref={inputRef} defaultValue={product} />
                <span
                  className="cursor__icon  text-danger "
                  onClick={() => handleEditDone(brand)}
                >
                  <FcCancel />
                </span>
                <span
                  className="cursor__icon  text-primary "
                  onClick={(e) => handleEditInputChange(brand, index, e)}
                >
                  <MdDownloadDone />
                </span>
              </>
            ) : (
              ""
            )}{" "}
          </>
        ) : (
          <>
            {product ? (
              <>
                {rowIndex + 1}. {product}
                <span
                  className="cursor__icon  text-danger "
                  onClick={() => handleDeleteProduct(brand, product)}
                >
                  <AiOutlineDelete />
                </span>
                <span
                  className="cursor__icon  text-primary "
                  onClick={() => handleEditClick(brand, index)}
                >
                  <AiOutlineEdit />
                </span>
              </>
            ) : (
              ""
            )}{" "}
          </>
        )}
      </td>
    );
  };

  return (
    <Table striped>
      <thead>
        <tr>
          {brands.map((brand, index) => (
            <th key={index}>{brand}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: getMaxProductsCount() }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {brands.map((brand, colIndex) => {
              const productsByBrand = getProductsByBrand(brand);
              const product = productsByBrand[rowIndex] || null;
              const index = rowIndex * brands.length + colIndex;

              return renderProductCell(brand, product, index, rowIndex);
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductList;
