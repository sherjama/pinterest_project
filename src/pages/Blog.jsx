import React from "react";

const Blog = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Building My Pinterest Clone – A Journey with React, Tailwind, and
            Appwrite
          </h1>
        </div>
      </header>

      <main className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Introduction
            </h2>
            <p className="text-gray-600">
              As a developer, one of the best ways to sharpen your skills is to
              build projects that challenge your knowledge of new technologies
              and frameworks. For my latest project, I decided to create a{" "}
              <strong>Pinterest clone</strong>, a web application that mimics
              the functionality of Pinterest, where users can save, search, and
              explore visual content. This project was a fantastic opportunity
              to work with various frontend and backend technologies and combine
              them into one seamless user experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Project Overview
            </h2>
            <p className="text-gray-600">
              The goal of the Pinterest clone is simple: allow users to log in,
              browse through an infinite feed of image-based content, save and
              organize their favorite visuals, and search for specific content
              categories. I aimed to replicate Pinterest’s core features while
              ensuring a smooth, fast, and responsive experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Frontend Technologies
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>React:</strong> React served as the foundation of my
                project, allowing me to break down the complex UI into reusable
                components.
              </li>
              <li>
                <strong>Tailwind CSS:</strong> Tailwind CSS sped up the styling
                process using its utility-first classes, ensuring the design was
                responsive and clean.
              </li>
              <li>
                <strong>Redux Toolkit:</strong> Redux Toolkit streamlined state
                management, making it easier to fetch image data, handle
                authentication, and more.
              </li>
              <li>
                <strong>React Hook Form:</strong> Form handling and validation
                for login, signup, and search functionality were achieved with
                React Hook Form.
              </li>
              <li>
                <strong>React Router DOM:</strong> React Router DOM made
                navigating between different views like the home feed, saved
                images, and profiles smooth and efficient.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Backend Technologies
            </h2>
            <p className="text-gray-600">
              For the backend, I used <strong>Appwrite</strong>. Appwrite is an
              open-source platform that helped me manage user authentication,
              store user-uploaded images, and handle database storage. Its
              integration with React made backend services easy to implement and
              manage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Key Features
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>User Authentication:</strong> Secure user login and
                signup, powered by Appwrite's authentication system.
              </li>
              <li>
                <strong>Infinite Scrolling:</strong> An endless feed of images,
                with content loading as users scroll through the page.
              </li>
              <li>
                <strong>Search Functionality:</strong> Users can search for
                images by categories or keywords, making it easier to explore
                content.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Challenges Faced
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>State Management:</strong> Initially, managing complex
                states across components was challenging, but Redux Toolkit
                simplified the process.
              </li>
              <li>
                <strong>Backend Integration:</strong> Learning Appwrite was a
                new experience, but its comprehensive documentation made the
                process smoother.
              </li>
              <li>
                <strong>Infinite Scroll Optimization:</strong> Ensuring smooth
                performance with infinite scrolling required careful API call
                management and caching.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Conclusion
            </h2>
            <p className="text-gray-600">
              Building a Pinterest clone was an exciting journey that expanded
              my knowledge of frontend and backend development. Using
              technologies like <strong>React</strong>,{" "}
              <strong>Tailwind</strong>, and <strong>Redux Toolkit</strong>{" "}
              enabled me to create a responsive, fast, and scalable frontend,
              while <strong>Appwrite</strong> took care of backend needs like
              authentication and data storage. I'm excited to continue improving
              it by adding more features in the future!
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Blog;
