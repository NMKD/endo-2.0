"use client";
import { Button } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { Booked, CleaningF, CleaningMch, CleaningMl, ResearchU } from "..";
import { IEndoscopesProps } from "@/interfaces";

export default function Endoscopes({
  user,
  toResearch,
  toCleaning,
  toStore,
  toEndWashingMch,
  toEndWashingMl,
}: IEndoscopesProps) {
  const { circles, name } = user;

  const [filteredEnd, setFilteredEnd] = useState("booking");
  const [researchs, setResearch] = useState(circles);

  const buttons = [
    "booking",
    "reserch",
    "cleaning",
    "machine_cleaning",
    "manual_cleaning",
  ];
  const onClickButton = (name: string) => setFilteredEnd(name);

  const renderBoby = useCallback(
    (filtered: string) => {
      switch (filtered) {
        case "booking":
          return <Booked {...{ researchs, name, toResearch, setResearch }} />;
        case "reserch":
          return (
            <ResearchU {...{ researchs, name, toCleaning, setResearch }} />
          );
        case "cleaning":
          return (
            <CleaningF
              {...{
                researchs,
                name,
                toEndWashingMch,
                toEndWashingMl,
                setResearch,
              }}
            />
          );
        case "machine_cleaning":
          return <CleaningMch {...{ researchs, name, toStore, setResearch }} />;
        case "manual_cleaning":
          return <CleaningMl {...{ researchs, name, toStore, setResearch }} />;

        default:
          break;
      }
    },
    [
      researchs,
      name,
      toResearch,
      toCleaning,
      toStore,
      toEndWashingMch,
      toEndWashingMl,
    ]
  );

  return (
    <>
      <div className="flex flex-wrap gap-4 items-center justify-center my-5">
        {buttons.map((index) => (
          <Button
            key={index}
            onClick={() => onClickButton(index)}
            color={index === filteredEnd ? "warning" : "primary"}
          >
            {index}
          </Button>
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-4 content-center">
        {renderBoby(filteredEnd)}
      </div>
    </>
  );
}
