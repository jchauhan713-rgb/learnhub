import { Users, BookOpen, Award, Globe } from 'lucide-react'

function About() {
  const stats = [
    { icon: Users, value: '120,000+', label: 'Active Students' },
    { icon: BookOpen, value: '500+', label: 'Online Courses' },
    { icon: Award, value: '150+', label: 'Expert Instructors' },
    { icon: Globe, value: '80+', label: 'Countries Reached' },
  ]

  const team = [
    {
      name: 'Alexandra Foster',
      role: 'CEO & Co-Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
    },
    {
      name: 'Marcus Chen',
      role: 'CTO & Co-Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Content',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    },
    {
      name: 'David Williams',
      role: 'Lead Designer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-blue-400">About Us</span>
          <h1 className="mt-3 text-balance text-4xl font-bold text-white sm:text-5xl">
            Transforming Education, One Course at a Time
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-400">
            Learnhub was founded with a simple mission: make high-quality education accessible to everyone, everywhere. We believe learning should be engaging, practical, and life-changing.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto -mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <Icon className="h-6 w-6 text-blue-600" />
                <span className="mt-3 text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className="mt-1 text-sm text-gray-500">{stat.label}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">Our Mission</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Empowering Learners to Reach Their Full Potential
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              We partner with world-class instructors and industry leaders to deliver courses that are not only educational but also practical and career-oriented. Our platform is designed to provide an immersive learning experience that fits into your busy schedule.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              Whether you are looking to switch careers, gain new skills, or deepen your expertise, Learnhub provides the tools and community to help you succeed. Every course is carefully vetted to ensure the highest quality of content and instruction.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=500&fit=crop"
              alt="Team collaboration"
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600">Our Team</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">Meet the People Behind Learnhub</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-28 w-28 rounded-full object-cover ring-4 ring-gray-100"
                  crossOrigin="anonymous"
                />
                <h3 className="mt-4 text-sm font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
