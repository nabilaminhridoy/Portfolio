const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seedAdmin() {
  try {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    const admin = await prisma.admin.upsert({
      where: { email: 'admin@portfolio.com' },
      update: {},
      create: {
        email: 'admin@portfolio.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'admin'
      }
    });

    console.log('Admin user created:', admin);

    // Create initial site settings
    const siteSettings = await prisma.siteSettings.upsert({
      where: { id: 'default' },
      update: {},
      create: {
        id: 'default',
        siteTitle: 'Nabil Amin Hridoy - MERN Stack Developer',
        siteDescription: 'Full-stack MERN developer specializing in scalable web applications',
        primaryColor: '#175BEA',
        secondaryColor: '#00C5FB',
        themeMode: 'system'
      }
    });

    console.log('Site settings created:', siteSettings);

    // Create hero section
    const heroSection = await prisma.heroSection.upsert({
      where: { id: 'default' },
      update: {},
      create: {
        id: 'default',
        title: "Hi, I'm Nabil Amin Hridoy",
        subtitle: 'MERN Stack & Full Stack Developer',
        description: 'Building scalable, user-friendly, and high-performance web applications with modern technologies and best practices.',
        ctaButtonText: 'Hire Me',
        ctaButtonLink: '#contact',
        secondaryButtonText: 'View Projects',
        secondaryButtonLink: '#projects',
        isActive: true
      }
    });

    console.log('Hero section created:', heroSection);

    // Create about section
    const aboutSection = await prisma.aboutSection.upsert({
      where: { id: 'default' },
      update: {},
      create: {
        id: 'default',
        title: 'About Me',
        description: 'With over 4 years of experience in web development, I specialize in creating robust, scalable applications using the MERN stack. I\'m passionate about clean code, optimal performance, and exceptional user experiences.',
        isActive: true
      }
    });

    console.log('About section created:', aboutSection);

    // Create contact info
    const contactInfo = await prisma.contactInfo.upsert({
      where: { id: 'default' },
      update: {},
      create: {
        id: 'default',
        email: 'nabilaminhridoy@gmail.com',
        phone: '+880 1624-647814',
        address: '240/1, South Paikapara, Mirpur, Dhaka, Bangladesh',
        isActive: true
      }
    });

    console.log('Contact info created:', contactInfo);

    // Create footer settings
    const footerSettings = await prisma.footerSettings.upsert({
      where: { id: 'default' },
      update: {},
      create: {
        id: 'default',
        copyrightText: '© 2025 Nabil Amin Hridoy. All rights reserved.',
        showSocial: true,
        showContact: true,
        isActive: true
      }
    });

    console.log('Footer settings created:', footerSettings);

    console.log('✅ Admin panel seeded successfully!');
    console.log('📧 Login: admin@portfolio.com');
    console.log('🔑 Password: admin123');

  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();