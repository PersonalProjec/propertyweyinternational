import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { Parallax } from 'react-scroll-parallax';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import Button from '../components/Button';

const propertiesPerPage = 6;

// ✅ Dummy Data (with Cloudinary + Status)
const dummyProperties = [
  {
    id: 1,
    title: 'Luxury 4-Bed Duplex',
    type: 'Sale',
    price: '₦150,000,000',
    status: 'Verified',
    location: 'Lekki Phase 1, Lagos',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1699025938/sample.jpg',
  },
  {
    id: 2,
    title: 'Modern 2-Bed Apartment',
    type: 'Rent',
    price: '₦2,500,000/year',
    status: 'New',
    location: 'Gwarinpa, Abuja',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1699025938/sample.jpg',
  },
  {
    id: 3,
    title: 'Airbnb Shortlet - Ikoyi',
    type: 'Shortlet',
    price: '₦80,000/night',
    status: 'Limited Offer',
    location: 'Ikoyi, Lagos',
    image:
      'https://res.cloudinary.com/demo/image/upload/v1699025938/sample.jpg',
  },
  // ...add more items (at least 10) to test pagination
];

export default function Properties() {
  const [filter, setFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // 1.5s loader
    return () => clearTimeout(timer);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const filtered =
    filter === 'All'
      ? dummyProperties
      : dummyProperties.filter((p) => p.type === filter);

  const totalPages = Math.ceil(filtered.length / propertiesPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  const SkeletonCard = () => (
    <div className="animate-pulse bg-white/5 backdrop-blur rounded-xl shadow-xl h-[350px]">
      <div className="h-56 bg-gray-800 w-full rounded-t-lg" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-700 w-3/4 rounded"></div>
        <div className="h-3 bg-gray-700 w-1/2 rounded"></div>
        <div className="h-3 bg-gray-700 w-1/3 rounded"></div>
        <div className="h-6 w-24 bg-gray-700 rounded-full mt-4" />
      </div>
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white py-20 px-6 overflow-hidden z-10"
    >
      {/* ✅ Background Particles */}
      <Particles
        id="properties-particles"
        init={particlesInit}
        className="absolute top-0 left-0 w-full h-full z-0"
        options={{
          background: { color: 'transparent' },
          fullScreen: false,
          particles: {
            number: { value: 20 },
            size: { value: 3, random: true },
            move: { enable: true, speed: 0.5 },
            opacity: { value: 0.15 },
            color: { value: '#facc15' },
          },
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-gold drop-shadow-md">
          Browse Properties
        </h2>

        {/* ✅ Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {['All', 'Sale', 'Rent', 'Shortlet'].map((type) => (
            <Button
              key={type}
              onClick={() => {
                setFilter(type);
                setCurrentPage(1);
              }}
              variant={filter === type ? 'solid' : 'outline'}
              color="gold"
              size="sm"
            >
              {type}
            </Button>
          ))}
        </div>

        {/* ✅ Property Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))
            : paginated.map((prop, index) => (
                <motion.div
                  key={prop.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Parallax speed={3}>
                    <Tilt
                      tiltMaxAngleX={10}
                      tiltMaxAngleY={10}
                      glareEnable
                      glareMaxOpacity={0.1}
                      className="w-full h-full"
                    >
                      <div className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl hover:scale-[1.03] transition-transform duration-300">
                        <div className="relative group overflow-hidden">
                          <img
                            src={prop.image}
                            alt={prop.title}
                            className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {prop.status && (
                            <span className="absolute top-3 left-3 bg-gold text-xs text-black font-semibold px-3 py-1 rounded-full shadow-md">
                              {prop.status}
                            </span>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="text-xl font-bold text-gold mb-2">
                            {prop.title}
                          </h3>
                          <p className="text-gray-300 text-sm">
                            {prop.location}
                          </p>
                          <p className="text-white text-lg font-bold">
                            {prop.price}
                          </p>
                          <span className="text-xs mt-3 inline-block bg-gold/10 text-gold px-2 py-1 rounded-full">
                            {prop.type}
                          </span>

                          <Link to={`/property/${prop.id}`}>
                            <Button
                              className="mt-4"
                              variant="solid"
                              size="sm"
                              color="gold"
                            >
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Tilt>
                  </Parallax>
                </motion.div>
              ))}
        </div>

        {/* ✅ Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center gap-3 flex-wrap">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-4 py-2 rounded-lg text-sm font-bold ${
                  currentPage === idx + 1
                    ? 'bg-gold text-black'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
