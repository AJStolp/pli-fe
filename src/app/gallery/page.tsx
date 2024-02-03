import React from "react";
import { getData } from "../api/fetch";
import DefaultTabs from "../components/tabs-default/tabs";
import { DroneData } from "../interfaces/returned-data/drone";
import { TourData } from "../interfaces/returned-data/tours";

export default async function Gallery() {
  const droneendpoint =
    "https://pli-be-production.up.railway.app/api/drones?populate[sections][populate][media][populate]=*";
  const toursendpoint =
    "https://pli-be-production.up.railway.app/api/matterports?populate=*";

  try {
    const droneData: DroneData[] = await getData(droneendpoint);
    const toursData: TourData[] = await getData(toursendpoint);

    // Assuming data fetching and structure are correct
    return (
      <main className="max-w-screen-lg m-auto px-4 mb-12">
        <DefaultTabs dronedata={droneData} tourdata={toursData} />
      </main>
    );
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return <div>Error: {errorMessage}</div>;
  }
}
