'use client'

import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useRef } from 'react'
import { useTheme } from 'next-themes'

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { theme, setTheme } = useTheme()

  const contactFormRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Only prevent Enter key submission on non-textarea fields and allow form submission
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && !e.shiftKey) {
      e.preventDefault()
      // Focus next field or submit form
      const form = (e.target as HTMLElement).form
      if (form) {
        const inputs = Array.from(form.querySelectorAll('input, textarea'))
        const currentIndex = inputs.indexOf(e.target as HTMLElement)
        const nextInput = inputs[currentIndex + 1]
        if (nextInput) {
          nextInput.focus()
        } else {
          form.requestSubmit()
        }
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message)
        setFormData({ name: '', email: '', message: '' })
      } else {
        // Show more detailed error message
        const errorMessage = data.details || data.error || 'Failed to send message'
        toast.error(errorMessage)
        console.error('Contact form error:', data)
      }
    } catch (error) {
      console.error('Contact form submission error:', error)
      toast.error('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const skills = [
    { name: 'MongoDB', icon: 'fab fa-node-js', level: 90, color: 'text-green-500' },
    { name: 'Express.js', icon: 'fab fa-node-js', level: 85, color: 'text-gray-700' },
    { name: 'React.js', icon: 'fab fa-react', level: 90, color: 'text-blue-400' },
    { name: 'Node.js', icon: 'fab fa-node-js', level: 85, color: 'text-green-600' },
    { name: 'TypeScript', icon: 'fab fa-js', level: 80, color: 'text-blue-600' },
    { name: 'REST APIs', icon: 'fas fa-plug', level: 88, color: 'text-purple-500' },
    { name: 'GraphQL', icon: 'fas fa-project-diagram', level: 75, color: 'text-pink-500' },
    { name: 'Docker', icon: 'fab fa-docker', level: 70, color: 'text-blue-500' },
    { name: 'Git', icon: 'fab fa-git-alt', level: 85, color: 'text-orange-600' },
    { name: 'AWS', icon: 'fab fa-aws', level: 65, color: 'text-orange-500' }
  ]

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration, admin dashboard, and real-time inventory management.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Docker'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      github: 'https://github.com',
      live: 'https://example.com'
    },
    {
      id: 2,
      title: 'Task Management Dashboard',
      description: 'Collaborative project management tool with real-time updates, team collaboration features, and analytics.',
      tech: ['React', 'Express', 'PostgreSQL', 'Socket.io', 'Chart.js'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      github: 'https://github.com',
      live: 'https://example.com'
    },
    {
      id: 3,
      title: 'Real-Time Chat Application',
      description: 'Scalable chat application with end-to-end encryption, file sharing, and video calling capabilities.',
      tech: ['React', 'Node.js', 'WebRTC', 'Socket.io', 'Redis'],
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      github: 'https://github.com',
      live: 'https://example.com'
    },
    {
      id: 4,
      title: 'Content Management System',
      description: 'Flexible CMS with dynamic content creation, user roles, and SEO optimization features.',
      tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'AWS'],
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=400&fit=crop',
      github: 'https://github.com',
      live: 'https://example.com'
    },
    {
      id: 5,
      title: 'Analytics Dashboard',
      description: 'Business intelligence dashboard with real-time data visualization, reporting, and predictive analytics.',
      tech: ['React', 'D3.js', 'Python', 'FastAPI', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      github: 'https://github.com',
      live: 'https://example.com'
    },
    {
      id: 6,
      title: 'Social Media Platform',
      description: 'Full-featured social network with real-time feeds, messaging, and content sharing capabilities.',
      tech: ['React', 'Node.js', 'GraphQL', 'AWS', 'Redis'],
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
      github: 'https://github.com',
      live: 'https://example.com'
    }
  ]

  const experiences = [
    {
      type: 'work',
      title: 'Senior Full Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      description: 'Lead development of scalable web applications using MERN stack. Mentored junior developers and implemented best practices.'
    },
    {
      type: 'work',
      title: 'Full Stack Developer',
      company: 'Digital Agency Pro',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client projects. Implemented RESTful APIs and responsive front-end applications.'
    },
    {
      type: 'education',
      title: 'Bachelor of Science in Computer Science & Engineering',
      company: 'National University',
      period: '2021 - 2026',
      description: 'Currently pursuing Bachelor degree with focus on Software Engineering and Web Development.',
      cgpa: '3.50/4.00'
    },
    {
      type: 'education',
      title: 'Higher Secondary Certificate (HSC) in Science',
      company: 'Government Bangla College',
      period: '2018 - 2020',
      description: 'Completed higher secondary education with major in Science.',
      gpa: '4.83/5.00'
    },
    {
      type: 'education',
      title: 'Secondary School Certificate (SSC) in Science',
      company: 'Government Laboratory High School',
      period: '2007 - 2018',
      description: 'Completed secondary education with major in Science.',
      gpa: '4.89/5.00'
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CEO, TechStart',
      content: 'Nabil is an exceptional developer who delivered our e-commerce platform on time and exceeded our expectations. His technical skills and attention to detail are outstanding.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Product Manager, InnovateCo',
      content: 'Working with Nabil was a game-changer for our project. He quickly understood our requirements and implemented robust solutions that scaled perfectly.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'CTO, DataFlow',
      content: 'Nabil\'s expertise in full-stack development helped us launch our product 3 months ahead of schedule. Highly recommend for any complex project.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ]

  const socialLinks = [
    { name: 'Facebook', icon: 'fab fa-facebook', url: 'https://facebook.com/nabilaminhridoy', color: 'text-[#1877F2]' },
    { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://instagram.com/nabilaminhridoy', color: 'text-[#E4405F]' },
    { name: 'WhatsApp', icon: 'fab fa-whatsapp', url: 'https://wa.me/8801624647814', color: 'text-[#25D366]' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://linkedin.com/in/nabilaminhridoy', color: 'text-[#0077B5]' },
    { name: 'X (Twitter)', icon: 'fab fa-x-twitter', url: 'https://x.com/nabilaminhridoy', color: 'text-[#000000]' },
    { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/nabilaminhridoy', color: 'text-[#181717]' },
    { name: 'Discord', icon: 'fab fa-discord', url: 'https://discord.com/nabilaminhridoy', color: 'text-[#5865F2]' }
  ]

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const scaleIn = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  }

  if (!mounted) return null

  const AnimatedSection = ({ children, id, className = '' }: { 
    children: React.ReactNode
    id: string
    className?: string 
  }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
      <motion.section
        ref={ref}
        id={id}
        className={`py-20 ${className}`}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        variants={fadeInUp}
      >
        {children}
      </motion.section>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Live Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#175BEA]/10 via-[#00C5FB]/10 to-[#175BEA]/5 animate-pulse"></div>
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <div className="w-1 h-1 bg-primary/30 rounded-full"></div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Nabil Amin Hridoy" 
                className="w-8 h-8 rounded-full"
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'experience', 'testimonials', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="capitalize hover:text-[#07a6f6] transition-colors font-medium font-heading"
                >
                  {section}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hover:bg-gradient-to-r hover:from-[#175BEA]/10 hover:to-[#00C5FB]/10 hover:text-[#175BEA] transition-all duration-300"
              >
                <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-gradient-to-r hover:from-[#175BEA]/10 hover:to-[#00C5FB]/10 hover:text-[#175BEA] transition-all duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 space-y-2">
              {['home', 'about', 'projects', 'experience', 'testimonials', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left capitalize py-2 hover:text-[#07a6f6] transition-colors font-medium font-heading"
                >
                  {section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <AnimatedSection id="home" className="min-h-screen flex items-center justify-center pt-16 relative z-10">
        <div className="container mx-auto px-4 py-20 text-center">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 gradient-logo-text font-heading"
              variants={fadeInUp}
            >
              Hi, I'm Nabil Amin Hridoy
            </motion.h1>
            <motion.h2 
              className="text-2xl md:text-3xl mb-4 text-muted-foreground"
              variants={fadeInUp}
            >
              MERN Stack & Full Stack Developer
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-muted-foreground max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Building scalable, user-friendly, and high-performance web applications with modern technologies and best practices.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <Button size="lg" onClick={() => scrollToSection('contact')} className="text-lg px-8 gradient-logo hover:opacity-90 transition-opacity">
                <i className="fas fa-envelope mr-2"></i>
                Hire Me
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollToSection('projects')} className="text-lg px-8">
                <i className="fas fa-briefcase mr-2"></i>
                View Projects
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center">
              <div className="w-64 h-64 rounded-full overflow-hidden mb-6 border-4 border-primary shadow-xl">
                <img 
                  src="/avatar.jpg"
                  alt="Nabil Amin Hridoy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                {socialLinks.map((social) => (
                  <Button key={social.name} variant="outline" size="icon" asChild className="w-12 h-12 rounded-full hover:scale-110 transition-transform bg-primary/10 backdrop-blur-sm border-primary/20 hover:bg-primary/20">
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      <i className={`${social.icon} text-lg ${social.color}`}></i>
                    </a>
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4 font-heading">
                  Passionate Full Stack Developer
                </h3>
                <p className="text-muted-foreground leading-relaxed font-body">
                  With over 4 years of experience in web development, I specialize in creating robust, scalable applications using the MERN stack. I'm passionate about clean code, optimal performance, and exceptional user experiences.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4 font-heading">
                  Key Skills
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          <i className={`${skill.icon} ${skill.color}`}></i>
                          <span className="text-sm font-medium font-code">{skill.name}</span>
                        </span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="gradient-logo h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <AnimatedSection id="projects" className="relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading"
            variants={fadeInUp}
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {projects.map((project, index) => (
              <motion.div key={project.id} variants={scaleIn}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <i className="fas fa-folder text-primary"></i>
                      {project.title}
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="font-code">{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <i className="fab fa-github mr-2"></i>
                          Code
                        </a>
                      </Button>
                      <Button size="sm" asChild>
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <i className="fas fa-external-link-alt mr-2"></i>
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Experience & Education Section */}
      <section id="experience" className="py-20 bg-muted/30 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading">
            Experience & Education
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20"></div>
              {experiences.map((exp, index) => (
                <div key={index} className="relative flex items-start mb-8">
                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
                  <div className="ml-16 flex-1">
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <i className={`fas ${exp.type === 'work' ? 'fa-briefcase text-primary' : 'fa-graduation-cap text-primary'}`}></i>
                            <CardTitle className="text-lg">{exp.title}</CardTitle>
                          </div>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <i className="fas fa-calendar text-xs"></i>
                            {exp.period}
                          </Badge>
                        </div>
                        <CardDescription className="text-[#07a6f6] font-medium">
                          {exp.company}
                        </CardDescription>
                        {(exp.gpa || exp.cgpa) && (
                          <div className="flex gap-4 mt-2">
                            {exp.gpa && <Badge variant="secondary">GPA: {exp.gpa}</Badge>}
                            {exp.cgpa && <Badge variant="secondary">CGPA: {exp.cgpa}</Badge>}
                          </div>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{exp.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <AnimatedSection id="testimonials" className="relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading"
            variants={fadeInUp}
          >
            Client Testimonials
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {testimonials.map((testimonial) => (
              <motion.div key={testimonial.id} variants={scaleIn}>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full border-4 border-primary/20"
                      />
                    </div>
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="fas fa-star text-yellow-400 text-xl"></i>
                      ))}
                    </div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.position}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <section id="contact" className="bg-muted/30 relative z-10 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-heading">
            Get In Touch
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4 font-heading">
                  <i className="fas fa-handshake mr-2 text-primary"></i>
                  Let's Work Together
                </h3>
                <p className="text-muted-foreground mb-6">
                  I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <i className="fas fa-envelope text-primary text-lg"></i>
                  <a 
                    href="mailto:nabilaminhridoy@gmail.com" 
                    className="text-foreground hover:text-[#07a6f6] transition-colors"
                  >
                    nabilaminhridoy@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-phone text-primary text-lg"></i>
                  <a 
                    href="tel:+8801624647814" 
                    className="text-foreground hover:text-[#07a6f6] transition-colors"
                  >
                    +880 1624-647814
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <i className="fas fa-map-marker-alt text-primary text-lg"></i>
                  <span>240/1, South Paikapara, Mirpur, Dhaka, Bangladesh</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">
                  Follow Me
                </h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <Button key={social.name} variant="outline" size="icon" asChild className="w-10 h-10 rounded-full hover:scale-110 transition-transform bg-primary/10 backdrop-blur-sm border-primary/20 hover:bg-primary/20">
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        <i className={`${social.icon} ${social.color}`}></i>
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div ref={contactFormRef}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Send Message
                  </CardTitle>
                  <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <Label htmlFor="name" className="flex items-center gap-2 mb-[5px]">
                        Name
                      </Label>
                      <Input 
                        id="contact-form-name" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Your Name" 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-form-email" className="flex items-center gap-2 mb-[5px]">
                        Email
                      </Label>
                      <Input 
                        id="contact-form-email" 
                        name="email"
                        type="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        placeholder="your@email.com" 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-form-message" className="flex items-center gap-2 mb-[5px]">
                        Message
                      </Label>
                      <Textarea 
                        id="contact-form-message" 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        placeholder="Your message here..." 
                        rows={4} 
                        required 
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full gradient-logo hover:opacity-90 transition-opacity" 
                      disabled={isSubmitting}
                    >
                      <i className="fas fa-paper-plane mr-2"></i>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t relative z-10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <p className="text-muted-foreground text-center">
              © 2025 Nabil Amin Hridoy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}