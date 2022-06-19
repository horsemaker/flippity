import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-icons">
        <a
          href="https://twitter.com/horsemaker_"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-twitter footer-icon"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/yashghodekar/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-linkedin-in footer-icon"></i>
        </a>
        <a
          href="https://github.com/horsemaker/flippity"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fa-brands fa-github footer-icon"></i>
        </a>
      </section>
    </footer>
  );
};

export { Footer };
