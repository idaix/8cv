"use client";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section>
      <h3 className="mb-2 sm:mb-5">{title}</h3>
      <div className="pl-3 sm:pl-0">{children}</div>
    </section>
  );
};

export default Section;
