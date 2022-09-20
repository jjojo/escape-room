import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import s from "./Layout.module.scss";

export const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <main className={s.main}>{children}</main>
      <Footer />
    </>
  );
};
