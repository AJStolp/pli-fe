"use client";

import { Suspense } from "react";
import Mapped from "../components/map/map";
import MapSkeleton from "../components/skeleton/map-skeleton";
import MappedNoPAckage from "../components/map/mapbox-gl-js";

export default function MapPage() {
  return (
    <>
      <Mapped />
      {/* <MappedNoPAckage /> */}
    </>
  );
}
