import Cat from '../assets/reading-cat.png';

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center">
        <img className="h-24 white" src={Cat} alt="Reading Cat" />
        <h1 className="text-2xl font-bold">READING CAT</h1>
      </div>
      <button className="p-2 rounded-full bg-blue-500 font-bold">
        Sign Up
      </button>
    </div>
  );
}
