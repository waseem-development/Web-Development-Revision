import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg animate-pulse">
              ✨ Task Master ✨
            </h1>
            <p className="text-white/80 text-lg">
              Organize your day with style
            </p>
          </div>

          {/* Main Content */}
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl p-8 border border-white/20">
            <AddTodo />
            <Todos />
          </div>

          {/* Footer */}
          <p className="text-center mt-8 text-white/60 text-sm">
            Double-click on any task to edit • Click checkbox to complete
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
