import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import './Home.css';
import { Link } from 'react-router-dom';
import {
  Flame, ShieldCheck, Wrench, Video, ChevronRight,
  Map, Wind, Lock, Droplets,
  MapPin, Phone, Mail, Globe, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import alarmImg from '../assets/alarm.jpg';
import project1Img from '../assets/aviasiya.jpg';
import project2Img from '../assets/20nomreli.jpg';
import project3Img from '../assets/cınarplaza.jpg';
import project4Img from '../assets/avenue.jpg';
import lisenzImg from '../assets/lisenz.jpeg';
import ContactForm from '../components/ContactForm';

const iconMap = {
  'Flame': <Flame size={32} color="var(--color-primary)" />,
  'Map': <Map size={32} color="var(--color-primary)" />,
  'Shield': <ShieldCheck size={32} color="var(--color-primary)" />,
  'Wind': <Wind size={32} color="var(--color-primary)" />,
  'Wrench': <Wrench size={32} color="var(--color-primary)" />,
  'Lock': <Lock size={32} color="var(--color-primary)" />,
  'Droplets': <Droplets size={32} color="var(--color-primary)" />,
  'Video': <Video size={32} color="var(--color-primary)" />,
  'default': <Flame size={32} color="var(--color-primary)" />
};

const ServiceCard = ({ service, onActive, isActive }) => {
  return (
    <div
      className={`service-card-compact ${isActive ? 'active' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onActive(service);
      }}
      style={{ cursor: 'pointer', position: 'relative', transition: 'all 0.3s ease' }}
    >
      <div className="service-icon-compact">
        {iconMap[service.icon] || iconMap['default']}
      </div>
      <h3>{service.title}</h3>
    </div>
  );
};

const Home = () => {
  const defaultServices = [
    { id: 1, title: 'Yanğın siqnalizasiya sistemi', icon: 'Flame', desc: 'Binaların təhlükəsizliyi üçün müasir yanğın xəbərdarlıq sistemləri.' },
    { id: 2, title: 'Təxliyə planlarının hazırlanması', icon: 'Map', desc: 'Fövqəladə hallar üçün dəqiq və standartlara uyğun təxliyə xəritələri.' },
    { id: 3, title: 'İlkin yanğın söndürənlər', icon: 'Shield', desc: 'Sertifikatlı odsöndürən balonların satışı ve yenidən doldurulması.' },
    { id: 4, title: 'Su ilə söndürmə sistemləri', icon: 'Droplets', desc: 'Su nasos stansiyalarının və avtomatik su ilə söndürmə sistemləri.' },
    { id: 5, title: 'Texniki xidmət', icon: 'Wrench', desc: 'Mövcud yanğınsöndürmə sistemlərinin mütəmadi texniki baxışı.' },
    { id: 6, title: 'Videomüşahidə', icon: 'Video', desc: 'Müasir CCTV kameraların quraşdırılması və nəzarəti.' },
    { id: 7, title: 'Qazla söndürmə sistemləri', icon: 'Wind', desc: 'Server otaqları və xüsusi avadanlıqlar üçün qazlı söndürmə.' },
    { id: 8, title: 'Ağıllı idarəetmə', icon: 'Lock', desc: 'Bina idarəetmə sistemləri üçün tam inteqrasiya olunmuş yanğın təhlükəsizliyi.' }
  ];

  const defaultProjects = [
    { id: 1, title: 'Milli Aviasiya Akademiyası', image: project1Img },
    { id: 2, title: '20 Nömrəli Məktəb', image: project2Img },
    { id: 3, title: 'Çinar Plaza', image: project3Img },
    { id: 4, title: 'Avenue Hotel', image: project4Img },
  ];

  const defaultHeroSlides = [
    {
      id: 1,
      title: 'Gələcəyin <span class="text-gradient">Təhlükəsizlik</span> Sistemləri',
      subtitle: 'Biz sizin təhlükəsizliyinizi qoruyuruq. İnnovativ yanğın söndürmə texnologiyaları ilə əmlakınızı güvəndə tutun.',
      image: alarmImg
    },
    {
      id: 2,
      title: 'Peşəkar <span class="text-gradient">Quraşdırma</span> Xidməti',
      subtitle: 'Ən yüksək standartlara cavab verən sistemlərin layihələndirilməsi və texniki xidməti.',
      image: alarmImg
    }
  ];

  const [activeService, setActiveService] = useState(null);
  const [swiperRef, setSwiperRef] = useState(null);
  const [services, setServices] = useState(defaultServices);
  const [projects, setProjects] = useState(defaultProjects);
  const [heroSlides, setHeroSlides] = useState(defaultHeroSlides);

  // Fetch dynamic projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8001/api/projects");
        const data = await response.json();
        if (data && data.length > 0) {
          const formattedProjects = data.map((p) => ({
            ...p,
            image: p.image.startsWith('http') ? p.image : `http://localhost:8001/storage/${p.image}`
          }));
          setProjects(formattedProjects);
        }
      } catch (error) {
        console.error("Layihələr çəkilərkən xəta:", error);
        // On error, we keep using defaultProjects defined above
      }
    };
    fetchProjects();
  }, []);

  // Global click listener to dismiss active service notification
  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Don't close if clicking a service card itself 
      if (e.target.closest('.service-card-compact') || e.target.closest('.service-notification-toast')) {
        return;
      }
      setActiveService(null);
    };

    if (activeService) {
      window.addEventListener('click', handleGlobalClick);
    }
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [activeService]);

  const handleServiceSelect = (service) => {
    setActiveService(service);
  };

  const handleCloseShowcase = () => {
    setActiveService(null);
  };



  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={heroSlides.length > 1}
          className="hero-swiper"
          onSwiper={setSwiperRef}
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={slide.id || index}>
              <div
                className="hero-slide"
                style={{
                  backgroundImage: `url(${slide.image || alarmImg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: '#0b0b0e'
                }}
              >
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: slide.title }}></h1>
                  </motion.div>
                  <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    className="hero-btns"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <Link to="/haqqimizda" className="btn btn-red">Daha Çox</Link>
                    <a href="#projects" className="btn btn-outline">Layihələrimiz</a>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Mini About Section */}
      <section className="section about-mini" id="about-mini">
        <div className="container">
          <div className="about-mini-grid">
            <motion.div
              className="about-mini-content"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title-small" style={{ textAlign: 'left', marginBottom: '20px' }}>Biz Kimik?</h2>
              <h3 className="about-mini-heading">Səmalı & Fire-Alarm: <span className="text-gradient">Peşəkar Təhlükəsizlik</span></h3>
              <p className="about-mini-text">
                <strong>"Səmalı"</strong> şirkəti yüksək keyfiyyət və təhlükəsizlik standartlarına uyğun yanğınsöndürmə vasitələri təqdim edir. Biz otellərdən ağır sənaye obyektlərinə qədər hər növ bina üçün kompleks yanğın mühafizə həlləri təklif edirik.
              </p>
              <div className="about-mini-features">
                <div className="mini-feature">
                  <ShieldCheck size={20} color="var(--color-primary)" />
                  <span>Sertifikatlı Sistemlər</span>
                </div>
                <div className="mini-feature">
                  <Flame size={20} color="var(--color-primary)" />
                  <span>Zəmanətli Xidmət</span>
                </div>
                <div className="mini-feature">
                  <Wrench size={20} color="var(--color-primary)" />
                  <span>7/24 Texniki Dəstək</span>
                </div>
              </div>
              <Link to="/haqqimizda" className="btn btn-red" style={{ marginTop: '30px' }}>Daha Ətraflı</Link>
            </motion.div>

            <motion.div
              className="about-mini-images"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="main-img-wrapper" style={{ background: '#fff', padding: '10px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <motion.div
                  className="license-showcase-overlay"
                  initial={{ y: 40, opacity: 0, scale: 0.9 }}
                  whileInView={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.7, type: 'spring', stiffness: 100 }}
                >
                  <img src={lisenzImg} alt="Xüsusi Lisenziya" className="about-img-license" />
                  <div className="license-caption-box">
                    <span className="cert-tag">Xüsusi Lisenziya</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        className="section services-scroller"
        id="services"
        onClick={() => handleCloseShowcase()}
      >
        <div className="container" style={{ position: 'relative' }}>
          <div className="services-header-flex">
            <motion.h2
              className="section-title-small"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ textAlign: 'left', margin: 0, zIndex: 1 }}
            >
              Xidmətlərimiz
            </motion.h2>

            <AnimatePresence>
              {activeService && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.9 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="service-notification-toast"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="notification-icon">
                    {iconMap[activeService.icon] || iconMap['default']}
                  </div>
                  <div className="notification-content">
                    <h4>{activeService.title}</h4>
                    <p className="notification-desc">{activeService.desc}</p>
                  </div>
                  <button className="toast-close-btn" onClick={() => setActiveService(null)}>
                    <X size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="services-marquee" style={{ marginTop: '10px' }}>
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
              1440: { slidesPerView: 6 }
            }}
            loop={true}
            speed={6000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false
            }}
            grabCursor={true}
            watchSlidesProgress={true}
            preventInteractionOnTransition={true}
            className="services-swiper-linear"
          >
            {[...services, ...services, ...services, ...services].map((service, index) => (
              <SwiperSlide key={`${service.id}-${index}`}>
                <ServiceCard
                  service={service}
                  onActive={(s) => {
                    handleServiceSelect(s);
                  }}
                  isActive={activeService?.id === service.id}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section projects-home" id="projects">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-header-flex"
          >
            <h2 className="section-title">Bizim Layihələr</h2>
          </motion.div>

          <div className="projects-marquee-wrapper">
            <Swiper
              modules={[Autoplay, FreeMode]}
              spaceBetween={40}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1.1 },
                1024: { slidesPerView: 1.5 },
                1440: { slidesPerView: 2.2 }
              }}
              loop={true}
              speed={1200}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              freeMode={{
                enabled: true,
                momentum: true,
                momentumRatio: 1,
                sticky: false
              }}
              watchSlidesProgress={true}
              preventInteractionOnTransition={false}
              allowTouchMove={true}
              grabCursor={true}
              className="projects-swiper-tactile"
            >
              {[...projects, ...projects, ...projects].map((project, index) => (
                <SwiperSlide key={`${project.id}-${index}`}>
                  <div className="project-card-large">
                    <div className="project-image-wrapper-large">
                      <img src={project.image} alt={project.title} loading="lazy"
                        onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=Layihə'} />
                    </div>
                    <div className="project-info-below">
                      <span className="project-category-badge">Tamamlanmış Layihə</span>
                      <h3>{project.title}</h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-home" id="contact" style={{ background: 'var(--color-bg)', padding: '100px 0' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '80px' }}
          >
            <h2 className="section-title">Bizimlə Əlaqə</h2>
          </motion.div>

          <div className="contact-grid">
            <div className="contact-info-sidebar">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="contact-subtitle">Əlaqə Məlumatları</h3>
                <div className="contact-details-list">
                  <div className="contact-info-item">
                    <div className="contact-icon-box">
                      <MapPin color="var(--color-primary)" size={24} />
                    </div>
                    <div>
                      <h4>Ünvan</h4>
                      <p>Heydər Əliyev pr. 96 A, Bakı, Azərbaycan</p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-icon-box">
                      <Phone color="var(--color-primary)" size={24} />
                    </div>
                    <div>
                      <h4>Telefon</h4>
                      <p>
                        +994 50 216 47 71<br />
                        +994 55 216 47 71<br />
                        012 409 58 00
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-icon-box">
                      <Mail color="var(--color-primary)" size={24} />
                    </div>
                    <div>
                      <h4>Email</h4>
                      <p>f.a@semali.az</p>
                    </div>
                  </div>
                </div>

                <div className="contact-map-wrapper">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1519.53123456789!2d49.88!3d40.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI0JzAwLjAiTiA0OcKwNTInNDguMCJF!5e0!3m2!1sen!2saz!4v1700000000000!5m2!1sen!2saz"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                  ></iframe>
                </div>
              </motion.div>
            </div>

            <div className="contact-form-sidebar">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-panel contact-form-card"
              >
                <h3 className="contact-form-title">Sürətli Əlaqə Formu</h3>
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
