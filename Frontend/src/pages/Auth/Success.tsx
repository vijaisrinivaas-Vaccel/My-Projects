interface SuccessProps {
  onLogout: () => void;
}

export default function Success({ onLogout }: SuccessProps) {
  const user = JSON.parse(
    localStorage.getItem("loggedInUser") || "{}"
  );

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    onLogout();
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">
        Welcome, {user.username} 🎉
      </h2>
      <p className="mb-6">You are logged in successfully</p>

      <button className="btn" onClick={logout}>
        LOGOUT
      </button>
    </div>
  );
}
