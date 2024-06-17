
function AuthenticatedView() {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

          {/* Imagen de perfil */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:no-underline focus:ring-offset-2 focus:ring-offset-gray-800"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <img
                className="h-12 w-12 rounded-full object-cover object-center"
                src="images (1).jfif"
                alt=""
              />
            </button>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default AuthenticatedView