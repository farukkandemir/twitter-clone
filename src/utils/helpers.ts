export const fetchTwitterApi = async ({
  path,
  method,
  data,
  setError,
  callback,
}: {
  path: string;
  method: string;
  data: any;
  setError?: Function;
  callback?: Function;
}) => {
  const stringifiedData =
    method === "POST" ? { body: JSON.stringify(data) } : {};

  return await fetch(`/api/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...stringifiedData,
  })
    .then(async (response) => {
      if (!callback) {
        return null;
      }

      if (!response.ok && setError) {
        const message = await response.text();
        return setError(message);
      }

      const data = await response.json();
      const { error } = data;
      if (error && setError) {
        return setError(error);
      }

      if (callback) {
        return callback(data);
      }

      return null;
    })
    .catch((error) => {
      console.log("Api Error", error);

      return { error: true };
    });
};
