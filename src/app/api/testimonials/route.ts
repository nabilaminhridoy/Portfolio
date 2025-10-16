import { NextResponse } from 'next/server'

// Mock testimonials data - in a real app, this would come from a database
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'CEO, TechStart',
    content: 'Nabil is an exceptional developer who delivered our e-commerce platform on time and exceeded our expectations. His technical skills and attention to detail are outstanding.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'Product Manager, InnovateCo',
    content: 'Working with Nabil was a game-changer for our project. He quickly understood our requirements and implemented robust solutions that scaled perfectly.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    position: 'CTO, DataFlow',
    content: 'Nabil\'s expertise in full-stack development helped us launch our product 3 months ahead of schedule. Highly recommend for any complex project.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'David Kim',
    position: 'Founder, StartupHub',
    content: 'Nabil transformed our ideas into a fully functional MVP in record time. His knowledge of the MERN stack is impressive and his code quality is top-notch.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    position: 'Marketing Director, BrandBoost',
    content: 'The dashboard Nabil built for us revolutionized how we track our marketing campaigns. His ability to create intuitive interfaces is remarkable.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face'
  }
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: testimonials
    })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { name, position, content, rating } = await request.json()

    // Validate required fields
    if (!name || !position || !content || !rating) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // In a real app, you would save this to a database
    const newTestimonial = {
      id: testimonials.length + 1,
      name,
      position,
      content,
      rating,
      avatar: `https://images.unsplash.com/photo-${Date.now()}?w=100&h=100&fit=crop&crop=face`
    }

    testimonials.push(newTestimonial)

    return NextResponse.json({
      success: true,
      message: 'Testimonial submitted successfully!',
      data: newTestimonial
    })
  } catch (error) {
    console.error('Error submitting testimonial:', error)
    return NextResponse.json(
      { error: 'Failed to submit testimonial' },
      { status: 500 }
    )
  }
}