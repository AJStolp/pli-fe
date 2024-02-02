"use client";

import { DroneData } from "../../interfaces/returned-data/drone";
import { TourData } from "../../interfaces/returned-data/tours";

import { Suspense, useState } from "react";
import MapSkeleton from "../skeleton/map-skeleton";

interface DefaultTabsProps {
  dronedata: DroneData[];
  matterportdata: TourData;
}

export default function DefaultTabs({
  dronedata,
  matterportdata,
}: DefaultTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const urls = dronedata.flatMap((item) =>
    item.attributes.sections.flatMap((section) =>
      section.media.flatMap((mediaItem) =>
        mediaItem.media.data.map((dataItem) =>
          dataItem.attributes.url.toString()
        )
      )
    )
  );

  console.log(urls, "url");

  return (
    <div className="text-sm font-medium">
      <ul className="flex flex-wrap -mb-px">
        <li className="me-2">
          <button
            className={`inline-block p-4 text-text rounded-t-lg ${
              activeTab === 0
                ? "active text-accent border-b-2 border-accent"
                : ""
            }`}
            onClick={() => handleTabClick(0)}
          >
            <img className="w-6 rounded-full mr-0.5" src={""} />
            Drone
          </button>
        </li>
        <li className="me-2">
          <button
            className={`inline-block p-4 text-text rounded-t-lg ${
              activeTab === 1
                ? "active text-accent border-b-2 border-accent"
                : ""
            }`}
            onClick={() => handleTabClick(1)}
          >
            <img className="w-6 rounded-full mr-0.5" src={""} />
            Tours
          </button>
        </li>
      </ul>
      <section className="py-8">
        {activeTab === 0 && (
          <div className="text-text">
            {dronedata.map((droneItem) => (
              <div key={droneItem.id}>
                {droneItem.attributes.sections.map((section) => (
                  <section>
                    <p key={section.id}>{section.title}</p>
                    <Suspense fallback={"Loading Gallery"}>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {urls.map((item) => (
                          <img src={item} alt="" />
                        ))}
                      </div>
                    </Suspense>
                  </section>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeTab === 1 && "yo momma son"}
      </section>
    </div>
  );
}
