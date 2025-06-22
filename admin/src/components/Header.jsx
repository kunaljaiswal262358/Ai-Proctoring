export const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mindspace Admin</h1>
        <nav>
          <ul className="flex space-x-6">
            <li className="cursor-pointer hover:text-blue-200">Dashboard</li>
            <li className="cursor-pointer hover:text-blue-200">Exams</li>
            <li className="cursor-pointer hover:text-blue-200">Courses</li>
            <li className="cursor-pointer hover:text-blue-200">Logout</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};