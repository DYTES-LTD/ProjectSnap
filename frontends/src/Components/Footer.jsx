import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full p-4 mt-6 bg-slate-200 border-t-2 border-gray-300 flex flex-col items-center text-sm text-gray-600">
        <div className="flex space-x-6 mb-2">
            <a 
            href='https://dytes.co' 
            target='_blank'
            // onClick={handleScreenshot} 
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition duration-300"
            >
             Learn More
            </a>

            <a 
            href="https://www.buymeacoffee.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full shadow-md transition duration-300"
            >
            ☕ Buy me a coffee
            </a>
        </div>

        <div className="text-xs text-gray-400">
            Made with ❤️ by DYTES LTD
        </div>
    </footer>

  )
}

export default Footer
