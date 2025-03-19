import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [projects, setProjects] = useState([]);
  const [thoughts, setThoughts] = useState([]);
  const [newThought, setNewThought] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  // Load projects and thoughts from localStorage on component mount
  useEffect(() => {
    const loadData = () => {
      // Load projects
      const savedProjects = localStorage.getItem("projects");
      if (savedProjects) {
        setProjects(JSON.parse(savedProjects));
      }

      // Load thoughts but filter out any default/John Doe messages
      const savedThoughts = localStorage.getItem("thoughts");
      if (savedThoughts) {
        const allThoughts = JSON.parse(savedThoughts);
        // Filter out John Doe messages
        const filteredThoughts = allThoughts.filter(
          (thought) => thought.author !== "John Doe"
        );
        setThoughts(filteredThoughts);
        // Save the filtered thoughts back to localStorage
        localStorage.setItem("thoughts", JSON.stringify(filteredThoughts));
      } else {
        // Initialize with empty array
        setThoughts([]);
        localStorage.setItem("thoughts", JSON.stringify([]));
      }
    };

    // Load immediately on mount
    loadData();

    // Set up event listener for storage changes (in case data is updated in another tab)
    window.addEventListener("storage", loadData);

    // Also check for updates every few seconds (in case of changes within the same tab)
    const interval = setInterval(loadData, 2000);

    return () => {
      window.removeEventListener("storage", loadData);
      clearInterval(interval);
    };
  }, []);

  const addThought = () => {
    if (newThought.trim() === "") return;

    // Create a new thought
    const thought = {
      id: Date.now().toString(),
      author: "You",
      initials: "YO",
      avatarColor: "bg-green-100",
      textColor: "text-green-600",
      content: newThought,
      timestamp: new Date().toISOString(),
    };

    // Add to state
    const updatedThoughts = [thought, ...thoughts];
    setThoughts(updatedThoughts);

    // Save to localStorage
    localStorage.setItem("thoughts", JSON.stringify(updatedThoughts));

    // Reset form
    setNewThought("");
    setIsWriting(false);
  };

  // New function to delete a thought
  const deleteThought = (id) => {
    // Filter out the thought with the matching id
    const updatedThoughts = thoughts.filter((thought) => thought.id !== id);
    setThoughts(updatedThoughts);

    // Update localStorage
    localStorage.setItem("thoughts", JSON.stringify(updatedThoughts));
  };

  // Format timestamp to "X time ago" format
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div
      className="w-80 min-h-screen"
      style={{
        backgroundColor: "#E2DDFF",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="py-4 pl-6 flex items-center" style={{ height: "64px" }}>
        <h1
          className="text-2xl font-bold text-black" // Changed to black color
          style={{
            color: "#000000", // Set to black
          }}
        >
          Project M.
        </h1>
      </div>
      <div className="px-4">
        <hr style={{ borderColor: "rgba(0, 0, 0, 0.08)" }} />
      </div>
      <div
        className="flex-1 overflow-y-auto"
        style={{ paddingLeft: "20px", paddingRight: "20px" }}
      >
        <ul className="mt-6 font-medium text-[#1A1A1A] space-y-3">
          <li className="rounded-lg transition duration-300">
            <Link
              to="/"
              className={`flex items-center px-4 py-2.5 space-x-3 rounded-lg transition duration-300 hover:bg-[#D1CEDB] ${
                activeLink === "home" ? "bg-[#D1CEDB]" : ""
              }`}
              onClick={() => setActiveLink("home")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={activeLink === "home" ? "#5E3FE9" : "currentColor"}
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span
                className={
                  activeLink === "home" ? "text-[#5E3FE9] font-semibold" : ""
                }
              >
                Home
              </span>
            </Link>
          </li>

          <li className="rounded-lg transition duration-300">
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-2.5 space-x-3 rounded-lg transition duration-300 hover:bg-[#D1CEDB] ${
                activeLink === "dashboard" ? "bg-[#D1CEDB]" : ""
              }`}
              onClick={() => setActiveLink("dashboard")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={activeLink === "dashboard" ? "#5E3FE9" : "currentColor"}
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                />
              </svg>
              <span
                className={
                  activeLink === "dashboard"
                    ? "text-[#5E3FE9] font-semibold"
                    : ""
                }
              >
                Dashboard
              </span>
            </Link>
          </li>

          <li className="rounded-lg transition duration-300">
            <Link
              to="/message"
              className={`flex items-center px-4 py-2.5 space-x-3 rounded-lg transition duration-300 hover:bg-[#D1CEDB] ${
                activeLink === "message" ? "bg-[#D1CEDB]" : ""
              }`}
              onClick={() => setActiveLink("message")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={activeLink === "message" ? "#5E3FE9" : "currentColor"}
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
              <span
                className={
                  activeLink === "message" ? "text-[#5E3FE9] font-semibold" : ""
                }
              >
                Messages
              </span>
            </Link>
          </li>

          <li className="rounded-lg transition duration-300">
            <Link
              to="/members"
              className={`flex items-center px-4 py-2.5 space-x-3 rounded-lg transition duration-300 hover:bg-[#D1CEDB] ${
                activeLink === "members" ? "bg-[#D1CEDB]" : ""
              }`}
              onClick={() => setActiveLink("members")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={activeLink === "members" ? "#5E3FE9" : "currentColor"}
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
              <span
                className={
                  activeLink === "members" ? "text-[#5E3FE9] font-semibold" : ""
                }
              >
                Members
              </span>
            </Link>
          </li>

          <li className="rounded-lg transition duration-300">
            <Link
              to="/review"
              className={`flex items-center px-4 py-2.5 space-x-3 rounded-lg transition duration-300 hover:bg-[#D1CEDB] ${
                activeLink === "review" ? "bg-[#D1CEDB]" : ""
              }`}
              onClick={() => setActiveLink("review")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={activeLink === "review" ? "#5E3FE9" : "currentColor"}
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                />
              </svg>
              <span
                className={
                  activeLink === "review" ? "text-[#5E3FE9] font-semibold" : ""
                }
              >
                Project Review
              </span>
            </Link>
          </li>

          <li className="rounded-lg transition duration-300">
            <Link
              to="/settings"
              className={`flex items-center px-4 py-2.5 space-x-3 rounded-lg transition duration-300 hover:bg-[#D1CEDB] ${
                activeLink === "settings" ? "bg-[#D1CEDB]" : ""
              }`}
              onClick={() => setActiveLink("settings")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke={activeLink === "settings" ? "#5E3FE9" : "currentColor"}
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <span
                className={
                  activeLink === "settings"
                    ? "text-[#5E3FE9] font-semibold"
                    : ""
                }
              >
                Settings
              </span>
            </Link>
          </li>
        </ul>

        {/* Projects section */}
        <div className="mt-10">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="uppercase text-xs font-semibold text-gray-600 tracking-wider">
              PROJECTS
            </h3>
            <Link
              to="/project"
              className="text-gray-600 hover:text-[#5E3FE9] transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </Link>
          </div>

          {projects.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {projects.map((project) => (
                <li key={project.id} className="mb-2">
                  <Link
                    to={`/project/${project.id}`}
                    state={{ projectId: project.id }}
                    className="flex items-center px-4 py-2.5 space-x-3 rounded-lg transition duration-300 hover:bg-[#D1CEDB]"
                  >
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: project.color }}
                    ></span>
                    <span className="font-medium">{project.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            // Updated to blend with the sidebar by removing background color
            <div className="text-gray-500 text-sm px-4 py-3 rounded-lg">
              No projects yet. Click the + icon to create one.
            </div>
          )}
        </div>

        {/* Thoughts Time section */}
        <div className="mt-10 pb-8 relative">
          <div className="bg-white rounded-xl p-6 shadow-lg relative min-h-64">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-yellow-300 rounded-full p-3 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-yellow-600"
                >
                  <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.75 6.75 0 1 1 1.5 0v4.661c0 .326.277.585.6.544.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                  <path
                    fillRule="evenodd"
                    d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h4 className="font-bold text-center text-lg mb-4 mt-4">
              Thoughts Time
            </h4>
            <p className="text-sm text-center text-gray-600 mb-6 px-4">
              We don't have any notice for you, till then you can share your
              thoughts with your peers.
            </p>

            {/* Thoughts Content */}
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {isWriting ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-medium text-sm">
                        YO
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">You</p>
                      <p className="text-xs text-gray-500">Just now</p>
                    </div>
                  </div>
                  <textarea
                    className="w-full p-3 border rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    rows="3"
                    placeholder="Write your thought here..."
                    value={newThought}
                    onChange={(e) => setNewThought(e.target.value)}
                    autoFocus
                  ></textarea>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={() => setIsWriting(false)}
                      className="px-4 py-1.5 rounded-lg bg-gray-200 text-gray-700 text-sm hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={addThought}
                      className="px-4 py-1.5 rounded-lg bg-yellow-400 text-white text-sm hover:bg-yellow-500 transition"
                    >
                      Post
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {thoughts.length > 0 ? (
                    thoughts.map((thought) => (
                      <div
                        key={thought.id}
                        className="bg-gray-50 rounded-lg p-4 relative group hover:bg-gray-100 transition-colors duration-300"
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <div
                            className={`w-8 h-8 ${thought.avatarColor} rounded-full flex items-center justify-center`}
                          >
                            <span
                              className={`${thought.textColor} font-medium text-sm`}
                            >
                              {thought.initials}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {thought.author}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatTimestamp(thought.timestamp)}
                            </p>
                          </div>

                          {/* Delete button - Only show for your own messages */}
                          {thought.author === "You" && (
                            <button
                              onClick={() => deleteThought(thought.id)}
                              className="absolute right-2 top-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Delete message"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">
                          {thought.content}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-6 bg-gray-50 rounded-lg">
                      No thoughts yet. Write your first message!
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Button to add new thought */}
            {!isWriting && (
              <button
                onClick={() => setIsWriting(true)}
                className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg text-sm font-medium shadow-md hover:from-yellow-500 hover:to-yellow-600 transition duration-300 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Write a message
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
