import { motion } from "framer-motion";

const blogData = [
  {
    title: "GST Returns: What Every Small Business Should Know",
    description: "A simple breakdown of monthly/quarterly GST filing and penalties.",
    image: "https://images.pexels.com/photos/4386371/pexels-photo-4386371.jpeg",
    link: "https://cleartax.in/s/gst-returns",
  },
  {
    title: "Why Bookkeeping Matters for Business Growth",
    description: "How proper accounting boosts decision-making and profitability.",
    image: "https://images.pexels.com/photos/6693655/pexels-photo-6693655.jpeg",
    link: "https://www.wishup.co/blog/why-is-bookkeeping-important-for-your-business/",
  },
  {
    title: "Income Tax Changes for FY 2024–25",
    description: "Updated slabs, deductions, and benefits explained clearly.",
    image: "https://images.pexels.com/photos/4386367/pexels-photo-4386367.jpeg",
    link: "https://www.incometax.gov.in/iec/foportal/latest-news",
  },
  {
    title: "MSME Registration Benefits You Shouldn’t Miss",
    description: "Explore subsidies, tax reliefs, and funding opportunities.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    link: "https://cleartax.in/s/msme-registration-india#h0",
  },
  {
    title: "How to Choose the Right Business Structure",
    description: "Compare Proprietorship, LLP, and Pvt Ltd with pros & cons.",
    image: "https://images.pexels.com/photos/3182756/pexels-photo-3182756.jpeg",
    link: "https://www.sba.gov/business-guide/launch-your-business/choose-business-structure",
  },
  {
    title: "PAN vs TAN: What’s the Difference?",
    description: "When and why PAN or TAN is required for businesses.",
    image: "https://images.pexels.com/photos/3943720/pexels-photo-3943720.jpeg",
    link: "https://testbook.com/key-differences/difference-between-pan-and-tan",
  },
  {
    title: "44AD/44ADA Presumptive Taxation Explained",
    description: "Ideal for freelancers, professionals, and small businesses.",
    image: "https://images.pexels.com/photos/4386404/pexels-photo-4386404.jpeg",
    link: "https://cleartax.in/s/presumptive-taxation-under-sec-44ad-and-44ae",
  },
  {
    title: "Filing TDS Returns: A Beginner’s Guide",
    description: "Understanding TDS forms, deadlines, and penalties.",
    image: "https://images.pexels.com/photos/4386396/pexels-photo-4386396.jpeg",
    link: "https://cleartax.in/s/tds",
  },
  {
    title: "ROC Compliance Checklist for Pvt Ltd Companies",
    description: "Mandatory annual filings and common mistakes to avoid.",
    image: "https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg",
    link: "https://taxguru.in/company-law/compliance-checklist-private-limited-companies.html",
  },
 
];


const Blogs = () => {
  return (
    <div className="min-h-screen py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Insights & Updates
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest tax laws, compliance news, and financial strategies.
          </p>
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogData.map((blog, index) => (
            <motion.a
              key={index}
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-xl 
                         transition-all duration-300 overflow-hidden cursor-pointer block"
            >
              {/* Image */}
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {blog.description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
