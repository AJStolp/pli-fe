import { Tabs } from "flowbite-react";

interface DefaultTabsProps<T> {
  data: T;
}

export default function DefaultTabs<T>({ data }: DefaultTabsProps<T>) {
  return (
    <Tabs aria-label="Default tabs" style="default">
      <Tabs.Item active title="Immersive Tour">
        This is{" "}
        <span className="font-medium text-gray-800 dark:text-white">
          Profile tab's associated content
        </span>
        . Clicking another tab will toggle the visibility of this one for the
        next. The tab JavaScript swaps classes to control the content visibility
        and styling.
      </Tabs.Item>
      <Tabs.Item title="Drone Perspectives">
        This is{" "}
        <span className="font-medium text-gray-800 dark:text-white">
          Dashboard tab's associated content
        </span>
        . Clicking another tab will toggle the visibility of this one for the
        next. The tab JavaScript swaps classes to control the content visibility
        and styling.
      </Tabs.Item>
    </Tabs>
  );
}
