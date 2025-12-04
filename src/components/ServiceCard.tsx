import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  subServiceCount: number;
  onClick: () => void;
  index: number;
}

const ServiceCard = ({
  title,
  description,
  icon,
  subServiceCount,
  onClick,
  index,
}: ServiceCardProps) => {
  const IconComponent = Icons[icon as keyof typeof Icons] as LucideIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="
          h-[280px]                     /* Increased height */
          w-full                        /* Full responsive width */
          cursor-pointer
          group
          bg-white
          border border-blue-100
          rounded-2xl
          hover:shadow-xl
          hover:border-blue-300
          transition-all 
          duration-300
          hover:-translate-y-1
        "
        onClick={onClick}
      >
        <CardHeader className="space-y-3">
          {/* TOP: ICON + COUNT */}
          <div className="flex items-start justify-between">
            <div
              className="
                p-3
                rounded-xl
                bg-blue-50
                text-blue-600
                group-hover:bg-blue-600
                group-hover:text-white
                transition
              "
            >
              <IconComponent className="w-6 h-6" />
            </div>

            <Badge
              variant="secondary"
              className="ml-2 bg-blue-100 text-blue-700"
            >
              {subServiceCount} Services
            </Badge>
          </div>

          {/* TITLE */}
          <CardTitle
            className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition"
          >
            {title}
          </CardTitle>

          {/* DESCRIPTION */}
          <CardDescription className="text-base text-gray-600">
            {description}
          </CardDescription>
        </CardHeader>

        {/* FOOTER LINK */}
        <CardContent>
          <p className="text-sm text-blue-600 font-medium group-hover:underline">
            View all services →
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
