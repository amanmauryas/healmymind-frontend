import React from 'react';
import { Calendar, Clock, ChevronRight, Search } from 'lucide-react';

const BlogPage: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Anxiety: Signs, Symptoms, and Coping Strategies",
      excerpt: "Learn about the different types of anxiety disorders, their common symptoms, and effective strategies for managing anxiety in daily life.",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "Mental Health",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "The Science of Depression: Causes and Treatment Options",
      excerpt: "Explore the biological and environmental factors that contribute to depression, and learn about various treatment approaches available.",
      date: "2024-01-12",
      readTime: "10 min read",
      category: "Mental Health",
      image: "https://images.unsplash.com/photo-1454894017833-4b9c0f2c8e5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Mindfulness Meditation: A Beginner's Guide",
      excerpt: "Discover the benefits of mindfulness meditation and learn simple techniques to incorporate this practice into your daily routine.",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Wellness",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const categories = [
    "All Topics",
    "Mental Health",
    "Wellness",
    "Self-Care",
    "Relationships",
    "Stress Management"
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Mental Health Blog</h1>
            <p className="text-gray-400 text-lg">
              Insights, tips, and resources for your mental well-being journey
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full bg-gray-800 text-gray-300 border border-gray-700 rounded-lg py-3 px-4 pl-12 focus:outline-none focus:border-purple-500"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-500" />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm ${
                  index === 0
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:transform hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <Calendar size={14} className="mr-1" />
                    <span className="mr-4">{post.date}</span>
                    <Clock size={14} className="mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-4">
                    {post.excerpt}
                  </p>
                  <button className="text-purple-400 hover:text-purple-300 flex items-center text-sm font-medium">
                    Read More <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-gray-800 rounded-lg p-8">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-gray-400 mb-6">
                Get the latest mental health insights and resources delivered to your inbox.
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg px-4 focus:outline-none focus:border-purple-500"
                />
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
