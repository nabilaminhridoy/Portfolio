'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  MessageSquare, 
  Settings, 
  FileText, 
  Briefcase, 
  Award,
  Star,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

interface DashboardStats {
  totalMessages: number
  unreadMessages: number
  totalProjects: number
  totalSkills: number
  totalTestimonials: number
  totalExperience: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalMessages: 0,
    unreadMessages: 0,
    totalProjects: 0,
    totalSkills: 0,
    totalTestimonials: 0,
    totalExperience: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Messages',
      value: stats.totalMessages,
      description: `${stats.unreadMessages} unread`,
      icon: MessageSquare,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      href: '/admin/messages'
    },
    {
      title: 'Projects',
      value: stats.totalProjects,
      description: 'Portfolio projects',
      icon: Briefcase,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      href: '/admin/projects'
    },
    {
      title: 'Skills',
      value: stats.totalSkills,
      description: 'Technical skills',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      href: '/admin/skills'
    },
    {
      title: 'Testimonials',
      value: stats.totalTestimonials,
      description: 'Client testimonials',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      href: '/admin/testimonials'
    },
    {
      title: 'Experience',
      value: stats.totalExperience,
      description: 'Work & education',
      icon: FileText,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      href: '/admin/experience'
    }
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your portfolio content and settings
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-md ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2 p-0 h-auto text-xs"
                  onClick={() => window.location.href = stat.href}
                >
                  Manage →
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Site Settings
            </CardTitle>
            <CardDescription>
              Configure your site appearance and basic settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.location.href = '/admin/settings'}
            >
              <Settings className="h-4 w-4 mr-2" />
              General Settings
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.location.href = '/admin/hero'}
            >
              <Users className="h-4 w-4 mr-2" />
              Hero Section
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.location.href = '/admin/about'}
            >
              <FileText className="h-4 w-4 mr-2" />
              About Section
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Management
            </CardTitle>
            <CardDescription>
              Manage contact information and messages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.location.href = '/admin/contact-info'}
            >
              <Phone className="h-4 w-4 mr-2" />
              Contact Information
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.location.href = '/admin/social-links'}
            >
              <MapPin className="h-4 w-4 mr-2" />
              Social Links
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.location.href = '/admin/messages'}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages {stats.unreadMessages > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {stats.unreadMessages}
                </Badge>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}