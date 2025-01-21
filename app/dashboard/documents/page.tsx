import BikeList from "@/components/dashboard/bike-information/bike-list";

export default async function BlogPage() {
  const response = await fetch("https://api.sawaribd.com/bike-information");
  const bikedatas = await response.json();
  return (
    <div>
      <BikeList bikedatas={bikedatas} />
    </div>
  );
}
