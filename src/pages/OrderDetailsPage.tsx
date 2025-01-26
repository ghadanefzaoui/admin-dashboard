import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import ContentBox from "../components/contents/ContentBox";
import PageWrapper from "../components/PageWrapper";
import OrderDetailsProduct from "../components/products/OrderDetailsProduct";

interface Product {
  productId: number;
  name: string;
  price: number;
  units: number;
  inStock: boolean;
  image: string;
}

const OrderDetailsPage: React.FC = () => {
  const [orderedProductId, setOrderedProductId] = useState<number>(0);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Extract order ID from the URL
    const id = Number(window.location.pathname.split("/")[2]);
    setOrderedProductId(id);

    // Fetch product data dynamically
    const fetchProductData = async () => {
      try {
        const response = await fetch("/data/cars.json"); // Adjust the path to your JSON file
        const data = await response.json();
        const foundProduct = data.data.find(
          (item: Product) => item.productId === id
        );
        setProduct(foundProduct || null);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  if (!product) {
    return (
      <PageWrapper>
        <ContentBox name="Loading...">
          <p className="text-black">Fetching product details...</p>
        </ContentBox>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <ContentBox name={`Order #${orderedProductId}`}>
        <div className="border-b text-black"></div>
        <div className="px-5 py-5">
          {/* Ordered product details */}
          <OrderDetailsProduct
            name={product.name}
            price={product.price}
            units={product.units}
            quantity={1}
            image={product.image}
          />
          <div className="mt-4 text-black">
            <div className="flex items-center justify-between border-b py-2 text-black">
              <span>Item Total</span>
              <span>${product.price}</span>
            </div>
            <div className="flex items-center justify-between border-b py-2 text-black">
              <span>Management fees</span>
              <span>10%</span>
            </div>
            <div className="flex items-center justify-between font-medium py-2 text-black">
              <span>Total</span>
              <span>${(product.price * 1.1).toFixed(2)}</span>
            </div>
          </div>

          <hr className="w-full border-b my-5" />

          {/* Customer details */}
          <div className="mt-4">
            <div className="text-black flex items-center justify-between">
              <div className="font-medium">CUSTOMER DETAILS</div>
              <Button>
                <span className="material-icons-outlined mr-2 text-lg">
                  share
                </span>
                <span>Share</span>
              </Button>
            </div>
            <div className="flex items-center justify-between border-b py-2 text-black">
              <span>Name</span>
              <span>Bill Gates</span>
            </div>
            <div className="flex items-center justify-between border-b py-2 text-black">
              <span>Mobile</span>
              <div>
                <span>0113718731</span>
                <button className="material-icons-outlined text-lg px-1 bg-blue-500 text-black rounded">
                  phone
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between border-b py-2 text-base text-black">
              <span>Address</span>
              <span>Tunis, Tunisia</span>
            </div>
            <div className="flex items-center justify-between border-b py-2 text-base text-black">
              <span>Pin Code</span>
              <span>111132</span>
            </div>
            <div className="flex items-center justify-between border-b py-2 text-base text-black">
              <span>City</span>
              <span>Tunis</span>
            </div>
            <div className="flex items-center justify-between border-b py-2 text-base text-black">
              <span>Payment</span>
              <Button>
                <span className="text-yellow-400 px-1">Cash on Delivery</span>
              </Button>
            </div>
          </div>

          {/* Order actions */}
          <div className="mt-5 flex">
            <div>
              <Button className="hover:bg-rose-500">
                <span className="material-icons text-lg mr-2 py-1">close</span>
                <span>Reject</span>
              </Button>
            </div>
            <div className="ml-3">
              <Button className="hover:bg-glitch-orange">
                <span className="material-icons text-lg mr-2 py-1">check</span>
                <span>Accept</span>
              </Button>
            </div>
          </div>
        </div>
      </ContentBox>
    </PageWrapper>
  );
};

export default OrderDetailsPage;
