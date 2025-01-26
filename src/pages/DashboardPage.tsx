import React, { Suspense, useEffect, useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ContentBox from "../components/contents/ContentBox";
import DisplaySection from "../components/DisplaySection";
import PageWrapper from "../components/PageWrapper";
import SortByTag from "../components/SortByTag";
import Search from "../components/Search";
import Customer from '../assets/images/customer.svg'
import LeadershipIcon from "../assets/images/leadership.svg";
import ShoppingCartIcon from "../assets/images/contract.svg";
import TotalSalesIcon from "../assets/images/sales.svg";
import StoreIcon from "../assets/images/store.svg";
import configs from "../configs.json";

const OrderedProductPreview = React.lazy(
  () => import("../components/products/OrderedProductPreview")
);

interface OrderedProductType {
  id: number;
  title: string;
  createdDate: string;
  stat: string;
  client: string;
  fileUrl: string;
}

/**
 * Dashboard page
 * Sows current store status & active products list by category
 */
const DashboardPage: React.FC = () => {
  const [orderedProductList, steOrderedProductList] = useState<
    OrderedProductType[]
  >([]);

  // Fetch ordered products
  useEffect(() => {
    fetch(`/data/contracts.json`)
      .then((res) => res.json())
      .then(({ data }) => {
        steOrderedProductList(data);
      });
  }, []);

  return (
    <PageWrapper>
      <div className="w-full">
        <div className="flex justify-between relative" style={{ borderBottom: "1px solkey #f0f0f0" }}>
          <div>
            <h1 className="text-lg text-black-100 font-bold leading-5">
              Hello {configs.userName}!
            </h1>
            <p className="text-black-300 leading-5">
              Welcome back {configs.userName.split(" ")[0]}, and great to meet
              you
            </p>
          </div>
          <div className="ml-1">
            <Search />
          </div>
        </div>

        {/* Store status */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 overflow-x-auto mt-10">
          {/* Toatal saled */}
          <DisplaySection
            displayText="$5333"
            subText="Total Sales"
            icon={TotalSalesIcon}
          />

          {/* Toatal product orders */}
          <DisplaySection
            icon={ShoppingCartIcon}
            displayText={"133"}
            subText={"Total Leasing Contracts"}
          />

          {/* Store views */}
          <DisplaySection
            icon="https://img.icons8.com/color/48/gender-neutral-user.png"
            displayText={"3344"}
            subText={"Total Customers"}
          />

          {/* Product views */}
          <DisplaySection
            icon="https://img.icons8.com/fluency/48/car--v1.png"
            displayText={"234"}
            subText={"Total Cars"}
          />
        </div>

        {/* Active orders */}
        <ContentBox name="Active Products" showSearch>
          <>
            <div className="border-b">
              <SortByTag
                tags={["Pending (129)", "Signed (13)", "Archived (6)"]}
              />
            </div>

            {/* Products list */}
            <div className="mt-5"></div>
            <Suspense fallback={<LoadingIndicator />}>
              <ul className="px-5 bg-transparent">
                {orderedProductList.map(
                  (
                    {
                      id,
                      title,
                      createdDate,
                      stat,
                      client,
                      fileUrl,
                    },
                    i
                  ) => (
                    <li
                      className="block mt-4 pb-4 border-b text-black last:border-none"
                      key={i}
                    >
                      <OrderedProductPreview
                        id={id}
                        title={title}
                        createdDate={createdDate}
                        stat={stat}
                        client={client}
                        fileUrl={fileUrl}
                      />
                    </li>
                  )
                )}
              </ul>
            </Suspense>
          </>
        </ContentBox>
      </div>
    </PageWrapper>
  );
};

export default DashboardPage;
