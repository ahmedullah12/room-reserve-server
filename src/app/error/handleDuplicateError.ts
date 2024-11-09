/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSource, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const regex = /dup key: { ([\w]+):/;
  const matchPath = err.message.match(regex);
  const extractedPath = matchPath && matchPath[1];

  const userFriendlyMessage = extractedPath
  ? `${extractedPath.charAt(0).toUpperCase() + extractedPath.slice(1)} already exists`
  : 'Duplicate key error';

  const errorMessages: TErrorSource = [
    {
      path: extractedPath,
      message: err.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: userFriendlyMessage,
    errorMessages,
  };
};

export default handleDuplicateError;
