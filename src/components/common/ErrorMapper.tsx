import React, { useMemo } from "react";

type Props = {
  error: any;
};

const ErrorMapper = ({ error }: Props) => {
  return (
    <div className="w-full">
      {error &&
        ("status" in error ? (
          <div>
            <div>
              {error?.data &&
                Object.keys(error.data).map((key) => {
                  return (
                    <p key={key} className="text-red-500">
                      {error.data[key]}
                    </p>
                  );
                })}
            </div>
          </div>
        ) : null)}
    </div>
  );
};

export default ErrorMapper;
