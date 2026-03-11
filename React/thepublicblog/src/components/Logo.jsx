import React from 'react'

const Logo = () => (
  <div className="flex items-center gap-2">
    <Globe className="h-8 w-8 text-blue-600" />
    <span className="text-2xl font-bold">
      <span className="text-blue-600">The</span>
      <span className="text-gray-900 dark:text-white">Public</span>
      <span className="text-blue-600">Blog</span>
    </span>
  </div>
);

export default Logo