import SearchField from "./SearchField";

const Hero = () => {
  
  return (
    <section className="hero-box">
      <h2 className="subtitle">Create App Online</h2>
      <h1 className="heading">
        Accelerate your app with low code development.
      </h1>
      <p className="tagline">
        We compare the app builders so you can choose your platform with
        confidence
      </p>
      <SearchField />
    </section>
  );
};

export default Hero;
