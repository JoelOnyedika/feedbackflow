 const ShortQuestion = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold break-words">What do you think about our service?</h2>
      <div className="relative w-full max-w-md">
        <input
          className="w-full border-b-2 border-b-gray-300 dark:border-b-gray-600 focus:outline-none focus:border-b-gray-900 dark:focus:border-b-gray-50 px-0 py-2 text-lg"
          placeholder="Type your answer here..."
          type="text"
        />
      </div>
    </div>
  )
}

export default ShortQuestion