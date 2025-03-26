type Props = {
  message?: string;
};

const ErrorFallback = ({ message = "Failed to load data." }: Props) => {
  return (
    <div className="md:p-8 p-6 bg-white shadow-2xl rounded-lg ">
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default ErrorFallback;
