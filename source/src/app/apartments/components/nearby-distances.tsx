"use client";

import type React from "react";
import { useState, useMemo } from "react";
import Select from "react-select";
import { FixedSizeList as List } from "react-window";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardTitle } from "./nearby-componets";
import { Input } from "./nearby-componets";
type Distance = {
  name: string;
  value: string;
  meters: number;
};

const distances: Distance[] = [
  { name: "Sea", value: "40 m", meters: 40 },
  { name: "Beach", value: "40 m", meters: 40 },
  { name: "Center", value: "200 m", meters: 200 },
  { name: "Store", value: "250 m", meters: 250 },
  { name: "Doctor", value: "1 500 m", meters: 1500 },
  { name: "Pharmacy", value: "200 m", meters: 200 },
  { name: "Bank", value: "250 m", meters: 250 },
  { name: "Post Office", value: "200 m", meters: 200 },
  { name: "Bus Station", value: "200 m", meters: 200 },
  { name: "Casino", value: "1 500 m", meters: 1500 },
  { name: "Airport", value: "3 000 m", meters: 3000 },
  { name: "Marina", value: "500 m", meters: 500 },
  { name: "Disco Club", value: "1 000 m", meters: 1000 },
  { name: "Restaurant", value: "100 m", meters: 100 },
  { name: "National Park", value: "65 000 m", meters: 65000 },
  { name: "Gas Station", value: "2 000 m", meters: 2000 },
];

const sortOptions = [
  { value: "name", label: "Name" },
  { value: "distance", label: "Distance" },
];

export default function NearbyDistances() {
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [ascending] = useState(true);

  const filteredAndSortedDistances = useMemo(() => {
    return distances
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === "name") {
          return ascending
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else {
          return ascending ? a.meters - b.meters : b.meters - a.meters;
        }
      });
  }, [searchTerm, sortBy, ascending]);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const item = filteredAndSortedDistances[index];
    return (
      <div style={style}>
        <Card className="m-2">
          <CardContent className="flex justify-between items-center p-4">
            <div className="flex items-center ">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium ">
                {item.name}
              </CardTitle>
            </div>
            <span className="text-sm font-bold text-accent">{item.value}</span>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <section className="bg-white py-10 px-4 sm:px-6 rounded-lg shadow-2xl my-8">
      <h2 className="text-3xl font-bold text-black text-center mb-6">
        Nearby Distances
      </h2>
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select
          options={sortOptions}
          onChange={(option) => setSortBy(option?.value || "name")}
          defaultValue={sortOptions[0]}
          className="w-full sm:w-48"
        />
      </div>
      <List
        height={400}
        itemCount={filteredAndSortedDistances.length}
        itemSize={80}
        width="100%"
      >
        {Row}
      </List>
    </section>
  );
}
