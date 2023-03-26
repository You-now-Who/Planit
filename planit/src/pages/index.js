import Navbar from "@/components/Navbar"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Navbar/>

      <main className="py-10 px-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome to Planit!
          </h2>
          <p className="text-gray-600 mb-8">
            We help you manage and organize your events seamlessly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Create an Event
              </h3>
              <p className="text-gray-600 mb-4">
                Easily create an event and add details such as date, time,
                location, and more.
              </p>
              {/* <Link
                to="/create-event"
                className="block text-center py-2 px-4 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700"
              >
                Create Event
              </Link> */}
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                View Upcoming Events
              </h3>
              <p className="text-gray-600 mb-4">
                Stay on top of your upcoming events with our easy-to-use
                calendar view.
              </p>
              {/* <Link
                to="/calendar"
                className="block text-center py-2 px-4 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700"
              >
                View Calendar
              </Link> */}
            </div>
          </div>
        </main>
        <footer className="py-6 text-center text-gray-500 text-sm">
          &copy; 2023 Planit. All rights reserved.
        </footer>
      

    </>
  )
}
