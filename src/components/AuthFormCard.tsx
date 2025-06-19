import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AuthFormCardProps {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  className?: string;
}

const AuthFormCard: React.FC<AuthFormCardProps> = ({
  title,
  description,
  children,
  footerContent,
  className,
}) => {
  console.log("Rendering AuthFormCard with title:", title);

  return (
    <Card className={cn("w-full max-w-md shadow-lg", className)}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="grid gap-4">
        {children}
      </CardContent>
      {footerContent && (
        <CardFooter className="flex flex-col items-start gap-2 pt-4 text-sm">
          {footerContent}
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthFormCard;