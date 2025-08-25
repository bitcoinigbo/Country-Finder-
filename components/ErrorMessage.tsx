
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded-lg relative max-w-2xl mx-auto text-center" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default ErrorMessage;
