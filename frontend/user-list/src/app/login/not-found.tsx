export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-96">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">404</h1>
                <p className="text-gray-500 text-center mb-6">Page not found</p>
            </div>
        </div>
    );
}