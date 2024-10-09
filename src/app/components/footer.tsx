

const Footer: React.FC = () => {
  return (
    <footer className="flex justify-content-center absolute bottom-0 block sm:w-screen color-primary">
      <p className="text-white">
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
          <a className="color-primary" href="mailto:jjsalaza@ull.edu.es">
            jjsalaza@ull.edu.es
          </a>
          )
        </strong>{" "}
        at Universidad de La Laguna.
      </p>
    </footer>
  );
};

export default Footer;
