function Workspace(){
    

    return(
        <div>
            <header className="flex justify-between items-center p-4 bg-gray-800">
                <Link to="/" className="text-white text-xl">
                Nombre del proyecto
                </Link>
                <Link to="/" className="text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M13 5v6m8 4v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h3m10 0h3a2 2 0 012 2z"></path>
                    </svg>
                </Link>
            </header>
        </div>
    )
}