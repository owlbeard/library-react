import GitHub from '../assets/github.svg';
export default function Footer() {
  return (
    <div className="bg-slate-700 text-white flex justify-center items-center gap-4 p-2">
      <a href="https://github.com/owlbeard">
        <img className="white sm:h-12 h-8" src={GitHub} alt="Github Logo" />
      </a>
      <p className="sm:text-lg text-xs font-bold">
        Copyright © 2023 || Ömer F. Altun
      </p>
    </div>
  );
}
