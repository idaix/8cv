import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

const FirstCard = () => {
  return (
    <Card className="overflow-hidden mb-4 bg-muted">
      <CardContent className="pt-6 pb-3">
        <h3 className="text-xs text-muted-foreground mb-1">
          About Talents app
        </h3>
        <p>
          Talents app is a beautiful space to share your skills, CV, projects,
          thoughts, blogs links and your talent✨
        </p>
      </CardContent>
      <CardFooter>
        <Link
          className="w-full"
          href="https://github.com/daishek/talents"
          target="_blank"
          rel="noreferrer"
        >
          <Badge
            aria-hidden="true"
            className="rounded-md px-3.5 py-1.5 w-full mx-auto"
            variant="default"
          >
            <GithubIcon className="mr-2 h-3.5 w-3.5" />
            Source Code on GitHub
          </Badge>
          <span className="sr-only">GitHub</span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default FirstCard;
