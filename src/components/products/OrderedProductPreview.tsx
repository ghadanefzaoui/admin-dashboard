import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import Button from "../Button";

interface Props {
  id: number;
  title: string;
  createdDate: string;
  stat: string;
  client: string;
  fileUrl: string;
}

const OrderedProductPreview: React.FC<Props> = ({
  id,
  title,
  createdDate,
  stat,
  client,
  fileUrl,
}) => {
  
  return (
    <div className="inline-block w-full py-1">
      <Link to={`/order/${id}`} className="block">
        <div className="flex items-center justify-between w-full">
          <div className="flex-1">
            <div className="text-black-200 text-sm">Created: {createdDate}</div>
            <div className="text-black text-xl font-bold">{title}</div>
            <div className="text-black-400 text-sm">Client: {client}</div>
            <div className="text-glitch-orange font-semibold text-sm mt-2">
              Status: {stat}
            </div>
          </div>
        </div>
      </Link>
      <div className="text-glitch-orange font-semibold mt-5 text-sm flex items-center">
        <div>
          <Button className="bg-rose-500 hover:bg-rose-500">
            <span className="material-icons text-lg">close</span>
            <span className="ml-2">Decline {"&"} Remove</span>
          </Button>
        </div>
        <div className="ml-3" style={{ backgroundColor: "#2e7d32" }}>
          <Button>
            <span className="material-icons text-lg">done</span>
            <span className="ml-2">Accept</span>
          </Button>
        </div>
        <div className="ml-3">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-glitch-orange font-semibold flex items-center"
          >
            <span className="material-icons text-lg">visibility</span>
            <span className="ml-2">View Contract</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderedProductPreview;
