import Link from "next/link";

interface User {
  name: string;
  phone: string;
  email: string;
  status: string;
}

async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch("http://localhost:8000/users", { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export default async function UsersPage() {
  const users = await fetchUsers();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Registered Users</h1>

        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-gray-700">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Phone</th>
                  <th className="border p-3">Email</th>
                  <th className="border p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email} className="hover:bg-gray-100 cursor-pointer">
                    <td className="border p-3">
                      <Link href={`/users/${user.email}`} className="text-blue-500 hover:underline">
                        {user.name}
                      </Link>
                    </td>
                    <td className="border p-3 text-gray-700">{user.phone}</td>
                    <td className="border p-3 text-gray-700">{user.email}</td>
                    <td className="border p-3 text-gray-700">{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
