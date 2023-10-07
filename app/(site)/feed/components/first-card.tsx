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
        <p className="text-xs text-muted-foreground mb-1">About 8cv</p>
        <p>
          8cv is the ideal platform to build your portfolio, share your
          projects, and provide your links and CV. It offers a seamless way to
          showcase your skills and connect with potential opportunities. ✨
        </p>
      </CardContent>
      <CardFooter>
        <Link
          className="w-full"
          href="https://github.com/daishek/8cv"
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
