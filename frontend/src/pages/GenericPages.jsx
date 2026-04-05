import React from 'react';
import { Flame, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

import fireBg from '../assets/fire.jpeg';
import lisenzImg from '../assets/lisenz.jpeg';

export const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="inner-page" style={{ overflowX: 'hidden' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="page-header" 
        style={{
          background: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.85)), url(${fireBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          borderBottom: '1px solid rgba(255,255,255,0.05)', 
          padding: '200px 0 120px', 
          color: '#fff', 
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ fontSize: 'clamp(40px, 8vw, 64px)', fontWeight: '800', letterSpacing: '-1.5px', color: '#fff' }}
        >
          Haqqımızda
        </motion.h1>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100px' }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{ height: '5px', background: 'var(--color-primary)', margin: '25px auto 0', borderRadius: '3px' }}
        />
      </motion.div>

      <div className="container" style={{ padding: '120px 24px' }}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'center' }}
        >
          <motion.div variants={itemVariants}>
            <h2 style={{ fontSize: '38px', marginBottom: '30px', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ color: 'var(--color-primary)' }}>İşə</span> individual baxış
            </h2>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '18px', lineHeight: '1.9', display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <p>
                <strong>"Səmalı"</strong> şirkəti yüksək keyfiyyət sertifikatlı, təhlükəsizlik standartlarına uyğun ilkin yanğınsöndürmə vasitələri (sulu, köpüklü, qazlı yanğınsöndürmə sistemləri) təqdim edir.
              </p>
              <p>
                Biz otellərin, restoranların, kafelərin mətbəxinin tüstüsovurma borularında yığılan yağ qatlarının təmizlənməsi, yanar konstruksiyalara odadavamlı məhlul hopdurulması və odsöndürən balonların təkrar doldurulması üzrə peşəkar həllər təklif edirik.
              </p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '10px' }}>
                <div className="glass-panel" style={{ padding: '15px 25px', flex: '1' }}>
                  <ShieldCheck color="var(--color-primary)" style={{ marginBottom: '10px' }} />
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>Sertifikatlı sistemlər</div>
                </div>
                <div className="glass-panel" style={{ padding: '15px 25px', flex: '1' }}>
                  <Flame color="var(--color-primary)" style={{ marginBottom: '10px' }} />
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>Yanğın təhlükəsizliyi</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="glass-panel" 
            style={{ 
              padding: '50px', 
              borderLeft: '4px solid var(--color-primary)', 
              background: 'rgba(255, 255, 255, 0.8)' 
            }}
          >
            <h3 style={{ fontSize: '30px', marginBottom: '25px', color: 'var(--color-text)' }}>Zəmanət ve Xidmət</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '17px', lineHeight: '1.8', marginBottom: '25px' }}>
              <strong>"Səmalı & Fire Alarm"</strong> şirkəti quraşdırılan avadanlıqlara yüksək zamanət verir ve tələb olunarsa uzun müddətli servis xidmətləri göstərir.
            </p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '17px', lineHeight: '1.8', marginBottom: '30px' }}>
              Bizim mütəxəsislərimiz yanğından mühafizə audit ve təlim xidmətləridə göstərir, sizin təhlükəsizliyinizi hər addımda təmin edir.
            </p>
            <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
              <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: 'var(--color-primary)' }}>100%</div>
                <div style={{ fontSize: '12px', textTransform: 'uppercase', opacity: 0.6, letterSpacing: '1px' }}>Zəmanət</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '36px', fontWeight: '800', color: 'var(--color-primary)' }}>7/24</div>
                <div style={{ fontSize: '12px', textTransform: 'uppercase', opacity: 0.6, letterSpacing: '1px' }}>Servis</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Parallax Quote Section */}
      <section 
        style={{ 
          background: `linear-gradient(rgba(229, 57, 53, 0.15), rgba(0,0,0,0.9)), url(${fireBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          padding: '150px 0',
          textAlign: 'center'
        }}
      >
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(28px, 5vw, 42px)', maxWidth: '900px', margin: '0 auto', fontStyle: 'italic', lineHeight: '1.4', color: '#fff' }}
          >
            "Təhlükəsizliyiniz bizim prioritetimizdir. Hər bir layihəyə peşəkar ve individual yanaşma ilə yanaşırıq."
          </motion.h2>
        </div>
      </section>

      {/* Certificate Section */}
      <section style={{ padding: '120px 0', background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontSize: '36px', marginBottom: '30px' }}>Keyfiyyət ve professonallıq</h2>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '18px', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p>
                  Almaniya istehsalı olan xüsusi avadanlıqla da daxil olmaqla, yanğından mühafizə, yanğınsöndürmə, tüstüsovurma ve havalandırma sistemlərinin satışını həyata keçiririk.
                </p>
                <p>
                  Həmçinin kamera-nəzarət ve videomüşahidə sistemlərinin zəmanətlə quraşdırılması, texniki xidməti ve baxışı, eləcə də digər dəstək məsələləri üzrə xidmətləri sərfəli qiymət ve yüksək keyfiyyətlə təqdim edirik.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-panel"
              style={{ padding: '20px', overflow: 'hidden' }}
            >
              <img 
                src={lisenzImg} 
                alt="Sertifikat" 
                style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-sm)', display: 'block' }} 
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

