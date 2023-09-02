"use client";

import { Contact as ContactType } from "@prisma/client";

interface IProps {
  initialData: ContactType[];
}
const Contact: React.FC<IProps> = ({ initialData }) => {
  return <div>Test {initialData?.map((item) => "hello")}</div>;
};

export default Contact;
