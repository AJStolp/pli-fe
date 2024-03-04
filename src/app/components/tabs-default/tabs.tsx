"use client";

import { DroneData } from "../../interfaces/returned-data/drone";
import { TourData } from "../../interfaces/returned-data/tours";
import { Suspense, useEffect, useState } from "react";
import ImageSkeleton from "../skeleton/image-skeleton";

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
  const [displayedSectionsCount, setDisplayedSectionsCount] = useState(3);
  const [fullscreenImageUrl, setFullscreenImageUrl] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handleLoadMoreImages = (sectionId: number) => {
    setDisplayedImagesCount((prevCount) => ({
      ...prevCount,
      [sectionId]: (prevCount[sectionId] || 3) + 3, // Start with 4, add 10 more each time
    }));
  };

  const handleLoadMoreSections = () => {
    setDisplayedSectionsCount((prevCount) => prevCount + 2); // Adjust as needed
  };

  useEffect(() => {
    if (fullscreenImageUrl) {
      const imageElement = document.createElement("img");
      imageElement.src = fullscreenImageUrl;
      imageElement.style.maxWidth = "100%";
      imageElement.style.maxHeight = "100%";
      document.body.appendChild(imageElement);

      const enterFullscreen = async () => {
        if (imageElement.requestFullscreen) {
          await imageElement.requestFullscreen();
        }
      };

      enterFullscreen().catch((err) => {
        console.error("Error attempting to enter fullscreen:", err);
      });

      const fullscreenChange = () => {
        if (!document.fullscreenElement) {
          setFullscreenImageUrl(null); // Reset state when exiting fullscreen
          document.body.removeChild(imageElement);
        }
      };

      document.addEventListener("fullscreenchange", fullscreenChange);

      return () => {
        // Cleanup
        document.removeEventListener("fullscreenchange", fullscreenChange);
        if (document.fullscreenElement === imageElement) {
          document.exitFullscreen().catch((err) => {
            console.error("Error attempting to exit fullscreen:", err);
          });
        }
        if (imageElement.parentNode) {
          document.body.removeChild(imageElement);
        }
      };
    }
  }, [fullscreenImageUrl]);

  useEffect(() => {
    setIsLoading(false); // Set loading to false once data is fetched
  }, [activeTab]);

  if (isLoading) {
    return <ImageSkeleton />; // Show skeleton while loading
  }

  const handleImageClick = (imageUrl: string) => {
    if (fullscreenImageUrl) {
      // Attempting to exit fullscreen if already in fullscreen state
      document.exitFullscreen().catch((err) => {
        console.error("Error attempting to exit fullscreen:", err);
      });
    }
    setFullscreenImageUrl(imageUrl);
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
            Tours
          </button>
        </li>
      </ul>
      <section className="pt-8 pb-24">
        {activeTab === 0 &&
          dronedata.map((droneItem) => (
            <div key={droneItem.id}>
              {droneItem.attributes.sections
                .slice(0, displayedSectionsCount)
                .map((section) => {
                  const displayCount = displayedImagesCount[section.id] || 3;
                  const imagesToDisplay = section.media
                    .flatMap((i) => i.media.data)
                    .slice(0, displayCount);

                  return (
                    <section key={section.id}>
                      <h2 className="text-base py-2">{section.title}</h2>
                      <Suspense fallback={"Loading Gallery"}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {imagesToDisplay.map((url, idx) => (
                            <img
                              key={idx}
                              src={url.attributes.url}
                              alt=""
                              onClick={() =>
                                handleImageClick(url.attributes.url)
                              }
                              className="cursor-pointer"
                            />
                          ))}

                          {imagesToDisplay.length <
                            section.media.flatMap((i) => i.media.data)
                              .length && (
                            <button
                              onClick={() => handleLoadMoreImages(section.id)}
                              className="mt-4 p-2 bg-primary text-white rounded hover:bg-accent hover:underline"
                            >
                              Load More Images
                            </button>
                          )}
                        </div>
                      </Suspense>
                    </section>
                  );
                })}
              {activeTab === 0 &&
                dronedata.some(
                  (droneItem) =>
                    droneItem.attributes.sections.length >
                    displayedSectionsCount
                ) && (
                  <button
                    onClick={handleLoadMoreSections}
                    className="mt-4 p-2 bg-primary text-white rounded hover:bg-accent hover:underline"
                  >
                    Show more locations
                  </button>
                )}
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
                    className="rounded"
                    title={text.linktext}
                  ></iframe>
                </section>
              ))}
            </section>
          ))}
      </section>
    </div>
  );
}
