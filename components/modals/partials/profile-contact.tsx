"use client";

import { Contact as ContactType } from "@prisma/client";

interface IProps {
  data: ContactType[];
}
const Contact: React.FC<IProps> = ({ data }) => {
  return <div>Test {data?.map((item) => "hello")}</div>;
};

export default Contact;
