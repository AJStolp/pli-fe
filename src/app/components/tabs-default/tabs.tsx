"use client";

import { DroneData } from "../../interfaces/returned-data/drone";
import { TourData } from "../../interfaces/returned-data/tours";
import { Suspense, useState } from "react";

interface DefaultTabsProps {
  dronedata: DroneData[];
  tourdata: TourData[];
}

interface DisplayedImagesCount {
  [sectionId: string]: number;
}

export default function DefaultTabs({ dronedata, tourdata }: DefaultTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [displayedImagesCount, setDisplayedImagesCount] =
    useState<DisplayedImagesCount>({});

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handleLoadMore = (sectionId: number) => {
    setDisplayedImagesCount((prevCount) => ({
      ...prevCount,
      [sectionId]: (prevCount[sectionId] || 3) + 3, // Start with 4, add 10 more each time
    }));
  };

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
        {activeTab === 0 &&
          dronedata.map((droneItem) => (
            <div key={droneItem.id}>
              {droneItem.attributes.sections.map((section) => {
                // Calculate how many images to display for this section
                const displayCount = displayedImagesCount[section.id] || 3;
                const imagesToDisplay = section.media
                  .flatMap((i) => i.media.data)
                  .slice(0, displayCount);

                return (
                  <section key={section.id}>
                    <p>{section.title}</p>
                    <Suspense fallback={"Loading Gallery"}>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {imagesToDisplay.map((url, index) => (
                          <img key={index} src={url.attributes.url} alt="" />
                        ))}
                      </div>
                      {imagesToDisplay.length <
                        section.media.flatMap((i) => i.media.data).length && (
                        <button
                          onClick={() => handleLoadMore(section.id)}
                          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                        >
                          Load More
                        </button>
                      )}
                    </Suspense>
                  </section>
                );
              })}
            </div>
          ))}

        {activeTab === 1 &&
          tourdata.map((item) => (
            <section
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {item.attributes.linktext.map((text) => (
                <section key={text.id}>
                  {/* <h2>{text.linktext}</h2> */}
                  <iframe
                    height="500"
                    width="500"
                    src={text.linkpath}
                    allowFullScreen
                    allow="xr-spatial-tracking"
                  ></iframe>
                </section>
              ))}
            </section>
          ))}
      </section>
    </div>
  );
}
