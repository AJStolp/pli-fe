import { getData } from "../api/fetch";
// import DefaultTabs from "../components/tabs-default/tabs";
import { DroneData } from "../interfaces/returned-data/drone";

export default async function Gallery() {
  const droneendpoint =
    "/api/drones?populate[sections][populate][media][populate]=*";
  // const toursendpoint = "/api/matterports?populate=*";

  try {
    const droneData: DroneData = await getData(droneendpoint);

    console.log(droneData, "dronedata");

    return (
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <a
              href="#"
              className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
              aria-current="page"
            >
              Drone
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
              aria-current="page"
            >
              Tours
            </a>
          </li>
        </ul>
      </div>
    );
  } catch (error) {
    return error;
  }
}
