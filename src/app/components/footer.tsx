const Footer: React.FC = () => {
  return (
    <footer className="flex block justify-content-center w-screen sticky bottom-0 color-primary">
      <p className="w-11 text-white text-center line-height-3">
        If you find an error or have a suggestion, please inform
        <strong>
          {" "}
          Saúl Sosa Díaz (
          <a href="mailto:alu0101404141@ull.edu.es">alu0101404141@ull.edu.es</a>
          )
        </strong>
        . This project is being supervised by{" "}
        <strong>
          Prof. Juan José Salazar González (
          <a href="mailto:jjsalaza@ull.edu.es">jjsalaza@ull.edu.es</a>)
        </strong>{" "}
        at Universidad de La Laguna.
      </p>
    </footer>
  );
};

export default Footer;
