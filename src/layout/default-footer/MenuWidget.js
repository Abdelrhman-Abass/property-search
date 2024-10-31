"use server";
import { ApiGetter } from "@/services/ApiGetter";
import Widgets from "./Widgets";

const MenuWidget = async () => {
  const topAreas = await ApiGetter({
    url: "/api/TopAreas/recommended",
    take: 6,
  });
  const mostSearched = await ApiGetter({
    url: "/api/TopCompounds/most-searched",
    take: 6,
  });

  const recommended = await ApiGetter({
    url: "/api/TopCompounds/recommended",
    take: 6,
  });

  return (
    <Widgets
      topAreas={topAreas}
      mostSearched={mostSearched}
      recommended={recommended}
    />
  );
};

export default MenuWidget;
