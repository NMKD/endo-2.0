/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { Booked, CleaningF, CleaningMch, CleaningMl, ResearchU } from "..";
import { EndoscopesProps } from "@/app/(site)/interfaces.props";

export default function Endoscopes({
  user,
  toResearch,
  toCleaning,
  toStore,
  toEndWashingMch,
  toEndWashingMl,
}: EndoscopesProps) {
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
          return (
            <div className="grid grid-cols-2 gap-4 content-center">
              {<Booked {...{ researchs, name, toResearch, setResearch }} />}
            </div>
          );
        case "reserch":
          return (
            <div className="grid grid-cols-2 gap-4 content-center">
              {<ResearchU {...{ researchs, name, toCleaning, setResearch }} />}
            </div>
          );
        case "cleaning":
          return (
            <div className="grid grid-cols-2 gap-4 content-center">
              {
                <CleaningF
                  {...{
                    researchs,
                    name,
                    toEndWashingMch,
                    toEndWashingMl,
                    setResearch,
                  }}
                />
              }
            </div>
          );
        case "machine_cleaning":
          return (
            <div className="grid grid-cols-2 gap-4 content-center">
              {<CleaningMch {...{ researchs, name, toStore, setResearch }} />}
            </div>
          );
        case "manual_cleaning":
          return (
            <div className="grid grid-cols-2 gap-4 content-center">
              {<CleaningMl {...{ researchs, name, toStore, setResearch }} />}
            </div>
          );

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
      {renderBoby(filteredEnd)}
    </>
  );
}
