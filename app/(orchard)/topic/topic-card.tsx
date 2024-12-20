import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check, ChevronRight } from "lucide-react";

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
      className={`group relative overflow-hidden border transition-all duration-200 ${
        isSelected
          ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
          : "border-border hover:border-primary/50 hover:shadow-md"
      }`}
    >
      <CardContent
        className="pt-6 cursor-pointer space-y-4 hover:bg-accent/50 transition-colors"
        onClick={onClick}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h2
              className={`text-xl font-semibold transition-colors ${
                isSelected
                  ? "text-primary"
                  : "text-foreground group-hover:text-primary/80"
              }`}
            >
              {title}
            </h2>
            {showSpecificTopics && (
              <p className="text-sm text-muted-foreground">
                Click to view specific topics
              </p>
            )}
          </div>
          {isSelected ? (
            <div className="rounded-full bg-primary/10 p-1.5">
              <Check className="h-4 w-4 text-primary" />
            </div>
          ) : (
            <div className="rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
      </CardContent>
      {showSpecificTopics && (
        <CardFooter className="pb-4">
          <Button
            onClick={showSpecificTopics}
            variant={isSpecificTopicsShown ? "secondary" : "outline"}
            className="w-full transition-colors hover:bg-primary/10 group"
          >
            <span>
              {isSpecificTopicsShown
                ? "Hide specific topics"
                : "Show specific topics"}
            </span>
            <ChevronRight
              className={`ml-2 h-4 w-4 transition-transform ${
                isSpecificTopicsShown
                  ? "rotate-90"
                  : "group-hover:translate-x-1"
              }`}
            />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
