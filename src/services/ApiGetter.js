"use server";
export const ApiGetter = async ({ url, take, type = "ISR" }) => {
  let fetchType = {
    next: { revalidate: 1 },
  };
  if (type === "SSG") {
    fetchType = { cache: "force-cache" };
  }
  if (type === "SSR") {
    fetchType = { cache: "no-store" };
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${url}${take ? `?take=${take}` : ""}`,
      fetchType
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
};
