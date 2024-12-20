import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface TopicCardProps {
  title: string;
  onClick: () => void;
  isSelected: boolean;
  showSpecificTopics?: () => void;
  isSpecificTopicsShown?: boolean;
}

export default function TopicCard({
  title,
  onClick,
  isSelected,
  showSpecificTopics,
  isSpecificTopicsShown,
}: TopicCardProps) {
  return (
    <Card
      className={`bg-white transition-all duration-200 ease-in-out ${
        isSelected ? "ring-2 ring-black" : "hover:shadow-md"
      }`}
    >
      <CardContent className="pt-6 cursor-pointer" onClick={onClick}>
        <h2
          className={`text-xl font-semibold mb-2 ${
            isSelected ? "text-red-600" : "text-black"
          }`}
        >
          {title}
        </h2>
      </CardContent>
      {showSpecificTopics && (
        <CardFooter>
          <Button
            onClick={showSpecificTopics}
            variant={isSpecificTopicsShown ? "secondary" : "outline"}
            className="w-full"
          >
            {isSpecificTopicsShown
              ? "Hide specific topics"
              : "Show specific topics"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
