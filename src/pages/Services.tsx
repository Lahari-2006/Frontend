import { useState } from "react";
import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import ServiceModal from "@/components/ServiceModal";
import { servicesData, SubService } from "@/data/servicesData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<SubService | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleServiceClick = (service: SubService) => {
    setSelectedService(service);
    setSelectedCategory(null);
    setIsServiceModalOpen(true);
  };

  const selectedCategoryData = servicesData.find(
    (cat) => cat.id === selectedCategory
  );

  return (
    <div className="min-h-screen py-24 bg-white">
      <div className="container mx-auto px-6">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive financial and compliance solutions tailored to your business needs.
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((category, index) => (
            <ServiceCard
              key={category.id}
              title={category.title}
              description={category.description}
              icon={category.icon}
              subServiceCount={category.subServices.length}
              onClick={() => handleCategoryClick(category.id)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Category Sub-Service Modal */}
      <Dialog
        open={selectedCategory !== null}
        onOpenChange={() => setSelectedCategory(null)}
      >
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto rounded-xl shadow-xl border border-blue-100">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {selectedCategoryData?.title}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {selectedCategoryData?.description}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {selectedCategoryData?.subServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="
                  p-4 rounded-xl 
                  border border-blue-100 
                  bg-white 
                  hover:border-blue-300 hover:bg-blue-50/50 
                  shadow-sm hover:shadow-md
                  transition-all cursor-pointer
                "
                onClick={() => handleServiceClick(service)}
              >
                <h3 className="font-semibold text-gray-900 mb-1">
                  {service.name}
                </h3>

                <p className="text-sm text-gray-600">
                  {service.description}
                </p>

                <Button
                  variant="link"
                  className="mt-2 p-0 h-auto text-blue-600 font-medium"
                >
                  Book this service →
                </Button>
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Service Booking Modal */}
      <ServiceModal
        isOpen={isServiceModalOpen}
        onClose={() => {
          setIsServiceModalOpen(false);
          setSelectedService(null);
        }}
        service={selectedService}
      />
    </div>
  );
};

export default Services;
