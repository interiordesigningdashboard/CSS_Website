export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return await $fetch("http://localhost:4151/api/contact", {
    method: "POST",
    body,
  });
});
