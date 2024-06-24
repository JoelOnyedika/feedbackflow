const Contact = () => {
  return (
    <div>
      <h2 className="text-md font-bold mb-4 whitespace-nowrap">Contact Information</h2>
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">
            Name
          </label>
          <input
            className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent dark:border-gray-600 dark:text-gray-300"
            id="name"
            placeholder="Enter your name"
            type="text"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
            Email
          </label>
          <input
            className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent dark:border-gray-600 dark:text-gray-300"
            id="email"
            placeholder="Enter your email"
            type="email"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="phone">
            Phone
          </label>
          <input
            className="w-full border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent dark:border-gray-600 dark:text-gray-300"
            id="phone"
            placeholder="Enter your phone number"
            type="tel"
          />
        </div>
      </div>
      </div>
  )
}

export default Contact