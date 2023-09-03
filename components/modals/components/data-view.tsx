import { Contact, Project } from "@prisma/client";
import NoData from "./no-data";
import { Suspense } from "react";

type Data = Contact[] | Project[];
interface IProps {
  data: Data;
}

const DataView: React.FC<IProps> = ({ data }) => {
  // if (!data.length) {
  //     return (
  //         <NoData />
  //     )
  // }
  return (
    <Suspense fallback={"loading piece of shit..."}>
      {!data.length ? (
        <NoData />
      ) : (
        <>
          {data.map((item) => (
            <div key={item.id}></div>
          ))}
        </>
      )}
    </Suspense>
  );
};

export default DataView;
