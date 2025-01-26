import React, { Suspense, useEffect, useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import ContentBox from "../components/contents/ContentBox";
import PageWrapper from "../components/PageWrapper";
import SortByTag from "../components/SortByTag";

const OrderedProductPreview = React.lazy(
  () => import("../components/products/OrderedProductPreview")
);

interface ContractType {
  id: number;
  title: string;
  createdDate: string;
  stat: string;
  client: string;
  fileUrl: string;
}

/**
 * Manage order page
 */
const ManageOrderPage: React.FC = () => {
  const [contractList, setContractList] = useState<ContractType[]>([]);

  // Fetch ordered products
  useEffect(() => {
    fetch("/data/contracts.json")
      .then((res) => res.json())
      .then(({ data }) => {
        setContractList(data);
      });
  }, []);

  return (
    <PageWrapper>
      <ContentBox name="Manage Contracts" showSearch>
        <>
          <div className="border-b border-b-glitch-box">
            <SortByTag
              tags={["Pending (10)", "Signed (25)", "Archived (5)"]}
            />
          </div>

          {/* Products list */}
          <div className="mt-5"></div>
          <Suspense fallback={<LoadingIndicator />}>
            <ul className="px-5 bg-transparent">
              {contractList.map(
                ({ id, title, createdDate, stat, client, fileUrl }, i) => (
                  <li
                    className="block mt-4 pb-4 border-b border-b-glitch-box last:border-none"
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
    </PageWrapper>
  );
};

export default ManageOrderPage;
