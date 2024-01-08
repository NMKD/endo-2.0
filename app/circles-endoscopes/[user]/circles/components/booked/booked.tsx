import { TNullNumber } from "@/app/interfaces.props";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { Circle } from "@prisma/client";

const Booked = ({
  researchs,
  name,
  toResearch,
  setResearch,
}: {
  researchs: Circle[];
  name: string;
  toResearch: (
    id: TNullNumber,
    userId: TNullNumber
  ) => Promise<Circle | undefined>;
  setResearch: (arr: Circle[]) => void;
}) => {
  const onClickButton = async (id: TNullNumber, userId: TNullNumber) => {
    if (!id || !userId) {
      return;
    }
    const circle = await toResearch(id, userId);
    if (circle) {
      setResearch(
        researchs.map((item) =>
          item.endoscopeId === circle.endoscopeId
            ? {
                ...item,
                ...circle,
              }
            : { ...item }
        )
      );
    }
  };
  const renderBooking = () => {
    if (researchs.length > 0) {
      return researchs.map((item) => {
        if (item.isBooking) {
          return (
            <Card className="max-w-[400px]" key={item.id}>
              <CardHeader>
                <div className="flex flex-col">
                  <p className="text-md">Эндоскоп {item.endoscopeId}</p>
                  <p className="text-small text-default-500">
                    Медсестра: {name}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p>
                  Данный эндоскоп готов к работе. Нажмите кнопку &quot;Отправить
                  на исследование&quot;
                </p>
              </CardBody>
              <Divider />
              <CardFooter>
                <Button
                  onClick={() => onClickButton(item.endoscopeId, item.userId)}
                >
                  Отправить на исследование
                </Button>
              </CardFooter>
            </Card>
          );
        }
      });
    }
    return (
      <h2 className="text-center text-xl">
        У вас нет забронированных эндоскопов
      </h2>
    );
  };

  return <>{renderBooking()}</>;
};

export default Booked;
