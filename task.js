export const task = async (input) => {
  const body = {
    hello: "world",
    foo: input,
  };
  try {
  } catch (e) {
    console.log(e);
  }
  await new Promise(r => setTimeout(r, 3000));
  return body;
};
