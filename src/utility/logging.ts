export const logAlert = (
  result: FetchResponse,
  setAlert: React.Dispatch<React.SetStateAction<Alert | undefined>>,
): boolean => {
  const messages = result.errors?.length
    ? result.errors.map((err) => err.message)
    : [result.message];

  setAlert({
    success: result.success,
    messages,
  });

  return result.success;
};
