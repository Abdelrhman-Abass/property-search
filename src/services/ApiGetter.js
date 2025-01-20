"use server";

export const ApiGetter = async ({ url, take, type = "ISR" }) => {
  let fetchType = {
    next: { revalidate: 1 }, // Revalidate every 2 hours (7200 seconds)
  };

  if (type === "SSG") {
    fetchType = { cache: "force-cache" }; // Cache result permanently until a new build
  }

  if (type === "SSR") {
    fetchType = { cache: "no-store" }; // Always fetch fresh data on every request
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}${url}${take ? `?take=${take}` : ""}`,
      fetchType
    );

    // Ensure successful response
    if (!res.ok) {
      console.error(`Failed to fetch data from ${url}:`, res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
