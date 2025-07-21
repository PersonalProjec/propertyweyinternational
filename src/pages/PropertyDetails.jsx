import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';
import dummyProperties from '../data/properties'; // Simulated data source

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const found = dummyProperties.find((p) => p.id.toString() === id);
    setTimeout(() => setProperty(found), 800); // simulate loading
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-300">
        Loading property...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          color="gold"
          className="mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Back to Properties
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {/* IMAGE */}
          <Parallax speed={-10}>
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-[400px] object-cover rounded-lg shadow-xl"
            />
          </Parallax>

          {/* INFO */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gold">{property.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaMapMarkerAlt />
              {property.location}
            </div>
            <p className="text-lg font-bold text-primary">{property.price}</p>
            <div className="space-x-2">
              <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm">
                {property.type}
              </span>
              {property.status && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {property.status}
                </span>
              )}
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-6">
              {/* Replace with dynamic description from DB later */}
              This modern property offers exceptional design and functionality.
              Perfect for families or investors looking for comfort and
              convenience in a prime location.
            </p>

            {/* CTA */}
            <Button
              variant="solid"
              color="gold"
              size="lg"
              onClick={() => navigate(`/book/${property.id}`)}
              className="mt-6"
            >
              Book a Visit
            </Button>
          </div>
        </motion.div>

        {/* Optional MAP/VIDEO/FEATURES here */}
      </div>
    </section>
  );
};

export default PropertyDetails;
