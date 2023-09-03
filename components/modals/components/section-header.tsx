import { Button } from "@/components/ui/button";

interface IProps {
  title: string;
  children: React.ReactElement | React.ReactNode;
}

const SectionHeader: React.FC<IProps> = ({ title, children }) => {
  return (
    <section className="h-full flex flex-col">
      <div className="flex justify-between items-center py-3 border-b">
        <h2 className="text-xl">{title}</h2>
        <Button variant="ghost">Add project</Button>
      </div>
      <div className="pt-3 flex-1">{children}</div>
    </section>
  );
};

export default SectionHeader;
