"use client";

import {
  ServicesData,
  ContentNode,
  RootNode,
} from "../../interfaces/returned-data/services";
import { useState } from "react";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

interface TabsDataProps<T> {
  data: T;
}

export default function TabsComponent({ data }: TabsDataProps<ServicesData>) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  // const content: BlocksContent = data.attributes.content;
  //   const content: RootNode = {
  //     type: "root",
  //     children: data.attributes.content,
  //   };

  const dronecontent: ContentNode[] = data.attributes.dronecontent;
  const matterportcontent: ContentNode[] = data.attributes.matterportcontent;

  return (
    <div className="md:flex w-10/12 max-w-screen-lg mb-16">
      <ul className="flex-column space-y space-y-4 text-sm font-medium md:me-4 mb-4 md:mb-0">
        <li className="border-b-accent">
          <button
            className={`inline-flex items-center px-4 py-3 text-white rounded-lg w-full hover:underline ${
              activeTab === 0 ? "bg-primary border-b-red" : ""
            }`}
            onClick={() => handleTabClick(0)}
          >
            <img
              className="w-6 rounded-full mr-0.5"
              src={data.attributes.tab1icon.data.attributes.url}
            />
            Tours
          </button>
        </li>
        <li>
          <button
            className={`inline-flex items-center px-4 py-3 rounded-lg text-text hover:underline w-full  ${
              activeTab === 1 ? "bg-primary text-secondary" : ""
            }`}
            onClick={() => handleTabClick(1)}
          >
            <img
              className="w-6 rounded-full mr-0.5"
              src={data.attributes.tab2icon.data.attributes.url}
            />
            Drone
          </button>
        </li>
      </ul>
      <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        {activeTab === 0 && (
          <BlocksRenderer
            content={dronecontent}
            blocks={{
              list: ({ children }) => (
                <ul className="list-disc max-w-prose">{children}</ul>
              ),
            }}
          />
        )}

        {activeTab === 1 && (
          <BlocksRenderer
            content={matterportcontent}
            blocks={{
              list: ({ children }) => (
                <ul className="list-disc max-w-prose">{children}</ul>
              ),
            }}
          />
        )}

        {/* {activeTab === 0 && (extractedText || "") && (
          <ReactMarkdown>{extractedText}</ReactMarkdown>
        )} */}
      </div>
    </div>
  );
}
