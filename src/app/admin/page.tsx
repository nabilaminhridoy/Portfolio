'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { 
  Settings, 
  User, 
  Mail, 
  MessageSquare, 
  Briefcase, 
  Award,
  Star,
  FileText,
  LogOut,
  Plus,
  Edit,
  Trash2
} from 'lucide-react'

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [activeSection, setActiveSection] = useState('dashboard')
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth/check')
      if (response.ok) {
        setIsAuthenticated(true)
      }
    } catch (error) {
      // Not authenticated
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm)
      })

      if (response.ok) {
        setIsAuthenticated(true)
        toast.success('Login successful')
      } else {
        const data = await response.json()
        toast.error(data.error || 'Login failed')
      }
    } catch (error) {
      toast.error('Network error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      setIsAuthenticated(false)
      toast.success('Logged out')
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="admin@portfolio.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
            <div className="mt-4 p-3 bg-muted rounded text-sm">
              <p className="font-medium">Demo Credentials:</p>
              <p>Email: admin@portfolio.com</p>
              <p>Password: admin123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Settings },
    { id: 'hero', label: 'Hero Section', icon: User },
    { id: 'about', label: 'About Section', icon: FileText },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'contact', label: 'Contact Info', icon: Mail },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />
      case 'hero':
        return <HeroSectionContent />
      case 'about':
        return <AboutSectionContent />
      case 'projects':
        return <ProjectsContent />
      case 'skills':
        return <SkillsContent />
      case 'testimonials':
        return <TestimonialsContent />
      case 'messages':
        return <MessagesContent />
      case 'contact':
        return <ContactContent />
      default:
        return <DashboardContent />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted transition-colors ${
                          activeSection === item.id ? 'bg-muted border-r-2 border-primary' : ''
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

// Dashboard Content Component
function DashboardContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">
          Manage your portfolio content and settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start">
              <Plus className="h-4 w-4 mr-2" />
              Add New Project
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Plus className="h-4 w-4 mr-2" />
              Add New Skill
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Plus className="h-4 w-4 mr-2" />
              Add New Testimonial
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Site Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-600">Live</span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated:</span>
                <span>Today</span>
              </div>
              <div className="flex justify-between">
                <span>Version:</span>
                <span>1.0.0</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p>• Admin panel created</p>
              <p>• Database schema updated</p>
              <p>• Authentication system added</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Placeholder components for other sections
function HeroSectionContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hero Section</h2>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Hero
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            Hero section management will be implemented here. You'll be able to edit the main heading, subtitle, description, and call-to-action buttons.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function AboutSectionContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">About Section</h2>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit About
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            About section management will be implemented here. You'll be able to edit your personal information, bio, and profile image.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function ProjectsContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            Projects management will be implemented here. You'll be able to add, edit, and delete portfolio projects with images, descriptions, and links.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function SkillsContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Skills</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            Skills management will be implemented here. You'll be able to add, edit, and delete technical skills with proficiency levels.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function TestimonialsContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            Testimonials management will be implemented here. You'll be able to add, edit, and delete client testimonials.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function MessagesContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contact Messages</h2>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            Contact messages will be displayed here. You'll be able to view, mark as read, and delete messages from the contact form.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function ContactContent() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Contact Information</h2>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Contact
        </Button>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            Contact information management will be implemented here. You'll be able to edit email, phone, address, and social media links.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}