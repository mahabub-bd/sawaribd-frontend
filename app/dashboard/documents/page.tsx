import BikeList from "@/components/dashboard/bike-information/bike-list";
import { fetchData } from "@/utils/apiServices";

export default async function BlogPage() {
  const bikedatas = await fetchData("bike-information");

  return (
    <div>
      <BikeList bikedatas={bikedatas} />
    </div>
  );
}
