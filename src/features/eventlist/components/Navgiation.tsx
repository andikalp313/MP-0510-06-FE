import { Badge } from "@/components/ui/badge";
import React from "react";

const Navgiation = () => {
  return (
    <div className="flex justify-center gap-28 items-center px-8 py-4 bg-white shadow-md">
      <Badge>All</Badge>
      <Badge>Today</Badge>
      <Badge>Tomorrow</Badge>
      <Badge>This Week</Badge>
      <Badge>Next Week</Badge>
      <Badge>Next weekend</Badge>
      <Badge>This month</Badge>
      <Badge>Next month</Badge>
      <Badge>This year</Badge>
      <Badge>Next year</Badge>
    </div>
  );
};

export default Navgiation;
