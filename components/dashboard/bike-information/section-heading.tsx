interface SectionHeadingProps {
  children: React.ReactNode;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => (
  <h3 className="text-xl font-bold border-b pb-2 mb-4 text-gray-800">
    {children}
  </h3>
);

export default SectionHeading;
