import { BikeDetailsType } from "@/types";
import BikeItem from "./bike-item";

export default async function BikeList() {
  const response = await fetch("https://api.sawaribd.com/bike-information");
  const bikedatas = await response.json();

  return (
    <div className=" grid grid-cols-1 gap-4">
      {bikedatas &&
        bikedatas.length > 0 &&
        bikedatas.map((data: BikeDetailsType) => {
          return <BikeItem {...data} key={data._id} />;
        })}
    </div>
  );
}
