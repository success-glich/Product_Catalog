import React from "react";
import Header from "./Header";
import { Container, Row, Col } from "reactstrap";
import BrandForm from "./BrandForm";
import ProductForm from "./ProductForm";
import SearchProduct from "./SearchProduct";
import ProductList from "./ProductList";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Row>
          <div className="title">
            <h2>Manage Product of Different Brands </h2>
          </div>
          <Col md="6">
            <h2>Brands</h2>
            <BrandForm />
          </Col>
          <Col md="6">
            <h2> Products</h2>
            <ProductForm />
          </Col>
        </Row>
        <Row className="mb-5">
          <Col md="12">
            <section>
              <SearchProduct />
            </section>
            <ProductList />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
