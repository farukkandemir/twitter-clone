import React from "react";

const ErrorField = ({ error }: { error: string | undefined }) => {
  return (
    <div>
      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
};

export default ErrorField;
