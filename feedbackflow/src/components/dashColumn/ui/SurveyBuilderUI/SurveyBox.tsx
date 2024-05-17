
const SurveyBox = ({children}) => {
  return (
    <div className="bg-white py-40 px-10 rounded-lg shadow-md dark:bg-gray-800 w-96 h-96 break-words overflow-wrap flex justify-center items-center">
      {children}
    </div>
  )
}

export default SurveyBox