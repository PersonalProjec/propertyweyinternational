import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import { FaMapMarkerAlt, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import Slider from 'react-slick';

const api = import.meta.env.VITE_API_BASE_URL;

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${api}/properties/${id}`);
        const result = await res.json();
        if (!res.ok) throw new Error(result.message || 'Property not found');
        setProperty(result.property);
      } catch (err) {
        console.log(err)
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-300">
        Loading property...
      </div>
    );
  }
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 dark:text-red-400">
        Property not found.
      </div>
    );
  }

  // Slick carousel settings for images
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: property.images && property.images.length > 1,
    adaptiveHeight: true,
  };

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
          {/* IMAGES (Carousel if multiple) */}
          <Parallax speed={-10}>
            {property.images && property.images.length > 0 ? (
              <div className="relative">
                <Slider {...sliderSettings}>
                  {property.images.map((img, idx) => (
                    <div key={idx}>
                      <img
                        src={img}
                        alt={`${property.title} - Image ${idx + 1}`}
                        className="w-full h-[400px] object-cover rounded-lg shadow-xl"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <img
                src="https://res.cloudinary.com/demo/image/upload/v1699025938/sample.jpg"
                alt={property.title}
                className="w-full h-[400px] object-cover rounded-lg shadow-xl"
              />
            )}
          </Parallax>

          {/* INFO */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gold flex items-center gap-2">
              {property.title}
              {property.approved && (
                <FaCheckCircle className="text-green-500" title="Verified" />
              )}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaMapMarkerAlt />
              {property.location}
            </div>
            <p className="text-lg font-bold text-primary">{typeof property.price === 'number'
              ? `₦${property.price.toLocaleString()}`
              : property.price}
            </p>
            <div className="space-x-2">
              <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-sm">
                {property.type}
              </span>
              {property.status && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {property.status}
                </span>
              )}
              {property.tags && property.tags.includes('limited') && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  Limited Offer
                </span>
              )}
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-6">
              {property.description ||
                'No property description available.'}
            </p>
            {property.area && (
              <div className="text-sm text-gray-500 mt-2">
                <b>Area:</b> {property.area}
              </div>
            )}
            {/* Add more features here if needed */}

            {/* CTA */}
            <Button
              variant="solid"
              color="gold"
              size="lg"
              onClick={() => navigate(`/book/${property._id}`)}
              className="mt-6"
            >
              Book a Visit
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PropertyDetails;
