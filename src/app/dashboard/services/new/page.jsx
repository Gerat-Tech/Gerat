import React from "react";
import ServicePillarEditor from "../components/ServicePillarEditor";

export const metadata = {
  title: "New Practice Pillar // Gerat Mission Control",
  description: "Configure a new engineering or creative practice pillar",
};

export default function NewServicePillarPage() {
  return <ServicePillarEditor isNew={true} />;
}
