"use client";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="">
      <h3 className="mb-1">{title}</h3>
      {children}
    </section>
  );
};

export default Section;
