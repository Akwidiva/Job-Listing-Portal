import { Search, MapPin, Clock, DollarSign, Users, Building2, Linkedin, Twitter, Facebook } from "lucide-react"
import Header from "../components/header"
import Footer from "../components/footer"

function LandingPage() {
  return (

    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your <span className="text-blue-600">Dream Job</span> Today
          </h1>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Discover thousands of job opportunities from top companies. Start your career journey with Skillora.
          </p>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Job Title or Keyword</label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineer, Product Manager"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Job Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white">
                  <option>All Types</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                </select>
              </div>
              <div className="text-left">
                <label className="block text-sm font-semibold text-gray-900 mb-2">Location</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white">
                  <option>All Locations</option>
                  <option>Remote</option>
                  <option>New York</option>
                  <option>San Francisco</option>
                </select>
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto px-8 py-2">
              <Search className="w-4 h-4 mr-2" />
              Search Jobs
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
              <p className="text-gray-600 font-medium">Active Jobs</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2,000+</div>
              <p className="text-gray-600 font-medium">Companies</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
              <p className="text-gray-600 font-medium">Job Seekers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Job Opportunities</h2>
          <p className="text-gray-600">
            Explore some of the most exciting job openings from leading companies across various industries.
          </p>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[
            {
              company: "TechCorp Inc",
              title: "Senior Software Engineer",
              location: "San Francisco, CA",
              type: "Full Time",
              salary: "$150,000 - $200,000",
              description: "We are looking for an experienced Senior Software Engineer to join our growing team.",
              skills: ["React", "Node.js", "TypeScript"],
            },
            {
              company: "InnovateLabs",
              title: "Product Manager",
              location: "New York, NY",
              type: "Full Time",
              salary: "$120,000 - $160,000",
              description: "Lead product strategy and development for our flagship platform.",
              skills: ["Product Strategy", "Analytics", "Leadership"],
            },
            {
              company: "DesignStudio",
              title: "UX/UI Designer",
              location: "Remote",
              type: "Full Time",
              salary: "$90,000 - $130,000",
              description: "Create beautiful and intuitive user experiences for web and mobile applications.",
              skills: ["Figma", "UI Design", "User Research"],
            },
            {
              company: "DataDriven Co",
              title: "Data Scientist",
              location: "Boston, MA",
              type: "Full Time",
              salary: "$130,000 - $180,000",
              description: "Analyze complex datasets and build machine learning models to drive business insights.",
              skills: ["Python", "Machine Learning", "SQL"],
            },
            {
              company: "BrandBoost",
              title: "Marketing Manager",
              location: "Los Angeles, CA",
              type: "Full Time",
              salary: "$100,000 - $140,000",
              description: "Develop and execute marketing strategies to grow our brand presence.",
              skills: ["Digital Marketing", "Strategy", "Analytics"],
            },
            {
              company: "CloudSystems",
              title: "DevOps Engineer",
              location: "Seattle, WA",
              type: "Full Time",
              salary: "$140,000 - $190,000",
              description: "Build and maintain cloud infrastructure and deployment pipelines.",
              skills: ["AWS", "Kubernetes", "CI/CD"],
            },
          ].map((job, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              {/* Card Header with Icon */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{job.company}</p>
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0"></div>
              </div>

              {/* Job Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  {job.location}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  {job.type}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                  {job.salary}
                </div>
              </div>

              {/* Job Description */}
              <p className="text-gray-700 text-sm mb-4">{job.description}</p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills.map((skill, idx) => (
                  <span key={idx} className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>

              {/* View Details Link */}
              <div className="text-center">
                <a href="#" className="text-blue-600 font-medium text-sm hover:underline">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Jobs Button */}
        <div className="flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-2 font-semibold">View All Jobs →</button>
        </div>
      </section>

      {/* CTA Section - Job Seekers and Employers */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Job Seekers Card */}
          <div className="border border-gray-200 rounded-lg p-8 text-center hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">For Job Seekers</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Create your profile, upload your resume, and start applying to your dream jobs today.
            </p>
            <a
              href="/auth"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md font-semibold w-full mb-4 text-center transition-colors"
            >
              Get Started
            </a>
            <a href="#" className="text-blue-600 font-medium text-sm hover:underline">
              Already have an account? Login
            </a>
          </div>

          {/* For Employers Card */}
          <div className="border border-gray-200 rounded-lg p-8 text-center hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Building2 className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">For Employers</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Post job listings, manage applications, and find the perfect candidates for your team.
            </p>
            <a
              href="/auth"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-md font-semibold w-full mb-4 text-center transition-colors"
            >
              Post a Job
            </a>
            <a href="#" className="text-green-600 font-medium text-sm hover:underline">
              Employer Login
            </a>
          </div>
        </div>
      </section>

      {/* Trusted by Industry Leaders */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Trusted by Industry Leaders</h3>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs font-medium">
            Company 1
          </div>
          <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs font-medium">
            Company 2
          </div>
          <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs font-medium">
            Company 3
          </div>
          <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs font-medium">
            Company 4
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


export default LandingPage;