import { Link, useMatches } from "react-router";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
export default function BreadCrumbCustom() {
  const matches = useMatches();
  const crumbs = matches
    .filter((match) => Boolean(match?.handle?.crumb))
    .map((match) => match.handle.crumb(match.data));
  console.log("🚀 ~ BreadCrumbCustom ~ crumbs:", crumbs);
  return (
    <Breadcrumbs>
      <BreadcrumbItem key="Home">
        <Link to="/">Home</Link>
      </BreadcrumbItem>
      {crumbs.map((crumb, index) => (
        <BreadcrumbItem key={index}>{crumb}</BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
}
