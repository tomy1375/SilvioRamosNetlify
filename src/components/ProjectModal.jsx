"use client"

import { useState, useEffect } from "react"

// Define the Project type
/**
 * @typedef {Object} Project
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} image
 */

/**
 * @param {Object} props
 * @param {Project[]} props.projects
 */
export default function ProjectModal({ projects }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    // Listen for the custom event to open the modal
    const handleOpenModal = (event) => {
      const { projectId } = event.detail
      const project = projects.find((p) => p.id === projectId)
      if (project) {
        setCurrentProject(project)
        setIsOpen(true)
        document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
      }
    }

    // Add event listener
    document.addEventListener("openProjectModal", handleOpenModal)

    // Clean up
    return () => {
      document.removeEventListener("openProjectModal", handleOpenModal)
    }
  }, [projects])

  const closeModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
      document.body.style.overflow = "" // Re-enable scrolling
    }, 300)
  }

  // If modal is not open, don't render anything
  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosing ? "animate-fade-out" : "animate-fade-in"}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal}></div>

      {/* Modal Content */}
      <div
        className={`relative max-w-4xl w-full bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden ${isClosing ? "animate-scale-out" : "animate-scale-in"}`}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-gray-800 dark:text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          aria-label="Cerrar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {currentProject && (
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="md:w-1/2">
              <div className="relative h-full">
                <img
                  src={currentProject.image || "/placeholder.svg"}
                  alt={currentProject.title}
                  className="w-full h-full object-cover aspect-square md:aspect-auto"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {currentProject.title}
              </h2>

              <div className="prose dark:prose-invert max-w-none flex-grow">
                <p className="text-gray-700 dark:text-gray-300">{currentProject.description}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={closeModal}
                  className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

