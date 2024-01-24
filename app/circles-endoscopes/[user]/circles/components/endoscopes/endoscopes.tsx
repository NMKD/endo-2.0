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

  const nameButton = {
    booking: {
      name: "В работу",
    },
    reserch: {
      name: "Исследования",
    },
    cleaning: {
      name: "Окончательная очистка",
    },
    machine_cleaning: {
      name: "Машинная мойка",
    },
    manual_cleaning: {
      name: "Ручная мойка",
    },
  };
  const onClickButton = (name: string) => {
    const btnKeyName = Object.keys(nameButton).find(
      (keyButton) => keyButton === name
    );
    btnKeyName ? setFilteredEnd(btnKeyName) : setFilteredEnd("booking");
  };

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
        {(Object.keys(nameButton) as Array<keyof typeof nameButton>).map(
          (index) => (
            <Button
              key={index}
              onClick={() => onClickButton(index)}
              color={index === filteredEnd ? "warning" : "primary"}
            >
              {nameButton[index].name}
            </Button>
          )
        )}
      </div>
      <div className="flex flex-col gap-4 items-center">
        {renderBoby(filteredEnd)}
      </div>
    </>
  );
}
